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
});
