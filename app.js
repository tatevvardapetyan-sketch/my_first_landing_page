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
