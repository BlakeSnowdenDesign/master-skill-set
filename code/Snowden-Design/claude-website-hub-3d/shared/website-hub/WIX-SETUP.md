# Website hub graphic: Wix setup

A 3D, animated rebuild of the flat "Your website" orbit illustration. A brushed aluminum monitor floats at the center showing a small website (nav, headline, button, snowy mountain hero with an amber sun). Search, Content, Social and Campaigns sit around it as glossy 3D pills on tilted orbit rings. Every 6 seconds one channel sends an amber pulse down a dashed path to the monitor, and the site answers with a glowing button, a light running along the ridge and a teal ripple.

## Files

| File | Use |
| --- | --- |
| `snowden-website-hub.html` | Paste into a Wix **Embed HTML** element (Embed code > Code). Self-contained; loads three.js 0.160.0 from jsDelivr and Google Sans Flex from Google Fonts. |
| `preview.html` | Same graphic in a framed page for review, with a dark-mode palette. Not for Wix. |
| `website-hub-poster.png` | Still frame (1440x900). Use as an image alt / social share / fallback. |
| Video fallback (project files, `media/website-hub/`) | `website-hub-loop.mp4` (H.264, 24 s seamless loop, 1440x900) and `website-hub-loop.webm`. Upload through Wix Media if you'd rather use a video element than an embed. |

## Placing it in Wix Studio

1. Add > Embed code > **Embed HTML**. Choose **Code**, paste the whole file.
2. Size the element at roughly **16:10** (for example 1100 x 690 on desktop). 4:3 works too; it just leaves more space above and below.
3. On mobile, a **4:5** box (for example 360 x 450) keeps all four pills in frame; the camera widens automatically to fit narrow boxes.
4. Put the "Your website" section heading and copy in native Wix text above or beside it, so search engines read it. The embed is an iframe and carries no ranking weight.

## Behaviour

- Animates only while on screen and while the tab is visible, so it costs nothing when scrolled away.
- Pointer movement tilts the scene slightly for parallax.
- `prefers-reduced-motion` shows a still frame.
- If WebGL is unavailable, a simple CSS version with the five labels shows instead.
- Background is Snow `#FAFCFC` with a soft halo. To change it, edit `--hub-bg` and `--hub-glow` at the top of the file.

## Re-rendering the video

The graphic exposes a capture mode: open the file with `?capture=1`, then call `window.__hub.renderAt(seconds)` for each frame from 0 to 24 at 30 fps and screenshot it. Every motion repeats every 24 seconds, so the frames loop without a seam.
