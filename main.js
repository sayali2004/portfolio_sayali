/* ==========================================================================
   SAYALI CHOUGULE - PORTFOLIO INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. THEME SWITCHER (DARK / LIGHT MODE)
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  const savedTheme = localStorage.getItem('sayali_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('sayali_portfolio_theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-moon';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
      }
    }
  }

  // 2. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. NAVBAR ACTIVE HIGHLIGHT ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 4. PROJECT FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // 5. PROJECT DETAILS MODAL DATA
  const projectData = {
    'surakshaa': {
      title: "Surakshaa App (Accident Detection & Medical QR)",
      category: "Mobile App & IoT Integration",
      tech: ["Flutter", "Dart", "Firebase", "IoT Device Integration", "VS Code"],
      description: "Created a secure QR-based Android app storing critical medical and emergency contact details. Features automated accident detection utilizing device and hardware sensor data, triggering real-time emergency alert SMS and GPS notifications."
    },
    'drowsiness': {
      title: "Driver Drowsiness Detection System",
      category: "IoT & Embedded Safety",
      tech: ["IoT", "Arduino Programming", "C / C++", "Hardware Sensors"],
      description: "Developed an IoT safety system designed to detect driver drowsiness signals in real-time. Employs sensor inputs to monitor driver eye movements and head tilt, immediately emitting audio alarms and alert signals."
    },
    'success': {
      title: "Success Navigator Educational Website",
      category: "Full Stack Web Portal",
      tech: ["PHP", "HTML5", "CSS3", "JavaScript", "MySQL"],
      description: "Developed an educational web platform tailored for competitive exam aspirants (NEET, CET, MPSC, UPSC). Features mock tests, resource downloading, user registration, and structured study modules."
    },
    'covid': {
      title: "COVID-19 Prevention System for College",
      category: "IoT & Security System",
      tech: ["RFID", "Arduino Programming", "IoT Sensors", "C++"],
      description: "Implemented an RFID-based contactless entrance monitoring system for college premises during the pandemic. Verified student identities and logged access data to enforce campus safety protocols."
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalBody = document.getElementById('projectModalBody');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const closeProjectModalBtns = [document.getElementById('closeProjectModal'), document.getElementById('closeProjectModal2')];

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];

      if (data && projectModal) {
        projectModalTitle.textContent = data.title;
        projectModalBody.innerHTML = `
          <div class="modal-project-details">
            <span class="project-cat-badge" style="display:inline-block; margin-bottom:1rem;">${data.category}</span>
            <p style="font-size:1.02rem; color:var(--text-primary); margin-bottom:1.5rem; line-height:1.6;">${data.description}</p>
            <h4 style="font-size:0.95rem; color:var(--accent-sap); margin-bottom:0.75rem;">Technologies & Tools Used:</h4>
            <div class="tech-pill-row">
              ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
          </div>
        `;
        projectModal.classList.add('active');
      }
    });
  });

  closeProjectModalBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        projectModal.classList.remove('active');
      });
    }
  });

  // 6. RESUME MODAL
  const openResumeBtn = document.getElementById('openResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModalBtns = [document.getElementById('closeResumeModal'), document.getElementById('closeResumeModal2')];

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });
  }

  closeResumeModalBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        resumeModal.classList.remove('active');
      });
    }
  });

  // Close modals when clicking overlay outside
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.classList.remove('active');
    if (e.target === resumeModal) resumeModal.classList.remove('active');
  });

  // 7. CONTACT FORM SUBMISSION & EMAIL DIRECTING
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      const mailtoUrl = `mailto:sayalichougule1107@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      
      showToast(`Thank you, ${name}! Opening your email client to send to sayalichougule1107@gmail.com...`);
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);
    });
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981; font-size:1.2rem;"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

});
