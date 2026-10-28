> Source: Snowden-Design `docs/design-direction/Snowden-Design-2-Website-Design-Direction.docx` (25 Oct 2026), converted to plain text. Tables are flattened to one cell per line.

SNOWDEN DESIGN / WIX STUDIO

Snowden Design 2Website Design Direction

A modern, motion-rich portfolio for a Denver digital studio

Prepared for Blake Snowden  |  25 October 2026

The recommended direction

Give Snowden Design a crisp editorial structure with the visual confidence of a high-end digital studio. Let the real work carry the page, use a refined ink-and-aqua palette, and make motion feel deliberate, tactile and fast. Keep the geometric, space-inspired character as a recurring signature rather than a full-page background.

The experience should make the offer clear in seconds: Full Spectrum Strategy, Web Design, Graphics, Digital Art, Video, SEO, User Experience and Social Media, brought together by one creative and technical lead.

DESIGN PRINCIPLES

Lead with the work. Let portfolio imagery and case-study context show the range.

Make breadth feel coherent. Use one clear story across strategy, design, media and development.

Make motion serve the message. Use responsive transitions, visible controls and reduced-motion support.

Make it ownable. Use a precise geometric signature that nods to Blake's earlier Escher-inspired direction.

01 / VISUAL SYSTEM

Color and typography

A compact visual system that feels modern and expressive while keeping long-form reading easy.

Color palette

Keep most page surfaces light and open. Use deep ink for contrast, teal for action and focus, aqua for accents on dark sections, and amber only for small signals.

Color

Hex

Use

Midnight Ink

#0A1D26

Primary dark surface, footer and dark typography

Atlantic

#123440

Secondary dark surface and layered gradients

Studio Teal

#16B3A6

Primary action, links, active states and focus

Glacier Aqua

#7FE0D4

Headline accent and fine motion lines on dark fields

Mist

#EEF3F4

Soft section backgrounds and quiet contrast

Snow

#FAFCFC

Main page background and open negative space

Signal Amber

#F2A93B

Small points, markers and occasional labels

Slate

#4A5F68

Secondary text and supporting descriptions

Use white or dark text only after checking contrast in the final design. Amber should remain a small accent rather than a text color on light backgrounds.

Type system

Role

Wix font and style

Recommended use

Display

Google Sans Flex Variable; upright, medium to heavy

Hero headlines, project titles and brief kinetic type moments. Tune width, optical size, weight and roundness where Wix exposes the variable axes.

Section

Satoshi Bold 700; Medium 500

Section titles, navigation, buttons and project labels. Use Bold for hierarchy and Medium for controls.

Body

Satoshi Regular 400; Light 300 sparingly

Readable paragraphs and project summaries at 16–18 px with generous line height.

Emphasis

Satoshi Italic 400 / Bold Italic 700; Black 900 sparingly

Use italics for short quotes, Bold Italic for brief emphasis and Black for a few compact display words.

Use Satoshi for the reading and interface system. The imported Satoshi family includes Light, Regular, Medium, Bold and Black, with matching italic styles. Use Google Sans Flex for prominent display type; its supplied variable font supports weight 1–1000, width 25–151, optical size 1–144, roundness 0–100 and slant 0 to −10 degrees. Keep body copy upright and readable; reserve variable-axis changes and heavier weights for short display moments.

02 / COMPOSITION

Layouts and imagery

Create a site that feels composed and dimensional without turning every section into a card.

Layout language

Use a 12-column desktop grid with a content width near 1,240 px and fluid side margins.

Create asymmetry through image scale, crop and whitespace: one large project next to two smaller stories, or a portrait beside a short editorial introduction.

Use clear section labels and a technical index sparingly. A quiet number such as 01 or 02 can organize longer pages.

Keep cards for work that needs a preview. Use broad image sections, text-led sections and open grids between them.

Use rounded corners intentionally: approximately 40 px for hero imagery, 28–30 px for project panels and 20 px for smaller controls.

Image direction

Use Blake's real client work as the primary visual material. The portfolio already spans hospitality, food, internet service, ranch and fly-fishing work, which gives the site natural color and subject variety.

Show full-width crops, interface screenshots and video stills in context. Avoid using generic stock imagery as proof of client work.

Give project images room to move. Use a slow, restrained zoom or crop reveal on entry and a small scale shift on hover.

Let each project image tell the visitor what the work is: guest experience, e-commerce, connectivity, outdoor brand or video.

The current portrait image is small. Use it at a modest size or replace it with a new high-resolution portrait before making it a dominant visual.

Use video selectively: muted, compressed, with a strong poster frame and a clear static fallback.

Geometric signature

Bring in the earlier Escher and tessellation interests through a thin technical grid, folded perspective lines or a quietly looping geometric mark. Use these details to connect sections and frame imagery. Keep the main portfolio screenshots and photography unobstructed.

The hero can pair a dark ink surface with a layered set of real project screens and one subtle geometric line motif. A lightweight SVG or CSS construction is the default. A small Three.js interaction is appropriate only if it improves the story and has a static fallback.

Image hover treatment

On hover or keyboard focus, dim the image slightly, reveal the project name and discipline, and move the arrow or caption a few pixels. On touch screens, keep the label visible and make the whole project tile an obvious link.

03 / PAGE EXPERIENCE

The four launch pages

Use one connected visual language with a different job for each page.

Home

Open with a direct statement of the studio’s offer, a short Denver-based introduction, and one primary action. Position Blake’s deep technical understanding of the nuances required to close sophisticated, high-value deals as a core strength, paired with full-spectrum business development strategy for B2B and B2C clients. Show three selected projects, a concise service overview and a simple path from strategy to build.

Make the service range easy to scan: Web Design and Web Development; Graphics, Digital Art and 3D; Video; SEO and GEO; User Experience (UX); Social Media; Marketing Strategy and Digital Marketing; Lead Generation; Project Management; Performance Marketing; Brand Consulting; and Leadership Development.

Provisional lead projects: Helen Falls Lodge, Schultz's Gourmet and Shadow Creek Ranch. Their different subjects give the first portfolio row visual range.

End with the established invitation to prepare for success and a clear way to start a conversation.

Work

Make the portfolio the strongest proof of the studio's range. Use an editorial grid that mixes wide and compact projects; filter by service only if it stays quick to use.

Show current projects: Helen Falls Lodge, Shadow Creek Ranch, Schultz's Gourmet, Pasta Jay's, Mojo Broadband, Edge Internet and Apes Brain.

Give each story a title, client context, work type and concise description. Link to the live project when available.

For deeper case studies, show the brief, the approach and the delivered work. Add outcomes only when Blake has confirmed them.

About

Make the site feel personal and accountable. Introduce Blake as the designer and developer behind Snowden Design, grounded in Denver and comfortable across strategy, web, visual design and media.

Use a refreshed portrait if the page needs a large image.

Keep the story specific and human. Avoid unsupported awards, years, client counts or performance claims.

Contact

Create a simple, calm start to the conversation. Keep the form short and pair it with the existing phone and email details.

Suggested fields: name, email, project type and a short description. Make phone optional.

Use one clear primary action, then provide direct email and phone links for visitors who prefer them.

04 / MOTION

Animation and rollover behavior

Motion should make the site feel alive while keeping work, reading and navigation in control.

Interaction

Recommended behavior

Access and performance

Hero entrance

Reveal the eyebrow, headline, supporting copy and buttons in a short stagger. Rise slightly and sharpen into focus.

Run once. Remove blur and movement under reduced-motion settings.

Project rollover

Scale the image subtly, deepen its overlay, reveal title and work type, and nudge the arrow.

Match the state on keyboard focus. Keep labels visible on touch.

Scroll reveal

Fade and rise section titles, text and image groups as they enter the viewport.

Use IntersectionObserver in Wix embeds; do not depend on the iframe's scroll position.

Image mask

Open the image from a cropped inset while it settles from a slight zoom.

Use only for key images. Preserve visible content when motion is reduced.

Navigation

Use a restrained background or shadow shift as the header becomes sticky.

Keep menu interaction native in Wix so it remains accessible.

Button feedback

Shift the arrow a few pixels and brighten the fill or border.

Keep the action label stable and the tap target at least 44 px.

Capability ticker

Use one slow loop of service terms only if it adds rhythm to Home.

Pause on hover and focus. Replace motion with a static line under reduced motion.

Use opacity and transforms for most transitions, with a calm easing curve such as cubic-bezier(.2,.8,.2,1). Avoid scroll-jacking, continuous parallax across every section, and motion that makes visitors wait before reading.

Modern development tools

CSS custom properties for color, spacing, radius, shadows and motion timing.

CSS Grid and Flexbox for fluid layouts; responsive breakpoints near 1,000, 820 and 600 px.

IntersectionObserver for entrance reveals, plus CSS transitions for hover, focus and menu feedback.

SVG for the geometric signature and fine-line icons; use Three.js/WebGL only for one purposeful, lazy-loaded visual with a static fallback.

Respect prefers-reduced-motion, keyboard focus, semantic links and buttons, image alt text, and large touch targets.

05 / SEO AND GEO

Search visibility and page rank readiness

Treat search visibility as a page-by-page build requirement. Research keyword intent, then map the full service vocabulary to relevant pages. Use phrases naturally in useful copy, headings, case studies and internal links. Do not stuff keywords into copy or rely on a meta-keywords tag; Google says it does not use that tag.

Page

Search intent

Initial keyword themes

Home

Find a Denver creative and technical partner

Denver web design; web developer Denver; digital and business development strategy

Work

Evaluate relevant project experience

Denver web design portfolio; UX; branding; graphics; digital art; 3D; video; SEO and GEO

About

Verify who Blake Snowden is and what he does

Blake Snowden designer and developer; Snowden Design Denver; B2B and B2C strategy

Contact

Start a project conversation

hire a web designer in Denver; web development and digital marketing consultation

Technical and content checklist

Set a distinct title, concise meta description, one descriptive H1, logical H2s, readable URL, appropriate robots directive, Open Graph title/description/image and a self-referencing canonical for every page. Confirm staging noindex rules do not carry into launch.

Give every informative portfolio image a descriptive filename and useful alt text that describes the image in context; add captions or descriptions when they explain the work. Use empty alt text for decorative graphics and never keyword-stuff alt attributes.

Add accurate JSON-LD for Blake and Snowden Design, the business and its services where appropriate. Keep name, Denver service area and contact details consistent. Validate structured data and page access; include only facts visible on the page.

Keep important headings and copy in native Wix elements, with crawlable internal links. Check HTTPS, canonical domain, redirects, 404 behavior, robots and sitemap, mobile content parity, image loading and Core Web Vitals.

GEO and performance checks

For AI answer experiences, use the same strong foundation: clear service definitions, factual information about Blake and Snowden Design, original project case studies, visible authorship and contact details, and concise answers to useful client questions. Google recommends effective SEO rather than special GEO hacks. Where available, use Bing Webmaster Tools AI Performance to monitor citations in AI-generated answers.

Before launch, audit each final URL for indexability, canonical, title, description, H1, social metadata, image alt text, structured data, internal links, mobile rendering and performance. Verify the domain in Google Search Console and Bing Webmaster Tools, submit the Wix sitemap, inspect each URL and validate structured data. After indexing, track queries, impressions, clicks, click-through rate, average position, indexing issues and AI citations; recheck after recrawling and keep a monthly record.

Search position cannot be guaranteed. The audit confirms technical readiness and establishes a baseline for measuring real results after search engines crawl and index the new pages.

06 / WIX DELIVERY

Build plan and review checklist

The design should fit the existing Wix Studio workflow and be easy to update and publish.

Wix page structure

Create Home, Work, About and Contact as native Wix pages with a native site header, navigation, footer and contact form.

Use HTML embeds for self-contained visual sections that need custom motion, art direction or layered imagery.

Put the key page title, introductory copy, metadata and structured SEO content in native Wix elements and page settings.

Keep each embed self-contained, class-prefixed with .sd-, and free of preview or copy-code controls.

Measure the rendered embed height at desktop, tablet and phone widths. Use Wix-hosted image URLs and optimize large media.

Implementation sequence

Confirm this visual direction and the launch page list.

Review the existing Home draft, revise its copy and confirm the first three featured projects.

Build Work, About and Contact as separate reviewable page tasks.

Add pages and embeds in the separate Snowden Design 2 Wix Studio site.

Review desktop, tablet and phone layouts, then publish the site once the full set is ready.

Review before launch

Can a new visitor understand what Snowden Design does from the first screen?

Does each project show real work and a factual description?

Do rollover details also work with keyboard focus and touch?

Are page titles, links, images, forms and direct contact actions clear?

Do all sections remain readable with reduced motion and on a narrow phone?

Are titles, metadata and key copy present in native Wix elements?

Does the new site feel unmistakably like Blake while staying focused on the work?

Decisions for Blake

Review the primary visual direction, approve or revise the existing Home draft, choose the featured projects, confirm the core service priorities and decide whether the current portrait should be replaced before About is built.
