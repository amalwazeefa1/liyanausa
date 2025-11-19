//prgress circle
window.addEventListener("scroll", () => {
  const progressEl = document.querySelector(".progress");
  if (!progressEl) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  const offset = 157 - 157 * scrollPercent; // 157 = 2πr

  progressEl.style.strokeDashoffset = offset;
});

// Back to Top Button
const backToTopButton = document.querySelector(".back-to-top");
if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Page Navigation System
document.addEventListener("DOMContentLoaded", function () {
  // Initialize scroll animations
  initScrollAnimations();
  // set active nav and interactions
  if (typeof setActiveNav === 'function') setActiveNav();
  if (typeof initNavInteractions === 'function') initNavInteractions();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.innerHTML = navMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slider-dot");
const slideCount = slides.length;

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show selected slide
  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

// Set up dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetAutoSlide(); // Reset timer when manually changing slide
  });
});

// Auto slide functionality
let slideInterval;

function startAutoSlide() {
  slideInterval = setInterval(() => {
    let nextSlide = (currentSlide + 1) % slideCount;
    showSlide(nextSlide);
  }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// Initialize auto slide
startAutoSlide();

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialCount = testimonials.length;

function showTestimonial(index) {
  // Hide all testimonials
  testimonials.forEach((testimonial) => {
    testimonial.classList.remove("active");
  });

  // Remove active class from all dots
  testimonialDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show selected testimonial
  testimonials[index].classList.add("active");
  testimonialDots[index].classList.add("active");

  currentTestimonial = index;
}

// Set up testimonial dot navigation
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index);
  });
});

// Auto testimonial rotation
setInterval(() => {
  let nextTestimonial = (currentTestimonial + 1) % testimonialCount;
  showTestimonial(nextTestimonial);
}, 7000); // Change testimonial every 7 seconds

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".service-tile, .highlight-item, .why-choose-item, .industry-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Number Counter Animation
function initNumberCounter() {
  const counters = document.querySelectorAll(".stat-number");
  // Larger `speed` value => smaller increments per tick => slower animation
  const speed = 600; // increased from 200 to slow the count
  // Use a small delay between ticks (ms)
  const tickDelay = 10; // was 1 ms, now 10 ms for a visibly slower animation

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      // Lower inc to slow and higher to slow
      const inc = target / speed;

      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counter.innerText = Math.ceil(count + inc);
        // Call function after tickDelay ms
        setTimeout(updateCount, tickDelay);
      } else {
        counter.innerText = target;
      }
    };

    // Start animation when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCount();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counter);
  });
}

// Initialize number counter
initNumberCounter();

// Service Tabs Functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    // Show corresponding content
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// Form Submission
const quoteForm = document.getElementById("crossTradeQuoteForm");

if (quoteForm) {
  quoteForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Thank you for your cross trade quote request! Our specialists will contact you shortly."
    );
    quoteForm.reset();
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

// Service Modal Functionality
const readMoreButtons = document.querySelectorAll(".read-more");
const serviceModals = document.querySelectorAll(".service-modal");
const closeModalButtons = document.querySelectorAll(".close-modal");

// Open modal when Read More is clicked
readMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const serviceId = button.getAttribute("data-service");
    const modal = document.getElementById(`modal-${serviceId}`);
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  });
});

// Close modal when X is clicked
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".service-modal");
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  });
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  serviceModals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  });
});

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    serviceModals.forEach((modal) => {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    });
  }
});



// --- Active link helpers (mark nav links active based on current page and clicks) ---
function setActiveNav() {
  const links = Array.from(document.querySelectorAll('a.nav-link'));
  if (!links.length) return;

  // get current file name
  let path = window.location.pathname || window.location.href;
  let current = path.split('/').pop();
  if (!current || current === '') current = 'index.html';

  links.forEach(link => link.classList.remove('active'));

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const cleanHref = href.split('?')[0].split('#')[0].replace(/^\/+/, '').replace(/^\.\//, '');
    const hrefName = (cleanHref === '' || cleanHref === '/') ? 'index.html' : cleanHref;

    if (hrefName === current) {
      link.classList.add('active');
      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        const parentLink = dropdown.querySelector('a.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });

  // fallback: try partial matching
  if (!document.querySelector('a.nav-link.active')) {
    links.forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/^\/+/, '');
      if (href && current.indexOf(href) !== -1) link.classList.add('active');
    });
  }
}

function initNavInteractions() {
  const links = Array.from(document.querySelectorAll('a.nav-link'));
  const navMenu = document.querySelector('.nav-menu');
  const hamburgerEl = document.querySelector('.hamburger');
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        const parentLink = dropdown.querySelector('a.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburgerEl) hamburgerEl.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
}

