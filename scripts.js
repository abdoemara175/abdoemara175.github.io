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

 // ========== LINK PREVIEW CARD FUNCTIONS ==========
function copyToClipboard() {
 const url = window.location.href;
 navigator.clipboard.writeText(url).then(() => {
 const btn = event.target;
 const originalText = btn.textContent;
 btn.textContent = 'Copied!';
 btn.style.background = 'rgba(255, 215, 0, 0.8)';
 setTimeout(() => {
 btn.textContent = originalText;
 btn.style.background = '';
 }, 2000);
 }).catch(err => {
 alert('Failed to copy: ' + err);
 });
}

function shareLink() {
 const shareData = {
 title: 'Abdelrahman Emara - Portfolio',
 text: 'Check out my portfolio & CV - UI/UX Designer & Web Developer',
 url: window.location.href
 };
 
 if (navigator.share) {
 navigator.share(shareData).catch(err => console.log('Error sharing:', err));
 } else {
 // Fallback: copy to clipboard
 navigator.clipboard.writeText(shareData.url).then(() => {
 alert('Link copied to clipboard!');
 }).catch(err => {
 alert('Failed to share: ' + err);
 });
 }
}
}
