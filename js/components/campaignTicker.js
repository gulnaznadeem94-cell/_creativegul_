export function renderCampaignTicker() {
  const phrases = [
    "Luxury E-commerce",
    "AI-Powered <em>Web Experiences</em>",
    "Intelligent Automation",
    "Editorial <em>Motion Craft</em>",
    "Modern Brand Storytelling",
  ];

  const renderGroup = () =>
    phrases
      .map(
        (text) => `
        <span class="campaign-item">
          <span>${text}</span>
          <span class="campaign-sep" aria-hidden="true"></span>
        </span>`
      )
      .join("");

  return `
    <div class="campaign-band" aria-hidden="true">
      <div class="campaign-track">
        ${renderGroup()}
        ${renderGroup()}
      </div>
    </div>
  `;
}
