# Portrait resources v16.0.1

All NPC and player portraits are independent local WebP images. manifest.json is the identity and URL registry. Player entries retain their original photographic faceSource and point portrait to the fully composed player-v2 image, so template thumbnails and preview match the default selections.

The creator combines the selected face and calibrated transparent hair with one complete clothed torso. bodies/ contains all 120 gender, outfit and pose combinations; each includes its own natural neck, sleeves, hands and any selected prop. body-manifest.json enumerates the complete matrix. Independent naked-arm and hollow garment overlays are no longer used. geometry.json calibrates face, hair, neck and wrist alignment.

thumbs/ contains individual transparent thumbnails, never sprite sheets. Outfit and pose thumbnails use the exact combination selected in the other group. Hair-color thumbnails use the same tint as the preview. Face, makeup and expression options use 780 rendered variants of the selected template identity; body options reflect the selected outfit and pose. Wristwatch resources contain only the watch. PROMPTS.md records generation prompts.

CharacterCreatorV2 and PortraitResolver are embedded once in index.html. Customized images are generated locally by Canvas, frozen on confirmation and persisted with portraitRenderer: 2. Loading a legacy save retains identity, options and progress and recomposes the old preview before committing the restored state. Save at chapter choices after completing an interaction.

After changing either registry, run node tools/sync-portraits.cjs to update the single embedded creator registry.
