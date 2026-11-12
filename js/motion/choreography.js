/**
 * Creative Gul — Cinematic GSAP + ScrollTrigger Choreography
 * Handles hero opening reveals, 3D plinth tilt, scroll-scrubbed runway glide,
 * curtain image wipes, word-by-word editorial focus, and timeline drawing.
 */
export function initChoreography() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  // Interactive non-scroll pointer/hover treatments work cleanly either way
  initInteractiveOpticalTreatments(reducedMotion);

  if (reducedMotion || !gsap || !ScrollTrigger) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    // 1. Hero Opening Choreography (safe from-animations preserving instant first paint fallback)
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl
      .from(".hero-meta-row", { y: 18, opacity: 0, duration: 0.75 })
      .from(".title-line-inner", { yPercent: 112, duration: 1.05, stagger: 0.11 }, "-=0.45")
      .from(".hero-subheading", { y: 24, opacity: 0, duration: 0.85 }, "-=0.65")
      .from(".hero-supporting", { y: 18, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-cta-row", { y: 18, opacity: 0, duration: 0.75 }, "-=0.55")
      .from(".hero-plinth", { y: 36, scale: 0.96, opacity: 0, duration: 1.15 }, 0.15)
      .from(".hero-floating-swatch, .hero-floating-index", {
        y: 16,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
      }, "-=0.55");

    // Subtle slow luxury breathing zoom on hero still-life
    gsap.to(".hero-frame-img", {
      scale: 1.09,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Hero parallax depth as visitor scrolls down
    gsap.to(".hero-plinth", {
      y: -38,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 2. Editorial Campaign Band Continuous Drift
    const ticker = document.querySelector(".campaign-track");
    if (ticker) {
      gsap.to(ticker, {
        xPercent: -50,
        duration: 34,
        ease: "none",
        repeat: -1,
      });
    }

    // 3. About Section — Curtain Wipe + Opposing Image Parallax + Word Focus
    gsap.fromTo(
      ".about-frame",
      { clipPath: "inset(14% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-frame",
          start: "top 82%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".about-img",
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".section-about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    const manifestoWords = gsap.utils.toArray(".about-manifesto .word");
    if (manifestoWords.length) {
      gsap.fromTo(
        manifestoWords,
        { color: "#9C94A8" },
        {
          color: "#1C1A21",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-manifesto",
            start: "top 82%",
            end: "bottom 48%",
            scrub: true,
          },
        }
      );
    }

    // 4. Services Rows Staggered Entrance
    gsap.from(".service-item", {
      y: 26,
      opacity: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-list",
        start: "top 82%",
        once: true,
      },
    });

    // 5. ZAYRA Featured Project — Horizontal Product-Advertising Runway Scrub
    const runwayTrack = document.querySelector(".runway-track");
    if (runwayTrack) {
      gsap.to(runwayTrack, {
        x: () => -(Math.max(0, runwayTrack.scrollWidth - runwayTrack.parentElement.clientWidth) * 0.68),
        ease: "none",
        scrollTrigger: {
          trigger: ".runway-viewport",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });
    }

    // Floating Dual Mobile Previews with Opposing Depth Parallax
    gsap.fromTo(
      ".phone-frame-primary",
      { y: 26 },
      {
        y: -26,
        ease: "none",
        scrollTrigger: {
          trigger: ".zayra-mobile-row",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".phone-frame-offset",
      { y: -24 },
      {
        y: 24,
        ease: "none",
        scrollTrigger: {
          trigger: ".zayra-mobile-row",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // 6. Creative Process — SVG Silk Thread Draw + Step Entrance
    const threadPath = document.querySelector(".process-thread-path");
    if (threadPath && typeof threadPath.getTotalLength === "function") {
      const len = threadPath.getTotalLength();
      gsap.set(threadPath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(threadPath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-timeline-wrap",
          start: "top 78%",
          end: "bottom 58%",
          scrub: 0.6,
        },
      });
    }

    gsap.from(".process-step", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".process-grid",
        start: "top 82%",
        once: true,
      },
    });

    // 7. Contact & Footer Smooth Transitions
    gsap.from(".contact-composer", {
      y: 32,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".section-contact",
        start: "top 78%",
        once: true,
      },
    });

    gsap.from(".footer-reveal", {
      y: 24,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 88%",
        once: true,
      },
    });
  });

  return () => ctx.revert();
}

function initInteractiveOpticalTreatments(reducedMotion) {
  // Hero 3D Plinth Smooth Tilt + Sheen Tracking
  const heroStage = document.querySelector(".hero-visual-stage");
  const plinth = document.querySelector(".hero-plinth");
  if (heroStage && plinth && !reducedMotion) {
    let targetRx = 0;
    let targetRy = 0;
    let curRx = 0;
    let curRy = 0;
    let animFrame = null;

    const tickTilt = () => {
      curRx += (targetRx - curRx) * 0.08;
      curRy += (targetRy - curRy) * 0.08;
      plinth.style.transform = `rotateX(${curRx.toFixed(2)}deg) rotateY(${curRy.toFixed(2)}deg)`;
      if (Math.abs(targetRx - curRx) > 0.02 || Math.abs(targetRy - curRy) > 0.02) {
        animFrame = requestAnimationFrame(tickTilt);
      } else {
        animFrame = null;
      }
    };

    heroStage.addEventListener("pointermove", (e) => {
      const rect = heroStage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      targetRy = (nx - 0.5) * 7;
      targetRx = (0.5 - ny) * 6;
      plinth.style.setProperty("--sheen-x", `${(nx * 100).toFixed(1)}%`);
      plinth.style.setProperty("--sheen-y", `${(ny * 100).toFixed(1)}%`);
      if (!animFrame) animFrame = requestAnimationFrame(tickTilt);
    });

    heroStage.addEventListener("pointerleave", () => {
      targetRx = 0;
      targetRy = 0;
      if (!animFrame) animFrame = requestAnimationFrame(tickTilt);
    });
  }

  // Service 02 Optical Caustic Light Tracking
  const serviceStage = document.querySelector(".service-stage");
  const causticOverlay = document.querySelector(".caustic-overlay");
  if (serviceStage && causticOverlay && !reducedMotion) {
    serviceStage.addEventListener("pointermove", (e) => {
      const rect = serviceStage.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      causticOverlay.style.setProperty("--caustic-x", `${px.toFixed(1)}%`);
      causticOverlay.style.setProperty("--caustic-y", `${py.toFixed(1)}%`);
    });
  }
}
