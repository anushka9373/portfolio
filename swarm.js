/**
 * SWARM TEXT BUILDER & REBUILD ENGINE
 * 
 * [TEMP EXPERIMENTAL MODULE — Revertible at any time]
 * 
 * Behavior:
 * - Sleek, pure SVG arrow cursors in Champagne Bronze (#c5a059)
 * - Geometric selection bounding boxes with corner handles (NO text labels)
 * - Autonomous cursors fly to text targets, draw selection boxes, and type letters live with pulsing carets:
 *     * Center Title: "ANUSHKA NERKAR"
 *     * Top-Left: "Marketing Strategy / Consumer Insights"
 *     * Top-Right: "Dr. D.Y. Patil IMR / Pune, Maharashtra / MBA Marketing"
 *     * Bottom-Left: "Data Meets Strategy. / Market-Tested Impact."
 *     * Bottom-Right: "Direct Email / nerkaranushka73@gmail.com"
 *     * Buttons: Framed and revealed in place
 * - AFTER COMPLETION: All selection boxes and swarm cursors fade out and are completely removed from the DOM.
 *   Only the primary aerodynamic dart cursor remains.
 * - Instant Skip on click or keydown for zero friction.
 */

(function () {
  'use strict';

  // Mark swarm as active globally so index.html legacy intro yields
  window.__SWARM_ENABLED__ = true;

  function initSwarm() {
    if (!document.querySelector('.scene') || !document.querySelector('.copy--tl')) {
      return;
    }

    if (window.__SWARM_RUNNING__) return;
    window.__SWARM_RUNNING__ = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ========================================================================
       INJECT STYLES FOR SWARM ENGINE
       ======================================================================== */
    const styleEl = document.createElement('style');
    styleEl.id = 'swarm-builder-styles';
    styleEl.textContent = `
      #swarm-stage {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 998;
        overflow: hidden;
      }

      /* Clean Swarm Cursor Arrow (Pure pointer, zero badges/labels) */
      .swarm-agent {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        will-change: transform, opacity;
        z-index: 1000;
        transition: opacity 0.35s ease;
        filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.75));
      }

      .swarm-agent-cursor {
        width: 22px;
        height: 22px;
        transform-origin: 3px 3px;
        transition: transform 0.12s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .swarm-agent.clicking .swarm-agent-cursor {
        transform: scale(0.82) rotate(-8deg);
      }

      /* Geometric Selection Bounding Box (Clean Box with corner handles, NO text) */
      .swarm-selection-box {
        position: absolute;
        pointer-events: none;
        border: 1.5px solid #c5a059;
        border-radius: 2px;
        transition: opacity 0.25s ease;
        z-index: 997;
        box-shadow: 0 0 16px rgba(197, 160, 89, 0.18);
        background: rgba(197, 160, 89, 0.04);
      }

      .swarm-selection-handle {
        position: absolute;
        width: 5px;
        height: 5px;
        background: #ffffff;
        border: 1px solid #c5a059;
        border-radius: 1px;
      }

      .swarm-selection-handle.tl { top: -3px; left: -3px; }
      .swarm-selection-handle.tr { top: -3px; right: -3px; }
      .swarm-selection-handle.bl { bottom: -3px; left: -3px; }
      .swarm-selection-handle.br { bottom: -3px; right: -3px; }

      /* Typing Caret */
      .swarm-caret {
        display: inline-block;
        width: 2.5px;
        height: 0.95em;
        vertical-align: -0.1em;
        margin-left: 2px;
        border-radius: 1px;
        background: #c5a059;
        animation: swarmCaretPulse 0.55s infinite ease-in-out;
      }

      @keyframes swarmCaretPulse {
        0%, 100% { opacity: 1; transform: scaleY(1); }
        50% { opacity: 0.15; transform: scaleY(0.9); }
      }

      /* Ensure typed text is visible during intro without mask clipping */
      html.px-intro .title,
      html.px-intro .title span,
      html.px-intro .title-swarm-wrapper,
      html.px-intro .copy,
      html.px-intro .ln,
      html.px-intro .ln>span {
        overflow: visible !important;
        translate: 0 0 !important;
      }
    `;
    document.head.appendChild(styleEl);

    /* ========================================================================
       STAGE & CURSORS
       ======================================================================== */
    const stage = document.createElement('div');
    stage.id = 'swarm-stage';
    document.body.appendChild(stage);

    // 4 builder cursors in signature Champagne Bronze (#c5a059)
    const AGENTS = [
      {
        id: 'agent-1', // Types Title & Buttons
        color: '#c5a059',
        startX: window.innerWidth * 0.15,
        startY: -40
      },
      {
        id: 'agent-2', // Types Top-Left
        color: '#c5a059',
        startX: -40,
        startY: window.innerHeight * 0.2
      },
      {
        id: 'agent-3', // Types Top-Right
        color: '#c5a059',
        startX: window.innerWidth + 40,
        startY: window.innerHeight * 0.2
      },
      {
        id: 'agent-4', // Types Bottom-Left & Bottom-Right
        color: '#c5a059',
        startX: window.innerWidth * 0.85,
        startY: window.innerHeight + 40
      }
    ];

    const agentNodes = {};

    AGENTS.forEach(agent => {
      const el = document.createElement('div');
      el.className = 'swarm-agent';
      el.id = agent.id;
      // Pure clean SVG dart arrow cursor (NO text, NO badge)
      el.innerHTML = `
        <svg class="swarm-agent-cursor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2L18.5 12L11 13.5L8 21L4 2Z" 
                fill="${agent.color}" 
                stroke="#08090c" 
                stroke-width="1.3" 
                stroke-linejoin="round"/>
        </svg>
      `;
      stage.appendChild(el);
      agentNodes[agent.id] = {
        el,
        x: agent.startX,
        y: agent.startY,
        color: agent.color,
        boxEl: null
      };
      updateAgentTransform(agentNodes[agent.id]);
    });

    function updateAgentTransform(node) {
      node.el.style.transform = `translate3d(${node.x.toFixed(1)}px, ${node.y.toFixed(1)}px, 0)`;
    }

    /* ========================================================================
       SELECTION BOUNDING BOX CONTROLLER (Pure Box, Zero Text Labels)
       ======================================================================== */
    function showSelectionBox(agentId, rect) {
      const agent = agentNodes[agentId];
      if (!agent) return;

      if (!agent.boxEl) {
        agent.boxEl = document.createElement('div');
        agent.boxEl.className = 'swarm-selection-box';
        agent.boxEl.innerHTML = `
          <span class="swarm-selection-handle tl"></span>
          <span class="swarm-selection-handle tr"></span>
          <span class="swarm-selection-handle bl"></span>
          <span class="swarm-selection-handle br"></span>
        `;
        stage.appendChild(agent.boxEl);
      }

      const padX = 8;
      const padY = 5;
      const x = rect.left - padX;
      const y = rect.top - padY;
      const w = Math.max(30, rect.width + padX * 2);
      const h = Math.max(18, rect.height + padY * 2);

      agent.boxEl.style.left = `${x}px`;
      agent.boxEl.style.top = `${y}px`;
      agent.boxEl.style.width = `${w}px`;
      agent.boxEl.style.height = `${h}px`;
      agent.boxEl.style.opacity = '1';
    }

    function hideSelectionBox(agentId) {
      const agent = agentNodes[agentId];
      if (agent && agent.boxEl) {
        agent.boxEl.style.opacity = '0';
        const boxToKill = agent.boxEl;
        agent.boxEl = null;
        setTimeout(() => {
          if (boxToKill && boxToKill.parentNode) {
            boxToKill.parentNode.removeChild(boxToKill);
          }
        }, 220);
      }
    }

    /* ========================================================================
       DOM TARGET IDENTIFICATION & STRIPPING
       ======================================================================== */
    const titleEl = document.querySelector('.title');
    const copyTlEl = document.querySelector('.copy--tl');
    const copyTrEl = document.querySelector('.copy--tr');
    const copyBlEl = document.querySelector('.copy--bl');
    const copyBrEl = document.querySelector('.copy--br');
    const ctasEl = document.querySelector('.ctas');

    const TITLE_DATA = [
      { char: 'A', k: 1.5 },
      { char: 'N', k: -3.0 },
      { char: 'U', k: 0.5 },
      { char: 'S', k: 1.5 },
      { char: 'H', k: 1.0 },
      { char: 'K', k: -1.0 },
      { char: 'A', k: -0.5 },
      { char: ' ', k: 2.0 },
      { char: 'N', k: 1.0 },
      { char: 'E', k: -1.0 },
      { char: 'R', k: 0.5 },
      { char: 'K', k: 1.0 },
      { char: 'A', k: -0.5 },
      { char: 'R', k: -0.5 }
    ];

    const TL_LINES = ['Turns creative thinking', 'into meaningful content.'];
    const TR_LINES = ['Dr. D.Y. Patil IMR', 'Pune, Maharashtra', 'MBA Marketing'];
    const BR_LINES = ['Direct Email', 'nerkaranushka73@gmail.com'];

    // Backups for instant restore on abort/reduced motion
    const originalTitleHTML = titleEl ? titleEl.innerHTML : '';
    const originalTlHTML = copyTlEl ? copyTlEl.innerHTML : '';
    const originalTrHTML = copyTrEl ? copyTrEl.innerHTML : '';
    const originalBrHTML = copyBrEl ? copyBrEl.innerHTML : '';

    let isTypingActive = true;

    if (prefersReducedMotion) {
      stage.remove();
      styleEl.remove();
      return;
    }

    // Clean containers for live typing
    if (titleEl) titleEl.innerHTML = '';
    if (copyTlEl) copyTlEl.innerHTML = '';
    if (copyTrEl) copyTrEl.innerHTML = '';
    if (copyBrEl) copyBrEl.innerHTML = '';

    const ctaBtns = ctasEl ? Array.from(ctasEl.querySelectorAll('.btn')) : [];
    ctaBtns.forEach(btn => {
      btn.style.opacity = '0';
      btn.style.transform = 'scale(0.95)';
    });

    /* ========================================================================
       EASING & MOVEMENT
       ======================================================================== */
    function moveAgentTo(agentId, targetX, targetY, duration = 380) {
      return new Promise(resolve => {
        const agent = agentNodes[agentId];
        if (!agent) return resolve();

        const startX = agent.x;
        const startY = agent.y;
        const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

        function step() {
          if (!isTypingActive) return resolve();
          const currentTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(1, elapsed / duration);
          const ease = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

          agent.x = startX + (targetX - startX) * ease;
          agent.y = startY + (targetY - startY) * ease;
          updateAgentTransform(agent);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            agent.x = targetX;
            agent.y = targetY;
            updateAgentTransform(agent);
            resolve();
          }
        }
        requestAnimationFrame(step);
      });
    }

    function clickAgent(agentId) {
      const agent = agentNodes[agentId];
      if (agent) {
        agent.el.classList.add('clicking');
        setTimeout(() => agent.el.classList.remove('clicking'), 110);
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    /* ========================================================================
       TYPING ACTIONS
       ======================================================================== */

    // 1. Center Title: ANUSHKA NERKAR
    async function typeTitle() {
      if (!titleEl || !isTypingActive) return;

      const titleRect = titleEl.getBoundingClientRect();
      const initialTargetX = titleRect.left + (titleRect.width ? titleRect.width * 0.35 : window.innerWidth * 0.35);
      const initialTargetY = titleRect.top + (titleRect.height ? titleRect.height * 0.45 : window.innerHeight * 0.45);

      await moveAgentTo('agent-1', initialTargetX, initialTargetY, 440);
      clickAgent('agent-1');

      const wrapper = document.createElement('span');
      wrapper.className = 'title-swarm-wrapper';
      wrapper.style.display = 'inline-block';
      titleEl.appendChild(wrapper);

      const caret = document.createElement('span');
      caret.className = 'swarm-caret';
      wrapper.appendChild(caret);

      for (let i = 0; i < TITLE_DATA.length; i++) {
        if (!isTypingActive) break;
        const item = TITLE_DATA[i];
        const span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.style.setProperty('--k', item.k);
        span.textContent = item.char === ' ' ? '\u00A0' : item.char;

        wrapper.insertBefore(span, caret);

        // Update clean selection box around the title as it types
        const wrapRect = wrapper.getBoundingClientRect();
        if (wrapRect.width > 20) {
          showSelectionBox('agent-1', wrapRect);
        }

        const caretRect = caret.getBoundingClientRect();
        agentNodes['agent-1'].x = caretRect.right + 3;
        agentNodes['agent-1'].y = caretRect.top + 2;
        updateAgentTransform(agentNodes['agent-1']);

        const delay = item.char === ' ' ? 60 : Math.floor(Math.random() * 14 + 28);
        await sleep(delay);
      }

      caret.remove();
      await sleep(180);
      hideSelectionBox('agent-1');
    }

    // 2. Corner Editorial Lines
    async function typeEditorialLines(agentId, containerEl, lines) {
      if (!containerEl || !isTypingActive) return;

      const initRect = containerEl.getBoundingClientRect();
      const targetX = initRect.left + (initRect.width ? initRect.width * 0.5 : 40);
      const targetY = initRect.top + 10;

      await moveAgentTo(agentId, targetX, targetY, 420);
      clickAgent(agentId);

      containerEl.innerHTML = '';

      for (let l = 0; l < lines.length; l++) {
        if (!isTypingActive) break;
        const lineText = lines[l];
        const lineSpan = document.createElement('span');
        lineSpan.className = 'ln';
        const innerSpan = document.createElement('span');
        lineSpan.appendChild(innerSpan);

        const caret = document.createElement('span');
        caret.className = 'swarm-caret';
        lineSpan.appendChild(caret);

        containerEl.appendChild(lineSpan);

        for (let c = 0; c < lineText.length; c++) {
          if (!isTypingActive) break;
          innerSpan.textContent += lineText[c];

          // Update clean selection box around active container
          const currentRect = containerEl.getBoundingClientRect();
          if (currentRect.width > 10) {
            showSelectionBox(agentId, currentRect);
          }

          const caretRect = caret.getBoundingClientRect();
          if (caretRect.width || caretRect.height) {
            agentNodes[agentId].x = caretRect.right + 2;
            agentNodes[agentId].y = caretRect.top + 1;
            updateAgentTransform(agentNodes[agentId]);
          }

          const delay = lineText[c] === ' ' ? 30 : Math.floor(Math.random() * 10 + 18);
          await sleep(delay);
        }

        caret.remove();
        await sleep(40);
      }

      await sleep(120);
      hideSelectionBox(agentId);
    }

    // 3. CTA Buttons Framing & Reveal
    async function revealButtons() {
      if (!ctasEl || !ctaBtns.length || !isTypingActive) return;

      const b1 = ctaBtns[0];
      const b2 = ctaBtns[1];

      if (b1) {
        const r1 = b1.getBoundingClientRect();
        await moveAgentTo('agent-1', r1.left + r1.width * 0.5, r1.top + r1.height * 0.5, 340);
        clickAgent('agent-1');
        showSelectionBox('agent-1', r1);
        b1.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        b1.style.opacity = '1';
        b1.style.transform = 'scale(1)';
        await sleep(180);
        hideSelectionBox('agent-1');
      }

      if (b2 && isTypingActive) {
        const r2 = b2.getBoundingClientRect();
        await moveAgentTo('agent-2', r2.left + r2.width * 0.5, r2.top + r2.height * 0.5, 340);
        clickAgent('agent-2');
        showSelectionBox('agent-2', r2);
        b2.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        b2.style.opacity = '1';
        b2.style.transform = 'scale(1)';
        await sleep(180);
        hideSelectionBox('agent-2');
      }
    }

    /* ========================================================================
       MASTER SEQUENCE
       ======================================================================== */
    async function runSwarmRebuild() {
      // 1. Center Title
      const titlePromise = typeTitle();

      // 2. Corner Editorial Lines in parallel
      await sleep(150);
      const tlPromise = typeEditorialLines(
        'agent-2',
        copyTlEl,
        TL_LINES
      );

      await sleep(130);
      const trPromise = typeEditorialLines(
        'agent-3',
        copyTrEl,
        TR_LINES
      );

      await sleep(130);
      const brPromise = typeEditorialLines(
        'agent-4',
        copyBrEl,
        BR_LINES
      );

      await Promise.all([titlePromise, tlPromise, trPromise, brPromise]);

      if (isTypingActive) {
        await revealButtons();
      }

      // COMPLETE & DISMISS SWARM COMPLETELY
      finishTyping(false);
    }

    /* ========================================================================
       FINISH & DISMISS SWARM ENTIRELY
       (All selection boxes and swarm cursors fade out and are destroyed)
       ======================================================================== */
    function finishTyping(forced = false) {
      if (!isTypingActive && !forced) return;
      isTypingActive = false;

      // Clean up carets and selection boxes
      document.querySelectorAll('.swarm-caret').forEach(c => c.remove());
      document.querySelectorAll('.swarm-selection-box').forEach(b => b.remove());

      if (forced) {
        if (titleEl) titleEl.innerHTML = originalTitleHTML;
        if (copyTlEl) copyTlEl.innerHTML = originalTlHTML;
        if (copyTrEl) copyTrEl.innerHTML = originalTrHTML;
        if (copyBrEl) copyBrEl.innerHTML = originalBrHTML;
        ctaBtns.forEach(btn => {
          btn.style.opacity = '1';
          btn.style.transform = 'scale(1)';
        });
      }

      document.documentElement.classList.remove('px-intro');

      // Fade out and remove all swarm cursors from DOM
      const agents = document.querySelectorAll('.swarm-agent');
      agents.forEach(agent => {
        agent.style.opacity = '0';
        agent.style.transform += ' scale(0.6)';
        agent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      });

      setTimeout(() => {
        if (stage && stage.parentNode) {
          stage.parentNode.removeChild(stage);
        }
      }, 450);
    }

    // Skip on user click or keypress
    window.addEventListener('click', () => {
      if (isTypingActive) finishTyping(true);
    }, { once: true });

    window.addEventListener('keydown', (e) => {
      if (isTypingActive && (e.key === ' ' || e.key === 'Escape' || e.key === 'Enter')) {
        finishTyping(true);
      }
    }, { once: true });

    setTimeout(runSwarmRebuild, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwarm);
  } else {
    initSwarm();
  }
})();
