/* Ayush Pandey — site interactions */

(() => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");

  // MOBILE NAVIGATION

  const closeMenu = () => {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open =
        menuToggle.getAttribute("aria-expanded") !== "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuToggle.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
      );

      navLinks.classList.toggle("open", open);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // DARK AND LIGHT THEME

  const applyTheme = theme => {
    if (theme === "light") {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "light"
          ? "Switch to dark theme"
          : "Switch to light theme"
      );

      themeToggle.title =
        theme === "light"
          ? "Switch to dark theme"
          : "Switch to light theme";

      themeToggle.innerHTML =
        theme === "light"
          ? `
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"/>
            </svg>
          `
          : `
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>
            </svg>
          `;
    }
  };

  let currentTheme = "dark";

  try {
    currentTheme =
      localStorage.getItem("ayush-theme") || "dark";
  } catch (_) {}

  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme =
        document.documentElement.dataset.theme === "light"
          ? "dark"
          : "light";

      applyTheme(currentTheme);

      try {
        localStorage.setItem("ayush-theme", currentTheme);
      } catch (_) {}
    });
  }

  // AUTOMATIC COPYRIGHT YEAR

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // SCROLL REVEAL ANIMATIONS

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    "IntersectionObserver" in window &&
    !reduceMotion
  ) {
    const revealTargets = document.querySelectorAll(
      ".section-heading, .about-copy, .profile-panel, .tool-card, .project-row, .github-callout"
    );

    revealTargets.forEach(element => {
      element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealTargets.forEach(element => {
      observer.observe(element);
    });
  }

})();
