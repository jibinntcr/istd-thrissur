# ISTD Thrissur — Diamond Chapter Website (Next.js 14)

Official **Next.js 14 (App Router + TypeScript)** website for the **Indian Society for Training & Development (ISTD) — Thrissur Chapter (Diamond Chapter)**, Kerala, India.

## Live & Test Server Links

- **GitHub Pages Test Server**: [https://jibinntcr.github.io/istd-thrissur/](https://jibinntcr.github.io/istd-thrissur/)
- **Local Production Server**: `http://localhost:3000`

---

## Key Features

- **Next.js 14 App Router & TypeScript**: Modular architecture with dedicated routes (`/`, `/about`, `/committee`, `/programs`, `/gallery`, `/membership`, `/contact`) and an API route (`POST /api/enquiry`).
- **Official Circular Brand Emblem**: Transparent circular seal (`public/images/logo-circle.png`) with gold-accented ring in the sticky header, mobile drawer, and global footer.
- **International-Quality Photo Gallery (`/gallery`)**:
  - Curated collection of **24 unique official high-resolution photographs** from the **Inauguration of the ISTD Diamond Chapter at Thrissur** (30th March 2026, Hotel Pearl Regency) stored in `public/photos/`.
  - Category filtering (`All Photos`, `Lamp Lighting & Ceremony`, `Keynote & Addresses`, `Oath & Induction`, `Felicitations & Honors`, `Group Portraits & Audience`), real-time keyword search, and 3 layout modes (`Editorial`, `3-Column Grid`, `4-Column Compact`).
  - Global full-screen **Lightbox Viewer** (`LightboxProvider.tsx`) with auto-slideshow (`3.5s`), 1.65x zoom toggle, high-res download, thumbnail filmstrip, keyboard shortcuts (`←`, `→`, `Esc`, `Space`, `Z`), and mobile touch-swipe gestures.
- **Mobile-First Responsive Experience**:
  - Animated hamburger toggle with slide-over off-canvas drawer (`Navbar.tsx`) and app-style floating bottom quick-navigation bar (`Footer.tsx`).

---

## Project Structure

```text
├── .github/workflows/deploy.yml   # Automated Next.js build & deploy to GitHub Pages
├── public/
│   ├── images/                    # Official circular seal (logo-circle.png) & portraits
│   └── photos/                    # 24 unique Diamond Chapter Inauguration photographs
├── src/
│   ├── app/                       # Next.js 14 App Router pages & API route
│   ├── components/                # Navbar, Footer, LightboxProvider, GalleryClient, Forms
│   └── data/siteData.ts           # Centralized typed data & asset URL helper
├── next.config.mjs                # Next.js configuration (Server/Vercel + Static Export modes)
├── server.mjs                     # Node HTTP server entrypoint
├── package.json
└── tsconfig.json
```

---

## Local Development & Production Build

```bash
# Install dependencies
npm install

# Run development server on http://localhost:3000
npm run dev

# Build for production
npm run build

# Start production server on http://localhost:3000
npm start
```
