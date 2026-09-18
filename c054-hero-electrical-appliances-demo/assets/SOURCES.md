# Current website asset sources

## Lifestyle/store photos added + copy and layout polish (18 September 2026, revision 5)
Per the client's explicit follow-up instruction, two of the three previously-unused client lifestyle photos are now placed on the site:

- **about-client-photo.jpg** — cropped from `photo_2026-09-14_17-26-49.jpg` (a HERO team member holding a SUSI oil can in front of stocked shelves). Used in the About HERO section in a new text-left / photo-right layout, medium-sized in the right column.
- **contact-brand-photo.jpg** — cropped from `photo_2026-09-14_17-26-53.jpg` (a branded SUSI showroom wall display). Used above the contact panel in the Store/Contact section as general brand-environment / product-display imagery, not presented as a literal photograph of HERO's verified Dongkor storefront.

**photo_2026-09-14_17-26-51.jpg was deliberately not used.** It is sexualized promotional model photography (two models in branded crop-tops/shorts), which is not appropriate for this professional business website regardless of branding — independent of the storefront-accuracy question that applied to the other two images. The client's own instructions marked this image as optional ("if visually suitable"), so the "at least two photos" requirement is met with the other two images instead.

Both photos were cropped to a consistent aspect ratio (4:5 for the About photo, 4:3 for the store photo) and resized to 900px on the long edge; no content was retouched or altered beyond cropping.

Other changes in this revision: the About and Contact sections were restructured (About: heading+copy left, photo right; Contact: brand photo stacked above the contact panel) without altering the site's existing colors, typography, section order, product card design, or responsive breakpoints. The `#more-products{padding-top:0}` spacing override from revision 4 was removed and replaced with a hairline `border-top` divider, restoring full section spacing between The HERO Range, Also From HERO, and Why Choose HERO so the page no longer feels stacked too tightly. All English and Khmer copy across every section was rewritten per the client's supplied wording for natural, non-literal-translation phrasing in both languages.

## Product catalog images — transparent cutouts + SUSI range added (18 September 2026, revision 4)
Per the client's explicit follow-up instruction, SUSI motorcycle oil is now included as an active HERO product line alongside BUSSAN, SUBUTA, SUSHI and SOSI (this supersedes the revision-3 note below, which had excluded SUSI as not yet confirmed in hand).

All seven catalogue images (BUSSAN, SUBUTA, SUSHI, SOSI single, SOSI 3-pack, SUSI 10W-40, SUSI 20W-50) were reprocessed as **transparent PNG cutouts** rather than JPGs on a solid white canvas. The previous JPG approach left a visible pale rectangle around each product wherever it sat on the site's light-gray card background (`#f6f6f7` / `#f7f7f8`), since the product was cut onto pure white (`#ffffff`) instead of matching gray. The new pipeline: background removed with automated foreground detection, edge color-decontamination to strip white fringing left over from matting against a white source photo, recentered on a fully transparent 1000×1000 canvas at a consistent scale, with a soft shadow baked in as translucent black (so it reads correctly against any card background). Because the canvas is transparent, the product now sits directly on the card's own background color with no visible box or edge mismatch. File extensions changed from `.jpg` to `.png` for these seven files; `index.html`/`main.js` were updated to match. The previous opaque-white-canvas JPGs are preserved as `*-whitebox.jpg` for reference.

Product codes/grades shown on each catalogue card were read directly off the supplied product images: BUSSAN `SMF-85D31L · 12V 80Ah`, SUBUTA `38B20MF · 12V 40Ah`, SUSHI `MF40B20 · 12V 40Ah`, SOSI `20W-50 · 0.8L`, SUSI 10W-40 `10W-40 · 0.8L`, SUSI 20W-50 `20W-50 · 0.8L`.

New source files used, from `../../Images from Client/`:
| Website asset | Original client filename |
| --- | --- |
| susi-oil-10w40.png | ChatGPT Image Sep 18, 2026, 07_53_21 PM (3).png |
| susi-oil-20w50.png | ChatGPT Image Sep 18, 2026, 07_53_22 PM (4).png |

SOSI 3-pack, SUSI 10W-40 and SUSI 20W-50 are shown in a new "Also From HERO" supporting section below The HERO Range, reusing the exact same product-card component so the visual treatment is identical to the primary 4-brand grid — no new card design was introduced.

**The three lifestyle/store photos (`photo_2026-09-14_17-26-49.jpg`, `_-51.jpg`, `_-53.jpg`) were still not placed on the site.** After review: `_-49.jpg` and `_-53.jpg` depict a person and a storefront that are not confirmed to be HERO's own staff or premises — `_-53.jpg` in particular is a rendered/fabricated showroom, not a photograph of the real Dongkor location, and using it under "Visit us in Dongkor, Phnom Penh" would misrepresent HERO's actual store to customers. `_-51.jpg` is sexualized promotional model photography, which isn't appropriate for this business site regardless of branding. None were used in the About, Why Choose HERO, or Store/Contact sections; those remain text/icon-only as before. Real photos of HERO's own shop, staff, or shelf stock would be welcome replacements.

## Product catalog images — straight-angle update (18 September 2026, revision 3)
`bussan-car-battery.jpg`, `subuta-car-battery.jpg` and `sushi-car-battery.jpg` were replaced with the client's newer straight-on (front-facing) product renders, supplied in `../../Images from Client/` as `ChatGPT Image Sep 18, 2026, 08_03_04 PM (2).png` (BUSSAN), `ChatGPT Image Sep 18, 2026, 08_03_05 PM (3).png` (SUBUTA) and `ChatGPT Image Sep 18, 2026, 08_03_03 PM (1).png` (SUSHI). Each was processed the same way as the previous revision: background removed with an automated foreground-detection tool (no manual retouching of the product itself), recentered on a pure-white 1000×1000 canvas at a consistent scale, with a soft uniform drop shadow added beneath it. No label text, branding, colors or product geometry were altered. SOSI motorcycle oil images were left unchanged — the client asked to keep the already-cleaned SOSI assets. The previous (3/4-angle) revision-2 versions are preserved as `bussan-car-battery-angled.jpg`, `subuta-car-battery-angled.jpg` and `sushi-car-battery-angled.jpg`, and the original raw client PNGs remain preserved as `bussan-car-battery-original.jpg`, `subuta-car-battery-original.jpg` and `sushi-car-battery-original.jpg` (unchanged from revision 1).

Two other client-supplied files from 18 September 2026 — a SUSI-branded motorcycle-oil can (`ChatGPT Image Sep 18, 2026, 07_53_21 PM (3).png`) and a SUSI-branded oil can in a different weight grade (`ChatGPT Image Sep 18, 2026, 07_53_22 PM (4).png`) — were not used anywhere on the site. SUSI is not one of HERO's current in-hand products (the site catalog is limited to BUSSAN, SUBUTA and SUSHI car batteries, plus SOSI motorcycle oil), so adding SUSI imagery would misrepresent current inventory, consistent with the standing instruction not to add products that are not confirmed in hand.

## Product catalog images — background cleanup (15 September 2026, revision 2)
`bussan-car-battery.jpg`, `subuta-car-battery.jpg`, `sushi-car-battery.jpg`, `sosi-oil-single.jpg` and `sosi-oil-trio.jpg` are the same client-supplied product photography listed below, reprocessed for a consistent catalog look: the background was removed with an automated foreground-detection tool (no manual retouching of the product itself), the product was recentered on a pure-white canvas at a consistent scale, and a soft, uniform drop shadow was added beneath it. No label text, branding, colors or product geometry were altered. The pre-cleanup versions are preserved unchanged as `bussan-car-battery-original.jpg`, `subuta-car-battery-original.jpg`, `sushi-car-battery-original.jpg`, `sosi-oil-single-original.jpg` and `sosi-oil-trio-original.jpg`.

## Supplied product images
All five files were supplied by the user in `../../Images from Client/`. They were inspected, resized proportionally to a maximum 1000px edge and saved as JPEGs for the website. No image contents, labels or branding were regenerated or retouched. Original PNG files are unchanged.

| Website asset | Original client filename | Placement |
| --- | --- | --- |
| sosi-oil-single.jpg | ChatGPT Image Sep 15, 2026, 08_28_46 PM (1).png | SOSI Motorcycle Oil product card |
| sosi-oil-trio.jpg | ChatGPT Image Sep 15, 2026, 08_28_47 PM (2).png | Motorcycle Oil category |
| bussan-car-battery.jpg | ChatGPT Image Sep 15, 2026, 08_28_48 PM (3).png | Car Battery category and BUSSAN product card |
| subuta-car-battery.jpg | ChatGPT Image Sep 15, 2026, 08_28_49 PM (4).png | SUBUTA Car Battery product card |
| sushi-car-battery.jpg | ChatGPT Image Sep 15, 2026, 08_28_50 PM (5).png | SUSHI Car Battery product card |

The website copy does not infer technical specifications or guarantees from the images. No newly generated or generic product images are used in the current catalog.

## Hero image (updated 15 September 2026, revision 2)
`automotive-hero.jpg` is now "A smiling mechanic in blue overalls stands in a garage" by Jesse Plum on Unsplash. Source: https://unsplash.com/photos/a-smiling-mechanic-in-blue-overalls-stands-in-a-garage-T_G3K6lDmtA . License: https://unsplash.com/license (free to use, no attribution required, though credited here for the record). Real, unedited photograph (only exposure/contrast were adjusted); not AI-generated. Depicts a real workshop in Japan, illustrative stock — not HERO's own store. Chosen for the Japan-technology positioning behind the BUSSAN/SUBUTA/SUSHI/SOSI brands' "Japan Technology" labeling. The previous hero photo is preserved unchanged as `automotive-hero-workshop-original.jpg`.

## Preserved assets
- `Logo.jpg`: unchanged copy of the client-provided logo.
- `automotive-hero-workshop-original.jpg`: the hero image used before 15 September 2026 revision 2 — workshop stock image by Jimmy Nilsson Masth on Unsplash. Source: https://unsplash.com/photos/a-man-working-on-a-car-in-a-garage-jL9zfzTVSwY . License: https://unsplash.com/license . Illustrative context, not HERO's store. No longer referenced by the site.
- `NotoSansKhmer-Regular.ttf`: Google Fonts, SIL Open Font License; see `NotoSansKhmer-LICENSE.txt`.

Old generic category assets and their generation notes are historical unused files. They are not displayed or included in the current-products upload ZIP. No reference-site content or images were added.
