This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Image Optimization

For best performance, use the [Next.js Image component](https://nextjs.org/docs/app/building-your-application/optimizing/images) for all images. Replace `<img>` tags with `<Image />` from `next/image` and configure domains in `next.config.ts` if needed.

Example:

```tsx
import Image from 'next/image';

<Image src="/public/example.png" alt="Example" width={400} height={300} />
```

This ensures automatic resizing, lazy loading, and optimal formats.

## Commit Email Notifications

This repo sends an email whenever a commit is pushed. Recipients are stored in `.env`, and new commit author emails are automatically appended to `MAIL_RECIPIENTS`.

Set these GitHub Actions secrets:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM` (optional override)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
