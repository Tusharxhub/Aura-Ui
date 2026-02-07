
# Aura UI

A modern, high-performance UI component library and showcase built with Next.js 16, React 19, and TypeScript. Aura UI provides reusable, accessible, and customizable components, optimized for speed and developer experience.

## Features

- **Next.js App Router**: Static generation and dynamic routing for fast, SEO-friendly pages.
- **Component Registry**: Organized, extensible registry for UI components, cards, and inputs.
- **Live Previews**: Interactive component previews with code and props tables.
- **Command Palette**: Global and local command palettes for quick navigation and actions.
- **Image Optimization**: Uses Next.js Image component for automatic resizing and lazy loading.
- **Production-Ready Dockerfile**: Optimized for deployment with compression and best practices.
- **Commit Email Notifications**: Automated email alerts for repository activity (see below).

## Project Structure

├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── components/
│   │   │   └── [category]/[slug]/page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── landing/
│   │   └── ...
│   ├── lib/
│   └── registry/
│       ├── index.tsx
│       └── ...
├── public/
├── Dockerfile
├── package.json
├── tsconfig.json
├── README.md
```
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── components/
│   │   │   └── [category]/[slug]/page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── landing/
│   │   └── ...
│   ├── lib/
│   └── registry/
│       ├── index.tsx
│       └── ...
├── public/
├── Dockerfile
├── package.json
├── tsconfig.json
├── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- Edit `src/app/page.tsx` for the homepage.
- Add new components in `src/components/ui` or `src/components/landing`.
- Register components in `src/registry/index.tsx`.
- Customize styles in `src/app/globals.css`.

## Image Optimization

For best performance, use the [Next.js Image component](https://nextjs.org/docs/app/building-your-application/optimizing/images) for all images. Replace `<img>` tags with `<Image />` from `next/image` and configure domains in `next.config.ts` if needed.

Example:

```tsx
import Image from 'next/image';

<Image src="/public/example.png" alt="Example" width={400} height={300} />
```

## Commit Email Notifications

This repository sends an email whenever a commit is pushed. Recipients are stored in `.env`, and new commit author emails are automatically appended to `MAIL_RECIPIENTS`.

## Build & Deployment

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) for seamless hosting and CDN.

## Documentation & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

---

Aura UI is open for feedback and contributions. For issues or feature requests, please open a GitHub issue.
