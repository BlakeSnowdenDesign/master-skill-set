// Editable media inventory for the Photography, Video & Aerial page.
// Leave a list empty until Blake supplies cleared, owned media. Empty lists
// render nothing publicly except one understated note when every list is empty.
//
// Photo / aerial still: { src, alt, caption?, width, height }
// Video:               { src, poster, title, caption?, captionsVtt?, width?, height? }
//   - captionsVtt: URL of a WebVTT caption track (strongly recommended for speech).
//   - Never add client work without permission or footage you do not own.
// Use durable HTTPS URLs (for example approved Wix Media URLs), not local paths
// or expiring links. This keeps previews and paste-ready sections identical.
export const MEDIA_INVENTORY = {
  photography: [],
  video: [],
  aerial: [],
};
