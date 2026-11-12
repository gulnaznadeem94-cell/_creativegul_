import { PROJECTS } from "../data/projects.js";

function renderProjectShowcase(project) {
  const hasLiveUrl = Boolean(project.liveUrl && /^https?:\/\//i.test(project.liveUrl));

  const primaryActionBtn = hasLiveUrl
    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
         <span>View Project</span>
         <svg class="arrow-right" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
           <path d="M7 17L17 7M9 7h8v8" />
         </svg>
       </a>`
    : `<button type="button" class="btn btn-primary" data-open-preview="${project.id}" data-scene-index="0">
         <span>View Project Preview</span>
         <svg class="arrow-right" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
           <path d="M5 12h14M13 6l6 6-6 6" />
         </svg>
       </button>`;

  const sceneFramesHtml = project.scenes
    .map(
      (scene, idx) => `
      <div class="campaign-scene-frame ${idx === 0 ? "is-active" : ""}" data-campaign-frame="${idx}">
        <img src="${scene.image}" alt="${scene.alt}" decoding="async" />
      </div>`
    )
    .join("");

  const sceneTabsHtml = project.scenes
    .map(
      (scene, idx) => `
      <button
        type="button"
        class="scene-tab-btn ${idx === 0 ? "is-active" : ""}"
        data-scene-tab="${idx}"
      >
        <span class="scene-tab-num">${scene.step}</span>
        <span class="scene-tab-label">${scene.label}</span>
        <span class="scene-tab-progress" aria-hidden="true"></span>
      </button>`
    )
    .join("");

  const runwayPlatesHtml = project.scenes
    .map(
      (scene, idx) => `
      <button
        type="button"
        class="runway-plate"
        data-open-preview="${project.id}"
        data-scene-index="${idx}"
        aria-label="Inspect ZAYRA ${scene.label} screen"
      >
        <div class="runway-plate-img">
          <img src="${scene.image}" alt="${scene.alt}" decoding="async" />
        </div>
        <div class="runway-plate-meta">
          <span>${scene.label}</span>
          <span class="tag">Scene ${scene.step}</span>
        </div>
      </button>`
    )
    .join("");

  const highlightsHtml = project.highlights
    .map(
      (item) => `
      <div class="highlight-box">
        <strong>${item.title}</strong>
        <span>${item.detail}</span>
      </div>`
    )
    .join("");

  const mobileFramesHtml = project.mobileScenes
    .map((m, idx) => {
      const globalSceneIdx = project.scenes.length + idx;
      const offsetClass = idx === 1 ? "phone-frame-offset" : "phone-frame-primary";
      return `
        <button
          type="button"
          class="phone-frame ${offsetClass}"
          data-open-preview="${project.id}"
          data-scene-index="${globalSceneIdx}"
          aria-label="Inspect ${m.label} preview"
        >
          <div class="phone-frame-screen">
            <img src="${m.image}" alt="${m.alt}" decoding="async" />
          </div>
        </button>`;
    })
    .join("");

  return `
    <article class="featured-project-block" data-project-id="${project.id}">
      <div class="project-hero-header">
        <div>
          <div class="project-badge-row">
            <span class="project-index-pill">${project.number}</span>
            <span class="project-category-pill">${project.category}</span>
            <span class="project-status-pill">${hasLiveUrl ? "Verified Live Website" : project.previewStatus}</span>
          </div>
          <h2 class="project-title" id="work-heading">${project.title}</h2>
        </div>

        <div class="project-description-col">
          <p class="project-description">${project.description}</p>
          <div class="project-actions">
            ${primaryActionBtn}
            <button
              type="button"
              class="btn btn-ghost"
              data-open-preview="${project.id}"
              data-scene-index="0"
            >
              <span>Inspect All Screens</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Cinematic Interactive Campaign Stage -->
      <div class="campaign-stage-shell" data-campaign-stage="${project.id}">
        <div class="campaign-browser-chrome">
          <div class="chrome-dots" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <span class="chrome-route" id="campaign-route-label">${project.scenes[0].route}</span>
          <button
            type="button"
            class="campaign-autoplay-btn"
            id="campaign-autoplay-btn"
            aria-pressed="true"
          >
            Pause Reel
          </button>
        </div>

        <div
          class="campaign-viewport"
          id="campaign-viewport"
          role="button"
          tabindex="0"
          aria-label="Open full-screen ZAYRA campaign screen inspector"
        >
          ${sceneFramesHtml}
        </div>

        <p
          id="campaign-scene-caption"
          style="margin-top: 1rem; font-size: 0.92rem; color: var(--color-ink-secondary);"
        >
          ${project.scenes[0].caption}
        </p>

        <div class="campaign-scene-tabs" role="tablist" aria-label="ZAYRA website preview scenes">
          ${sceneTabsHtml}
        </div>
      </div>

      <!-- Horizontal Product-Advertising Runway Strip -->
      <div>
        <div class="runway-header">
          <span class="eyebrow">Campaign Frame Sequence</span>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-ink-muted);">
            Click any plate to inspect full screen
          </span>
        </div>
        <div class="runway-viewport">
          <div class="runway-track">${runwayPlatesHtml}</div>
        </div>
      </div>

      <!-- Dual Floating Mobile Preview Showcase -->
      <div class="zayra-mobile-row">
        <div class="mobile-story-col">
          <span class="eyebrow">Responsive Experience</span>
          <h3>Designed to drape cleanly across desktop and mobile.</h3>
          <p>
            Every screen in the ZAYRA showcase is captured directly from the working storefront
            concept—preserving real editorial hierarchy, product imagery, and touch-friendly
            purchase flows on smaller viewports.
          </p>
          <div class="zayra-highlights">${highlightsHtml}</div>
        </div>

        <div class="mobile-devices-stage">
          ${mobileFramesHtml}
        </div>
      </div>
    </article>
  `;
}

export function renderFeaturedProjects() {
  const projectsHtml = PROJECTS.map(renderProjectShowcase).join("");

  return `
    <section class="section-work" id="work" aria-labelledby="work-heading">
      <div class="container">
        <div style="margin-bottom: 1.75rem;">
          <span class="eyebrow">Featured Work</span>
        </div>

        ${projectsHtml}

        <div class="future-projects-bar">
          <p>
            <strong>Archive Ready for Upcoming Releases</strong> — Structured to expand seamlessly as
            new client websites, AI storefronts, and digital experiments launch.
          </p>
          <a href="#contact" class="btn btn-secondary">
            <span>Discuss Project 02</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

export function initFeaturedProjects(onOpenLightbox) {
  const project = PROJECTS[0];
  if (!project) return;

  const frames = Array.from(document.querySelectorAll("[data-campaign-frame]"));
  const tabs = Array.from(document.querySelectorAll("[data-scene-tab]"));
  const routeLabel = document.getElementById("campaign-route-label");
  const captionEl = document.getElementById("campaign-scene-caption");
  const viewport = document.getElementById("campaign-viewport");
  const autoplayBtn = document.getElementById("campaign-autoplay-btn");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let isPlaying = !reducedMotion;
  let elapsed = 0;
  const DURATION = 4600;
  let timer = null;

  function setScene(index) {
    activeIndex = (index + project.scenes.length) % project.scenes.length;
    elapsed = 0;

    frames.forEach((f, i) => f.classList.toggle("is-active", i === activeIndex));
    tabs.forEach((t, i) => {
      t.classList.toggle("is-active", i === activeIndex);
      t.style.setProperty("--scene-progress", i === activeIndex && !isPlaying ? "100%" : "0%");
    });

    const scene = project.scenes[activeIndex];
    if (routeLabel) routeLabel.textContent = scene.route;
    if (captionEl) captionEl.textContent = scene.caption;
  }

  function updateAutoplayUI() {
    if (!autoplayBtn) return;
    autoplayBtn.setAttribute("aria-pressed", String(isPlaying));
    autoplayBtn.textContent = isPlaying ? "Pause Reel" : "Play Reel";
  }

  let isVisible = false;

  function startTicker() {
    if (timer) clearInterval(timer);
    if (!isPlaying) {
      tabs[activeIndex]?.style.setProperty("--scene-progress", "100%");
      return;
    }

    timer = setInterval(() => {
      if (document.hidden || !isVisible) return;
      elapsed += 100;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      tabs[activeIndex]?.style.setProperty("--scene-progress", `${pct}%`);
      if (elapsed >= DURATION) {
        setScene(activeIndex + 1);
      }
    }, 100);
  }

  const stageEl = document.querySelector(`[data-campaign-stage="${project.id}"]`);
  if (stageEl && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(stageEl);
  } else {
    isVisible = true;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setScene(Number(tab.dataset.sceneTab));
      startTicker();
    });
  });

  if (autoplayBtn) {
    updateAutoplayUI();
    autoplayBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      updateAutoplayUI();
      startTicker();
    });
  }

  if (viewport) {
    viewport.addEventListener("click", () => {
      if (onOpenLightbox) onOpenLightbox(project.id, activeIndex);
    });
    viewport.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (onOpenLightbox) onOpenLightbox(project.id, activeIndex);
      }
    });
  }

  document.querySelectorAll("[data-open-preview]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = btn.dataset.openPreview;
      const idx = Number(btn.dataset.sceneIndex || 0);
      if (onOpenLightbox) onOpenLightbox(pid, idx);
    });
  });

  setScene(0);
  startTicker();
}
