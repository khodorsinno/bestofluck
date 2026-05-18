/* ========================================
   SCRIPT.JS - Interactive Animations
   Floating Particles & Dynamic Effects
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize particle system
  initializeParticles();

  // Initialize smooth scroll
  initializeSmoothScroll();
});

/**
 * Initialize floating particles animation
 * Creates random particles that float upward across the screen
 */
function initializeParticles() {
  const particleContainer = document.querySelector(".particles");

  if (!particleContainer) return;

  // Configuration
  const particleCount = 40;
  const colors = ["#e0aaff", "#ff6b9d", "#c77dff"];

  /**
   * Create a single particle
   */
  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;

    // Random size
    const size = Math.random() * 3 + 1;

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random animation duration
    const duration = Math.random() * 5 + 8;

    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 200;

    // Style the particle
    particle.style.left = startX + "px";
    particle.style.top = startY + "px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
    particle.style.animation = `floatParticle ${duration}s infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";

    // Add keyframes dynamically for this specific particle
    const keyframes = `
      @keyframes floatParticle-${Math.random().toString(36).substr(2, 9)} {
        0% {
          transform: translateY(0) translateX(0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-${window.innerHeight + 100}px) translateX(${drift}px) scale(0);
          opacity: 0;
        }
      }
    `;

    particleContainer.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  // Create initial particles
  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createParticle();
    }, i * 100);
  }

  // Continuously create new particles
  setInterval(() => {
    if (particleContainer.children.length < particleCount) {
      createParticle();
    }
  }, 500);
}

/**
 * Initialize smooth scroll behavior for navigation
 */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Optional: Add interactivity to GIF container
 * Uncomment to enable click effects
 */
window.addEventListener("load", function () {
  const gifContainer = document.querySelector(".gif-container");

  if (gifContainer) {
    gifContainer.addEventListener("click", function () {
      // Add a brief scale animation on click
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "";
      }, 10);
    });

    // Add pointer tracking effect (subtle follow)
    document.addEventListener("mousemove", function (e) {
      if (window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const container = document.querySelector(".content-wrapper");
        if (container) {
          const offsetX = (mouseX - 0.5) * 5;
          const offsetY = (mouseY - 0.5) * 5;
          container.style.transform = `perspective(1000px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`;
          container.style.transition = "transform 0.1s ease-out";
        }
      }
    });
  }
});

/**
 * Performance optimization: Reduce particle count on lower-end devices
 */
if (window.matchMedia("(max-width: 480px)").matches) {
  // Reduce particles on mobile
  const particleContainer = document.querySelector(".particles");
  if (particleContainer) {
    const originalCount = 40;
    const mobileCount = 20;
    // This is handled through CSS media queries as well
  }
}

// Log when the page is ready
console.log("✨ Good Luck Page loaded successfully! ✨");
