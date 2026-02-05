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
