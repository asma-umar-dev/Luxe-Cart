/* ===========================================================
   LUXECART — SCRIPT.JS
   Cart, Wishlist, Filters, Search, Checkout, Dark Mode, Toasts
   =========================================================== */

/* ===========================================================
   PRODUCT DATA
   (kept in this same file so the site works from a single
   script tag — no extra file fetch that can 404 on some
   hosting setups / mobile file paths)
   =========================================================== */

const PRODUCTS = [
  // ---------------- MAKEUP ----------------
  {
    id: "mk-001", name: "Velvet Matte Lip Set", brand: "Rosé Atelier",
    category: "makeup", price: 3200, oldPrice: 3800, rating: 4.8, reviews: 312,
    desc: "A 4-piece set of long-wear matte lipsticks in rose-forward shades.",
    img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-04-12"
  },
  {
    id: "mk-002", name: "Silk Foundation Drops", brand: "Maison Belle",
    category: "makeup", price: 4500, oldPrice: null, rating: 4.6, reviews: 198,
    desc: "Buildable, skin-like coverage with a luminous semi-matte finish.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-02"
  },
  {
    id: "mk-003", name: "Rose Gold Eyeshadow Palette", brand: "Velour Cosmetics",
    category: "makeup", price: 5200, oldPrice: 6000, rating: 4.9, reviews: 540,
    desc: "12 richly pigmented shades from champagne to deep burgundy.",
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-03-01"
  },
  {
    id: "mk-004", name: "Featherweight Setting Powder", brand: "Maison Belle",
    category: "makeup", price: 2800, oldPrice: null, rating: 4.5, reviews: 167,
    desc: "Translucent finishing powder for an airbrushed, blurred look.",
    img: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-02-14"
  },
  {
    id: "mk-005", name: "Sculpt &amp; Glow Duo Stick", brand: "Rosé Atelier",
    category: "makeup", price: 3600, oldPrice: null, rating: 4.7, reviews: 221,
    desc: "Cream contour and highlight in one effortless twist-up stick.",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-10"
  },
  {
    id: "mk-006", name: "Volumizing Lash Mascara", brand: "Velour Cosmetics",
    category: "makeup", price: 2400, oldPrice: 2900, rating: 4.4, reviews: 389,
    desc: "Smudge-proof formula for dramatic, fluttery volume all day.",
    img: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-01-22"
  },

  // ---------------- SKINCARE ----------------
  {
    id: "sk-001", name: "Rose Hyaluronic Serum", brand: "Lumière Skin",
    category: "skincare", price: 4200, oldPrice: 4900, rating: 4.9, reviews: 612,
    desc: "Deeply hydrating serum with triple-weight hyaluronic acid.",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-03-18"
  },
  {
    id: "sk-002", name: "Vitamin C Brightening Cream", brand: "Lumière Skin",
    category: "skincare", price: 3800, oldPrice: null, rating: 4.7, reviews: 284,
    desc: "Brightens and evens tone while softening fine lines overnight.",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-05-28"
  },
  {
    id: "sk-003", name: "Gentle Glow Cleansing Balm", brand: "Petale Beauty",
    category: "skincare", price: 2600, oldPrice: null, rating: 4.6, reviews: 199,
    desc: "Melts away makeup and impurities without stripping the skin.",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-02-02"
  },
  {
    id: "sk-004", name: "Overnight Renewal Mask", brand: "Petale Beauty",
    category: "skincare", price: 3300, oldPrice: 3900, rating: 4.8, reviews: 356,
    desc: "Wake up to plumper, dewier skin with this sleep-in treatment.",
    img: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-04-05"
  },
  {
    id: "sk-005", name: "SPF 50 Silk Sunscreen", brand: "Lumière Skin",
    category: "skincare", price: 2200, oldPrice: null, rating: 4.5, reviews: 145,
    desc: "Weightless, no white-cast sun protection for everyday wear.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-15"
  },
  {
    id: "sk-006", name: "Rose Quartz Facial Roller", brand: "Petale Beauty",
    category: "skincare", price: 1800, oldPrice: null, rating: 4.3, reviews: 98,
    desc: "Soothes puffiness and aids product absorption with cool stone.",
    img: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-01-10"
  },

  // ---------------- HANDBAGS ----------------
  {
    id: "hb-001", name: "Rose Gold Quilted Tote", brand: "Maison Noor",
    category: "handbags", price: 14500, oldPrice: 17000, rating: 4.9, reviews: 211,
    desc: "Structured vegan-leather tote with signature chain strap.",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-03-22"
  },
  {
    id: "hb-002", name: "Burgundy Mini Crossbody", brand: "Atelier Reine",
    category: "handbags", price: 8900, oldPrice: null, rating: 4.7, reviews: 154,
    desc: "Compact silhouette in rich burgundy with adjustable strap.",
    img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-05"
  },
  {
    id: "hb-003", name: "Ivory Top-Handle Bag", brand: "Maison Noor",
    category: "handbags", price: 12200, oldPrice: null, rating: 4.6, reviews: 132,
    desc: "Timeless top-handle design in soft ivory pebbled leather.",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-02-19"
  },
  {
    id: "hb-004", name: "Woven Raffia Beach Tote", brand: "Atelier Reine",
    category: "handbags", price: 6400, oldPrice: 7200, rating: 4.5, reviews: 88,
    desc: "Hand-woven raffia tote perfect for sun-soaked days.",
    img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-05-12"
  },
  {
    id: "hb-005", name: "Quilted Chain Shoulder Bag", brand: "Maison Noor",
    category: "handbags", price: 11800, oldPrice: null, rating: 4.8, reviews: 267,
    desc: "Diamond-quilted shoulder bag with polished gold hardware.",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-18"
  },
  {
    id: "hb-006", name: "Structured Burgundy Satchel", brand: "Atelier Reine",
    category: "handbags", price: 9800, oldPrice: 11200, rating: 4.6, reviews: 121,
    desc: "Box-style satchel in deep burgundy leather with a detachable strap.",
    img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-05-20"
  },

  // ---------------- SHOES ----------------
  {
    id: "sh-001", name: "Satin Block Heel Pumps", brand: "Noir & Rose",
    category: "shoes", price: 7600, oldPrice: 8900, rating: 4.7, reviews: 176,
    desc: "Comfortable block heel in luxe satin, perfect for all-day wear.",
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-03-30"
  },
  {
    id: "sh-002", name: "Ivory Ankle Strap Heels", brand: "Noir & Rose",
    category: "shoes", price: 6900, oldPrice: null, rating: 4.5, reviews: 119,
    desc: "Delicate ankle strap design with a comfortable kitten heel.",
    img: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-08"
  },
  {
    id: "sh-003", name: "Rose Suede Loafers", brand: "Atelier Pied",
    category: "shoes", price: 5400, oldPrice: 6100, rating: 4.6, reviews: 143,
    desc: "Soft suede loafers that pair effortlessly with any outfit.",
    img: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-02-25"
  },
  {
    id: "sh-004", name: "Burgundy Strappy Sandals", brand: "Noir & Rose",
    category: "shoes", price: 5900, oldPrice: null, rating: 4.4, reviews: 92,
    desc: "Elegant strappy sandals with a sculpted comfort footbed.",
    img: "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-01-30"
  },
  {
    id: "sh-005", name: "Pearl-Embellished Flats", brand: "Atelier Pied",
    category: "shoes", price: 4800, oldPrice: 5500, rating: 4.8, reviews: 205,
    desc: "Classic ballet flats finished with delicate pearl detailing.",
    img: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-04-20"
  },
  {
    id: "sh-006", name: "Rose Gold Platform Heels", brand: "Noir & Rose",
    category: "shoes", price: 8200, oldPrice: null, rating: 4.7, reviews: 134,
    desc: "Statement platform heels with a metallic rose gold finish.",
    img: "https://images.unsplash.com/photo-1518894781321-630e638d0742?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-14"
  },

  // ---------------- ACCESSORIES ----------------
  {
    id: "ac-001", name: "Rose Gold Layered Necklace", brand: "Étoile Jewels",
    category: "accessories", price: 3400, oldPrice: null, rating: 4.7, reviews: 178,
    desc: "Delicate layered chains in a warm rose gold finish.",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-12"
  },
  {
    id: "ac-002", name: "Silk Hair Scrunchie Set", brand: "Petale Beauty",
    category: "accessories", price: 1500, oldPrice: 1900, rating: 4.5, reviews: 134,
    desc: "Set of 3 pure mulberry silk scrunchies, gentle on hair.",
    img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-03-08"
  },
  {
    id: "ac-003", name: "Oversized Cat-Eye Sunglasses", brand: "Étoile Jewels",
    category: "accessories", price: 4100, oldPrice: null, rating: 4.6, reviews: 161,
    desc: "Statement frames with UV400 protection and gradient lenses.",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-05-02"
  },
  {
    id: "ac-004", name: "Pearl Drop Earrings", brand: "Étoile Jewels",
    category: "accessories", price: 2900, oldPrice: 3400, rating: 4.8, reviews: 246,
    desc: "Freshwater pearl drops on hypoallergenic gold-plated posts.",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    tag: "", dateAdded: "2026-02-28"
  },
  {
    id: "ac-005", name: "Leather Wrap Bracelet", brand: "Maison Noor",
    category: "accessories", price: 1700, oldPrice: null, rating: 4.3, reviews: 76,
    desc: "Minimalist wrap bracelet in soft burgundy leather.",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    tag: "New", dateAdded: "2026-06-20"
  },
  {
    id: "ac-006", name: "Rose Gold Watch", brand: "Étoile Jewels",
    category: "accessories", price: 6500, oldPrice: 7400, rating: 4.7, reviews: 152,
    desc: "Slim mesh-strap watch with a mother-of-pearl dial face.",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    tag: "Bestseller", dateAdded: "2026-05-15"
  },
];

const CATEGORY_META = {
  makeup:      { label: "Makeup",      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop" },
  skincare:    { label: "Skincare",    img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=600&auto=format&fit=crop" },
  shoes:       { label: "Shoes",       img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop" },
  handbags:    { label: "Handbags",    img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop" },
  accessories: { label: "Accessories", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop" },
};

(function () {
  "use strict";

  /* -------------------- STATE -------------------- */
  const STORAGE_KEYS = {
    cart: "luxecart_cart",
    wishlist: "luxecart_wishlist",
    theme: "luxecart_theme",
  };

  let cart = loadFromStorage(STORAGE_KEYS.cart, []);
  let wishlist = loadFromStorage(STORAGE_KEYS.wishlist, []);

  let activeFilters = {
    category: new Set(),
    maxPrice: 25000,
    minRating: 0,
    search: "",
    sort: "featured",
  };

  let checkoutStep = 1;

  /* -------------------- STORAGE HELPERS -------------------- */
  function loadFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* storage unavailable, fail silently */ }
  }

  /* -------------------- UTIL -------------------- */
  function formatPrice(n) {
    return "Rs. " + n.toLocaleString("en-PK");
  }
  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }
  function starString(rating) {
    const full = Math.round(rating);
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  }
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ===========================================================
     TOASTS
     =========================================================== */
  function showToast(message, type = "default") {
    const container = qs("#toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast" + (type !== "default" ? " " + type : "");
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 320);
    }, 2400);
  }

  /* ===========================================================
     PRELOADER
     =========================================================== */
  window.addEventListener("load", () => {
    setTimeout(() => {
      qs("#preloader").classList.add("hidden");
    }, 350);
  });

  /* ===========================================================
     DARK MODE
     =========================================================== */
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEYS.theme, next);
  }
  initTheme();
  qs("#darkModeToggle").addEventListener("click", toggleTheme);

  /* ===========================================================
     HEADER SCROLL STATE
     =========================================================== */
  const siteHeader = qs("#siteHeader");
  window.addEventListener("scroll", () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 12);
    qs("#scrollTop").classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  qs("#scrollTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===========================================================
     MOBILE NAV
     =========================================================== */
  const mainNav = qs("#mainNav");
  const navOverlay = qs("#navOverlay");
  function openNav() {
    mainNav.classList.add("open");
    navOverlay.classList.add("open");
    qs("#mobileMenuBtn").setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    mainNav.classList.remove("open");
    navOverlay.classList.remove("open");
    qs("#mobileMenuBtn").setAttribute("aria-expanded", "false");
  }
  qs("#mobileMenuBtn").addEventListener("click", openNav);
  qs("#navCloseBtn").addEventListener("click", closeNav);
  navOverlay.addEventListener("click", () => {
    closeNav();
    closeAllDrawers();
  });
  qsa(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      qsa(".nav-link").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      closeNav();
    });
  });

  /* ===========================================================
     SEARCH PANEL (header)
     =========================================================== */
  const searchPanel = qs("#searchPanel");
  const searchInput = qs("#searchInput");
  qs("#searchToggle").addEventListener("click", () => {
    searchPanel.classList.add("open");
    setTimeout(() => searchInput.focus(), 200);
  });
  qs("#searchClose").addEventListener("click", () => searchPanel.classList.remove("open"));
  searchInput.addEventListener("input", () => renderSearchResults(searchInput.value.trim()));

  function renderSearchResults(query) {
    const container = qs("#searchResults");
    if (!query) { container.innerHTML = ""; return; }
    const lower = query.toLowerCase();
    const matches = PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(lower) ||
             p.brand.toLowerCase().includes(lower) ||
             p.category.toLowerCase().includes(lower)
    ).slice(0, 8);

    if (!matches.length) {
      container.innerHTML = `<p style="color:var(--color-text-soft);padding:8px;">No results for "${escapeHtml(query)}"</p>`;
      return;
    }
    container.innerHTML = matches.map((p) => `
      <a href="#shop" class="search-result-card" data-goto="${p.id}">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy">
        <div>
          <p class="src-name">${escapeHtml(p.name)}</p>
          <p class="src-price">${formatPrice(p.price)}</p>
        </div>
      </a>`).join("");

    qsa("[data-goto]", container).forEach((el) => {
      el.addEventListener("click", () => {
        searchPanel.classList.remove("open");
        activeFilters.search = "";
        qs("#shopSearchInput").value = "";
        renderShopGrid();
        setTimeout(() => openQuickView(el.dataset.goto), 400);
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ===========================================================
     CATEGORY RAIL
     =========================================================== */
  function renderCategoryRail() {
    const rail = qs("#categoryRail");
    rail.innerHTML = Object.entries(CATEGORY_META).map(([key, meta]) => {
      const count = PRODUCTS.filter((p) => p.category === key).length;
      return `
      <div class="category-card" data-cat="${key}">
        <img src="${meta.img}" alt="${meta.label}" loading="lazy">
        <div class="category-card-label">
          <h3>${meta.label}</h3>
          <span>${count} Products</span>
        </div>
      </div>`;
    }).join("");

    qsa(".category-card", rail).forEach((card) => {
      card.addEventListener("click", () => {
        activeFilters.category = new Set([card.dataset.cat]);
        syncFilterCheckboxes();
        renderShopGrid();
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ===========================================================
     PRODUCT CARD TEMPLATE
     =========================================================== */
  function productCardHTML(p, index) {
    const inWishlist = wishlist.includes(p.id);
    const inCart = cart.some((c) => c.id === p.id);
    return `
    <article class="product-card" style="animation-delay:${Math.min(index * 0.04, 0.4)}s" data-id="${p.id}">
      <div class="product-card-media">
        ${p.tag ? `<span class="product-tag ${p.oldPrice ? 'tag-sale' : ''}">${p.tag}</span>` : ""}
        <button class="wishlist-fab ${inWishlist ? "active" : ""}" data-action="wishlist" data-id="${p.id}" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}"><path d="M12 20.5s-7.6-4.6-10-9.4C0.4 7.6 2.3 4 6 4c2.1 0 3.7 1.1 4.6 2.7l1.4 2.4 1.4-2.4C14.3 5.1 15.9 4 18 4c3.7 0 5.6 3.6 4 7.1-2.4 4.8-10 9.4-10 9.4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        </button>
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" data-action="quickview" data-id="${p.id}">
        <button class="product-card-quickadd" data-action="addcart" data-id="${p.id}">Quick Add to Cart</button>
      </div>
      <div class="product-card-body">
        <span class="product-brand">${escapeHtml(p.brand)}</span>
        <h3 class="product-name" data-action="quickview" data-id="${p.id}" style="cursor:pointer;">${escapeHtml(p.name)}</h3>
        <p class="product-desc">${escapeHtml(p.desc)}</p>
        <div class="product-rating">
          <span class="stars-display">${starString(p.rating)}</span>
          <span class="rating-count">${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <div class="product-card-actions">
          <button class="add-cart-btn ${inCart ? "in-cart" : ""}" data-action="addcart" data-id="${p.id}">
            ${inCart ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>`;
  }

  function attachProductCardEvents(container) {
    qsa("[data-action='addcart']", container).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        addToCart(btn.dataset.id);
      });
    });
    qsa("[data-action='wishlist']", container).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleWishlist(btn.dataset.id);
      });
    });
    qsa("[data-action='quickview']", container).forEach((el) => {
      el.addEventListener("click", () => openQuickView(el.dataset.id));
    });
  }

  /* ===========================================================
     NEW ARRIVALS / BEST SELLERS
     =========================================================== */
  function renderNewArrivals() {
    const grid = qs("#newArrivalsGrid");
    const items = [...PRODUCTS].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 4);
    grid.innerHTML = items.map(productCardHTML).join("");
    attachProductCardEvents(grid);
  }
  function renderBestSellers() {
    const grid = qs("#bestSellersGrid");
    const items = [...PRODUCTS].sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews)).slice(0, 4);
    grid.innerHTML = items.map(productCardHTML).join("");
    attachProductCardEvents(grid);
  }

  /* ===========================================================
     SHOP GRID — FILTER / SEARCH / SORT
     =========================================================== */
  function getFilteredProducts() {
    let list = [...PRODUCTS];

    if (activeFilters.category.size > 0) {
      list = list.filter((p) => activeFilters.category.has(p.category));
    }
    list = list.filter((p) => p.price <= activeFilters.maxPrice);
    list = list.filter((p) => p.rating >= activeFilters.minRating);

    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    switch (activeFilters.sort) {
      case "newest":
        list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // featured = original order
    }
    return list;
  }

  function renderShopGrid() {
    const grid = qs("#shopGrid");
    const empty = qs("#shopEmptyState");
    const items = getFilteredProducts();

    qs("#resultCount").textContent = `${items.length} product${items.length !== 1 ? "s" : ""}`;

    if (!items.length) {
      grid.innerHTML = "";
      empty.hidden = false;
    } else {
      empty.hidden = true;
      grid.innerHTML = items.map(productCardHTML).join("");
      attachProductCardEvents(grid);
    }
  }

  /* -------------------- FILTER PANEL BUILD -------------------- */
  function renderFilterOptions() {
    // Category checkboxes
    const catContainer = qs("#filterCategory");
    catContainer.innerHTML = Object.entries(CATEGORY_META).map(([key, meta]) => {
      const count = PRODUCTS.filter((p) => p.category === key).length;
      return `
      <label class="filter-option">
        <input type="checkbox" value="${key}" data-filter="category">
        <span>${meta.label}</span>
        <span class="opt-count">${count}</span>
      </label>`;
    }).join("");

    // Rating checkboxes
    const ratingContainer = qs("#filterRating");
    ratingContainer.innerHTML = [4, 3, 2].map((r) => `
      <label class="filter-option">
        <input type="radio" name="ratingFilter" value="${r}" data-filter="rating">
        <span>${"★".repeat(r)}${"☆".repeat(5 - r)} &amp; up</span>
      </label>`).join("") + `
      <label class="filter-option">
        <input type="radio" name="ratingFilter" value="0" data-filter="rating" checked>
        <span>All Ratings</span>
      </label>`;

    qsa("[data-filter='category']", catContainer).forEach((cb) => {
      cb.addEventListener("change", () => {
        if (cb.checked) activeFilters.category.add(cb.value);
        else activeFilters.category.delete(cb.value);
        renderShopGrid();
      });
    });
    qsa("[data-filter='rating']", ratingContainer).forEach((rb) => {
      rb.addEventListener("change", () => {
        activeFilters.minRating = Number(rb.value);
        renderShopGrid();
      });
    });
  }

  function syncFilterCheckboxes() {
    qsa("[data-filter='category']").forEach((cb) => {
      cb.checked = activeFilters.category.has(cb.value);
    });
  }

  // Price range slider
  const priceRange = qs("#priceRange");
  priceRange.addEventListener("input", () => {
    activeFilters.maxPrice = Number(priceRange.value);
    qs("#priceMaxLabel").textContent = formatPrice(activeFilters.maxPrice);
    renderShopGrid();
  });

  // Sort select
  qs("#sortSelect").addEventListener("change", (e) => {
    activeFilters.sort = e.target.value;
    renderShopGrid();
  });

  // Shop search box
  qs("#shopSearchInput").addEventListener("input", (e) => {
    activeFilters.search = e.target.value.trim();
    renderShopGrid();
  });

  // Clear filters
  function clearAllFilters() {
    activeFilters = { category: new Set(), maxPrice: 25000, minRating: 0, search: "", sort: "featured" };
    qs("#priceRange").value = 25000;
    qs("#priceMaxLabel").textContent = formatPrice(25000);
    qs("#sortSelect").value = "featured";
    qs("#shopSearchInput").value = "";
    syncFilterCheckboxes();
    qsa("[name='ratingFilter']").forEach((rb) => { rb.checked = rb.value === "0"; });
    renderShopGrid();
  }
  qs("#clearFilters").addEventListener("click", clearAllFilters);
  qs("#emptyStateReset").addEventListener("click", clearAllFilters);

  // Footer / promo "filter link" shortcuts
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-filter-link]");
    if (!link) return;
    e.preventDefault();
    const val = link.dataset.filterLink;
    if (["makeup", "skincare", "shoes", "handbags", "accessories"].includes(val)) {
      activeFilters.category = new Set([val]);
      syncFilterCheckboxes();
    } else if (val === "newest") {
      activeFilters.sort = "newest";
      qs("#sortSelect").value = "newest";
    } else if (val === "rating") {
      activeFilters.sort = "rating";
      qs("#sortSelect").value = "rating";
    }
    renderShopGrid();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  // Mobile filter drawer toggle
  qs("#filterMobileBtn").addEventListener("click", () => {
    qs("#filtersPanel").classList.add("open");
    navOverlay.classList.add("open");
  });
  navOverlay.addEventListener("click", () => qs("#filtersPanel").classList.remove("open"));

  /* ===========================================================
     CART LOGIC
     =========================================================== */
  function addToCart(id, qty = 1) {
    const product = findProduct(id);
    if (!product) return;
    const existing = cart.find((c) => c.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, qty });
    }
    saveToStorage(STORAGE_KEYS.cart, cart);
    updateCartUI();
    showToast(`${product.name} added to cart`, "success");
    refreshProductCardStates();
  }

  function removeFromCart(id) {
    const product = findProduct(id);
    cart = cart.filter((c) => c.id !== id);
    saveToStorage(STORAGE_KEYS.cart, cart);
    updateCartUI();
    if (product) showToast(`${product.name} removed from cart`);
    refreshProductCardStates();
  }

  function updateCartQty(id, delta) {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
    saveToStorage(STORAGE_KEYS.cart, cart);
    updateCartUI();
  }

  function cartTotal() {
    return cart.reduce((sum, item) => {
      const p = findProduct(item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }
  function cartItemCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function updateCartUI() {
    const countEl = qs("#cartCount");
    const count = cartItemCount();
    countEl.textContent = count;
    countEl.classList.toggle("show", count > 0);

    const container = qs("#cartItems");
    const footer = qs("#cartFooter");

    if (!cart.length) {
      container.innerHTML = `
        <div class="drawer-empty">
          <svg viewBox="0 0 24 24" fill="none"><path d="M3 4h2l1.6 11.2a2 2 0 0 0 2 1.8h8.3a2 2 0 0 0 2-1.6L20.5 8H6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <h4 style="font-family:var(--font-display);font-size:1.2rem;">Your cart is empty</h4>
          <p>Looks like you haven't added anything yet. Start exploring our edit.</p>
        </div>`;
      footer.style.display = "none";
      return;
    }

    footer.style.display = "block";
    container.innerHTML = cart.map((item) => {
      const p = findProduct(item.id);
      if (!p) return "";
      return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.img}" alt="${escapeHtml(p.name)}">
        <div class="cart-item-info">
          <span class="cart-item-brand">${escapeHtml(p.brand)}</span>
          <span class="cart-item-name">${escapeHtml(p.name)}</span>
          <span class="cart-item-price">${formatPrice(p.price)}</span>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button data-qty="-1" data-id="${p.id}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button data-qty="1" data-id="${p.id}" aria-label="Increase quantity">+</button>
            </div>
            <button class="remove-item-btn" data-remove="${p.id}">Remove</button>
          </div>
        </div>
      </div>`;
    }).join("");

    qsa("[data-qty]", container).forEach((btn) => {
      btn.addEventListener("click", () => updateCartQty(btn.dataset.id, Number(btn.dataset.qty)));
    });
    qsa("[data-remove]", container).forEach((btn) => {
      btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
    });

    qs("#cartSubtotal").textContent = formatPrice(cartTotal());
  }

  /* ===========================================================
     WISHLIST LOGIC
     =========================================================== */
  function toggleWishlist(id) {
    const product = findProduct(id);
    if (!product) return;
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((w) => w !== id);
      showToast(`${product.name} removed from wishlist`);
    } else {
      wishlist.push(id);
      showToast(`${product.name} added to wishlist`, "success");
    }
    saveToStorage(STORAGE_KEYS.wishlist, wishlist);
    updateWishlistUI();
    refreshProductCardStates();
  }

  function updateWishlistUI() {
    const countEl = qs("#wishlistCount");
    countEl.textContent = wishlist.length;
    countEl.classList.toggle("show", wishlist.length > 0);

    const container = qs("#wishlistItems");
    if (!wishlist.length) {
      container.innerHTML = `
        <div class="drawer-empty">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 20.5s-7.6-4.6-10-9.4C0.4 7.6 2.3 4 6 4c2.1 0 3.7 1.1 4.6 2.7l1.4 2.4 1.4-2.4C14.3 5.1 15.9 4 18 4c3.7 0 5.6 3.6 4 7.1-2.4 4.8-10 9.4-10 9.4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
          <h4 style="font-family:var(--font-display);font-size:1.2rem;">Your wishlist is empty</h4>
          <p>Save items you love and find them here anytime.</p>
        </div>`;
      return;
    }

    container.innerHTML = wishlist.map((id) => {
      const p = findProduct(id);
      if (!p) return "";
      return `
      <div class="wishlist-item" data-id="${p.id}">
        <img src="${p.img}" alt="${escapeHtml(p.name)}">
        <div class="wishlist-item-info">
          <span class="cart-item-brand">${escapeHtml(p.brand)}</span>
          <span class="cart-item-name">${escapeHtml(p.name)}</span>
          <span class="cart-item-price">${formatPrice(p.price)}</span>
          <div class="wishlist-item-actions">
            <button class="wl-move-cart" data-move="${p.id}">Move to Cart</button>
            <button class="wl-remove" data-remove="${p.id}">Remove</button>
          </div>
        </div>
      </div>`;
    }).join("");

    qsa("[data-move]", container).forEach((btn) => {
      btn.addEventListener("click", () => {
        addToCart(btn.dataset.move);
        toggleWishlist(btn.dataset.move);
      });
    });
    qsa("[data-remove]", container).forEach((btn) => {
      btn.addEventListener("click", () => toggleWishlist(btn.dataset.remove));
    });
  }

  function refreshProductCardStates() {
    // Re-render visible grids so wishlist hearts / cart buttons reflect state
    if (qs("#shopGrid").innerHTML) renderShopGrid();
    renderNewArrivals();
    renderBestSellers();
  }

  /* ===========================================================
     DRAWERS (cart / wishlist)
     =========================================================== */
  const drawerOverlay = qs("#drawerOverlay");
  const cartDrawer = qs("#cartDrawer");
  const wishlistDrawer = qs("#wishlistDrawer");

  function openDrawer(drawer) {
    closeAllDrawers();
    drawer.classList.add("open");
    drawerOverlay.classList.add("open");
  }
  function closeAllDrawers() {
    cartDrawer.classList.remove("open");
    wishlistDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
  }
  qs("#cartToggle").addEventListener("click", () => openDrawer(cartDrawer));
  qs("#cartClose").addEventListener("click", closeAllDrawers);
  qs("#wishlistToggle").addEventListener("click", () => openDrawer(wishlistDrawer));
  qs("#wishlistClose").addEventListener("click", closeAllDrawers);
  drawerOverlay.addEventListener("click", () => {
    closeAllDrawers();
    qs("#filtersPanel").classList.remove("open");
  });

  /* ===========================================================
     QUICK VIEW MODAL
     =========================================================== */
  const quickViewOverlay = qs("#quickViewOverlay");
  let quickViewQty = 1;

  function openQuickView(id) {
    const p = findProduct(id);
    if (!p) return;
    quickViewQty = 1;
    const inWishlist = wishlist.includes(id);

    qs("#quickViewBody").innerHTML = `
      <div class="qv-image"><img src="${p.img}" alt="${escapeHtml(p.name)}"></div>
      <div class="qv-info">
        <span class="product-brand">${escapeHtml(p.brand)}</span>
        <h2 class="product-name">${escapeHtml(p.name)}</h2>
        <div class="product-rating">
          <span class="stars-display">${starString(p.rating)}</span>
          <span class="rating-count">${p.rating} (${p.reviews} reviews)</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <p class="product-desc">${escapeHtml(p.desc)} Crafted with premium materials and designed for everyday luxury — a piece that earns its place in your routine.</p>
        <div class="qv-qty">
          <span style="font-size:0.85rem;font-weight:600;">Quantity</span>
          <div class="qty-control">
            <button id="qvQtyMinus" aria-label="Decrease quantity">−</button>
            <span id="qvQtyValue">1</span>
            <button id="qvQtyPlus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="qv-actions">
          <button class="btn btn-primary" id="qvAddCart">Add to Cart</button>
          <button class="btn btn-ghost" id="qvWishlist">${inWishlist ? "♥ Wishlisted" : "♡ Wishlist"}</button>
        </div>
      </div>`;

    qs("#qvQtyMinus").addEventListener("click", () => {
      quickViewQty = Math.max(1, quickViewQty - 1);
      qs("#qvQtyValue").textContent = quickViewQty;
    });
    qs("#qvQtyPlus").addEventListener("click", () => {
      quickViewQty += 1;
      qs("#qvQtyValue").textContent = quickViewQty;
    });
    qs("#qvAddCart").addEventListener("click", () => {
      addToCart(id, quickViewQty);
      closeModal(quickViewOverlay);
    });
    qs("#qvWishlist").addEventListener("click", () => {
      toggleWishlist(id);
      closeModal(quickViewOverlay);
    });

    openModal(quickViewOverlay);
  }
  qs("#quickViewClose").addEventListener("click", () => closeModal(quickViewOverlay));

  function openModal(overlay) { overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeModal(overlay) { overlay.classList.remove("open"); document.body.style.overflow = ""; }

  qsa(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  /* ===========================================================
     CHECKOUT FLOW
     =========================================================== */
  const checkoutOverlay = qs("#checkoutOverlay");
  const checkoutForm = qs("#checkoutForm");

  qs("#checkoutBtn").addEventListener("click", () => {
    if (!cart.length) {
      showToast("Your cart is empty", "error");
      return;
    }
    closeAllDrawers();
    checkoutStep = 1;
    renderCheckoutStep();
    renderOrderSummary();
    openModal(checkoutOverlay);
  });
  qs("#checkoutClose").addEventListener("click", () => closeModal(checkoutOverlay));

  function renderCheckoutStep() {
    qsa(".checkout-step-panel").forEach((panel) => {
      panel.classList.toggle("active", Number(panel.dataset.panel) === checkoutStep);
    });
    qsa(".step").forEach((step) => {
      const stepNum = Number(step.dataset.step);
      step.classList.toggle("active", stepNum === checkoutStep);
      step.classList.toggle("done", stepNum < checkoutStep);
    });
    qs("#checkoutBack").hidden = checkoutStep === 1;
    qs("#checkoutNext").hidden = checkoutStep === 3;
    qs("#checkoutPlaceOrder").hidden = checkoutStep !== 3;
  }

  function validateStep(step) {
    const panel = qs(`.checkout-step-panel[data-panel="${step}"]`);
    const inputs = qsa("input[required], textarea[required]", panel);
    for (const input of inputs) {
      if (!input.value.trim()) {
        input.focus();
        showToast("Please fill in all required fields", "error");
        return false;
      }
    }
    return true;
  }

  qs("#checkoutNext").addEventListener("click", () => {
    if (!validateStep(checkoutStep)) return;
    checkoutStep = Math.min(3, checkoutStep + 1);
    renderCheckoutStep();
    if (checkoutStep === 3) renderOrderSummary();
  });
  qs("#checkoutBack").addEventListener("click", () => {
    checkoutStep = Math.max(1, checkoutStep - 1);
    renderCheckoutStep();
  });

  function renderOrderSummary() {
    const list = qs("#orderSummaryList");
    list.innerHTML = cart.map((item) => {
      const p = findProduct(item.id);
      if (!p) return "";
      return `
      <div class="order-summary-item">
        <img src="${p.img}" alt="${escapeHtml(p.name)}">
        <div class="order-summary-item-info">
          <strong>${escapeHtml(p.name)}</strong>
          <span>Qty: ${item.qty}</span>
        </div>
        <span class="order-summary-item-price">${formatPrice(p.price * item.qty)}</span>
      </div>`;
    }).join("");

    const subtotal = cartTotal();
    const shipping = subtotal > 6000 ? 0 : 250;
    qs("#summarySubtotal").textContent = formatPrice(subtotal);
    qs("#summaryShipping").textContent = shipping === 0 ? "Free" : formatPrice(shipping);
    qs("#summaryTotal").textContent = formatPrice(subtotal + shipping);
  }

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkoutStep !== 3) return;
    // Place order
    cart = [];
    saveToStorage(STORAGE_KEYS.cart, cart);
    updateCartUI();
    refreshProductCardStates();
    closeModal(checkoutOverlay);
    checkoutForm.reset();
    checkoutStep = 1;
    renderCheckoutStep();
    openModal(qs("#successOverlay"));
  });

  qs("#successClose").addEventListener("click", () => {
    closeModal(qs("#successOverlay"));
  });

  /* ===========================================================
     NEWSLETTER / CONTACT FORMS (front-end only, with toast feedback)
     =========================================================== */
  qs("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("You're subscribed! Welcome to LuxeCart.", "success");
    e.target.reset();
  });
  qs("#footerNewsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("You're subscribed! Welcome to LuxeCart.", "success");
    e.target.reset();
  });
  qs("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Message sent — we'll be in touch soon.", "success");
    e.target.reset();
  });

  /* ===========================================================
     KEYBOARD: ESC closes overlays
     =========================================================== */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeAllDrawers();
    closeNav();
    searchPanel.classList.remove("open");
    qs("#filtersPanel").classList.remove("open");
    qsa(".modal-overlay.open").forEach((o) => closeModal(o));
  });

  /* ===========================================================
     SCROLLSPY for nav active state
     =========================================================== */
  const sections = ["home", "shop", "categories", "new-arrivals", "best-sellers", "contact"];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        qsa(".nav-link").forEach((l) => l.classList.toggle("active", l.dataset.nav === navKeyFor(id)));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  function navKeyFor(id) {
    const map = { home: "home", shop: "shop", categories: "categories", "new-arrivals": "new", "best-sellers": "best", contact: "contact" };
    return map[id] || "home";
  }
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  /* ===========================================================
     INIT
     =========================================================== */
  renderCategoryRail();
  renderNewArrivals();
  renderBestSellers();
  renderFilterOptions();
  renderShopGrid();
  updateCartUI();
  updateWishlistUI();
  qs("#priceMinLabel").textContent = formatPrice(0);
  qs("#priceMaxLabel").textContent = formatPrice(activeFilters.maxPrice);

})();
