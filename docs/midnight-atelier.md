# Nishanth — A World of Ideas

The homepage is a seven-room exhibition built from the Midnight Atelier portal. Its HTML sections, navigation, project cases, journal entries and contact controls are independent of WebGL. Dukaan Street has its own experience at `/dukaan`.

## Scene ownership

`src/components/exhibition/rooms.ts` defines the section anchors, camera angles, captions and posters. `Exhibition.tsx` tracks native scroll, manages selections, and moves a single persistent canvas host into the active display. `ExperienceCanvas.tsx` owns the camera, reflection map, demand rendering and lazy model imports. Architectural pieces and six room models live under `worlds/`. The original portrait installation lives in `src/components/atelier/PortalScene.tsx`.

The project and journal controls open the existing accessible dialogs. Leadership selections lead to the associated initiative. The active section remains directly reachable through an HTML anchor.

## Photography and fallback views

The identity installation uses `public/images/atelier/nishanth.webp`. Its still is a render of the installation with that photograph mounted inside. The stills in `public/images/exhibition/` include the project, leadership and journal selection states. Regenerate the associated stills after changing a model, camera or portrait. Keep the source photograph's proportions and natural color.

Reduced motion starts in still mode. The still-view switch saves the visitor's preference for the session. A failed or lost WebGL context returns the exhibition to its HTML content and still images.

## Publication

Build with `npm run build`. The Netlify project needs Next.js server runtime support for `/api/contact`. Compare the published production deploy commit with GitHub main and check the homepage, portrait, exhibition stills and `/dukaan` on the production domain. Firebase Admin and Resend configuration belongs in the hosting environment.
