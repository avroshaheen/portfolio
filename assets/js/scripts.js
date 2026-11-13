
// ==========================================
// Theme Management
// ==========================================

const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

const savedTheme = localStorage.getItem("theme");
const currentTheme =
  document.documentElement.getAttribute("data-theme") ||
  savedTheme ||
  systemTheme;

// Ensure the current theme is applied
document.documentElement.setAttribute("data-theme", currentTheme);

updateThemeIcon(currentTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const activeTheme =
      document.documentElement.getAttribute("data-theme");

    const newTheme = activeTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!themeIcon) return;

  if (theme === "dark") {
    // Sun Icon
    themeIcon.innerHTML = `
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM6.166 18.894a.75.75 0 0 1-1.06-1.06l1.59-1.591a.75.75 0 0 1 1.061 1.06l-1.59 1.591ZM2.25 12a.75.75 0 0 1 .75-.75H5.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM6.166 6.166a.75.75 0 0 1 1.06-1.06l1.59 1.591a.75.75 0 0 1-1.061 1.06l-1.59-1.591Z" />
    `;
  } else {
    // Moon Icon
    themeIcon.innerHTML = `
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" />
    `;
  }
}


// ==========================================
// Mobile Navigation Toggle
// ==========================================

const mobileToggleBtn = document.getElementById("mobile-toggle");
const navLinks = document.getElementById("nav-links");

function setMobileMenuIcon(isActive) {
  if (!mobileToggleBtn) return;

  if (isActive) {
    // Close Icon
    mobileToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24" height="24"
           fill="none" viewBox="0 0 24 24"
           stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;
  } else {
    // Hamburger Icon
    mobileToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24" height="24"
           fill="none" viewBox="0 0 24 24"
           stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    `;
  }
}

if (mobileToggleBtn && navLinks) {
  mobileToggleBtn.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");

    document.body.style.overflow = isActive ? "hidden" : "";

    setMobileMenuIcon(isActive);
  });

  // Close mobile menu when a navigation link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = "";

      setMobileMenuIcon(false);
    });
  });
}


// ==========================================
// Update Year in Footer
// ==========================================

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// ==========================================
// Active Navigation Link
// ==========================================

const currentPage = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");

  if (!href) return;

  link.classList.remove("active");

  const linkPage = href.split("/").pop();

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});


// ==========================================
// Carousel Logic (About Page)
// ==========================================

const slideEls = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

if (slideEls.length && prevBtn && nextBtn) {
  let index = 0;

  slideEls[index].classList.add("active");

  function goTo(i) {
    slideEls[index].classList.remove("active");

    index = (i + slideEls.length) % slideEls.length;

    slideEls[index].classList.add("active");
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));
}


// ==========================================
// Contact Form Logic (Contact Page)
// ==========================================

// Frontend-only form.
// No actual email is sent without a backend or form service.

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Simulated submission feedback
    const btnSpan = submitBtn
      ? submitBtn.querySelector("span")
      : null;

    const originalText = btnSpan ? btnSpan.textContent : "";

    if (btnSpan) {
      btnSpan.textContent = "Sending...";
    }

    if (submitBtn) {
      submitBtn.disabled = true;
    }

    if (formStatus) {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }

    setTimeout(() => {
      if (formStatus) {
        formStatus.textContent =
          "Thanks for your message! I'll get back to you soon.";

        formStatus.className = "form-status success";
      }

      contactForm.reset();

      if (btnSpan) {
        btnSpan.textContent = originalText;
      }

      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }, 800);
  });
}
