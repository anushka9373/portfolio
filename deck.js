/**
 * ANUSHKA NERKAR — INTERACTIVE DECK CONTROLLER
 * Implements tactile card stack physics, keyboard navigation,
 * touch-swipe gestures, and real-time detail synchronization.
 * Adheres to emil-design-eng & diip3sh/feel standards.
 */

const PITCH_DECKS = [
  {
    id: "bfsi-research",
    category: "Market Research",
    code: "RES-01",
    title: "Social Media Marketing in BFSI Sector",
    desc: "Comprehensive research investigating how social platforms impact customer trust and engagement across Indian banking and financial services. Surveyed 100 verified respondents.",
    domain: "BFSI & Consumer Insights",
    mentor: "Mr. Yash Varma",
    period: "Jun 2025 – Aug 2025",
    link: "https://docs.google.com/presentation/d/1rtWTMBBtljiWN82m120YZAV6n-n5CZRc/edit?usp=drivesdk&ouid=113300424746385638965&rtpof=true&sd=true",
    linkType: "Google Docs Presentation",
    metrics: "100 Surveyed Respondents • Trust & Transparency Index"
  },
  {
    id: "multi-brand",
    category: "Strategic Case Study",
    code: "STR-02",
    title: "Multi-Brand Social Media Portfolios",
    desc: "Analytical study examining cross-brand coordination, brand voice integrity, audience interaction protocols, and unified campaign cadence across complex parent enterprises.",
    domain: "Digital Brand Governance",
    mentor: "Mr. Harjeet Singh",
    period: "Academic Year 2025",
    link: "https://docs.google.com/presentation/d/1T_Wfn-y61UQ39D_OtN7pp764jM70dl8C/edit?usp=drivesdk&ouid=113300424746385638965&rtpof=true&sd=true",
    linkType: "Google Docs Presentation",
    metrics: "Multi-Platform Strategy • Content Cadence Framework"
  },
  {
    id: "tanishq",
    category: "Brand Pitch Deck",
    code: "DEC-03",
    title: "Tanishq: Premium Brand Marketing",
    desc: "Strategic brand presentation evaluating jewelry retail positioning, emotional storytelling, festive campaign lifecycles, and high-conversion customer experience.",
    domain: "Luxury Retail & Marketing",
    mentor: "Dr. D.Y. Patil IMR",
    period: "2024–2025",
    link: "https://canva.link/dl4ic0oz3a3hw4m",
    linkType: "Live Canva Presentation",
    metrics: "Visual Pitch Deck • Retail Narrative"
  },
  {
    id: "dmart",
    category: "Retail Analysis",
    code: "DEC-04",
    title: "DMART: Operational & Market Strategy",
    desc: "In-depth presentation covering Avenue Supermarts' cost leadership, everyday low pricing (EDLP), vendor credit cycles, and suburban customer retention models.",
    domain: "FMCG & Modern Trade",
    mentor: "Dr. D.Y. Patil IMR",
    period: "2024–2025",
    link: "https://canva.link/oxl75ki5al0cbjf",
    linkType: "Live Canva Presentation",
    metrics: "Cost Leadership Model • Supply Chain Evaluation"
  },
  {
    id: "kotak-bank",
    category: "Financial Sector",
    code: "DEC-05",
    title: "Kotak Mahindra Bank Strategy",
    desc: "Financial sector analysis evaluating retail banking penetration, 811 digital banking onboarding, asset quality trends, and customer acquisition campaigns.",
    domain: "Banking & FinTech",
    mentor: "Dr. D.Y. Patil IMR",
    period: "2024–2025",
    link: "https://canva.link/i9w7bz95s5g5l7r",
    linkType: "Live Canva Presentation",
    metrics: "Digital Onboarding • Retail Banking Analysis"
  },
  {
    id: "risk-mgmt",
    category: "Corporate Finance",
    code: "FIN-06",
    title: "Enterprise Risk Management Strategies",
    desc: "Analytical deck on modern risk mitigation frameworks, operational risk controls, liquidity management, and compliance structuring for Indian enterprises.",
    domain: "Financial Risk & Governance",
    mentor: "KBC NMU / DY Patil",
    period: "2024–2025",
    link: "https://canva.link/vk8cji1ysezpcu1",
    linkType: "Live Canva Presentation",
    metrics: "Risk Hedging Framework • Compliance Mapping"
  },
  {
    id: "fmcg-sector",
    category: "Industry Analysis",
    code: "IND-07",
    title: "Indian FMCG Sector Landscape",
    desc: "Macro-level evaluation of consumer staples, rural demand resilience, distribution tiering, and digital-first challenger brands in the Indian market.",
    domain: "Consumer Goods & Trade",
    mentor: "Dr. D.Y. Patil IMR",
    period: "2024–2025",
    link: "https://canva.link/02c7lkvbn0820jx",
    linkType: "Live Canva Presentation",
    metrics: "Rural vs Urban Trade • Margin Tiering Analysis"
  },
  {
    id: "pi-food",
    category: "Corporate Deck",
    code: "DEC-08",
    title: "PI Food Ltd: Commercial Strategy",
    desc: "Product portfolio assessment, shelf-life logistics, packaging communication, and consumer segmentation for institutional and retail food lines.",
    domain: "Food Processing & Commercials",
    mentor: "Dr. D.Y. Patil IMR",
    period: "2024–2025",
    link: "https://canva.link/38nmiax37sayhm8",
    linkType: "Live Canva Presentation",
    metrics: "Institutional Distribution • SKU Analysis"
  },
  {
    id: "invest-mango",
    category: "Investment Pitch",
    code: "DEC-09",
    title: "Invest Mango: Advisory Deck",
    desc: "Financial awareness and wealth advisory presentation illustrating diversified investment instruments, SIP strategies, and asset allocation formulas.",
    domain: "Wealth Advisory & Fintech",
    mentor: "Insplore Consultants",
    period: "2025",
    link: "https://canva.link/bldcrdj6iiun1tg",
    linkType: "Live Canva Presentation",
    metrics: "Retail Wealth Planning • Advisory Presentation"
  },
  {
    id: "financial-sectors",
    category: "Sector Deep-Dive",
    code: "FIN-10",
    title: "Structure of Indian Financial Sectors",
    desc: "Systematic breakdown of NBFCs, scheduled commercial banks, mutual fund AMCs, and insurance carriers under RBI and SEBI regulatory architectures.",
    domain: "BFSI Institutional Architecture",
    mentor: "KBC NMU",
    period: "2023–2024",
    link: "https://canva.link/xg1amk1tr6niv67",
    linkType: "Live Canva Presentation",
    metrics: "Regulatory Mapping • NBFC vs Bank Dynamics"
  },
  {
    id: "meridian",
    category: "Corporate Presentation",
    code: "DEC-11",
    title: "Meridian Corporate Operations",
    desc: "Operational deck highlighting business support services, internal reporting hygiene, corporate communications, and stakeholder presentations.",
    domain: "Corporate Management",
    mentor: "Academic Project",
    period: "2024",
    link: "https://canva.link/66dkbghpesnxed4",
    linkType: "Live Canva Presentation",
    metrics: "Process Flow • Operational Communication"
  },
  {
    id: "ojt-internship",
    category: "Field Intelligence",
    code: "REP-12",
    title: "OJT & Industry Field Work Reports",
    desc: "Comprehensive on-the-job training documentation capturing direct client fieldwork, tax auditing routines, and financial product campaign execution.",
    domain: "Field Research & Reporting",
    mentor: "Mrs. Gitanjali Patil",
    period: "2024–2025",
    link: "https://canva.link/g6dr2o1a75vbhll",
    linkType: "Live Canva Presentation",
    metrics: "Field Audit Records • Compliance Verification"
  }
];

class CardDeckEngine {
  constructor() {
    this.currentIndex = 0;
    this.total = PITCH_DECKS.length;
    this.cards = [];
    this.initDOM();
    this.attachEvents();
    this.updateDeckState();
  }

  initDOM() {
    this.stackArea = document.getElementById("deck-stack-area");
    this.counterEl = document.getElementById("deck-counter-num");
    this.totalEl = document.getElementById("deck-counter-total");
    this.prevBtn = document.getElementById("deck-prev-btn");
    this.nextBtn = document.getElementById("deck-next-btn");

    // Detail Pane Elements
    this.paneCategory = document.getElementById("pane-category");
    this.paneTitle = document.getElementById("pane-title");
    this.paneDesc = document.getElementById("pane-desc");
    this.paneDomain = document.getElementById("pane-domain");
    this.paneMentor = document.getElementById("pane-mentor");
    this.paneMetrics = document.getElementById("pane-metrics");
    this.paneLink = document.getElementById("pane-link");
    this.paneQuickView = document.getElementById("pane-quickview");

    if (this.totalEl) this.totalEl.textContent = String(this.total).padStart(2, "0");

    // Render cards into stack
    if (this.stackArea) {
      this.stackArea.innerHTML = "";
      PITCH_DECKS.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "deck-card";
        card.dataset.index = index;
        card.innerHTML = `
          <div class="deck-card-top">
            <span class="deck-card-category">${item.category}</span>
            <span class="deck-card-index">${item.code}</span>
          </div>
          <div class="deck-card-mid">
            <h3 class="deck-card-title">${item.title}</h3>
            <p class="deck-card-desc">${item.desc}</p>
          </div>
          <div class="deck-card-bottom">
            <span class="deck-card-meta">${item.domain}</span>
            <span class="deck-card-action">View Deck &rarr;</span>
          </div>
        `;
        card.addEventListener("click", () => {
          if (this.currentIndex !== index) {
            this.goTo(index);
          } else {
            window.open(item.link, "_blank", "noopener,noreferrer");
          }
        });
        this.stackArea.appendChild(card);
        this.cards.push(card);
      });
    }
  }

  attachEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }

    // Keyboard Arrow Navigation
    window.addEventListener("keydown", (e) => {
      // Check if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        this.next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        this.prev();
      }
    });

    // Touch Swipe Gestures for Mobile
    if (this.stackArea) {
      let touchStartX = 0;
      let touchEndX = 0;
      this.stackArea.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.stackArea.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (diff > 45) {
          this.prev();
        } else if (diff < -45) {
          this.next();
        }
      }, { passive: true });
    }

    if (this.paneQuickView) {
      this.paneQuickView.addEventListener("click", () => {
        const item = PITCH_DECKS[this.currentIndex];
        showModal(item);
      });
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.total;
    this.updateDeckState();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
    this.updateDeckState();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateDeckState();
  }

  updateDeckState() {
    if (this.counterEl) {
      this.counterEl.textContent = String(this.currentIndex + 1).padStart(2, "0");
    }

    this.cards.forEach((card, i) => {
      card.className = "deck-card";
      const relativeOffset = (i - this.currentIndex + this.total) % this.total;

      if (relativeOffset === 0) {
        card.classList.add("active");
      } else if (relativeOffset === 1) {
        card.classList.add("next-1");
      } else if (relativeOffset === 2) {
        card.classList.add("next-2");
      } else if (relativeOffset === 3) {
        card.classList.add("next-3");
      } else if (relativeOffset === this.total - 1) {
        card.classList.add("dismissed");
      } else {
        card.classList.add("hidden-card");
      }
    });

    // Sync Right Detail Pane
    const activeItem = PITCH_DECKS[this.currentIndex];
    if (activeItem) {
      if (this.paneCategory) this.paneCategory.textContent = activeItem.category;
      if (this.paneTitle) this.paneTitle.textContent = activeItem.title;
      if (this.paneDesc) this.paneDesc.textContent = activeItem.desc;
      if (this.paneDomain) this.paneDomain.textContent = activeItem.domain;
      if (this.paneMentor) this.paneMentor.textContent = activeItem.mentor;
      if (this.paneMetrics) this.paneMetrics.textContent = activeItem.metrics;
      if (this.paneLink) {
        this.paneLink.href = activeItem.link;
        this.paneLink.textContent = `Open on ${activeItem.linkType.includes("Canva") ? "Canva" : "Google Drive"} ↗`;
      }
    }
  }
}

// Modal Quick-View Engine
function showModal(item) {
  const overlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDesc = document.getElementById("modal-desc");
  const modalMentor = document.getElementById("modal-mentor");
  const modalDomain = document.getElementById("modal-domain");
  const modalAction = document.getElementById("modal-action");

  if (!overlay) return;

  if (modalTitle) modalTitle.textContent = item.title;
  if (modalCategory) modalCategory.textContent = item.category;
  if (modalDesc) modalDesc.textContent = item.desc;
  if (modalMentor) modalMentor.textContent = item.mentor;
  if (modalDomain) modalDomain.textContent = item.domain;
  if (modalAction) {
    modalAction.href = item.link;
    modalAction.textContent = `Launch ${item.linkType}`;
  }

  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }
}

// Copy Email Utility with Tactile Feedback
function setupCopyActions() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        btn.style.color = "#22c55e";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = "";
        }, 1800);
      } catch (err) {
        console.error("Copy failed", err);
      }
    });
  });
}

// Global Document Ready
document.addEventListener("DOMContentLoaded", () => {
  new CardDeckEngine();
  setupCopyActions();

  // Modal Close Handlers
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
