// ========== ANIMATED TITLES IN HERO SECTION ==========
const titles = [
 'FCI-ZU Student',
 'UI/UX Designer',
 'Photographer',
 'Graphic Designer'
];

let titleIndex = 0;
const swipeText = document.getElementById('swipeText');

// Typing and deleting animation
function typeAndDeleteAnimation() {
 const currentTitle = titles[titleIndex];
 let charIndex = 0;
 
 // Typing phase
 function type() {
 if (charIndex < currentTitle.length) {
 swipeText.textContent = currentTitle.substring(0, charIndex + 1);
 charIndex++;
 setTimeout(type, 100);
 } else {
 // Keep text visible for 2 seconds
 setTimeout(deleteText, 2000);
 }
 }
 
 // Deleting phase
 function deleteText() {
 if (charIndex > 0) {
 charIndex--;
 swipeText.textContent = currentTitle.substring(0, charIndex);
 setTimeout(deleteText, 80);
 } else {
 // Move to next title
 titleIndex = (titleIndex + 1) % titles.length;
 setTimeout(typeAndDeleteAnimation, 500);
 }
 }
 
 type();
}

// Start animation
typeAndDeleteAnimation();

// ========== NAVBAR SCROLL BEHAVIOR ==========
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
 if (window.scrollY > heroSection.offsetHeight - 100) {
 navbar.classList.add('show');
 } else {
 navbar.classList.remove('show');
 }
});

// ========== SECTION ANIMATIONS ==========
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 }
 });
}, {
 threshold: 0.1
});

sections.forEach(section => {
 observer.observe(section);
});

// ========== SKILLS PROGRESS ANIMATION ==========
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting && !skillsAnimated) {
 skillsAnimated = true;
 const skillItems = document.querySelectorAll('.skill-item');
 
 skillItems.forEach(item => {
 item.classList.add('animate');
 const progressBar = item.querySelector('.skill-progress');
 const progress = progressBar.getAttribute('data-progress');
 progressBar.style.setProperty('--progress', progress + '%');
 });
 }
 });
}, {
 threshold: 0.3
});

if (skillsSection) {
 skillsObserver.observe(skillsSection);
}

// ========== CONTACT ICONS SINGLE CLICK ==========
const contactIcons = document.querySelectorAll('.contact-icon');

contactIcons.forEach(icon => {
 icon.addEventListener('click', (e) => {
 e.preventDefault();
 
 // Add click effect
 icon.classList.add('clicked');
 setTimeout(() => {
 icon.classList.remove('clicked');
 }, 300);
 
 // Open the link immediately
 const url = icon.getAttribute('href');
 if (url) {
 window.open(url, '_blank');
 }
 });
});

// ========== SHARE FUNCTION ==========
function sharePortfolio() {
 if (navigator.share) {
 navigator.share({
 title: 'Abdelrahman Emara - Portfolio',
 text: 'Check out my portfolio!',
 url: window.location.href
 }).catch(err => console.log('Error sharing:', err));
 } else {
 // Fallback: copy to clipboard
 navigator.clipboard.writeText(window.location.href);
 alert('Link copied to clipboard!');
 }

  // ========== THEME TOGGLE FUNCTIONALITY ==========

// Initialize theme from localStorage
function initializeTheme() {
 const savedTheme = localStorage.getItem('theme');
 if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  updateThemeToggleIcon();
 } else {
  // Dark mode is default
  document.body.classList.remove('light-mode');
 }
}

// Create and add theme toggle button to navbar
function createThemeToggle() {
 const navContainer = document.querySelector('.nav-container');
 const toggleBtn = document.createElement('button');
 toggleBtn.className = 'theme-toggle';
 toggleBtn.id = 'themeToggle';
 toggleBtn.innerHTML = '🌙'; // Moon icon for dark mode
 toggleBtn.setAttribute('aria-label', 'Toggle theme');
 
 // Add click event
 toggleBtn.addEventListener('click', toggleTheme);
 
 navContainer.appendChild(toggleBtn);
 updateThemeToggleIcon();
}

// Update icon based on current theme
function updateThemeToggleIcon() {
 const toggleBtn = document.getElementById('themeToggle');
 if (toggleBtn) {
  if (document.body.classList.contains('light-mode')) {
   toggleBtn.innerHTML = '☀️'; // Sun icon for light mode
  } else {
   toggleBtn.innerHTML = '🌙'; // Moon icon for dark mode
  }
 }
}

// Toggle theme function
function toggleTheme() {
 document.body.classList.toggle('light-mode');
 
 // Save preference to localStorage
 const isLightMode = document.body.classList.contains('light-mode');
 localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
 
 // Update icon
 updateThemeToggleIcon();
}

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', () => {
 initializeTheme();
 createThemeToggle();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  createThemeToggle();
 });
} else {
 initializeTheme();
 createThemeToggle();
}
}
