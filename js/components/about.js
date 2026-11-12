export function renderAbout() {
  const manifestoText =
    "An emerging digital creator shaping calm, expressive web experiences where thoughtful design, editorial motion, and practical AI intelligence meet.";

  const wordSpans = manifestoText
    .split(" ")
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  return `
    <section class="section-about" id="about" aria-labelledby="about-heading">
      <div class="container about-grid">
        <div class="about-media-wrap">
          <div class="about-frame">
            <img
              src="assets/editorial/about-atelier.jpg"
              alt="Overhead studio vignette with soft lavender paper swatches, travertine stone, frosted prism, and raw cream silk"
              class="about-img"
              decoding="async"
            />
          </div>
          <div class="about-caption-bar">
            <span>Studio Perspective</span>
            <span>Design × AI Craft</span>
          </div>
        </div>

        <div class="about-content">
          <div>
            <span class="eyebrow">About the Creator</span>
            <h2 class="section-title" id="about-heading" style="margin-top: 0.75rem;">
              A Little About <em>Creative Gul</em>
            </h2>
          </div>

          <p class="about-manifesto">${wordSpans}</p>

          <div class="about-body-columns">
            <p>
              Creative Gul is a digital practice focused on building modern brand websites,
              interactive e-commerce concepts, and AI-powered web experiences that feel warm,
              editorial, and unmistakably human.
            </p>
            <p>
              Every project pairs refined visual direction with intelligent automation—turning
              complex workflows and product stories into fluid digital spaces built for modern
              brands and creators.
            </p>
          </div>

          <div class="about-pillars" aria-label="Core Focus Areas">
            <span class="pillar-chip">AI-Powered Websites</span>
            <span class="pillar-chip">Interactive Web Experiences</span>
            <span class="pillar-chip">AI Automation</span>
            <span class="pillar-chip">Editorial Direction</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
