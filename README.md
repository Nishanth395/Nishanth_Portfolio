# Nishanth Adepu — Portfolio

[A World of Ideas](docs/midnight-atelier.md) is the seven-room homepage exhibition. The earlier Dukaan Street experience remains available at `/dukaan`, presented as a procedural Indian bazaar. A single React Three Fiber camera moves from dawn through four shopfronts to a chai stall and night-time contact shop. The page’s HTML contains the portfolio copy, projects, notes, and contact form in both 3D and 2D modes.

## Run locally

Use Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. To verify the production build, stop the development server, then run:

```bash
npm run build
npm start
```

## Edit the street

- `src/content/dossier.ts` holds the existing portfolio copy, project case studies, and verified links.
- `src/components/dukaan/content.js` assigns projects to shopfronts and sets street-map stops.
- `src/components/dukaan/timeline.ts` defines the camera positions, look targets, sky, fog, lighting, and bloom per act.
- `src/components/dukaan/StreetCanvas.tsx` builds the procedural street and manages the camera and effects.
- `src/components/dukaan/StreetShell.tsx` manages the map, loading states, and 2D preference.
- `src/components/dukaan/ShopWalk.tsx` connects shop stops to the existing case studies.

The existing Next.js app provides both the React frontend and the contact API. The street bundle loads separately from the document, caps DPR at 1.5, and uses lighter geometry and effects on phones. The site opens in 2D for visitors who prefer reduced motion and offers a 2D switch throughout.

## Deploy on Vercel

1. Import the GitHub repository in Vercel and select the Next.js preset.
2. Keep the repository root as the project root and use the default Next.js build settings.
3. To enable contact form delivery, configure the Firebase and Resend values listed in `.env.example` in Vercel’s environment settings.
4. Deploy and check that the home page, case studies, street map, and 2D switch work in the preview. Validate form delivery against your configured services before promoting to production.
