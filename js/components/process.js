import { PROCESS_STEPS } from "../data/process.js";

export function renderProcess() {
  const stepsHtml = PROCESS_STEPS.map(
    (step, idx) => `
    <article class="process-step ${idx === 0 ? "is-active" : ""}" data-process-step="${step.number}">
      <div>
        <span class="process-step-num">${step.number}</span>
        <h3 class="process-step-title">${step.title}</h3>
      </div>
      <p class="process-step-desc">${step.description}</p>
    </article>`
  ).join("");

  return `
    <section class="section-process" id="process" aria-labelledby="process-heading">
      <div class="container">
        <div class="section-header-grid">
          <div>
            <span class="eyebrow">How Projects Unfold</span>
            <h2 class="section-title" id="process-heading" style="margin-top: 0.75rem;">
              My Creative <em>Process</em>
            </h2>
          </div>
          <p class="section-lead">
            A structured five-step cadence moving calmly from brand discovery to polished digital
            delivery.
          </p>
        </div>

        <div class="process-timeline-wrap">
          <svg
            class="process-thread-svg"
            viewBox="0 0 1200 36"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 40 18 Q 300 4 600 18 T 1160 18"
              stroke="rgba(28, 26, 33, 0.1)"
              stroke-width="1.5"
            />
            <path
              class="process-thread-path"
              d="M 40 18 Q 300 4 600 18 T 1160 18"
              stroke="#6A5690"
              stroke-width="1.75"
              stroke-linecap="round"
            />
          </svg>

          <div class="process-grid">${stepsHtml}</div>
        </div>
      </div>
    </section>
  `;
}

export function initProcess() {
  const steps = Array.from(document.querySelectorAll("[data-process-step]"));
  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => {
      steps.forEach((s) => s.classList.toggle("is-active", s === step));
    });
    step.addEventListener("focusin", () => {
      steps.forEach((s) => s.classList.toggle("is-active", s === step));
    });
  });
}
