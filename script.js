/* ==========================================================
   GALIH PATMA - PORTFOLIO INTERACTIVITY SCRIPT
   Smooth scrolling, animated counters, typing effect & modal
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Dynamic Typing Effect in Hero ---
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Mobile & Web Developer',
    'Flutter & Dart Specialist',
    'Java Backend Enthusiast',
    'System & BPMN Analyst'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // --- 2. Navbar Scroll Behavior & Active Link Spy ---
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background on scroll
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Scroll Spy for active section highlight
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        drawerLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Back to top click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 3. Mobile Drawer Navigation ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeCvModal();
    }
  });

  // --- 4. Animate Skill Progress Bars on Scroll ---
  const skillBars = document.querySelectorAll('.progress-fill');

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPercent = bar.getAttribute('data-progress');
        bar.style.width = `${targetPercent}%`;
        observer.unobserve(bar);
      }
    });
  }, {
    threshold: 0.25
  });

  skillBars.forEach(bar => {
    skillsObserver.observe(bar);
  });

  // --- 5. Interactive 3D Tilt for Project Cards ---
  const projectCards = document.querySelectorAll('.project-card[data-tilt]');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // --- 6. CV Preview & Download Modal ---
  const cvModalBackdrop = document.getElementById('cv-modal-backdrop');
  const cvModalCloseBtn = document.getElementById('cv-modal-close');
  const cvCloseActionBtn = document.getElementById('cv-close-action-btn');
  const cvPrintBtn = document.getElementById('cv-print-btn');
  const cvOpenButtons = document.querySelectorAll('.cv-btn-open');

  function openCvModal() {
    if (cvModalBackdrop) {
      cvModalBackdrop.classList.add('active');
      cvModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    if (cvModalBackdrop) {
      cvModalBackdrop.classList.remove('active');
      cvModalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  cvOpenButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      openCvModal();
    });
  });

  if (cvModalCloseBtn) cvModalCloseBtn.addEventListener('click', closeCvModal);
  if (cvCloseActionBtn) cvCloseActionBtn.addEventListener('click', closeCvModal);

  if (cvModalBackdrop) {
    cvModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cvModalBackdrop) {
        closeCvModal();
      }
    });
  }

  if (cvPrintBtn) {
    cvPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- 7. Contact Form Validation & Submission ---
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset error states
      [nameInput, emailInput, messageInput].forEach(input => {
        input.closest('.form-group').classList.remove('has-error');
      });

      // Name validation
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      // Email validation
      if (!validateEmail(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      // Message validation
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (isValid) {
        // Show loading state on button
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          
          formFeedback.style.display = 'flex';
          contactForm.reset();

          // Hide feedback after 5 seconds
          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 5000);
        }, 1000);
      }
    });
  }

});
