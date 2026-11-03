/**
 * ANUSHKA NERKAR — UNIFIED GEN-Z EDITORIAL CONTROLLER
 * 1. Bespoke Fluid Magnetic Cursor (Dual-layer lerped physics)
 * 2. Card Mouse-Spotlight Tracking (--mouse-x, --mouse-y dynamic lighting)
 * 3. Kinetic Typographic Reveal on Page Entry
 * 4. Silky Page Exit / Traverse Fade
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================================
     1. FLUID BESPOKE CURSOR SYSTEM
     ======================================================================== */
  function initCustomCursor() {
    if (prefersReducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    // Check if cursor already exists
    if (document.querySelector('.custom-cursor-dot')) return;

    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    const label = document.createElement('span');
    label.className = 'custom-cursor-label';
    ring.appendChild(label);

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isHovering = false;
    let cursorLabel = '';
    let isVisible = false;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    // Lock cursor to pointer during scroll and wheel events (Zero Lag)
    window.addEventListener('scroll', function () {
      if (mouseX >= 0 && mouseY >= 0) {
        ringX = mouseX;
        ringY = mouseY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
    }, { passive: true });

    window.addEventListener('wheel', function (e) {
      if (typeof e.clientX === 'number' && e.clientX > 0) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
      if (mouseX >= 0 && mouseY >= 0) {
        ringX = mouseX;
        ringY = mouseY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });

    // Snappy lerp loop for outer ring
    function render() {
      ringX += (mouseX - ringX) * 0.45;
      ringY += (mouseY - ringY) * 0.45;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Interactive target delegate
    document.addEventListener('mouseover', function (e) {
      const interactive = e.target.closest('a, button, .sticky-deck-card, .gallery-item-card, .bento-tool-card, .experience-hero-card');
      if (interactive) {
        ring.classList.add('cursor-active');
        if (interactive.closest('.gallery-item-card')) {
          ring.classList.add('cursor-view');
          label.textContent = 'ZOOM';
        } else if (interactive.closest('.sticky-deck-card')) {
          ring.classList.add('cursor-view');
          label.textContent = 'EXPLORE';
        } else {
          ring.classList.remove('cursor-view');
          label.textContent = '';
        }
      }
    });

    document.addEventListener('mouseout', function (e) {
      const interactive = e.target.closest('a, button, .sticky-deck-card, .gallery-item-card, .bento-tool-card, .experience-hero-card');
      if (interactive && (!e.relatedTarget || !e.relatedTarget.closest('a, button, .sticky-deck-card, .gallery-item-card, .bento-tool-card, .experience-hero-card'))) {
        ring.classList.remove('cursor-active', 'cursor-view');
        label.textContent = '';
      }
    });
  }

  /* ========================================================================
     2. DYNAMIC CARD MOUSE SPOTLIGHT (Radial Lighting on Move)
     ======================================================================== */
  function initCardSpotlights() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.sticky-deck-card, .experience-hero-card, .experience-corp-card, .bento-tool-card, .gallery-item-card, .contact-channel-card, .academic-cred-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });
  }

  /* ========================================================================
     3. KINETIC TEXT & COMPONENT REVEAL ON PAGE LOAD
     ======================================================================== */
  function initKineticReveals() {
    // Reveal page headers with staggered kinetic animation
    const introHeading = document.querySelector('.page-main-heading');
    if (introHeading && !introHeading.classList.contains('revealed')) {
      introHeading.classList.add('revealed');
      const text = introHeading.innerHTML.trim();
      // Split into animated line container if not already split
      if (!introHeading.querySelector('.line-mask')) {
        introHeading.innerHTML = `<span class="line-mask"><span class="line-content">${text}</span></span>`;
      }
    }

    // Cascade animate cards and badges
    const revealTargets = document.querySelectorAll('.page-category-tag, .page-main-desc, .experience-hero-card, .sticky-deck-card, .bento-tool-card, .gallery-item-card, .contact-layout');
    revealTargets.forEach(function (el, index) {
      el.style.setProperty('--reveal-delay', `${120 + index * 60}ms`);
      el.classList.add('kinetic-enter');
    });
  }

  /* ========================================================================
     4. SILKY PAGE TRAVERSE (Exit Transition & Link Intercept)
     ======================================================================== */
  function initPageTraverse() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('a[href]').forEach(function (link) {
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

        document.body.classList.add('page-exiting');

        setTimeout(function () {
          window.location.href = targetUrl;
        }, 180);
      });
    });

    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        document.body.classList.remove('page-exiting');
      }
    });
  }

  /* ========================================================================
     INIT ON DOM READY
     ======================================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCustomCursor();
      initCardSpotlights();
      initKineticReveals();
      initPageTraverse();
    });
  } else {
    initCustomCursor();
    initCardSpotlights();
    initKineticReveals();
    initPageTraverse();
  }
})();
