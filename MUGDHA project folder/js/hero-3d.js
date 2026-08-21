/* ============================================
   MUGDHA CONSTRUCTIONS LLP — 3D Hero Canvas
   Lightweight Canvas 2D architectural wireframe
   Gold wireframe on charcoal, 40-60s rotation
   ============================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas) return;

  // Skip on mobile for performance
  const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let angleY = 0;
  const angleX = 0.35;
  let animId = null;
  let isVisible = true;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  // ── Architectural Structure: Modern Building ──
  // A multi-story building with architectural details
  const vertices = [
    // Ground floor base (wider)
    [-1.4, -2.0, -0.9], [1.4, -2.0, -0.9], [1.4, -2.0, 0.9], [-1.4, -2.0, 0.9],
    // Ground floor top
    [-1.4, -1.2, -0.9], [1.4, -1.2, -0.9], [1.4, -1.2, 0.9], [-1.4, -1.2, 0.9],
    // Second floor (slightly recessed)
    [-1.3, -1.2, -0.85], [1.3, -1.2, -0.85], [1.3, -1.2, 0.85], [-1.3, -1.2, 0.85],
    [-1.3, -0.3, -0.85], [1.3, -0.3, -0.85], [1.3, -0.3, 0.85], [-1.3, -0.3, 0.85],
    // Third floor
    [-1.2, -0.3, -0.8], [1.2, -0.3, -0.8], [1.2, -0.3, 0.8], [-1.2, -0.3, 0.8],
    [-1.2, 0.6, -0.8], [1.2, 0.6, -0.8], [1.2, 0.6, 0.8], [-1.2, 0.6, 0.8],
    // Top floor / crown
    [-1.0, 0.6, -0.7], [1.0, 0.6, -0.7], [1.0, 0.6, 0.7], [-1.0, 0.6, 0.7],
    [-1.0, 1.3, -0.7], [1.0, 1.3, -0.7], [1.0, 1.3, 0.7], [-1.0, 1.3, 0.7],
    // Roof crown / parapet
    [-0.7, 1.3, -0.5], [0.7, 1.3, -0.5], [0.7, 1.3, 0.5], [-0.7, 1.3, 0.5],
    [-0.7, 1.6, -0.5], [0.7, 1.6, -0.5], [0.7, 1.6, 0.5], [-0.7, 1.6, 0.5],
    // Spire
    [0, 2.2, 0],
    // Cross braces (left wing)
    [-1.4, -1.6, -0.9], [-1.4, -1.6, 0.9],
    // Cross braces (right wing)
    [1.4, -1.6, -0.9], [1.4, -1.6, 0.9],
    // Window columns front
    [-0.5, -1.2, -0.9], [0.5, -1.2, -0.9],
    [-0.5, 0.6, -0.85], [0.5, 0.6, -0.85],
  ];

  const edges = [
    // Ground floor box
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
    // Ground floor cross braces
    [0, 41], [41, 4], [1, 42], [42, 5],
    [3, 40], [40, 7], [2, 43], [43, 6],
    // Second floor
    [8, 9], [9, 10], [10, 11], [11, 8],
    [12, 13], [13, 14], [14, 15], [15, 12],
    [8, 12], [9, 13], [10, 14], [11, 15],
    // Third floor
    [16, 17], [17, 18], [18, 19], [19, 16],
    [20, 21], [21, 22], [22, 23], [23, 20],
    [16, 20], [17, 21], [18, 22], [19, 23],
    // Top floor
    [24, 25], [25, 26], [26, 27], [27, 24],
    [28, 29], [29, 30], [30, 31], [31, 28],
    [24, 28], [25, 29], [26, 30], [27, 31],
    // Roof crown
    [32, 33], [33, 34], [34, 35], [35, 32],
    [36, 37], [37, 38], [38, 39], [39, 36],
    [32, 36], [33, 37], [34, 38], [35, 39],
    // Spire lines
    [36, 40 - 1], [37, 40 - 1], [38, 40 - 1], [39, 40 - 1],
    // Window column lines (vertical on front face)
    [44, 46], [45, 47],
  ];

  // Fix spire index (vertex 40 = index 40)
  edges[edges.length - 5] = [36, 40];
  edges[edges.length - 4] = [37, 40];
  edges[edges.length - 3] = [38, 40];
  edges[edges.length - 2] = [39, 40];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project(x, y, z) {
    // Add subtle mouse parallax
    const mInfluence = 0.15;
    const mx = mouseX * mInfluence;
    const my = mouseY * mInfluence;

    // Rotate Y (main rotation)
    const cosY = Math.cos(angleY + mx);
    const sinY = Math.sin(angleY + mx);
    let x1 = x * cosY + z * sinY;
    let z1 = -x * sinY + z * cosY;

    // Rotate X (tilt + mouse)
    const tiltAngle = angleX + my * 0.3;
    const cosX = Math.cos(tiltAngle);
    const sinX = Math.sin(tiltAngle);
    let y2 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;

    // Perspective
    const fov = 320;
    const cameraDist = 5.5;
    const scale = fov / (cameraDist + z2);

    return {
      x: width * 0.65 + x1 * scale,  // Offset right to leave space for text
      y: height * 0.48 - y2 * scale,
      z: z2,
      scale: scale,
    };
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Project all vertices
    const projected = vertices.map(v => project(v[0], v[1], v[2]));

    // Sort edges by depth for proper rendering
    const sortedEdges = edges.map(edge => {
      if (edge[0] >= projected.length || edge[1] >= projected.length) return null;
      const p1 = projected[edge[0]];
      const p2 = projected[edge[1]];
      return { p1, p2, avgZ: (p1.z + p2.z) / 2 };
    }).filter(Boolean).sort((a, b) => b.avgZ - a.avgZ);

    // Draw edges
    sortedEdges.forEach(({ p1, p2, avgZ }) => {
      const alpha = Math.max(0.08, Math.min(0.7, 0.9 - avgZ * 0.25));
      const lineWidth = Math.max(0.5, Math.min(1.8, 1.5 - avgZ * 0.15));

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = `rgba(30, 30, 30, ${alpha * 0.55})`;

      // Subtle glow for closer edges
      if (alpha > 0.4) {
        ctx.shadowColor = 'rgba(184, 134, 11, 0.12)';
        ctx.shadowBlur = 4;
      } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
    });

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Draw vertex dots for closer vertices
    projected.forEach(p => {
      const alpha = Math.max(0, Math.min(0.5, 0.6 - p.z * 0.2));
      if (alpha > 0.15) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 134, 11, ${alpha * 0.8})`;
        ctx.fill();
      }
    });

    // Slow rotation: ~50s per full rotation
    if (!prefersReduced) {
      angleY += 0.002094; // 2π / (50s * 60fps)
    }

    if (isVisible) {
      animId = requestAnimationFrame(render);
    }
  }

  // ── Intersection Observer ──
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible && !animId) {
      render();
    } else if (!isVisible && animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }, { threshold: 0.05 });
  observer.observe(canvas.parentElement);

  // ── Mouse Tracking (desktop only) ──
  if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    }, { passive: true });
  }

  // ── Static frame if reduced motion ──
  if (prefersReduced) {
    angleY = 0.5;
    resize();
    // Render a single frame
    const projected = vertices.map(v => project(v[0], v[1], v[2]));
    const sortedEdges = edges.map(edge => {
      if (edge[0] >= projected.length || edge[1] >= projected.length) return null;
      const p1 = projected[edge[0]];
      const p2 = projected[edge[1]];
      return { p1, p2, avgZ: (p1.z + p2.z) / 2 };
    }).filter(Boolean).sort((a, b) => b.avgZ - a.avgZ);

    sortedEdges.forEach(({ p1, p2, avgZ }) => {
      const alpha = Math.max(0.08, Math.min(0.7, 0.9 - avgZ * 0.25));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(201, 147, 42, ${alpha})`;
      ctx.stroke();
    });
    return;
  }

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  resize();
  render();
})();
