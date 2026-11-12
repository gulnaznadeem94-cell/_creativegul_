import { renderNavbar, initNavbar } from "./components/navbar.js";
import { renderHero } from "./components/hero.js";
import { renderCampaignTicker } from "./components/campaignTicker.js";
import { renderAbout } from "./components/about.js";
import { renderServices, initServices } from "./components/services.js";
import { renderFeaturedProjects, initFeaturedProjects } from "./components/featuredProjects.js";
import { renderProcess, initProcess } from "./components/process.js";
import { renderContact, initContact } from "./components/contact.js";
import { renderFooter } from "./components/footer.js";
import { renderProjectLightbox, initProjectLightbox } from "./components/projectLightbox.js";
import { initSilkCanvas } from "./motion/silkCanvas.js";
import { initChoreography } from "./motion/choreography.js";

function mountPortfolio() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    ${renderNavbar()}
    <main id="main-content">
      ${renderHero()}
      ${renderCampaignTicker()}
      ${renderAbout()}
      ${renderServices()}
      ${renderFeaturedProjects()}
      ${renderProcess()}
      ${renderContact()}
    </main>
    ${renderFooter()}
    ${renderProjectLightbox()}
  `;

  initNavbar();
  initServices();
  const lightbox = initProjectLightbox();
  initFeaturedProjects((projectId, sceneIdx) => lightbox.open(projectId, sceneIdx));
  initProcess();
  initContact();

  initSilkCanvas();
  initChoreography();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountPortfolio);
} else {
  mountPortfolio();
}
