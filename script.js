
/* =================================
   AYUSH'S LAB - JAVASCRIPT
================================= */

console.log("Welcome to Ayush's Lab! 🚀");
console.log("Explore. Experiment. Build.");

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

  });

  // Close menu after selecting a link

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";

    });

  });

}


// DARK / LIGHT THEME

const themeToggle = document.getElementById("themeToggle");

function updateThemeButton() {

  const isLight =
    document.documentElement.dataset.theme === "light";

  themeToggle.textContent = isLight ? "☾" : "☀";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );

}

if (themeToggle) {

  updateThemeButton();

  themeToggle.addEventListener("click", () => {

    const isLight =
      document.documentElement.dataset.theme === "light";

    if (isLight) {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = "light";
    }

    try {
      localStorage.setItem(
        "ayush-theme",
        isLight ? "dark" : "light"
      );
    } catch (error) {
      console.warn("Could not save theme preference.");
    }

    updateThemeButton();

  });

}


// AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// SIMPLE SCROLL REVEAL

const sections = document.querySelectorAll(
  ".section, .card, .project-card, .github-banner"
);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {

  sections.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          observerInstance.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  sections.forEach(element => observer.observe(element));

}

console.log("Ayush's Lab is ready! ✨");
