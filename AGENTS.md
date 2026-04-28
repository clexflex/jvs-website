<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:jvs-visual-system-rules -->
# JVS visual system

JVS uses a Turner-inspired structural line system with two primary vertical rails. Build new sections around the shared 1px line system in `src/app/globals.css`: the desktop page is organized as 25vw / 50vw / 25vw, with the rails at 25% and 75%. Treat the lines as layout structure, not decoration.

Prefer the shared primitives (`Section`, `Container`, `PageIntro`, cards) so new UI inherits the structural line system automatically. Components should create the line structure through their own borders, spacing, and cells; do not draw arbitrary decorative line overlays across unrelated content. Avoid isolated floating cards, large rounded panels, repeated graph-paper backgrounds, equal-width wallpaper grids, or section layouts whose columns do not align with the page structure.

Homepage hero work should follow the Turner reference: image/video-first, subtle parallax media movement, lower-left copy placement, no descriptive paragraph or CTA buttons in the hero, and a small animated scroll indicator.

Header work must preserve the same rail contract: logo in the left 25vw zone, primary navigation in the middle 50vw zone, the menu icon on the left side of the second rail, and Contact Us centered in the right 25vw zone. The opened desktop menu also uses those rails: left 25vw brand slab with the logo held in the same position and a subtle vertical JVS text marquee, middle 50vw accordion menu, and right 25vw featured/detail column. Menu items should expand in place beneath the clicked row and toggle closed when clicked again. The opened menu footer should keep email in the left brand slab, social labels in the middle rail, and View All Projects in the right rail.
<!-- END:jvs-visual-system-rules -->
