import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Camera, Play, Search, X } from "lucide-react";
import "./media-portfolio-sample.css";

type WorkItem = {
  id: string;
  title: string;
  kind: "Film" | "Website preview" | "Photography sample";
  category: "film" | "web" | "photo";
  client: string;
  poster: string;
  src?: string;
  alt: string;
  note: string;
  href?: string;
  wide?: boolean;
};

const media: WorkItem[] = [
  {
    id: "canyon", title: "Canyon Ranch Austin", kind: "Film", category: "film",
    client: "Lime Tree Hospitality · Design story",
    poster: "https://static.wixstatic.com/media/2fde66_d400201f4da940bdb3dd4f631dd3ca48f000.jpg",
    src: "https://video.wixstatic.com/video/2fde66_d400201f4da940bdb3dd4f631dd3ca48/720p/mp4/file.mp4",
    alt: "Canyon Ranch Austin design story film preview",
    note: "An existing design-story film from the Lime Tree Hospitality presentation.",
  },
  {
    id: "awards", title: "Gold Key Awards", kind: "Film", category: "film",
    client: "Lime Tree Hospitality · Film",
    poster: "https://static.wixstatic.com/media/2fde66_92c3b873bac64ded93396fac80810928f000.jpg",
    src: "https://video.wixstatic.com/video/2fde66_92c3b873bac64ded93396fac80810928/720p/mp4/file.mp4",
    alt: "Lime Tree Hospitality Gold Key Awards film preview",
    note: "An existing hospitality film from the Lime Tree presentation.",
  },
  {
    id: "limetree", title: "Lime Tree Hospitality", kind: "Film", category: "film",
    client: "Hospitality · Digital lookbook",
    poster: "https://static.wixstatic.com/media/2fde66_0620b5c631e94bae97312a1c70d4b86df000.jpg",
    src: "https://video.wixstatic.com/video/2fde66_0620b5c631e94bae97312a1c70d4b86d/720p/mp4/file.mp4",
    alt: "Lime Tree Hospitality video preview", note: "A moving-image preview from the Lime Tree Hospitality lookbook.",
    href: "https://snowden-design.wixstudio.com/limetreesocial", wide: true,
  },
  {
    id: "helen-falls", title: "Helen Falls Lodge", kind: "Website preview", category: "web",
    client: "Hospitality · Website",
    poster: "https://static.wixstatic.com/media/11062b_c03c18107aa741d0b13a2c8df3318228f000.jpg",
    src: "https://video.wixstatic.com/video/2fde66_f2e168501b00401ebc86268b0d582a7c/720p/mp4/file.mp4",
    alt: "Helen Falls Lodge website video preview", note: "Website preview film; presented here as a browser-context demonstration.",
    href: "https://www.helenfalls.com/",
  },
  {
    id: "shadow-creek", title: "Shadow Creek Ranch", kind: "Website preview", category: "web",
    client: "Ranch · Website",
    poster: "https://images.squarespace-cdn.com/content/v1/63652eb406ab3052274f9d87/d9388c8e-3eca-4e6e-9dd9-bf36c0b26b92/colors1.png?format=1500w",
    src: "https://video.wixstatic.com/video/2fde66_1321b0fab13042f6a6182391d76cd773/720p/mp4/file.mp4",
    alt: "Shadow Creek Ranch website video preview", note: "Website preview film; not presented as an aerial production credit.",
    href: "https://www.shadowcreekranch.co/",
  },
  {
    id: "edge", title: "Edge Internet", kind: "Website preview", category: "web",
    client: "Broadband · Website",
    poster: "https://static.wixstatic.com/media/87eb36_882dce2320e34252adf91728748e649bf000.jpg",
    src: "https://video.wixstatic.com/video/2fde66_d886db2c5c854f33b4082add08836e7f/720p/mp4/file.mp4",
    alt: "Edge Internet website video preview", note: "A portfolio website preview, shown within a browser frame.",
    href: "https://www.edgeinternet.co/",
  },
  {
    id: "trout", title: "Trout Extravaganza", kind: "Website preview", category: "web",
    client: "Fly fishing · Website",
    poster: "https://static.wixstatic.com/media/2fde66_5dec8a6bf78d4aeebb6247cd23bedac2f000.jpg",
    src: "https://video.wixstatic.com/video/2fde66_934dbed7c2a349469945735238578cbc/720p/mp4/file.mp4",
    alt: "Trout Extravaganza website video preview", note: "Website preview. Explore the project site for the full experience.",
    href: "https://www.troutextravaganza.com/",
  },
  {
    id: "camera", title: "A tool for looking closer", kind: "Photography sample", category: "photo",
    client: "Studio detail · Illustrative still",
    poster: "https://static.wixstatic.com/media/2fde66_97e5a62884cf4bc5bdb59b3480a7d757~mv2.png",
    alt: "Leica Q3 camera with a red grip and lens cap resting on a wooden table",
    note: "Film still / sample layout — an illustrative studio detail, not a photography archive.",
  },
];
// Keep the selected editorial film first without coupling the view to array positions.
media.sort((a, b) => Number(b.id === "limetree") - Number(a.id === "limetree"));

const filters = [
  { id: "all", label: "Everything" },
  { id: "film", label: "Film" },
  { id: "web", label: "Website previews" },
  { id: "photo", label: "Photo sample" },
] as const;

export default function MediaPortfolioSample() {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<WorkItem | null>(null);
  const [lookbookOpen, setLookbookOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const root = import.meta.env.BASE_URL;

  const shown = useMemo(() => media.filter(item => {
    const matchesFilter = filter === "all" || item.category === filter;
    const term = query.trim().toLowerCase();
    return matchesFilter && (!term || `${item.title} ${item.client} ${item.kind}`.toLowerCase().includes(term));
  }), [filter, query]);

  const openMedia = (item: WorkItem) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setActive(item);
  };
  const closeMedia = () => {
    setActive(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  };

  useEffect(() => {
    document.title = "Creative Direction & Media Portfolio Sample | Snowden Design";
    const meta = document.querySelector('meta[name="description"]') ?? document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "A cinematic showcase and filterable media library sample from Snowden Design, an independent creative studio in Denver.");
    if (!meta.parentNode) document.head.appendChild(meta);
    return () => { document.title = "Denver Web Design, 3D & SEO | Snowden Design"; };
  }, []);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMedia();
      if (event.key === "Tab" && modalRef.current) {
        const elements = Array.from(modalRef.current.querySelectorAll<HTMLElement>('button, a[href], video[controls]'));
        if (!elements.length) return;
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active]);

  return (
    <main className="media-sample">
      <header className="ms-nav">
        <a className="ms-wordmark" href={root} aria-label="Snowden Design home"><span className="ms-mark">S</span><span>SNOWDEN<br />DESIGN</span></a>
        <span className="ms-nav-label">Independent creative studio <i /> Denver, Colorado</span>
        <a className="ms-nav-link" href="https://www.snowden-design.com/contact">Start a conversation <ArrowUpRight size={15} /></a>
      </header>

      <section className="ms-hero" aria-labelledby="ms-title">
        <div className="ms-iris" aria-hidden="true"><div /><div /><div /><div /><div /><div /></div>
        <div className="ms-hero-copy">
          <p className="ms-kicker"><span className="ms-dot" /> Creative direction / Denver · everywhere</p>
          <h1 id="ms-title">Creative direction.<br /><em>From every angle.</em></h1>
          <p className="ms-lede">Film, photography, aerial imagery and interactive web—brought into one considered visual world.</p>
          <a className="ms-hero-cta" href="#library">Explore the library <ArrowDown size={16} /></a>
        </div>
        <div className="ms-hero-plate">
          <button type="button" className="ms-hero-image" onClick={() => openMedia(media[0])} aria-label="Open Lime Tree Hospitality film preview">
            <img src={media[0].poster} alt="" fetchPriority="high" />
            <span className="ms-play"><Play size={18} fill="currentColor" /></span>
            <span className="ms-image-stamp">Selected moving image <span>01 / {String(media.length).padStart(2, "0")}</span></span>
          </button>
          <div className="ms-plate-caption"><span>Lime Tree Hospitality</span><span>Film / lookbook preview</span></div>
          <div className="ms-metal-disc" aria-hidden="true"><Camera size={19} /><span>VIEW<br />FINDER</span></div>
        </div>
        <div className="ms-hero-foot"><span>Snowden Design / Media &amp; digital</span><span>01 — 04 / A connected practice</span></div>
      </section>

      <section className="ms-manifesto">
        <div className="ms-section-tag">A connected practice <span>01—04</span></div>
        <div className="ms-manifesto-content">
          <h2>One point of view.<br /><em>Many ways to see it.</em></h2>
          <p>Creative direction gives every frame a reason to be there. A moving image finds its place in the page. A still earns its pause. The interface makes the whole story easy to enter.</p>
        </div>
        <div className="ms-disciplines">
          <span><b>01</b> Film &amp; motion</span><span><b>02</b> Photography</span><span><b>03</b> Aerial imagery</span><span><b>04</b> Interactive web</span>
        </div>
      </section>

      <section id="library" className="ms-library" aria-labelledby="ms-library-title">
        <div className="ms-library-head">
          <div><p className="ms-kicker">The media library / selected examples</p><h2 id="ms-library-title">Different formats.<br /><em>A shared sensibility.</em></h2></div>
          <p className="ms-library-intro">A working sample of ways media can live on the site: in motion, in context, and ready to explore. These are existing portfolio assets—not a claim of an original photography or aerial archive.</p>
        </div>
        <div className="ms-tools">
          <div className="ms-filters" role="group" aria-label="Filter media by category">
            {filters.map(option => <button key={option.id} type="button" className={filter === option.id ? "is-active" : ""} aria-pressed={filter === option.id} onClick={() => setFilter(option.id)} data-testid={`filter-${option.id}`}>{option.label}</button>)}
          </div>
          <label className="ms-search"><Search size={17} /><span className="ms-sr">Search media</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the library" data-testid="input-media-search" /><kbd>⌕</kbd></label>
        </div>
        <p className="ms-count" aria-live="polite">Showing <b>{shown.length}</b> {shown.length === 1 ? "piece" : "pieces"} <span>—</span> {filter === "all" ? "all formats" : filters.find(option => option.id === filter)?.label}</p>
        {shown.length ? <div className="ms-grid">
          {shown.map((item, index) => <article className={`ms-work ${item.wide ? "ms-work--wide" : ""}`} key={item.id} style={{ "--item-index": index } as CSSProperties}>
            <button type="button" className={`ms-work-image ${item.src ? "ms-work-image--video" : ""}`} onClick={() => openMedia(item)} aria-label={`${item.src ? "Play" : "View"} ${item.title}`} data-testid={`open-media-${item.id}`}>
              <img src={item.poster} alt={item.alt} loading="lazy" decoding="async" />
              <span className="ms-work-overlay"><span className="ms-play"><Play size={16} fill="currentColor" /></span><span>{item.src ? "Play preview" : "View still"}</span></span>
              <span className="ms-format">{item.kind}</span>
            </button>
            <div className="ms-work-meta"><div><p className="ms-client">{item.client}</p><h3>{item.title}</h3></div>{item.href && <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.title} website`}>↗</a>}</div>
            <p className="ms-work-note">{item.note}</p>
          </article>)}
        </div> : <div className="ms-empty"><Camera size={22} /><p>No pieces match that search.</p><button type="button" onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters</button></div>}
      </section>

      <section className="ms-context" aria-labelledby="ms-context-title">
        <div className="ms-context-head"><p className="ms-kicker">The work, in its habitat</p><h2 id="ms-context-title">Not just the image.<br /><em>The experience around it.</em></h2><p>A film changes when it belongs to a page. These demonstrations show how the same work can meet someone through an interface—not float alone in a directory.</p></div>
        <article className="ms-browser-demo">
          <div className="ms-browser-bar"><div className="ms-browser-dots"><i /><i /><i /></div><div className="ms-browser-address">snowden-design.com / featured work</div><span className="ms-browser-tag">Website preview</span></div>
          <button type="button" className="ms-browser-screen" onClick={() => openMedia(media[0])} aria-label="Play Lime Tree Hospitality film in website context">
            <img src={media[0].poster} alt="" loading="lazy" />
            <span className="ms-browser-copy"><small>LIME TREE HOSPITALITY</small><strong>Guest rooms,<br />Volume 01.</strong><span>Explore the lookbook <ArrowRight size={15} /></span></span>
            <span className="ms-browser-play"><Play fill="currentColor" size={16} /></span>
          </button>
          <div className="ms-browser-caption"><span>Moving image, placed in a working page composition</span><span>01 / Website + film</span></div>
        </article>
      </section>

      <section className="ms-lookbook" aria-labelledby="ms-lookbook-title">
        <div className="ms-lookbook-copy"><p className="ms-kicker">A digital editorial / Lime Tree Hospitality</p><h2 id="ms-lookbook-title">A collection that<br /><em>reads like a place.</em></h2><p>The existing Lime Tree Hospitality delivery page includes the interactive Guest Rooms lookbook. Open it here to explore the original presentation in context.</p><button type="button" className="ms-outline-button" onClick={() => setLookbookOpen(value => !value)} aria-expanded={lookbookOpen}>{lookbookOpen ? "Close the lookbook" : "Open the interactive lookbook"} <ArrowRight size={16} /></button></div>
        <div className={`ms-lookbook-frame ${lookbookOpen ? "is-open" : ""}`} aria-label="Lime Tree Hospitality lookbook demonstration">
          {lookbookOpen ? <iframe title="Lime Tree Hospitality interactive lookbook delivery page" src={`${root}delivery/interiors/work/si-work-limetree-feature.html`} loading="lazy" /> : <button type="button" onClick={() => setLookbookOpen(true)} aria-label="Load the Lime Tree Hospitality lookbook"><img src={media[0].poster} alt="" loading="lazy" /><span><Play fill="currentColor" size={16} /> Load interactive presentation</span></button>}
        </div>
        <p className="ms-frame-caption">Original interactive delivery preview · loads only when requested</p>
      </section>

      <section className="ms-header-demo" aria-labelledby="ms-header-title">
        <div className="ms-header-copy"><p className="ms-kicker">Website films / header demonstration</p><h2 id="ms-header-title">A website header,<br /><em>with a point of view.</em></h2><p>A wide moving-image composition with room for a headline. This sample uses the supplied Helen Falls website film; a dedicated header edit can replace it as the collection grows.</p><button type="button" className="ms-text-button" onClick={() => openMedia(media.find(item => item.id === "helen-falls")!)}>Play the website film <ArrowRight size={16} /></button></div>
        <div className="ms-browser-demo">
          <div className="ms-browser-bar"><div className="ms-browser-dots"><i /><i /><i /></div><div className="ms-browser-address">Helen Falls / website film</div></div>
          <button type="button" className="ms-browser-screen" onClick={() => openMedia(media.find(item => item.id === "helen-falls")!)} aria-label="Play Helen Falls website header film">
            <img src={media.find(item => item.id === "helen-falls")!.poster} alt="Helen Falls website video poster" loading="lazy" />
            <span className="ms-browser-copy"><small>HEADER COMPOSITION / SAMPLE</small><strong>A sense<br />of place.</strong><span>Watch the film <Play size={14} /></span></span>
          </button>
        </div>
      </section>

      <section className="ms-aerial" aria-labelledby="ms-aerial-title">
        <p className="ms-kicker">Aerial / panoramic presentation study</p>
        <h2 id="ms-aerial-title">Make room for<br /><em>the wider view.</em></h2>
        <p>Drone films deserve an uninterrupted, wide-screen canvas. This layout study uses the supplied Harbour View website video to demonstrate the player; dedicated aerial footage can take its place.</p>
        <video controls playsInline preload="none" poster="https://static.wixstatic.com/media/2fde66_a07f7aa44ef646dd8233075a6292ba43f000.jpg" aria-label="Harbour View website film illustrating a panoramic aerial portfolio layout">
          <source src="https://video.wixstatic.com/video/2fde66_a07f7aa44ef646dd8233075a6292ba43/720p/mp4/file.mp4" type="video/mp4" />
        </video>
        <p className="ms-kicker">Sample media: Harbour View website film · not labeled as a drone production</p>
      </section>

      <footer className="ms-footer"><span>SNOWDEN DESIGN <i /> DENVER, COLORADO</span><a href="https://www.snowden-design.com/contact">Bring the whole brief. Or just the idea. <ArrowUpRight size={15} /></a><span className="ms-footer-note">An independent creative studio</span></footer>

      {active && <div className="ms-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) closeMedia(); }}>
        <div className="ms-modal" role="dialog" aria-modal="true" aria-labelledby="ms-modal-title" ref={modalRef}>
          <div className="ms-modal-head"><div><p className="ms-kicker">{active.kind} / {active.client}</p><h2 id="ms-modal-title">{active.title}</h2></div><button ref={closeRef} type="button" className="ms-close" onClick={closeMedia} aria-label="Close media viewer" data-testid="button-close-media"><X size={20} /></button></div>
          <div className="ms-modal-stage">
            {active.src ? <video key={active.id} controls playsInline preload="metadata" poster={active.poster} aria-label={`${active.title} preview video`}><source src={active.src} type="video/mp4" />Your browser does not support this video.</video> : <img src={active.poster} alt={active.alt} />}
          </div>
          <div className="ms-modal-foot"><p>{active.note}</p>{active.href && <a href={active.href} target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight size={14} /></a>}</div>
        </div>
      </div>}
    </main>
  );
}
