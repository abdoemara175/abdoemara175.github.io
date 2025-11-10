// ========== ANIMATED TITLES IN HERO SECTION ==========
const titles = [
  'FCI-ZU Student',
  'UI/UX Designer',
  'Photographer',
  'Graphic Designer'
];

let titleIndex = 0;
const heroTitle = document.getElementById('heroTitle');

function changeTitle() {
  // Slide out to right
  heroTitle.style.transform = 'translateX(100%)';
  heroTitle.style.opacity = '0';
  
  setTimeout(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    heroTitle.textContent = titles[titleIndex];
    
    // Slide in from left
    setTimeout(() => {
      heroTitle.style.transform = 'translateX(0)';
      heroTitle.style.opacity = '1';
    }, 50);
  }, 500);
}

// Change title every 3 seconds
setInterval(changeTitle, 3000);

// ========== NAVBAR SCROLL BEHAVIOR ==========
const navbar = document.getElementById('navbar');
const navSections = document.getElementById('navSections');
const heroSection = document.getElementById('hero');
let passedSections = new Set();

function updateNavbar() {
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const scrollPosition = window.scrollY;

  // Show navbar after scrolling past hero section
  if (scrollPosition > heroBottom - 100) {
    navbar.classList.add('show');
  } else {
    navbar.classList.remove('show');
  }

  // Track passed sections and add them to navbar
  const sections = document.querySelectorAll('.section[data-section]');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionName = section.getAttribute('data-section');

    // Check if section has been passed (user scrolled past its midpoint)
    if (scrollPosition > (sectionTop + sectionBottom) / 2 || (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 100)) {      if (!passedSections.has(sectionName)) {
        passedSections.add(sectionName);
        addNavSection(sectionName, section.id);
      }
    }
  });
}

function addNavSection(name, id) {
  const link = document.createElement('a');
  link.href = `#${id}`;
  link.className = 'nav-section-link';
  link.textContent = name;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  });
  navSections.appendChild(link);
}

// ========== SCROLL ANIMATIONS FOR SECTIONS ==========
function revealSections() {
  const sections = document.querySelectorAll('.section');
  const windowHeight = window.innerHeight;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 150;

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add('visible');
    }
  });
}

// ========== SKILLS PROGRESS BAR ANIMATION ==========
function animateSkills() {
  const skillItems = document.querySelectorAll('.skill-item');
  const windowHeight = window.innerHeight;

  skillItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < windowHeight - 100 && !item.classList.contains('animate')) {
      item.classList.add('animate');
      
      const progressBar = item.querySelector('.skill-progress');
      const progress = progressBar.getAttribute('data-progress');
      progressBar.style.setProperty('--progress', progress + '%');
      progressBar.style.width = progress + '%';
    }
  });
}

// ========== SMOOTH SCROLLING ==========
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== INITIALIZE ON PAGE LOAD ==========
window.addEventListener('DOMContentLoaded', () => {
  // Initial check
  revealSections();
  animateSkills();
  smoothScroll();
  
  // Show hero section immediately
  heroSection.style.opacity = '1';
  heroSection.style.transform = 'translateY(0)';
});

// ========== SCROLL EVENT LISTENER ==========
window.addEventListener('scroll', () => {
  updateNavbar();
  revealSections();
  animateSkills();
});

// ========== RESIZE EVENT ==========
window.addEventListener('resize', () => {
  revealSections();
  animateSkills();
});
