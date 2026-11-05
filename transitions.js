/*  *//**
 * ANUSHKA NERKAR — LUXURY MOTION & PHYSICS ENGINE
 * 
 * 1. Aerodynamic Dart Cursor & Trailing Satellite Particle Follower
 * 2. Hypnotic Kinetic Heading Dual-Wave (Zero Layout Shift)
 * 3. 3D Gyroscopic Perspective Card Tilt & Specular Glare
 * 4. Magnetic Interactive Button Attraction
 * 5. Dynamic Ambient Particle Canvas (Stardust Mesh)
 * 6. Cinematic Shutter Page Traversal (Zero Jitter)
 * 7. Kinetic Numerical Counter Gauges
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================================
     1. EXACT REFERENCE AERODYNAMIC DART CURSOR & SATELLITE PARTICLE FOLLOWER
     (Matching Reference Screenshot: Solid Jet-Black Dart + Purple Atmospheric Glow)
     ======================================================================== */
  function initCustomCursor() {
    if (prefersReducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    if (document.querySelector('.aerodynamic-dart-cursor')) return;

    // 1. Primary Aerodynamic Navigation Dart in Signature #c5a059 Champagne Bronze
    const dart = document.createElement('div');
    dart.className = 'aerodynamic-dart-cursor';
    dart.innerHTML = `
      <svg class="dart-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2L10 21L13.2 13.8L21 10.2L3 2Z" 
              fill="#c5a059" 
              stroke="#08090c" 
              stroke-width="1.2" 
              stroke-linejoin="round"/>
      </svg>
    `;

    document.body.appendChild(dart);

    let mouseX = -100, mouseY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dart.style.opacity = '1';
      }
      dart.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    window.addEventListener('scroll', function () {
      if (mouseX >= 0 && mouseY >= 0) {
        dart.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    }, { passive: true });

    window.addEventListener('wheel', function (e) {
      if (typeof e.clientX === 'number' && e.clientX > 0) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dart.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      isVisible = false;
      dart.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      isVisible = true;
      dart.style.opacity = '1';
    });

    // Click micro-burst
    window.addEventListener('mousedown', function (e) {
      dart.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(0.86)`;
      setTimeout(() => {
        dart.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }, 140);
    });

    // Interactive element hover
    document.addEventListener('mouseover', function (e) {
      const interactive = e.target.closest('a, button, .bento-card, .sticky-deck-card, .gallery-tile, .experience-hero-card, .copy-pill-btn, .edu-item');
      if (interactive) {
        dart.classList.add('cursor-active');
      }
    });

    document.addEventListener('mouseout', function (e) {
      const interactive = e.target.closest('a, button, .bento-card, .sticky-deck-card, .gallery-tile, .experience-hero-card, .copy-pill-btn, .edu-item');
      if (interactive && (!e.relatedTarget || !e.relatedTarget.closest('a, button, .bento-card, .sticky-deck-card, .gallery-tile, .experience-hero-card, .copy-pill-btn, .edu-item'))) {
        dart.classList.remove('cursor-active');
      }
    });
  }

  /* ========================================================================
     2. HYPNOTIC KINETIC HEADING WAVE (CLEAN SINGLE-LAYER, ZERO DUPLICATION)
     ======================================================================== */
  function initKineticHeadings() {
    const headings = document.querySelectorAll('.page-main-heading');

    headings.forEach(heading => {
      if (heading.dataset.kineticInitialized) return;
      heading.dataset.kineticInitialized = 'true';

      const originalText = heading.textContent.trim();
      heading.innerHTML = '';

      const words = originalText.split(' ');
      let globalCharIndex = 0;

      words.forEach((word, wordIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';

        const chars = Array.from(word);
        chars.forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.className = 'kinetic-char';
          charSpan.textContent = char;
          charSpan.style.display = 'inline-block';
          charSpan.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), color 0.35s ease, text-shadow 0.35s ease';
          charSpan.style.transitionDelay = `${globalCharIndex * 18}ms`;
          charSpan.style.willChange = 'transform, color';

          wordSpan.appendChild(charSpan);
          globalCharIndex++;
        });

        heading.appendChild(wordSpan);

        if (wordIdx < words.length - 1) {
          heading.appendChild(document.createTextNode(' '));
        }
      });

      heading.addEventListener('mouseenter', () => {
        heading.querySelectorAll('.kinetic-char').forEach(c => {
          c.style.transform = 'translateY(-5px)';
          c.style.color = '#c5a059';
          c.style.textShadow = '0 0 16px rgba(197, 160, 89, 0.5)';
        });
      });

      heading.addEventListener('mouseleave', () => {
        heading.querySelectorAll('.kinetic-char').forEach(c => {
          c.style.transform = 'translateY(0)';
          c.style.color = '';
          c.style.textShadow = '';
        });
      });
    });
  }

  /* ========================================================================
     3. 3D GYROSCOPIC PERSPECTIVE CARD TILT & SPECULAR GLARE
     ======================================================================== */
  function init3DCardTilt() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.bento-card, .stage-deck-card, .sticky-deck-card, .experience-hero-card, .gallery-tile, .contact-card-box, .edu-item');

    cards.forEach(card => {
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      let border = card.querySelector('.card-spotlight-border');
      if (!border) {
        border = document.createElement('div');
        border.className = 'card-spotlight-border';
        card.appendChild(border);
      }

      let bounds = null;
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
        isHovered = true;
        card.style.transition = 'none';
        glare.style.opacity = '1';
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        if (!bounds) bounds = card.getBoundingClientRect();

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const xPercent = (x / bounds.width - 0.5) * 2;
        const yPercent = (y / bounds.height - 0.5) * 2;

        const rotateY = (xPercent * 5.0).toFixed(2);
        const rotateX = (-yPercent * 5.0).toFixed(2);

        if (card.classList.contains('stage-deck-card')) {
          card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        } else if (card.classList.contains('sticky-deck-card')) {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        } else {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.018, 1.018, 1.018)`;
        }

        glare.style.background = `radial-gradient(circle 380px at ${x}px ${y}px, rgba(197, 160, 89, 0.16), transparent 65%)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease, border-color 0.3s ease';
        
        if (card.classList.contains('stage-deck-card')) {
          if (card.classList.contains('is-active')) {
            card.style.transform = 'translateY(0) scale(1)';
          }
        } else if (card.classList.contains('sticky-deck-card')) {
          if (card.classList.contains('is-stacked')) {
            card.style.transform = 'scale(0.965) translateY(-8px)';
          } else {
            card.style.transform = 'scale(1)';
          }
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
        glare.style.opacity = '0';
      });
    });
  }

  /* ========================================================================
     4. MAGNETIC INTERACTIVE BUTTON ATTRACTION
     ======================================================================== */
  function initMagneticButtons() {
    if (prefersReducedMotion || !window.matchMedia('(hover: hover)').matches) return;

    const magnetics = document.querySelectorAll('.btn, .btn-primary, .nav-resume-btn, .bento-filter-btn, .copy-pill-btn, .lightbox-close');

    magnetics.forEach(el => {
      let bounds = null;

      el.addEventListener('mouseenter', () => {
        bounds = el.getBoundingClientRect();
        el.style.transition = 'transform 0.14s ease-out';
      });

      el.addEventListener('mousemove', (e) => {
        if (!bounds) bounds = el.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const dx = (e.clientX - centerX) * 0.32;
        const dy = (e.clientY - centerY) * 0.32;

        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

        const inner = el.querySelector('span, .lbl');
        if (inner) {
          inner.style.display = 'inline-block';
          inner.style.transform = `translate3d(${dx * 0.25}px, ${dy * 0.25}px, 0)`;
        }
      });

      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        el.style.transform = 'translate3d(0, 0, 0)';

        const inner = el.querySelector('span, .lbl');
        if (inner) {
          inner.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          inner.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    });
  }

  /* ========================================================================
     5. DYNAMIC AMBIENT CANVAS (STARDUST MESH)
     ======================================================================== */
  function initAmbientCanvas() {
    if (prefersReducedMotion || document.getElementById('ambient-mesh-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'ambient-mesh-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const nodes = [];
    const count = Math.min(Math.floor((width * height) / 38000), 36);

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.26 + 0.12
      });
    }

    let mouseX = -1000, mouseY = -1000;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function drawMesh() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 125) {
            ctx.strokeStyle = `rgba(197, 160, 89, ${0.11 * (1 - dist / 125)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const mDist = Math.hypot(a.x - mouseX, a.y - mouseY);
        if (mDist < 150) {
          const force = (1 - mDist / 150) * 0.75;
          a.x += (a.x - mouseX) * force * 0.02;
          a.y += (a.y - mouseY) * force * 0.02;
        }

        ctx.fillStyle = `rgba(197, 160, 89, ${a.alpha})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();

        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0) a.x = width;
        if (a.x > width) a.x = 0;
        if (a.y < 0) a.y = height;
        if (a.y > height) a.y = 0;
      }

      requestAnimationFrame(drawMesh);
    }
    requestAnimationFrame(drawMesh);
  }

  /* ========================================================================
     6. CINEMATIC SHUTTER PAGE TRAVERSAL (ZERO JITTER)
     ======================================================================== */
  function initPageTraversal() {
    let curtain = document.querySelector('.page-cinematic-curtain');
    if (!curtain) {
      curtain = document.createElement('div');
      curtain.className = 'page-cinematic-curtain curtain-out';
      document.body.appendChild(curtain);
    }

    requestAnimationFrame(() => {
      curtain.classList.remove('curtain-in');
      curtain.classList.add('curtain-out');

      const main = document.querySelector('main');
      if (main) main.classList.add('reveal-entry');
    });

    document.querySelectorAll('a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http') ||
        link.hasAttribute('download') ||
        link.target === '_blank'
      ) {
        return;
      }

      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        const targetUrl = link.href;

        curtain.classList.remove('curtain-out');
        curtain.classList.add('curtain-in');

        setTimeout(function () {
          window.location.href = targetUrl;
        }, 240);
      });
    });

    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        curtain.classList.remove('curtain-in');
        curtain.classList.add('curtain-out');
      }
    });
  }

  /* ========================================================================
     7. KINETIC NUMERICAL COUNTER GAUGES
     ======================================================================== */
  function initCounterGauges() {
    if (prefersReducedMotion) return;

    const targets = document.querySelectorAll('.card-code, .bracket-num, .spec-line-val, .exp-period-stamp');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    targets.forEach(target => {
      target.style.opacity = '0.85';
      observer.observe(target);
    });
  }

  /* ========================================================================
     INITIALIZATION SUITE
     ======================================================================== */
  function initAll() {
    initCustomCursor();
    initKineticHeadings();
    init3DCardTilt();
    initMagneticButtons();
    initAmbientCanvas();
    initPageTraversal();
    initCounterGauges();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
