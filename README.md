# Barn to Blazer

& everything in between. Documenting Violet's journey through fashion & horses.

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run test:unit
npm run test:smoke
npm run build
```

## Contact Form Setup

Copy `.env.example` to `.env.local` and fill in your Resend API key and email addresses.

## Deployment

Pushes to `main` auto-deploy via Vercel. CI runs lint, tests and build on every PR.
