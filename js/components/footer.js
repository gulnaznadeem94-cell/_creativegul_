import { SITE_CONFIG } from "../data/siteConfig.js";

export function renderFooter() {
  const navLinksHtml = SITE_CONFIG.navLinks
    .map((l) => `<li><a class="footer-nav-link" href="${l.href}">${l.label}</a></li>`)
    .join("");

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-reveal">
            <h2 class="footer-brand-title">${SITE_CONFIG.brandName}</h2>
            <p class="footer-tagline">${SITE_CONFIG.tagline}</p>
          </div>

          <div class="footer-reveal">
            <h3 class="footer-col-heading">Navigation</h3>
            <ul class="footer-nav-list">${navLinksHtml}</ul>
          </div>

          <div class="footer-reveal">
            <h3 class="footer-col-heading">Connect</h3>
            <ul class="footer-nav-list">
              <li>
                <a
                  class="footer-nav-link"
                  href="${SITE_CONFIG.instagramUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: ${SITE_CONFIG.instagramHandle}
                </a>
              </li>
              <li>
                <a class="footer-nav-link" href="#contact">Start a Conversation</a>
              </li>
              <li>
                <a class="footer-nav-link" href="#work">Featured Project — ZAYRA</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom footer-reveal">
          <span>&copy; ${new Date().getFullYear()} ${SITE_CONFIG.brandName}. Digital experiences crafted with clarity &amp; motion.</span>
          <a href="#top" class="back-to-top" aria-label="Back to top">
            <span>Back to Top</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  `;
}
