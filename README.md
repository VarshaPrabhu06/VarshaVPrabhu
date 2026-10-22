# 3D Minimal Portfolio (React + MUI + React Three Fiber)

## Run locally
Requires Node.js 18+.
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview
```

## Customize
All content lives in `src/data/portfolioData.js`. Replace every `[placeholder]`.
- Socials: set `github` and `linkedin` (empty values are hidden).
- Resume: put `resume.pdf` in `/public`, set `resumeUrl: "/resume.pdf"`.
- Project images: put files in `/public/projects/` and set `image: "/projects/name.png"`; set `github` and `demo` only to real URLs.
- Colors and fonts: `src/theme/theme.js` and the font link in `index.html`.
- 3D object: `src/components/Scene3D.jsx`. It falls back to a CSS shape without WebGL and goes still for reduced-motion users.

## Contact form
Without configuration the form opens the visitor's email app (it never shows a fake success).
To send directly, create a Formspree form, copy `.env.example` to `.env`, and set `VITE_FORM_ENDPOINT`.

## Deploy
Vercel: push to GitHub, import the repo, framework "Vite" (build `npm run build`, output `dist`).
Netlify: same settings; add `VITE_FORM_ENDPOINT` under Environment variables if used.
