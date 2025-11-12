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

 // ========== THEME TOGGLE ========== 
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

// Check if theme was previously saved in localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  updateThemeIcon('sun');
} else {
  body.classList.remove('light-mode');
  updateThemeIcon('moon');
}

// Theme toggle button click handler
themeToggleBtn.addEventListener('click', () => {
  // Toggle the light-mode class
  body.classList.toggle('light-mode');
  
  // Determine current theme and save to localStorage
  const isLightMode = body.classList.contains('light-mode');
  const currentTheme = isLightMode ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);
  
  // Update icon
  const iconName = isLightMode ? 'sun' : 'moon';
  updateThemeIcon(iconName);
});

// Function to update the theme icon
function updateThemeIcon(iconName) {
  const icon = themeToggleBtn.querySelector('i');
  if (iconName === 'sun') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}
}
