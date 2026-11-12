/**
 * Creative Gul — Featured Projects Archive
 * Structure is modular so future projects (02, 03, ...) can be appended cleanly.
 * Note: Set `liveUrl` to a verified https:// URL once deployed; when null, UI clearly displays Project Preview mode.
 */
export const PROJECTS = [
  {
    id: "zayra",
    number: "PROJECT 01",
    title: "ZAYRA",
    category: "Luxury Fashion E-commerce",
    subtitle: "Elegance in Every Detail.",
    description:
      "A premium abaya e-commerce website concept designed to deliver an elegant online shopping experience for a modern fashion brand.",
    liveUrl: null,
    previewStatus: "Project Preview — Local Concept Build",
    highlights: [
      {
        title: "Editorial Storefront",
        detail: "Campaign hero, curated collection grids, and fabric storytelling.",
      },
      {
        title: "Full Catalog Filtering",
        detail: "Multi-facet search by collection, weave, length, and silhouette.",
      },
      {
        title: "Detailed Product Views",
        detail: "Color swatches, length sizing (52–60 + Custom), and fit guide.",
      },
      {
        title: "Interactive Shopping Bag",
        detail: "Slide-out bag drawer, bespoke hem notes, and express delivery progress.",
      },
    ],
    scenes: [
      {
        id: "homepage",
        step: "01",
        label: "Homepage",
        route: "zayra.local / #/",
        caption: "Actual ZAYRA homepage featuring full-bleed campaign direction, refined serif typography, and curated navigation.",
        image: "assets/projects/zayra/zayra-homepage.jpg",
        alt: "Actual ZAYRA luxury abaya storefront homepage",
      },
      {
        id: "collection",
        step: "02",
        label: "Collection",
        route: "zayra.local / #/shop",
        caption: "Actual product collection archive with live sidebar filtering across silhouettes, weaves, and collections.",
        image: "assets/projects/zayra/zayra-shop.jpg",
        alt: "Actual ZAYRA product collection shop grid with filters",
      },
      {
        id: "pdp",
        step: "03",
        label: "Product Detail",
        route: "zayra.local / #/product/the-noor-raw-silk-open-abaya",
        caption: "Actual Product Detail Page displaying color swatches, length size selectors, fabric details, and Add to Bag.",
        image: "assets/projects/zayra/zayra-pdp.jpg",
        alt: "Actual ZAYRA product detail page for The Noor Raw Silk Open Abaya",
      },
      {
        id: "interactions",
        step: "04",
        label: "Interactions",
        route: "zayra.local / #cart-drawer",
        caption: "Actual website interactions including the slide-out shopping bag drawer with custom hem notes and delivery threshold.",
        image: "assets/projects/zayra/zayra-interaction-cart.jpg",
        alt: "Actual ZAYRA interactive slide-out shopping bag drawer",
      },
      {
        id: "sizeguide",
        step: "05",
        label: "Size & Fit Guide",
        route: "zayra.local / #/size-guide",
        caption: "Actual interactive Abaya Size & Fit Guide modal with anatomical measurements and bespoke length guidance.",
        image: "assets/projects/zayra/zayra-interaction-sizeguide.jpg",
        alt: "Actual ZAYRA interactive abaya size and fit guide modal",
      },
    ],
    mobileScenes: [
      {
        id: "mobile-home",
        label: "Mobile Storefront",
        image: "assets/projects/zayra/zayra-mobile-home.jpg",
        alt: "Actual ZAYRA mobile homepage responsive preview",
      },
      {
        id: "mobile-pdp",
        label: "Mobile Product View",
        image: "assets/projects/zayra/zayra-mobile-pdp.jpg",
        alt: "Actual ZAYRA mobile product detail view preview",
      },
    ],
  },
];
