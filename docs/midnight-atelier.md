# Midnight Atelier

Midnight Atelier is the current portfolio homepage. The earlier Dukaan Street experience remains available at `/dukaan`.

The homepage renders its copy and navigation on the server. The hero loads its React Three Fiber installation when the viewer enters the viewport. The metal ribs are procedural meshes, and a baked still from the same scene covers reduced-motion preferences, slow loading, and unavailable WebGL. The 3D canvas uses a capped device pixel ratio and renders in response to input.

## Portrait asset

Place the original portrait at `public/images/atelier/nishanth.webp` and rebuild. Use the original photograph with a natural crop and no facial edits. The homepage checks for the asset at build time and uses it in the still composition and on the 3D portal mount. When the asset is absent, the architectural render supplies the hero visual.

Verified project copy and links are in `src/content/dossier.ts`. Cases and journal entries share keyboard and focus behavior. Contact delivery still uses the existing Firebase and Resend route. See the root README for local execution and deployment settings.
