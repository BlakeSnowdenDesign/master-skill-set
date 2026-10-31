const escapeAttribute = value => String(value || "")
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

export function limetreeFeature(lookbookHtml) {
  // The original uploaded presentation stays intact and is mounted only when opened.
  const presentation = String(lookbookHtml || "");
  const srcdoc = escapeAttribute(presentation);
  return `<section class="si-lime" id="si-work-limetree-feature" aria-labelledby="si-work-limetree-feature-h" data-testid="feature-limetree">
  <div class="sd-wrap si-lime__in">
    <header class="si-lime__head sd-r">
      <p class="si-lime__kicker sd-mono">Featured case study <span aria-hidden="true">/</span> Hospitality furniture</p>
      <h2 class="sd-h si-lime__title" id="si-work-limetree-feature-h">Creative direction. <em>Engineered in motion.</em></h2>
    </header>
    <div class="si-lime__story sd-r" style="--d:.1s">
      <div class="si-lime__copy">
        <p class="si-lime__client sd-mono">Lime Tree Hospitality · Guest Rooms, Volume 01</p>
        <p class="si-lime__description">For Lime Tree Hospitality, I created a cinematic digital editorial that pairs refined visual storytelling with highly technical video production. Using advanced video and AI-assisted editing techniques, I built precise technical overlays, dimensional motion, and smooth rotational zooms to reveal the design details with clarity and impact. The result is a polished, immersive film that feels as thoughtfully engineered as it is beautiful.</p>
        <p class="si-lime__body">The goal: turn a deep hospitality portfolio into something people could browse as naturally as a printed book—without losing the specificity of each destination or the material detail of the furniture.</p>
        <a class="sd-btn sd-hero-metal si-lime__visit" href="https://snowden-design.wixstudio.com/limetreesocial" target="_blank" rel="noopener noreferrer" data-testid="link-feature-limetree-live">
          <span class="sd-hero-metal__sweep" aria-hidden="true"></span>
          <span class="sd-hero-metal__label">Open the live lookbook ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></span>
        </a>
        <p class="si-lime__note">23 properties <span aria-hidden="true">·</span> 571 photographs <span aria-hidden="true">·</span> 10 films</p>
      </div>
      <figure class="si-lime__plate">
        <video data-sd-portfolio-video muted loop controls playsinline preload="none" poster="https://static.wixstatic.com/media/2fde66_0620b5c631e94bae97312a1c70d4b86df000.jpg" aria-label="Lime Tree Hospitality featured video">
          <source data-src="https://video.wixstatic.com/video/2fde66_0620b5c631e94bae97312a1c70d4b86d/720p/mp4/file.mp4" type="video/mp4">
          Your browser does not support this video.
        </video>
        <figcaption><span>Lime Tree Hospitality</span> Featured film</figcaption>
      </figure>
    </div>
    <section class="si-lime__approach sd-r" aria-labelledby="si-lime-approach-h">
      <div class="si-lime__section-label"><span class="si-lime__index sd-mono">Approach</span><h3 class="sd-h" id="si-lime-approach-h">The editorial idea</h3></div>
      <div class="si-lime__approach-copy">
        <p>Rather than treating the collection as a product list, the lookbook begins with the places the furniture serves. A quiet, tactile visual language gives the photography room to lead; a contents rail and page-by-page navigation let visitors move between destinations without losing their place.</p>
        <p>Each property pairs a full-bleed room image with a carefully sequenced photographic strip and a walkthrough film. The result keeps the breadth of the collection visible while giving individual spaces their own pace.</p>
      </div>
    </section>
    <section class="si-lime__films" aria-labelledby="si-lime-films-h">
      <div class="si-lime__films-head sd-r">
        <div><p class="si-lime__eyebrow sd-mono">Selected moving image</p><h3 class="sd-h" id="si-lime-films-h">Two ways into the story.</h3></div>
        <p>Film extends the presentation beyond the page: one hospitality piece, and one design story tied to a specific place and project team.</p>
      </div>
      <div class="si-lime__video-grid">
        <figure class="si-lime__video-item si-lime__video-item--wide sd-r">
          <video data-sd-portfolio-video muted loop controls playsinline preload="none" aria-label="Hospitality film featuring the Gold Key Awards 2026 trophy" poster="https://static.wixstatic.com/media/2fde66_92c3b873bac64ded93396fac80810928f000.jpg">
            <source data-src="https://video.wixstatic.com/video/2fde66_92c3b873bac64ded93396fac80810928/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support embedded video. <a href="https://video.wixstatic.com/video/2fde66_92c3b873bac64ded93396fac80810928/720p/mp4/file.mp4">Watch the hospitality film</a>.
          </video>
          <figcaption><span class="sd-mono">Hospitality film</span><b>Gold Key Awards 2026</b><small>Awards-themed moving-image creative.</small></figcaption>
        </figure>
        <figure class="si-lime__video-item si-lime__video-item--portrait sd-r" style="--d:.1s">
          <video data-sd-portfolio-video muted loop controls playsinline preload="none" aria-label="Design Story: Canyon Ranch Austin at Lake Travis, Austin, Texas" poster="https://static.wixstatic.com/media/2fde66_d400201f4da940bdb3dd4f631dd3ca48f000.jpg">
            <source data-src="https://video.wixstatic.com/video/2fde66_d400201f4da940bdb3dd4f631dd3ca48/720p/mp4/file.mp4" type="video/mp4">
            Your browser does not support embedded video. <a href="https://video.wixstatic.com/video/2fde66_d400201f4da940bdb3dd4f631dd3ca48/720p/mp4/file.mp4">Watch the Canyon Ranch Austin design story</a>.
          </video>
          <figcaption><span class="sd-mono">Design story · Canyon Ranch Austin</span><b>Lake Travis · Austin, Texas</b><small>Design: Lake Flato · Guestroom casegoods: Lime Tree</small></figcaption>
        </figure>
      </div>
    </section>
    <section class="si-lime__deliverables sd-r" aria-labelledby="si-lime-deliverables-h">
      <div class="si-lime__deliverables-intro">
        <p class="si-lime__eyebrow sd-mono">The work, in four parts</p>
        <h3 class="sd-h" id="si-lime-deliverables-h">One collection. A connected set of stories.</h3>
      </div>
      <ol class="si-lime__deliverables-list">
        <li><span class="si-lime__index sd-mono">Book</span><div><h4 class="sd-h">Digital lookbook</h4><p>A responsive, interactive presentation with destination navigation, property spreads, image browsing and an in-context film reel.</p></div></li>
        <li><span class="si-lime__index sd-mono">Film</span><div><h4 class="sd-h">Video</h4><p>Moving-image work brings atmosphere and a sense of place to the hospitality story, alongside the lookbook’s property walkthrough films.</p></div></li>
        <li><span class="si-lime__index sd-mono">Social</span><div><h4 class="sd-h">Social media design</h4><p>Social-facing creative carries the collection’s visual language into a format made for sharing. <a href="https://www.instagram.com/p/DefahUJGuQ8/" target="_blank" rel="noopener noreferrer" data-testid="link-limetree-instagram">View Lime Tree on Instagram ${arrow}<span class="sd-sr-only"> (opens in a new tab)</span></a></p></div></li>
        <li><span class="si-lime__index sd-mono">Stories</span><div><h4 class="sd-h">Design stories</h4><p>Project-specific storytelling connects place, design authorship and the furnishings within the guest experience, as seen in the Canyon Ranch Austin example above.</p></div></li>
      </ol>
    </section>
    <details class="si-lime__reader sd-r" data-sd-lookbook>
      <summary class="si-lime__toggle" data-testid="toggle-feature-limetree">
        <span class="si-lime__toggle-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5"/></svg></span>
        <span><b>Explore the complete presentation</b><small>Open the original cover, interactive book and property film reel</small></span>
        <span class="si-lime__toggle-end sd-mono">Reveal lookbook</span>
      </summary>
      <div class="si-lime__embed">
        <template data-sd-lookbook-template><iframe class="si-lime__frame" title="Lime Tree Hospitality Guest Rooms interactive digital lookbook, including cover, book and film reel" srcdoc="${srcdoc}" loading="lazy" allow="fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe></template>
      </div>
    </details>
  </div>
</section>`;
}
