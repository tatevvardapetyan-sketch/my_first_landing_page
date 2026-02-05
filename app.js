// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ======================
// Gallery Lightbox
// ======================
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");
const galleryGrid = document.getElementById("gallery-grid");

let currentImages = [];
let currentIndex = 0;

// Get all visible gallery thumbnails
function getVisibleThumbs() {
  return Array.from(galleryGrid.querySelectorAll(".thumb:not(.hidden)"));
}

// Open lightbox at specific index
function openLightbox(index) {
  const thumbs = getVisibleThumbs();
  if (thumbs.length === 0) return;
  
  currentImages = thumbs.map(t => t.dataset.src);
  currentIndex = index;
  
  lbImg.src = currentImages[currentIndex];
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  updateNavButtons();
}

// Close lightbox
function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lbImg.src = "";
}

// Navigate to previous image
function prevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    lbImg.src = currentImages[currentIndex];
    updateNavButtons();
  }
}

// Navigate to next image
function nextImage() {
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    lbImg.src = currentImages[currentIndex];
    updateNavButtons();
  }
}

// Update navigation button visibility
function updateNavButtons() {
  lbPrev.style.opacity = currentIndex === 0 ? "0.3" : "1";
  lbPrev.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
  lbNext.style.opacity = currentIndex === currentImages.length - 1 ? "0.3" : "1";
  lbNext.style.pointerEvents = currentIndex === currentImages.length - 1 ? "none" : "auto";
}

// Click handlers for gallery thumbnails
galleryGrid.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb || thumb.classList.contains("hidden")) return;
  
  const visibleThumbs = getVisibleThumbs();
  const index = visibleThumbs.indexOf(thumb);
  if (index !== -1) {
    openLightbox(index);
  }
});

// Navigation button handlers
lbPrev.addEventListener("click", prevImage);
lbNext.addEventListener("click", nextImage);

// Close on backdrop click or close button
lightbox.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.getAttribute("aria-hidden") === "false") {
    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      case "ArrowRight":
        nextImage();
        break;
    }
  }
});

// ======================
// Gallery Filters
// ======================
const filterButtons = document.querySelectorAll(".filter");
const thumbs = document.querySelectorAll(".thumb");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    
    // Update active state
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    
    // Filter items
    thumbs.forEach((thumb) => {
      const category = thumb.dataset.cat;
      if (filter === "all" || category === filter) {
        thumb.classList.remove("hidden");
      } else {
        thumb.classList.add("hidden");
      }
    });
  });
// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Active section highlighting
const navLinks = Array.from(document.querySelectorAll("#navbar a"));
const sections = navLinks
  .map((a) => document.getElementById(a.dataset.section))
  .filter(Boolean);

const setActive = (id) => {
  navLinks.forEach((a) => a.classList.toggle("active", a.dataset.section === id));
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  },
  { root: null, threshold: [0.35, 0.55, 0.7] }
);

sections.forEach((s) => observer.observe(s));
// Modal behaviors
const modal = document.getElementById("cta-modal");
const openBtn = document.getElementById("open-cta");

const openModal = () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const firstInput = modal.querySelector("input");
  firstInput?.focus();
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  openBtn?.focus();
};

openBtn?.addEventListener("click", openModal);

modal.addEventListener("click", (e) => {
  const target = e.target;
  if (target?.dataset?.close === "true") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
const form = document.getElementById("cta-form");
const errorEl = document.getElementById("form-error");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();

  if (!name) {
    errorEl.textContent = "Please enter your name.";
    return;
  }
  if (!email || !isValidEmail(email)) {
    errorEl.textContent = "Please enter a valid email address.";
    return;
  }

  // fake success
  errorEl.style.color = "var(--accent2)";
  errorEl.textContent = "Success! We’ll be in touch soon.";
  form.reset();

  setTimeout(() => {
    errorEl.style.color = "";
    closeModal();
  }, 900);
});
