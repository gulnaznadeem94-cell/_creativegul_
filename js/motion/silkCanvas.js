/**
 * Real-Time Flowing Silk Organza Canvas
 * Draws translucent, multi-layered silk curves in soft lavender and warm beige
 * with subtle pointer and scroll-velocity breeze physics.
 */
export function initSilkCanvas() {
  const canvas = document.getElementById("silk-canvas");
  if (!canvas) return () => {};

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) return () => {};

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = null;
  let time = 0;

  let targetMouseX = 0.5;
  let targetMouseY = 0.35;
  let smoothMouseX = 0.5;
  let smoothMouseY = 0.35;
  let scrollBoost = 0;
  let lastScrollY = window.scrollY;

  const ribbons = [
    {
      yRatio: 0.24,
      amp: 58,
      freq: 0.0022,
      speed: 0.0085,
      phase: 0.3,
      thickness: 170,
      fillTop: "rgba(220, 206, 240, 0.26)",
      fillBottom: "rgba(220, 206, 240, 0.0)",
      edge: "rgba(130, 108, 170, 0.14)",
    },
    {
      yRatio: 0.42,
      amp: 46,
      freq: 0.0018,
      speed: 0.0062,
      phase: 2.1,
      thickness: 200,
      fillTop: "rgba(235, 222, 204, 0.28)",
      fillBottom: "rgba(235, 222, 204, 0.0)",
      edge: "rgba(176, 152, 126, 0.13)",
    },
    {
      yRatio: 0.68,
      amp: 52,
      freq: 0.0025,
      speed: 0.0074,
      phase: 4.0,
      thickness: 150,
      fillTop: "rgba(211, 196, 234, 0.2)",
      fillBottom: "rgba(211, 196, 234, 0.0)",
      edge: "rgba(106, 86, 144, 0.1)",
    },
  ];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function onPointerMove(e) {
    if (width <= 0 || height <= 0) return;
    targetMouseX = e.clientX / width;
    targetMouseY = e.clientY / height;
  }

  function onScroll() {
    const dy = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    scrollBoost = Math.min(scrollBoost + dy * 0.0025, 1.8);
  }

  function drawRibbon(r) {
    const baseY = height * r.yRatio + (smoothMouseY - 0.5) * 44;
    const step = Math.max(28, Math.floor(width / 36));
    const points = [];

    for (let x = -step; x <= width + step * 2; x += step) {
      const distFactor = Math.sin((x / Math.max(width, 1)) * Math.PI);
      const pointerWave = Math.cos((x / Math.max(width, 1) - smoothMouseX) * 5) * 18;
      const y =
        baseY +
        Math.sin(x * r.freq + time * r.speed * 60 + r.phase) * r.amp * (0.65 + 0.5 * distFactor) +
        Math.cos(x * r.freq * 1.6 - time * r.speed * 35) * (r.amp * 0.35) +
        pointerWave;
      points.push({ x, y });
    }

    const grad = ctx.createLinearGradient(0, baseY - r.amp, 0, baseY + r.thickness);
    grad.addColorStop(0, r.fillTop);
    grad.addColorStop(1, r.fillBottom);

    // Translucent silk curtain fill
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) * 0.5;
      const yc = (points[i].y + points[i + 1].y) * 0.5;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y + r.thickness);
    ctx.lineTo(points[0].x, points[0].y + r.thickness);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Selvedge silk edge highlight
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) * 0.5;
      const yc = (points[i].y + points[i + 1].y) * 0.5;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.strokeStyle = r.edge;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function render() {
    if (document.hidden || motionQuery.matches) {
      rafId = null;
      return;
    }

    time += 0.016 + scrollBoost * 0.014;
    scrollBoost *= 0.92;

    smoothMouseX += (targetMouseX - smoothMouseX) * 0.045;
    smoothMouseY += (targetMouseY - smoothMouseY) * 0.045;

    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < ribbons.length; i++) {
      drawRibbon(ribbons[i]);
    }

    rafId = requestAnimationFrame(render);
  }

  function onVisibilityChange() {
    if (!document.hidden && !rafId && !motionQuery.matches) {
      rafId = requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  rafId = requestAnimationFrame(render);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
