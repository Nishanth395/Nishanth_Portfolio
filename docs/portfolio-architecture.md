# Portfolio design and architecture

## Visitor journey

1. **Introduction and 3D explorer.** Lead with Nishanth’s role and a direct path to selected work. The explorer demonstrates three design disciplines through interactive objects. All sections remain reachable without using the viewer.
2. **Work.** Filter real projects by category. Each card opens a case study in place and offers a separate live link where a deployment exists.
3. **Studio and notes.** Keep capabilities, commercial experience, and leadership in one compact section. Show the journal as a scannable list with its original publication statuses.
4. **Contact.** Keep direct email and the existing validated form accessible from the header, hero, and studio.

## Component boundaries

The Next.js App Router owns the page and metadata. Server components render the hero copy, studio, and footer. Client components manage the navigation, project filters, journals, contact form, and 3D controls. The portfolio content remains in `src/content/dossier.ts`. Cases and notes share modal focus and keyboard handling. The contact route remains independent of the presentation.

The 3D catalog defines the module identity, accessible description, and accent. The React viewer handles module selection, input, motion preferences, visibility, and still renders. It loads the Three.js renderer separately. The scene builds and disposes one assembly at a time using shared lighting. Rotation is opt-in, and the renderer draws on demand when paused. When the canvas leaves the viewport, rendering stops until it returns.

| Module | Geometry | Exploded view |
| --- | --- | --- |
| Relay | Five stacked trays with translucent outer plates, visible traces, and a signal core | Slides trays apart along the stacking axis |
| Lattice | Twelve node assemblies arranged on an icosahedral scaffold | Moves each node radially away from the core |
| Lens | Three nested segmented gimbals around an octahedral prism | Offsets each ring and lifts the prism away from the assembly |

## Spatial sections

Work, Studio, Notes, and Contact each have a dedicated model. Their selectors stay in the document and connect to real project details, capabilities, notes, or contact actions. The section models share one offscreen WebGL renderer, separate from the larger hero assembly viewer. Each visible section copies its render into a local canvas. These previews load lazily, render in response to input, and have no continuous animation. Still WebP renders and the same document controls are available without WebGL.

## Validation

- Run `npm run build` to verify compilation and type checking.
- At desktop and phone widths, check that navigation and work filters remain usable with and without WebGL.
- Confirm module switching, the exploded-view slider, keyboard rotation, reset, and reduced-motion defaults.
- Check that every section model responds to keyboard orbit and selection, including touch controls on a phone.
- Confirm case studies and notes can be opened and dismissed with the keyboard and return focus to the opener.
- Verify contact validation with an empty request. Live message delivery requires the configured Firebase and Resend services.
