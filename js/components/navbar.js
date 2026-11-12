import { SITE_CONFIG } from "../data/siteConfig.js";

export function renderNavbar() {
  const navItems = SITE_CONFIG.navLinks
    .map(
      (item) =>
        `<li><a class="nav-link" href="${item.href}" data-nav-link>${item.label}</a></li>`
    )
    .join("");

  const mobileItems = SITE_CONFIG.navLinks
    .map(
      (item, idx) => `
      <a class="mobile-drawer-link" href="${item.href}" data-mobile-link>
        <span>${item.label}</span>
        <span class="idx">0${idx + 1}</span>
      </a>`
    )
    .join("");

  return `
    <header class="site-header" id="site-header">
      <div class="container nav-inner">
        <a href="#top" class="brand-mark" aria-label="Creative Gul Home">
          <span class="brand-dot" aria-hidden="true"></span>
          <span>${SITE_CONFIG.brandName}</span>
        </a>

        <nav aria-label="Primary Navigation">
          <ul class="nav-links">${navItems}</ul>
        </nav>

        <div class="nav-actions">
          <a
            class="nav-ig-pill"
            href="${SITE_CONFIG.instagramUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Creative Gul on Instagram ${SITE_CONFIG.instagramHandle}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>${SITE_CONFIG.instagramHandle}</span>
          </a>

          <button
            type="button"
            class="nav-menu-toggle"
            id="mobile-menu-toggle"
            aria-expanded="false"
            aria-controls="mobile-drawer"
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
      <div class="mobile-drawer-links">${mobileItems}</div>
      <div class="mobile-drawer-footer">
        <span class="eyebrow">Instagram</span>
        <a
          href="${SITE_CONFIG.instagramUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          <span>Follow ${SITE_CONFIG.instagramHandle}</span>
        </a>
      </div>
    </div>
  `;
}

export function initNavbar() {
  const header = document.getElementById("site-header");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const mobileLinks = Array.from(document.querySelectorAll("[data-mobile-link]"));

  const updateScrollState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 28);
  };
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const setDrawerOpen = (open) => {
    if (!drawer || !toggleBtn) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    toggleBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener("click", () => {
      const next = toggleBtn.getAttribute("aria-expanded") !== "true";
      setDrawerOpen(next);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => setDrawerOpen(false));
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        setDrawerOpen(false);
        toggleBtn.focus();
      }
    });
  }

  // IntersectionObserver active nav highlight
  const sections = ["about", "services", "work", "process", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = `#${entry.target.id}`;
            navLinks.forEach((l) => {
              l.classList.toggle("is-active", l.getAttribute("href") === href);
            });
          }
        });
      },
      { rootMargin: "-42% 0px -48% 0px" }
    );
    sections.forEach((sec) => observer.observe(sec));
  }
}
