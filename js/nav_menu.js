document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    const mobileLinks = menu.querySelectorAll("a");

    const closeMenu = () => {
      menu.classList.remove("active");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("active");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInMenu = menu.contains(event.target);
      const clickedToggle = toggle.contains(event.target);

      if (!clickedInMenu && !clickedToggle) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  const workDetailsButton = document.querySelectorAll(".work__details-button");

  workDetailsButton.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".work__card");
      const details = card?.querySelector(".work__details-container");

      if (!card || !details) {
        return;
      }

      const isExpanded = !card.classList.contains("is-expanded");

      button.setAttribute("aria-expanded", String(isExpanded));

      if (isExpanded) {
        details.hidden = false;

        requestAnimationFrame(() => {
          card.classList.add("is-expanded");
        });

        button.setAttribute(
          "aria-label",
          "Hide details for this work experience",
        );
      } else {
        card.classList.remove("is-expanded");
        button.setAttribute(
          "aria-label",
          "Show details for this work experience",
        );

        details.addEventListener(
          "transitionend",
          () => {
            if (!card.classList.contains("is-expanded")) {
              details.hidden = true;
            }
          },
          { once: true },
        );
      }
    });
  });

  const projectDetailsButton = document.querySelectorAll(
    ".project-card__details-button",
  );

  projectDetailsButton.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".project-card");
      const details = card?.querySelector(".project-card__details");
      const label = button.querySelector("span:first-child");

      if (!card || !details || !label) {
        return;
      }

      const isExpanded = card.classList.toggle("is-expanded");

      button.setAttribute("aria-expanded", String(isExpanded));
      details.hidden = !isExpanded;
      label.textContent = isExpanded ? "Hide Details" : "View Details";
    });
  });

  const pageSections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    ".navbar__link[href^='#'], .mobile-menu__link[href^='#']",
  );

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    let currentSectionId = "";

    pageSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isCurrent = href === `#${currentSectionId}`;

      link.classList.toggle("is-active", isCurrent);

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  setActiveLink();

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("resize", setActiveLink);
});
