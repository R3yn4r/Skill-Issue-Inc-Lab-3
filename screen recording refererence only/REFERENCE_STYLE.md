# REFERENCE STYLE GUIDE (taken from the screen recording)

Reference site: Atomic Cowboy / Denver Biscuit Co (restaurant site).
Recreate the STYLE only, in our brand "Purple Buff Brews".
Do not copy its text, logos, photos, food, or locations.
Look at the PNG files in the "reference-frames" folder next to this file.

## 1. The #1 problem to avoid: wrong fonts

The reference does NOT use an ultra-tight heavy condensed font (Anton,
Bebas, League Gothic, etc.) for everything. It uses:

| Role | What it looks like | Use this Google Font |
|---|---|---|
| Nav links, buttons, headings, item names | Bold, moderately condensed sans, ALL CAPS, WIDE letter-spacing | **Barlow Condensed** 700 / 800 |
| Body text | Sturdy, slightly bold, very readable humanist sans | **Barlow** 500 / 600 |
| Section titles accent (e.g. "Biscuit Sandwiches") | Retro brush script, large, one color | **Yellowtail** |

Rules:
- Max 3 font families: Barlow Condensed, Barlow, Yellowtail.
- Headings/nav/buttons: text-transform: uppercase; letter-spacing: 0.06em to 0.1em.
- NEVER use negative letter-spacing anywhere.
- Body text 17-18px, weight 500-600, line-height 1.55, color with strong contrast.
- Nav links 15-16px. Buttons 15-16px. Labels/tags 13px minimum. Nothing under 12px.
- The script font is used only for 1 big accent word/phrase per section title.

## 2. Layout and color (very simple, flat, spacious)

1. NAVBAR: solid dark bar (the reference uses deep navy; ours uses deep
   purple). Logo on the left. Links on the right in wide-spaced caps. The
   active page has a thin underline. Plenty of space between links (about 32px).
2. HERO IS PHOTO-FIRST: one large full-width food photo as the first
   thing under the navbar, with NO paragraph text laid over it. Place a
   starburst/sticker badge on the photo's bottom-left corner (small,
   tilted, text readable). Nothing overlaps the dish.
3. BELOW THE PHOTO, a big flat solid-color band (the reference uses deep
   maroon; ours uses brand purple) in two columns:
   - Left: a circular STAMP LOGO (cream circle details on a solid color
     circle, "PURPLE BUFF BREWS" in the middle, small dotted ring, stars).
   - Right: a headline in highlighted caps (text with a solid colored
     background block behind the words), one short paragraph, then TWO
     flat rectangular buttons side by side (accent color, dark text, wide
     caps). Instagram-style small icons + handle under the buttons.
4. COLOR BANDS: each section is one bold flat color. Alternate between
   deep purple, cream, lime accent, coral accent, and a light lavender.
   No gradients over text. No heavy dark overlays on photos.
5. STRIPES: thin horizontal stripe bands (3 lines in an accent color)
   between sections and framing the menu, like the reference.
6. MENU: on a cream band. A section title row: small arrows icon, a thin
   line, and the section name in the script font. Items in a 3-column
   grid (2 on tablet, 1 on mobile). Each item: NAME in colored bold
   caps (Barlow Condensed), the price, and a short description in dark
   body text. We also show a food photo on top of each card, with the
   same typography under it. Featured items get an outlined box. Specials
   get a small starburst tag.
7. PHOTO BLOCK: a wide photo with a starburst badge on top, and a solid
   color panel directly under it with a centered item name and short
   description (like the "Lights Out Burger" panel).
8. IMAGE STRIP: a row of photos on a colored band with two round arrow
   buttons centered below it.
9. HOURS HEADER: one row with the hours on the left and right and the
   brand name centered in big caps.
10. FOOTER: dark purple, multi-column link lists in small caps, a bright
    "Sign up for news" button on the right.
11. SPACING: sections have 64-96px vertical padding on desktop, 48px on
    mobile. Content max-width 1200px. Never cramp elements.

## 3. Motion (keep it light)
- Buttons and cards lift 4px with a soft shadow on hover.
- Photos zoom slowly (scale 1.05) on hover.
- Sections fade up once when scrolled into view.
- Navbar underline slides in on hover.

## 4. Suggested :root variables (adjust to our brand)

```css
:root {
  --purple-900: #1e1033;   /* navbar, footer */
  --purple-700: #4b2394;   /* main band */
  --purple-500: #7a3fc4;   /* accents */
  --lavender:   #e9dcff;   /* light band, stripes */
  --lime:       #d6f55a;   /* buttons, highlights */
  --coral:      #ff6f59;   /* special band, starburst */
  --cream:      #fff3d6;   /* menu band, light text */
  --ink:        #1b1228;   /* dark text on light bands */
  --font-display: "Barlow Condensed", sans-serif;
  --font-body:    "Barlow", sans-serif;
  --font-script:  "Yellowtail", cursive;
}
```
