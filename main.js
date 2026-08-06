import { animate, inView, scroll } from 'https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm';

const loader = document.getElementById('loader');
const loaderPercent = document.getElementById('loader-percent');

if (loader) {
  document.body.style.overflow = 'hidden';
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        animate(loader, { opacity: 0, scale: 0.95 }, { duration: 0.6, easing: 'ease-out' }).then(() => {
          loader.remove();
          document.body.style.overflow = 'auto';
          triggerEntryAnimations();
        });
      }, 250);
    }
    
    if (loaderPercent) loaderPercent.textContent = `${progress}%`;
  }, 40);
} else {
  triggerEntryAnimations();
}

const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleSidebarBtn = document.getElementById('theme-toggle-sidebar');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
  htmlEl.classList.add('dark');
  updateThemeIcons(true);
} else {
  htmlEl.classList.remove('dark');
  updateThemeIcons(false);
}

const toggleThemeAction = () => {
  const isDark = htmlEl.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark);
};

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleThemeAction);
}
if (themeToggleSidebarBtn) {
  themeToggleSidebarBtn.addEventListener('click', toggleThemeAction);
}

function updateThemeIcons(isDark) {
  const sunIcon = document.getElementById('theme-sun');
  const moonIcon = document.getElementById('theme-moon');
  const sunSidebarIcon = document.getElementById('theme-sun-sidebar');
  const moonSidebarIcon = document.getElementById('theme-moon-sidebar');

  if (isDark) {
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
    if (sunSidebarIcon) sunSidebarIcon.classList.remove('hidden');
    if (moonSidebarIcon) moonSidebarIcon.classList.add('hidden');
  } else {
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
    if (sunSidebarIcon) sunSidebarIcon.classList.add('hidden');
    if (moonSidebarIcon) moonSidebarIcon.classList.remove('hidden');
  }
}

const navbar = document.getElementById('navbar');
scroll((progress, info) => {
  
  if (navbar && info && info.y) {
    if (info.y.current > 20) {
      navbar.classList.add('classic-glass', 'py-3');
      navbar.classList.remove('bg-transparent', 'py-5');
    } else {
      navbar.classList.remove('classic-glass', 'py-3');
      navbar.classList.add('bg-transparent', 'py-5');
    }
  }
});

const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  scroll(animate(scrollProgress, { scaleX: [0, 1] }));
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuOpenIcon = document.getElementById('menu-open-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('hidden');
    if (isOpen) {
      menuOpenIcon.classList.remove('hidden');
      menuCloseIcon.classList.add('hidden');
    } else {
      menuOpenIcon.classList.add('hidden');
      menuCloseIcon.classList.remove('hidden');
      
      animate(mobileMenu, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.3 });
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuOpenIcon.classList.remove('hidden');
      menuCloseIcon.classList.add('hidden');
    });
  });
}

const typeTarget = document.getElementById('typewriter-text');
if (typeTarget) {
  const words = ["Python Developer", "Full Stack Developer", "Software Developer"];
  let wordIndex = 0;
  let text = '';
  let isDeleting = false;
  let typingSpeed = 150;

  const handleTyping = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      text = currentWord.substring(0, text.length - 1);
    } else {
      text = currentWord.substring(0, text.length + 1);
    }

    typeTarget.textContent = text || '\u00A0'; 

    if (!isDeleting && text === currentWord) {
      setTimeout(() => { isDeleting = true; }, 2000);
      typingSpeed = 100;
    } else if (isDeleting && text === '') {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 150;
    }

    setTimeout(handleTyping, isDeleting ? 75 : typingSpeed);
  };
  
  setTimeout(handleTyping, 1000);
}

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitLoader = document.getElementById('submit-loader');
const statusSuccess = document.getElementById('status-success');
const statusError = document.getElementById('status-error');
const errorMessage = document.getElementById('error-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) return;

    if (submitBtn) submitBtn.disabled = true;
    if (submitLoader) submitLoader.classList.remove('hidden');
    if (submitText) submitText.textContent = 'Sending...';
    if (statusSuccess) statusSuccess.classList.add('hidden');
    if (statusError) statusError.classList.add('hidden');

    try {
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showStatus(true);
        contactForm.reset();
      } else {
        throw new Error(data.error || 'Server submission failed');
      }
    } catch (error) {
      console.warn('Backend API submission failed, falling back to mailto client link.', error);

      try {
        const mailtoSubject = encodeURIComponent(`Portfolio Message from ${name}`);
        const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:manishdeveloper28@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        showStatus(true);
        contactForm.reset();
      } catch (err) {
        showStatus(false, 'Failed to open mail client. Please email me directly.');
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitLoader) submitLoader.classList.add('hidden');
      if (submitText) submitText.textContent = 'Send Message';
    }
  });
}

function showStatus(isSuccess, msg = '') {
  if (isSuccess) {
    if (statusSuccess) {
      statusSuccess.classList.remove('hidden');
      animate(statusSuccess, { opacity: [0, 1], y: [10, 0] }, { duration: 0.4 });
      setTimeout(() => {
        animate(statusSuccess, { opacity: 0 }, { duration: 0.5 }).then(() => statusSuccess.classList.add('hidden'));
      }, 5000);
    }
  } else {
    if (statusError) {
      statusError.classList.remove('hidden');
      if (errorMessage) errorMessage.textContent = msg || 'An error occurred. Please try again.';
      animate(statusError, { opacity: [0, 1], y: [10, 0] }, { duration: 0.4 });
    }
  }
}

const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
  scroll((progress, info) => {
    if (info && info.y && info.y.current > 500) {
      scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.add('opacity-100');
    } else {
      scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.remove('opacity-100');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function triggerEntryAnimations() {
  
  animate('.animate-hero-fade', { opacity: [0, 1], y: [40, 0] }, { 
    delay: 0.15,
    duration: 0.8,
    easing: 'ease-out'
  });
  
  animate('.animate-hero-scale', { opacity: [0, 1], scale: [0.9, 1] }, { 
    delay: 0.3,
    duration: 0.8,
    easing: 'ease-out'
  });

  inView('.animate-view-fade', (info) => {
    animate(info.target, { opacity: [0, 1], y: [30, 0] }, { 
      duration: 0.7, 
      easing: 'ease-out' 
    });
  });

  inView('.animate-view-timeline', (info) => {
    
    const nodes = info.target.querySelectorAll('.timeline-node');
    if (nodes.length > 0) {
      animate(nodes, { opacity: [0, 1], x: [-15, 0] }, {
        duration: 0.5,
        easing: 'ease-out'
      });
    }
  });
}
