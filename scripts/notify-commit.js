const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const envPath = path.join(process.cwd(), ".env");

function parseEnv(text) {
  const lines = text.split(/\r?\n/);
  const data = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      continue;
    }

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, lines };
}

function upsertEnvLine(lines, key, value) {
  const pattern = new RegExp(`^\\s*${key}=`);
  const nextLine = `${key}=${value}`;
  const index = lines.findIndex((line) => pattern.test(line));

  if (index >= 0) {
    lines[index] = nextLine;
  } else {
    lines.push(nextLine);
  }
}

function readEnvFile() {
  if (!fs.existsSync(envPath)) {
    return { data: {}, lines: [] };
  }

  const text = fs.readFileSync(envPath, "utf8");
  return parseEnv(text);
}

function writeEnvFile(lines) {
  const content = `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
  fs.writeFileSync(envPath, content, "utf8");
}

function splitRecipients(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function uniqueRecipients(existing, additions) {
  const lowerSet = new Set(existing.map((email) => email.toLowerCase()));
  const merged = [...existing];

  for (const email of additions) {
    const lower = email.toLowerCase();
    if (!lowerSet.has(lower)) {
      lowerSet.add(lower);
      merged.push(email);
    }
  }

  return merged;
}

function getEventData() {
  const eventPathFromEnv = process.env.GITHUB_EVENT_PATH;
  if (!eventPathFromEnv) {
    throw new Error("GITHUB_EVENT_PATH is not set.");
  }

  const raw = fs.readFileSync(eventPathFromEnv, "utf8");
  return JSON.parse(raw);
}

function buildCommitSummary(commits) {
  return commits
    .map((commit) => {
      const authorName = commit.author?.name || "Unknown";
      const authorEmail = commit.author?.email || "Unknown";
      const timestamp = commit.timestamp || "Unknown";
      const message = (commit.message || "").trim() || "(no message)";
      const url = commit.url || "";
      const urlPart = url ? `\n  ${url}` : "";

      return `- ${message}\n  ${authorName} <${authorEmail}> at ${timestamp}${urlPart}`;
    })
    .join("\n\n");
}

async function main() {
  const event = getEventData();
  const commits = Array.isArray(event.commits) ? event.commits : [];
  if (!commits.length && event.head_commit) {
    commits.push(event.head_commit);
  }
  const headCommit = event.head_commit || commits[commits.length - 1];

  if (!headCommit) {
    console.log("No commit data found. Skipping email notification.");
    return;
  }

  const authorEmails = commits
    .map((commit) => commit.author?.email)
    .filter(Boolean);

  const envFile = readEnvFile();
  const recipients = splitRecipients(envFile.data.MAIL_RECIPIENTS);

  // Only notify the other contributor(s), not the pusher
  const pusherEmail = event.pusher?.email || authorEmails[authorEmails.length - 1];
  const recipientsForEmail = recipients.filter(email => email && email !== pusherEmail);

  if (!recipientsForEmail.length) {
    console.log("No recipients to notify (other than pusher). Skipping email notification.");
    return;
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpSecure =
    (process.env.SMTP_SECURE || "").toLowerCase() === "true" ||
    smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error(
      "SMTP configuration is missing. Provide SMTP_HOST, SMTP_USER, and SMTP_PASS as secrets."
    );
  }

  const fromAddress =
    process.env.MAIL_FROM || envFile.data.MAIL_FROM || smtpUser;

  const repoName = event.repository?.full_name || "Unknown repository";
  const ref = event.ref || "Unknown ref";
  const pusher = event.pusher?.name || "Unknown";
  const headMessage = (headCommit.message || "").trim() || "(no message)";

  const subject = `New commit on ${repoName}: ${headMessage}`;
  const body = [
    `Repository: ${repoName}`,
    `Ref: ${ref}`,
    `Pushed by: ${pusher}`,
    "",
    "Commits:",
    buildCommitSummary(commits),
  ]
    .filter(Boolean)
    .join("\n");

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: fromAddress,
    to: recipientsForEmail.join(","),
    subject,
    text: body,
  });

  console.log(`Email sent to ${recipientsForEmail.join(", ")}.`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
