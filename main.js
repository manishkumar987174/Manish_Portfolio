import { animate, inView, scroll } from 'https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm';

// --- Page Loader ---
const loader = document.getElementById('loader');
if (loader) {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    animate(loader, { opacity: 0, scale: 0.95 }, { duration: 0.6, easing: 'ease-out' }).then(() => {
      loader.remove();
      document.body.style.overflow = 'auto';
      triggerEntryAnimations();
    });
  }, 1000);
} else {
  triggerEntryAnimations();
}

// --- Classic Theme Toggle (Light / Dark) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Check stored theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
  htmlEl.classList.add('dark');
  updateThemeIcon(true);
} else {
  htmlEl.classList.remove('dark');
  updateThemeIcon(false);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });
}

function updateThemeIcon(isDark) {
  const sunIcon = document.getElementById('theme-sun');
  const moonIcon = document.getElementById('theme-moon');
  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

// --- Scroll Progress and Sticky Navbar ---
const navbar = document.getElementById('navbar');
scroll((progress, info) => {
  // Sticky Navbar glassmorphism class on scroll
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

// Scroll progress bar
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  scroll(animate(scrollProgress, { scaleX: [0, 1] }));
}

// --- Mobile Navigation Menu ---
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
      // Animate slide down
      animate(mobileMenu, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.3 });
    }
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuOpenIcon.classList.remove('hidden');
      menuCloseIcon.classList.add('hidden');
    });
  });
}

// --- Typewriter Effect in Hero ---
const typeTarget = document.getElementById('typewriter-text');
if (typeTarget) {
  const words = ["Software Developer", "Full Stack Developer", "15+ Projects Completed"];
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

    typeTarget.textContent = text || '\u00A0'; // Use non-breaking space when empty

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


// --- Contact Form Submission ---
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

    // Show Loading state
    if (submitBtn) submitBtn.disabled = true;
    if (submitLoader) submitLoader.classList.remove('hidden');
    if (submitText) submitText.textContent = 'Sending...';
    if (statusSuccess) statusSuccess.classList.add('hidden');
    if (statusError) statusError.classList.add('hidden');

    try {
      // Attempt sending via express nodemailer server route
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
      
      // Fallback: Use mailto link
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

// --- Scroll-to-Top Button ---
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

// --- Motion.js Animation Setup ---
function triggerEntryAnimations() {
  // 1. Hero text entry animations
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

  // 2. Scroll trigger animations for sections
  inView('.animate-view-fade', (info) => {
    animate(info.target, { opacity: [0, 1], y: [30, 0] }, { 
      duration: 0.7, 
      easing: 'ease-out' 
    });
  });

  inView('.animate-view-timeline', (info) => {
    // Reveal child nodes one by one
    const nodes = info.target.querySelectorAll('.timeline-node');
    if (nodes.length > 0) {
      animate(nodes, { opacity: [0, 1], x: [-15, 0] }, {
        duration: 0.5,
        easing: 'ease-out'
      });
    }
  });
}


// --- Music Player (Lady Gaga & Bruno Mars - Die With A Smile) ---
const audio = document.getElementById('portfolio-audio');
const musicBtn = document.getElementById('music-play-btn');
let isPlaying = false;

if (musicBtn && audio) {
  musicBtn.addEventListener('click', toggleMusic);
  
  // Hook HTML5 audio events to sync visual play states
  audio.addEventListener('play', () => setMusicState(true));
  audio.addEventListener('pause', () => setMusicState(false));
}

function toggleMusic() {
  if (!audio) return;
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(err => {
      console.warn("Audio play failed: user interaction is required first.", err);
    });
  }
}

function setMusicState(playing) {
  isPlaying = playing;
  const eq = document.getElementById('music-equalizer');
  const playIcon = document.getElementById('music-play-icon');
  const pauseIcon = document.getElementById('music-pause-icon');

  if (playing) {
    if (eq) {
      eq.classList.remove('hidden');
      eq.classList.add('flex');
    }
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');
  } else {
    if (eq) {
      eq.classList.add('hidden');
      eq.classList.remove('flex');
    }
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
  }
}

// --- Music Player Scroll Visibility ---
const musicPlayerContainer = document.getElementById('music-player-container');
if (musicPlayerContainer) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      musicPlayerContainer.classList.add('opacity-0', 'pointer-events-none');
    } else {
      musicPlayerContainer.classList.remove('opacity-0', 'pointer-events-none');
    }
  });
}
