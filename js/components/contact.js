import { SITE_CONFIG } from "../data/siteConfig.js";

export function renderContact() {
  const whatsappHref =
    !SITE_CONFIG.whatsapp.isPlaceholder && SITE_CONFIG.whatsapp.number
      ? `https://wa.me/${SITE_CONFIG.whatsapp.number}`
      : "#contact-composer";

  const emailHref =
    !SITE_CONFIG.email.isPlaceholder && SITE_CONFIG.email.address
      ? `mailto:${SITE_CONFIG.email.address}`
      : "#contact-composer";

  return `
    <section class="section-contact" id="contact" aria-labelledby="contact-heading">
      <div class="container contact-grid">
        <div>
          <span class="eyebrow">Collaborations &amp; Inquiries</span>
          <h2 class="contact-heading" id="contact-heading" style="margin-top: 0.75rem;">
            Have a Brand in Mind? <em>Let's Build Something Beautiful.</em>
          </h2>
          <p class="contact-subcopy">
            Whether you are imagining a luxury e-commerce concept, an AI-powered web experience,
            or calm brand automation, reach out directly through the channels below.
          </p>

          <div class="contact-channels">
            <a
              class="channel-card"
              href="${SITE_CONFIG.instagramUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <span class="channel-label">Instagram</span>
                <span class="channel-value">${SITE_CONFIG.instagramHandle}</span>
              </div>
              <span class="channel-badge">Open Instagram ↗</span>
            </a>

            <a
              class="channel-card"
              href="${whatsappHref}"
              ${whatsappHref.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : 'data-placeholder-channel="whatsapp"'}
            >
              <div>
                <span class="channel-label">WhatsApp</span>
                <span class="channel-value">${SITE_CONFIG.whatsapp.display}</span>
              </div>
              <span class="channel-badge ${SITE_CONFIG.whatsapp.isPlaceholder ? "is-placeholder" : ""}">
                ${SITE_CONFIG.whatsapp.isPlaceholder ? "Easy Placeholder" : "Message ↗"}
              </span>
            </a>

            <a
              class="channel-card"
              href="${emailHref}"
              ${emailHref.startsWith("mailto:") ? "" : 'data-placeholder-channel="email"'}
            >
              <div>
                <span class="channel-label">Email</span>
                <span class="channel-value">${SITE_CONFIG.email.display}</span>
              </div>
              <span class="channel-badge ${SITE_CONFIG.email.isPlaceholder ? "is-placeholder" : ""}">
                ${SITE_CONFIG.email.isPlaceholder ? "Easy Placeholder" : "Email ↗"}
              </span>
            </a>
          </div>

          <div style="margin-top: 1.75rem;">
            <button type="button" class="btn btn-primary" id="contact-focus-btn">
              <span>Contact Creative Gul</span>
              <svg class="arrow-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div class="contact-composer" id="contact-composer">
          <h3 class="composer-title">Start a Project Brief</h3>
          <p class="composer-sub">
            Prepare a clear project message ready to copy or send via Instagram DM.
          </p>

          <form class="form-grid" id="inquiry-form" novalidate>
            <div class="field-group">
              <label for="inq-name">Your Name</label>
              <input
                id="inq-name"
                name="name"
                type="text"
                class="field-control"
                placeholder="e.g. Sara Khan"
                required
              />
            </div>

            <div class="field-group">
              <label for="inq-focus">Focus Area</label>
              <select id="inq-focus" name="focus" class="field-control">
                <option value="E-commerce Website Development">E-commerce Website Development</option>
                <option value="AI-Powered Website Experience">AI-Powered Website Experience</option>
                <option value="AI Automation Solution">AI Automation Solution</option>
                <option value="AI Tools & Digital Experience">AI Tools &amp; Digital Experience</option>
              </select>
            </div>

            <div class="field-group">
              <label for="inq-message">About Your Brand or Idea</label>
              <textarea
                id="inq-message"
                name="message"
                rows="4"
                class="field-control"
                placeholder="Tell Creative Gul a little about what you'd like to create..."
                required
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              <span>Prepare Inquiry Message</span>
            </button>
          </form>

          <div class="composer-feedback" id="composer-feedback" role="status" aria-live="polite"></div>
        </div>
      </div>
    </section>
  `;
}

export function initContact() {
  const focusBtn = document.getElementById("contact-focus-btn");
  const nameInput = document.getElementById("inq-name");
  const focusSelect = document.getElementById("inq-focus");
  const msgInput = document.getElementById("inq-message");
  const form = document.getElementById("inquiry-form");
  const feedback = document.getElementById("composer-feedback");

  const focusComposer = (noteText) => {
    nameInput?.focus({ preventScroll: false });
    nameInput?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (noteText && feedback) {
      feedback.textContent = noteText;
      feedback.classList.add("is-visible");
    }
  };

  focusBtn?.addEventListener("click", () => {
    focusComposer(null);
  });

  document.querySelectorAll("[data-placeholder-channel]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const channel = link.dataset.placeholderChannel;
      focusComposer(
        `The ${channel === "whatsapp" ? "WhatsApp number" : "email address"} is currently set as a placeholder in js/data/siteConfig.js. Use the brief builder here or reach out directly on Instagram ${SITE_CONFIG.instagramHandle}.`
      );
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput?.value.trim() || "";
    const focus = focusSelect?.value || "Website Experience";
    const msg = msgInput?.value.trim() || "";

    if (!name || !msg) {
      if (feedback) {
        feedback.textContent = "Please enter your name and a short note about your brand or project.";
        feedback.classList.add("is-visible");
      }
      return;
    }

    const compiledBrief = `Hello Creative Gul — I'm ${name}. I'm interested in ${focus}. Project note: ${msg}`;

    if (feedback) {
      feedback.replaceChildren();

      const strong = document.createElement("strong");
      strong.textContent = "Brief prepared:";

      const para = document.createElement("p");
      para.style.marginTop = "0.45rem";
      para.textContent = `"${compiledBrief}"`;

      const actionWrap = document.createElement("div");
      actionWrap.style.marginTop = "0.85rem";

      const igLink = document.createElement("a");
      igLink.href = SITE_CONFIG.instagramUrl;
      igLink.target = "_blank";
      igLink.rel = "noopener noreferrer";
      igLink.className = "btn btn-secondary";
      igLink.style.padding = "0.55rem 1.1rem";
      igLink.style.fontSize = "0.8rem";

      const igSpan = document.createElement("span");
      igSpan.textContent = `Send on Instagram ${SITE_CONFIG.instagramHandle} ↗`;
      igLink.appendChild(igSpan);
      actionWrap.appendChild(igLink);

      feedback.append(strong, para, actionWrap);
      feedback.classList.add("is-visible");

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(compiledBrief)
          .then(() => {
            strong.textContent = "Brief prepared and copied to clipboard:";
          })
          .catch(() => {});
      }
    }
  });
}
