import { SITE_CONFIG } from "../data/siteConfig.js";

export function renderHero() {
  return `
    <section class="section-hero" id="top" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="hero-meta-row">
            <span class="hero-tag">Digital Creative Studio</span>
            <span class="eyebrow">AI &amp; Web Architecture</span>
          </div>

          <h1 class="hero-title" id="hero-title">
            <span class="title-line-mask"><span class="title-line-inner">CREATIVE</span></span>
            <span class="title-line-mask"><span class="title-line-inner">GUL</span></span>
          </h1>

          <p class="hero-subheading">
            Building Digital Experiences with <em>AI &amp; Creativity.</em>
          </p>

          <p class="hero-supporting">
            I create premium websites, intelligent AI-powered experiences and creative digital
            solutions for modern brands.
          </p>

          <div class="hero-cta-row">
            <a href="#work" class="btn btn-primary" data-hero-cta="work">
              <span>Explore My Work</span>
              <svg class="arrow-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <a href="#contact" class="btn btn-secondary" data-hero-cta="contact">
              <span>Let's Work Together</span>
            </a>
          </div>

          <div class="hero-footnote">
            <a href="#about" class="hero-scroll-cue">
              <span class="hero-scroll-line" aria-hidden="true"></span>
              <span>Scroll to Explore</span>
            </a>
            <span>Instagram: ${SITE_CONFIG.instagramHandle}</span>
          </div>
        </div>

        <div class="hero-visual-stage">
          <div class="hero-plinth">
            <div class="hero-frame-window">
              <img
                src="assets/editorial/hero-sculpture.jpg"
                alt="Flowing soft lavender silk chiffon draped over a warm travertine stone arch and frosted glass sphere"
                class="hero-frame-img"
                fetchpriority="high"
              />
              <div class="hero-frame-sheen" aria-hidden="true"></div>
            </div>

            <div class="hero-floating-swatch" aria-hidden="true">
              <div class="swatch-palette-strip">
                <span class="swatch-chip" style="background: #E6DCF4"></span>
                <span class="swatch-chip" style="background: #F6F0E8"></span>
                <span class="swatch-chip" style="background: #FFFFFF"></span>
                <span class="swatch-chip" style="background: #1C1A21"></span>
              </div>
              <span class="swatch-caption">Visual Direction</span>
              <span class="swatch-title">Silk, Stone &amp; Intelligence</span>
            </div>

            <div class="hero-floating-index" aria-hidden="true">
              EDITORIAL • MOTION • AI
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
