# Aluminum construction and texture ownership

Derived from project-authored S16, not the original full supplied header.

- Use multi-stop conic silver reflections centered below the face, bright upper-left bloom, cool shoulders and restrained warm lower-right glints.
- Separate face (`padding-box`) and bezel (`border-box`) gradient layers behind a transparent border. Combine alternating inset light/dark rims with separate cast/contact shadows.
- Keep circular grain and reflection centers synchronized. Animate a registered angle property when supported; retain an independent transform sweep fallback.
- Warm glints reflect surroundings; they do not impose gold branding.
- Grain can remain CSS repeating radial lines. Optional canvas grain should be generated once per control group, not each frame or button; cap device pixel ratio.
- If using `toBlob` and object URLs: retain static fallback for missing canvas, null blobs or CSP rejection; guard late callbacks after disposal, revoke replaced URLs and revoke on cleanup. The source reference omitted full cleanup; omission is not reusable guidance.
- Pointerdown feedback must clear on pointerup, cancel and leave. Do not prevent normal link activation. Keyboard focus gets sheen plus outline; reduced motion keeps static finish.

This is static guidance. Registered-property interpolation varies by browser. Verify actual support, texture cleanup, clipping, peak-sheen label contrast and touch behavior in the destination.

Source cross-reference: [S04/S16](../../../audit/SOURCES.md).
