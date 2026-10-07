# Portrait resources v16.0.0

All NPC and player portraits are independent local WebP images. `manifest.json` is the identity and URL registry; `geometry.json` calibrates the creator layers. `thumbs/` contains individual thumbnails, never sprite sheets. `PROMPTS.md` records generation prompts.

CharacterCreatorV2 and PortraitResolver are embedded once in index.html so existing single-file game tests remain supported. Customized images are generated locally by Canvas, frozen on confirmation and persisted with the save. Save at chapter choices after completing an interaction.
