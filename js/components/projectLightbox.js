import { PROJECTS } from "../data/projects.js";

export function renderProjectLightbox() {
  return `
    <div
      class="lightbox-backdrop"
      id="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-hidden="true"
    >
      <div class="lightbox-dialog">
        <div class="lightbox-topbar">
          <div class="lightbox-title-wrap">
            <strong id="lightbox-title">ZAYRA — Project Preview</strong>
            <span id="lightbox-subtitle">Actual Storefront Capture</span>
          </div>

          <div class="lightbox-controls">
            <button type="button" class="icon-btn" id="lightbox-prev" aria-label="Previous screen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button type="button" class="icon-btn" id="lightbox-next" aria-label="Next screen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button type="button" class="icon-btn" id="lightbox-zoom" aria-label="Toggle zoom" aria-pressed="false">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </button>
            <button type="button" class="icon-btn" id="lightbox-close" aria-label="Close preview">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="lightbox-stage" id="lightbox-stage">
          <img id="lightbox-img" src="assets/projects/zayra/zayra-homepage.jpg" alt="ZAYRA preview screen" />
        </div>

        <div class="lightbox-thumbs" id="lightbox-thumbs" aria-label="Project screen selector"></div>
      </div>
    </div>
  `;
}

export function initProjectLightbox() {
  const backdrop = document.getElementById("project-lightbox");
  const titleEl = document.getElementById("lightbox-title");
  const subEl = document.getElementById("lightbox-subtitle");
  const stageEl = document.getElementById("lightbox-stage");
  const imgEl = document.getElementById("lightbox-img");
  const thumbsEl = document.getElementById("lightbox-thumbs");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const zoomBtn = document.getElementById("lightbox-zoom");
  const closeBtn = document.getElementById("lightbox-close");

  let currentSlides = [];
  let currentIdx = 0;
  let lastFocused = null;

  function renderSlide() {
    const slide = currentSlides[currentIdx];
    if (!slide) return;
    if (imgEl) {
      imgEl.src = slide.image;
      imgEl.alt = slide.alt;
    }
    if (titleEl) titleEl.textContent = `${slide.projectTitle} — ${slide.label}`;
    if (subEl) subEl.textContent = `${slide.status} • Screen ${currentIdx + 1} of ${currentSlides.length}`;

    if (thumbsEl) {
      thumbsEl.querySelectorAll(".lightbox-thumb-btn").forEach((b, i) => {
        b.classList.toggle("is-active", i === currentIdx);
      });
    }
  }

  function setZoom(zoomed) {
    if (!stageEl || !zoomBtn) return;
    stageEl.classList.toggle("is-zoomed", zoomed);
    zoomBtn.setAttribute("aria-pressed", String(zoomed));
  }

  function open(projectId, startIndex = 0) {
    const project = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0];
    if (!project || !backdrop) return;

    lastFocused = document.activeElement;
    const statusText = project.liveUrl ? "Live Website" : project.previewStatus;

    currentSlides = [
      ...project.scenes.map((s) => ({
        projectTitle: project.title,
        status: statusText,
        label: s.label,
        image: s.image,
        alt: s.alt,
      })),
      ...project.mobileScenes.map((m) => ({
        projectTitle: project.title,
        status: statusText,
        label: m.label,
        image: m.image,
        alt: m.alt,
      })),
    ];

    currentIdx = Math.max(0, Math.min(startIndex, currentSlides.length - 1));
    setZoom(false);

    if (thumbsEl) {
      thumbsEl.innerHTML = currentSlides
        .map(
          (s, i) =>
            `<button type="button" class="lightbox-thumb-btn" data-lb-idx="${i}">${s.label}</button>`
        )
        .join("");

      thumbsEl.querySelectorAll("[data-lb-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentIdx = Number(btn.dataset.lbIdx);
          setZoom(false);
          renderSlide();
        });
      });
    }

    renderSlide();
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn?.focus();
  }

  function close() {
    if (!backdrop) return;
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  prevBtn?.addEventListener("click", () => {
    currentIdx = (currentIdx - 1 + currentSlides.length) % currentSlides.length;
    setZoom(false);
    renderSlide();
  });

  nextBtn?.addEventListener("click", () => {
    currentIdx = (currentIdx + 1) % currentSlides.length;
    setZoom(false);
    renderSlide();
  });

  zoomBtn?.addEventListener("click", () => {
    const next = !stageEl?.classList.contains("is-zoomed");
    setZoom(next);
  });

  stageEl?.addEventListener("click", () => {
    if (stageEl.classList.contains("is-zoomed")) setZoom(false);
  });

  closeBtn?.addEventListener("click", close);

  backdrop?.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  window.addEventListener("keydown", (e) => {
    if (!backdrop?.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prevBtn?.click();
    if (e.key === "ArrowRight") nextBtn?.click();
  });

  return { open, close };
}
