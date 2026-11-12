import { SERVICES } from "../data/services.js";

export function renderServices() {
  const listHtml = SERVICES.map((service, index) => {
    const activeClass = index === 0 ? "is-active" : "";
    const tagsHtml = service.focusTags
      .map((tag) => `<span class="service-tag">${tag}</span>`)
      .join("");

    return `
      <article class="service-item ${activeClass}" data-service-item="${service.id}">
        <button
          type="button"
          class="service-trigger"
          aria-expanded="${index === 0 ? "true" : "false"}"
          aria-controls="service-panel-${service.id}"
          data-service-trigger="${service.id}"
        >
          <span class="service-index">${service.number}</span>
          <span class="service-title">${service.title}</span>
          <span class="service-plus" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 1v10M1 6h10" />
            </svg>
          </span>
        </button>

        <div class="service-panel" id="service-panel-${service.id}">
          <div class="service-panel-inner">
            <div class="service-panel-body">
              <p class="service-desc">${service.description}</p>
              <div class="service-focus-tags">${tagsHtml}</div>
              <div class="service-inline-media">
                <img src="${service.image}" alt="${service.imageAlt}" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  const slidesHtml = SERVICES.map((service, index) => {
    const activeClass = index === 0 ? "is-active" : "";
    let extraOverlay = "";

    if (service.id === "ai-web") {
      extraOverlay = `<div class="caustic-overlay" aria-hidden="true"></div>`;
    } else if (service.id === "ai-automation") {
      extraOverlay = `
        <div class="automation-flow-strip" aria-hidden="true">
          <span class="flow-node"><span class="flow-dot"></span>Trigger</span>
          <span class="flow-line"></span>
          <span class="flow-node"><span class="flow-dot"></span>AI Routing</span>
          <span class="flow-line"></span>
          <span class="flow-node"><span class="flow-dot"></span>Delivery</span>
        </div>
      `;
    } else if (service.id === "ai-tools") {
      extraOverlay = `
        <button
          type="button"
          class="quartz-lens-indicator"
          id="quartz-focus-toggle"
          aria-pressed="false"
        >
          Lens Depth: Standard
        </button>
      `;
    }

    return `
      <div class="stage-slide ${activeClass}" data-service-id="${service.id}">
        <img src="${service.image}" alt="${service.imageAlt}" decoding="async" />
        ${extraOverlay}
      </div>
    `;
  }).join("");

  return `
    <section class="section-services" id="services" aria-labelledby="services-heading">
      <div class="container">
        <div class="section-header-grid">
          <div>
            <span class="eyebrow">Capabilities</span>
            <h2 class="section-title" id="services-heading" style="margin-top: 0.75rem;">
              Crafted Digital <em>Capabilities</em>
            </h2>
          </div>
          <p class="section-lead">
            Four focused disciplines combining luxury visual direction, responsive engineering,
            and intelligent AI systems.
          </p>
        </div>

        <div class="services-layout">
          <div class="services-list" id="services-list">${listHtml}</div>

          <div class="services-stage-wrap">
            <div
              class="service-stage"
              id="service-stage"
              data-treatment="ecommerce"
              data-swatch="beige"
            >
              <div class="stage-meta-top">
                <span id="stage-index-label">01 — Editorial Commerce</span>
                <span id="stage-treatment-label">Studio Palette: Warm Linen</span>
              </div>

              <div class="stage-viewport">${slidesHtml}</div>

              <div class="stage-controls-footer">
                <p class="stage-caption" id="stage-caption">${SERVICES[0].caption}</p>

                <div class="swatch-selector" id="ecommerce-swatches" aria-label="Preview studio backdrop tones">
                  <button
                    type="button"
                    class="swatch-btn is-active"
                    data-stage-swatch="beige"
                    data-label="Warm Linen"
                    aria-label="Warm Linen studio tone"
                  >
                    <span style="background: #F6F0E8"></span>
                  </button>
                  <button
                    type="button"
                    class="swatch-btn"
                    data-stage-swatch="lavender"
                    data-label="Lavender Silk"
                    aria-label="Soft Lavender studio tone"
                  >
                    <span style="background: #E6DCF4"></span>
                  </button>
                  <button
                    type="button"
                    class="swatch-btn"
                    data-stage-swatch="obsidian"
                    data-label="Charcoal Studio"
                    aria-label="Deep Charcoal studio tone"
                  >
                    <span style="background: #242129"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initServices() {
  const items = Array.from(document.querySelectorAll("[data-service-item]"));
  const triggers = Array.from(document.querySelectorAll("[data-service-trigger]"));
  const slides = Array.from(document.querySelectorAll(".stage-slide"));
  const stage = document.getElementById("service-stage");
  const indexLabel = document.getElementById("stage-index-label");
  const treatmentLabel = document.getElementById("stage-treatment-label");
  const captionEl = document.getElementById("stage-caption");
  const swatchesWrap = document.getElementById("ecommerce-swatches");
  const swatchBtns = Array.from(document.querySelectorAll("[data-stage-swatch]"));
  const quartzToggle = document.getElementById("quartz-focus-toggle");

  const treatmentDescriptions = {
    ecommerce: "Studio Palette: Warm Linen",
    "ai-web": "Interactive Caustic Light",
    "ai-automation": "Harmonic Flow Equilibrium",
    "ai-tools": "Optical Depth Inspection",
  };

  function selectService(id) {
    const service = SERVICES.find((s) => s.id === id);
    if (!service) return;

    items.forEach((item) => {
      const isMatch = item.dataset.serviceItem === id;
      item.classList.toggle("is-active", isMatch);
      const btn = item.querySelector("[data-service-trigger]");
      if (btn) btn.setAttribute("aria-expanded", String(isMatch));
    });

    slides.forEach((slide) => {
      slide.classList.toggle("is-active", slide.dataset.serviceId === id);
    });

    if (stage) stage.dataset.treatment = service.treatment;
    if (indexLabel) indexLabel.textContent = `${service.number} — ${service.shortLabel}`;
    if (treatmentLabel) {
      treatmentLabel.textContent =
        service.id === "ecommerce"
          ? `Studio Palette: ${stage?.dataset.swatchLabel || "Warm Linen"}`
          : treatmentDescriptions[service.id];
    }
    if (captionEl) captionEl.textContent = service.caption;
    if (swatchesWrap) {
      swatchesWrap.style.display = service.id === "ecommerce" ? "inline-flex" : "none";
    }
  }

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => selectService(btn.dataset.serviceTrigger));
  });

  swatchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const swatch = btn.dataset.stageSwatch;
      const label = btn.dataset.label;
      swatchBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      if (stage) {
        stage.dataset.swatch = swatch;
        stage.dataset.swatchLabel = label;
      }
      if (treatmentLabel && stage?.dataset.treatment === "ecommerce") {
        treatmentLabel.textContent = `Studio Palette: ${label}`;
      }
    });
  });

  if (quartzToggle) {
    quartzToggle.addEventListener("click", () => {
      const slide = quartzToggle.closest(".stage-slide");
      if (!slide) return;
      const active = slide.classList.toggle("is-focused");
      quartzToggle.setAttribute("aria-pressed", String(active));
      quartzToggle.textContent = active ? "Lens Depth: Macro Focus" : "Lens Depth: Standard";
    });
  }
}
