/**
 * ANUSHKA NERKAR — 1-BY-1 CARD FLIGHT & PARTICLE DISSOLVE STAGE ENGINE
 * 
 * Replaces stacked card deck with single-card focus stage.
 * When scrolled or scrubbed, the active card FLIES UP in 3D space and
 * ERUPTS into a cloud of 100+ luminous champagne (#c5a059) particles,
 * while the next card smoothly glides into 100% solid, readable focus.
 */

(function () {
  'use strict';

  function initFlightDeck() {
    const wrapper = document.querySelector('.projects-stage-wrapper');
    const cards = Array.from(document.querySelectorAll('.stage-deck-card'));
    if (!wrapper || !cards.length) return;

    const totalCards = cards.length;
    const hudCounter = document.querySelector('.deck-hud-counter');
    const prevBtn = document.querySelector('.deck-btn-prev');
    const nextBtn = document.querySelector('.deck-btn-next');

    // High-performance Particle Canvas
    let canvas = document.getElementById('deck-flight-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'deck-flight-canvas';
      canvas.style.position = 'fixed';
      canvas.style.inset = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '500';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    let isAnimating = false;

    // Trigger explosive golden particle dissolve cloud
    function triggerParticleDissolve(rect, direction) {
      const count = 105; // 105 luminous champagne particles
      const xStart = Math.max(0, rect.left);
      const xEnd = Math.min(width, rect.right);
      const yCenter = rect.top + rect.height * 0.45;

      for (let i = 0; i < count; i++) {
        const x = xStart + Math.random() * (xEnd - xStart);
        const y = yCenter + (Math.random() - 0.5) * rect.height * 0.7;
        const vy = direction >= 0 
          ? -(Math.random() * 6.5 + 3.0) 
          : (Math.random() * 6.5 + 3.0);

        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 4.2,
          vy: vy,
          size: Math.random() * 3.2 + 1.2,
          alpha: Math.random() * 0.85 + 0.35,
          decay: Math.random() * 0.022 + 0.014,
          color: Math.random() > 0.35 ? '197, 160, 89' : '238, 210, 145'
        });
      }

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(renderParticles);
      }
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < -30 || p.y > height + 30 || p.x < 0 || p.x > width) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha.toFixed(2)})`;
        ctx.shadowColor = 'rgba(197, 160, 89, 0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (particles.length > 0) {
        requestAnimationFrame(renderParticles);
      } else {
        ctx.clearRect(0, 0, width, height);
        isAnimating = false;
      }
    }

    let currentIndex = 0;
    let isTransitioning = false;

    function showCard(newIndex, withParticles = true) {
      if (newIndex < 0 || newIndex >= totalCards) return;
      if (newIndex === currentIndex && cards[currentIndex].classList.contains('is-active')) return;

      const direction = newIndex > currentIndex ? 1 : -1;
      const oldCard = cards[currentIndex];
      const nextCard = cards[newIndex];

      if (oldCard && withParticles) {
        oldCard.classList.add('flying-away');
        oldCard.classList.remove('is-active');
        const rect = oldCard.getBoundingClientRect();
        triggerParticleDissolve(rect, direction);
        setTimeout(() => {
          oldCard.classList.remove('flying-away');
        }, 460);
      } else if (oldCard) {
        oldCard.classList.remove('is-active', 'flying-away');
      }

      currentIndex = newIndex;
      nextCard.classList.add('is-active');

      if (hudCounter) {
        const num = String(currentIndex + 1).padStart(2, '0');
        const total = String(totalCards).padStart(2, '0');
        hudCounter.textContent = `[ ${num} / ${total} ] PRESENTATION STAGE`;
      }
    }

    // Scroll-bound tracking across the runway
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = wrapper.getBoundingClientRect();
          const totalScroll = wrapper.offsetHeight - window.innerHeight;
          const currentScroll = -rect.top;

          if (currentScroll >= 0 && currentScroll <= totalScroll) {
            const rawIndex = (currentScroll / totalScroll) * (totalCards - 1);
            const targetIndex = Math.min(totalCards - 1, Math.max(0, Math.round(rawIndex)));
            if (targetIndex !== currentIndex) {
              showCard(targetIndex, true);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Scrub Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showCard(currentIndex - 1, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showCard(currentIndex + 1, true);
      });
    }

    // Initialize first card
    showCard(0, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFlightDeck);
  } else {
    initFlightDeck();
  }
})();
