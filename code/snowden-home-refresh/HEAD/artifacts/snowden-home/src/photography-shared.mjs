export function photographyBody(imageSrc, { contactHref = "https://www.snowden-design.com/contact", target = ' target="_top"' } = {}) {
  const safeImageSrc = String(imageSrc ?? "").replace(/[&"<>'`]/g, (character) => ({
    "&": "&amp;",
    '"': "&quot;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "`": "&#96;",
  })[character]);

  return `
    <section class="sd-photo" id="sd-photography" aria-labelledby="sd-photo-title">
      <div class="sd-photo__iris" aria-hidden="true">
        <svg viewBox="-500 -500 1000 1000" focusable="false">
          <defs><clipPath id="sd-photo-aperture-bound"><circle r="450"/></clipPath></defs>
          <circle class="sd-photo__iris-rim" r="470"/>
          <g clip-path="url(#sd-photo-aperture-bound)" opacity=".55">
            ${Array.from({ length: 9 }, (_, index) => `<g transform="rotate(${index * 40})"><path class="sd-photo__iris-blade" d="M0-500H500V0L145 80Q95 0 60-70Z"/></g>`).join("")}
          </g>
        </svg>
      </div>
      <div class="sd-photo__inner">
        <div class="sd-photo__copy">
          <p class="sd-photo__eyebrow">Photography, Video &amp; Aerial <span>—</span> Denver, Colorado</p>
          <h2 id="sd-photo-title">A closer look.<br><em>A wider view.</em></h2>
          <p class="sd-photo__intro">Some stories ask you to get close. Others make more sense from above—or in motion. Photography, marketing video, and drone imagery bring another point of view to the ideas taking shape here.</p>

          <div class="sd-photo__disciplines">
            <article class="sd-photo__discipline">
              <div>
                <h3>Photography</h3>
                <p>Thoughtful images can give a place, a person, or an idea room to speak for itself.</p>
              </div>
            </article>
            <article class="sd-photo__discipline">
              <div>
                <h3>Drone imagery</h3>
                <p>An aerial perspective can add a fresh sense of scale, setting, and context to a story.</p>
              </div>
            </article>
            <article class="sd-photo__discipline">
              <div>
                <h3>Marketing Video</h3>
                <p>Brand stories, product features, and business videos shaped for your website, social channels, and digital campaigns.</p>
              </div>
            </article>
          </div>

          <a class="sd-photo__contact" href="${contactHref}"${target}>
            Talk about a project
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <figure class="sd-photo__figure">
          <div class="sd-photo__image">
            <img src="${safeImageSrc}" width="1024" height="938" alt="Leica Q3 camera with a red grip and lens cap resting on a wooden table" loading="lazy" decoding="async">
            <span class="sd-photo__image-mark" aria-hidden="true">From the studio</span>
          </div>
          <figcaption>Studio detail — Leica Q3</figcaption>
        </figure>

      </div>
    </section>
  `;
}
