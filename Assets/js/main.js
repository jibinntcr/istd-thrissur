/**
 * ISTD Thrissur Chapter - Interactive Website Script
 * Handles navigation, interactive carousels, animated statistics, modals, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCounters();
  initTestimonialCarousel();
  initModals();
  initForms();
  initFilterTabs();
});

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer || !mobileBackdrop) return;

  function openDrawer() {
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('is-open');
    mobileBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('is-open');
    mobileBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('is-open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeDrawer);
  }

  mobileBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   Animated Number Counters (Intersection Observer)
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observerOptions = {
    threshold: 0.4
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        let startTime = null;

        function animateCount(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);
          el.textContent = `${prefix}${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(animateCount);
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  counterElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Testimonial Carousel (Swipeable, Dot-navigated, Auto-play)
   ========================================================================== */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval = null;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      restartAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      restartAutoSlide();
    });
  }

  // Touch / Drag swipe
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    clearInterval(autoSlideInterval);
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isSwiping) return;
    const diff = startX - currentX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
    }
    isSwiping = false;
    restartAutoSlide();
  });

  // Auto slide timer
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  track.parentElement.addEventListener('mouseleave', () => startAutoSlide());

  startAutoSlide();
}

/* ==========================================================================
   Modals & Popups
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');
  const modals = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('is-active')) {
          modal.classList.remove('is-active');
          document.body.style.overflow = '';
        }
      });
    }
  });
}

/* ==========================================================================
   Forms & Lead Validation
   ========================================================================== */
function initForms() {
  const leadForms = document.querySelectorAll('form[data-handle="lead-form"]');

  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"/>
          </svg> Submitting...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        
        // Close modal if inside one
        const parentModal = form.closest('.modal-overlay');
        if (parentModal) {
          parentModal.classList.remove('is-active');
          document.body.style.overflow = '';
        }

        form.reset();
        showToast('Thank you! Your message has been sent to the ISTD Thrissur Secretariat. We will get back to you shortly.');
      }, 1000);
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F37021" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/* ==========================================================================
   Filter Tabs (Programs & Events Page)
   ========================================================================== */
function initFilterTabs() {
  const filterButtons = document.querySelectorAll('[data-filter-tab]');
  const filterItems = document.querySelectorAll('[data-filter-category]');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter-tab');

      filterButtons.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline-navy');
      });
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline-navy');

      filterItems.forEach(item => {
        const itemCat = item.getAttribute('data-filter-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Global helper for simulated Membership form download
function downloadMembershipForm() {
  showToast('Initiating download: ISTD_Thrissur_Membership_Application_Form.pdf');
  const dummyLink = document.createElement('a');
  dummyLink.href = 'assets/images/logo.jpeg';
  dummyLink.download = 'ISTD_Membership_Form_Thrissur.pdf';
  // simulated trigger
  setTimeout(() => {
    showToast('Download complete. Please fill and email to info@istd.in / jibintcr@gmail.com');
  }, 1200);
}
