# Haute & Hoof

Source repo for `hauteandhoof.com`.

## Local development

```bash
npm install
npm run dev
```

## Banner images

Place your selected banner photos in `public/images` using the filenames documented in `public/images/README.md`.
If a banner image is missing, the site uses a branded fallback gradient automatically.

## Contact form email setup

The parent contact form on `/about` sends email using Resend.

1. Copy `.env.example` to `.env.local`
2. Set:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (must be verified in Resend for production)
   - `CONTACT_RATE_LIMIT_WINDOW_MS` (optional, default `600000`)
   - `CONTACT_RATE_LIMIT_MAX` (optional, default `5`)
3. In Vercel, add the same env vars in project settings

## Social integration workflow

Use `/social-share` as the parent-managed publish desk:
- Draft caption, hashtags, and link note
- Copy caption text
- Open Instagram/TikTok upload surfaces for final manual posting

This avoids fragile direct-post API dependencies and keeps final publishing parent-controlled.

## Quality checks

```bash
npm run lint
npm run test:unit
npm run test:smoke
npm run build
```

## CI deployment safety

GitHub Actions runs on every pull request and every push to `main`:
- lint
- unit tests
- smoke tests
- production build

Set GitHub branch protection on `main` to require the `CI / verify` check before merge. That keeps Vercel production deploys from shipping broken changes.
