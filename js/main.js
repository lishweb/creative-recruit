document.addEventListener("DOMContentLoaded", () => {

  /* ================================================
     1. Smooth scroll  (all anchor links)
     ================================================ */
  const header = document.getElementById("header");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      const headerH = header ? header.offsetHeight : 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: "smooth" });

      // Close mobile nav if open
      closeMobileNav();
    });
  });

  /* ================================================
     2. Scroll fade-in  (Intersection Observer)
        .fade-in  →  .is-visible
     ================================================ */
  const fadeEls = document.querySelectorAll(".fade-in");

  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach((el) => observer.observe(el));
  }

  /* ================================================
     3. Header scroll control
        50px+  →  .header--scrolled
     ================================================ */
  if (header) {
    const SCROLL_THRESHOLD = 50;

    const handleScroll = () => {
      header.classList.toggle(
        "header--scrolled",
        window.scrollY > SCROLL_THRESHOLD
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* ================================================
     4. Mobile hamburger menu
     ================================================ */
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");
  const overlay = document.getElementById("nav-overlay");
  const body = document.body;

  function openMobileNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    if (overlay) overlay.classList.add("is-open");
    body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-open");
    body.style.overflow = "";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMobileNav() : openMobileNav();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMobileNav);
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

});
