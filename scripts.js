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
 if (window.scrollY > 100) {
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
 
 skillItems.forEach((item, index) => {
 setTimeout(() => {
 item.classList.add('animate');
 const progressBar = item.querySelector('.skill-progress');
 const progress = progressBar.getAttribute('data-progress');
 progressBar.style.setProperty('--progress', progress + '%');
 }, index * 100);
 });
 }
 });
}, {
 threshold: 0.3
});

if (skillsSection) {
 skillsObserver.observe(skillsSection);
}

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('.nav-section-link, .nav-brand').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== EVENTS AUTO-SCROLL ==========
const eventsGrid = document.querySelector('.events-grid');
const eventCards = document.querySelectorAll('.event-card');
let eventIndex = 0;

function autoScrollEvents() {
    if (!eventsGrid || eventCards.length === 0) return;
    
    eventIndex++;
    
    // Calculate how many cards are visible
    const containerWidth = document.querySelector('.events-slider-container').offsetWidth;
    const cardWidth = eventCards[0].offsetWidth + 24; // width + gap (1.5rem = 24px)
    const maxIndex = eventCards.length - Math.floor(containerWidth / cardWidth);
    
    if (eventIndex > maxIndex) {
        eventIndex = 0;
    }
    
    const translateX = -eventIndex * cardWidth;
    eventsGrid.style.transform = `translateX(${translateX}px)`;
}

// Change slide every 3 seconds
let eventInterval = setInterval(autoScrollEvents, 3000);

// Pause on hover
const sliderContainer = document.querySelector('.events-slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(eventInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        eventInterval = setInterval(autoScrollEvents, 3000);
    });
}

// ========== MAGNETIC EFFECT FOR CONTACT ICONS ==========
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    const icon = card.querySelector('.contact-icon-box');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 50;
        
        if (distance < maxDistance) {
            const strength = (1 - distance / maxDistance) * 15;
            icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        icon.style.transform = '';
    });
});

// ========== ACTIVITY ITEM HOVER EFFECT ==========
const activityItems = document.querySelectorAll('.activity-item');

activityItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'slideIn 0.4s ease-out';
    });
});

// ========== SCROLL PROGRESS INDICATOR ==========
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Optional: Add a visual progress bar if needed
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
}

window.addEventListener('scroll', updateScrollProgress);

// ========== PARALLAX EFFECT FOR HERO IMAGE ==========
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.5;
        if (heroImage) {
            heroImage.style.transform = `translateY(${offset}px)`;
        }
    }
});

// ========== ENHANCED SECTION TITLE ANIMATION ==========
const sectionTitles = document.querySelectorAll('.section-title');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'titleGlow 2s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// ========== SKILL ITEM STAGGER ANIMATION ==========
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach((item, index) => {
    item.style.setProperty('--stagger-delay', `${index * 0.1}s`);
});

// ========== SMOOTH HOVER EFFECT FOR CARDS ==========
const allCards = document.querySelectorAll('.skill-item, .event-card, .course-group, .activity-group');

allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// ========== CURSOR TRAIL EFFECT ==========
document.addEventListener('mousemove', (e) => {
    // Optional: Add cursor trail particles for extra delight
    // This is a lightweight version that doesn't impact performance
    const x = e.clientX;
    const y = e.clientY;
    
    // Update cursor position for potential use in other effects
    document.documentElement.style.setProperty('--mouse-x', x + 'px');
    document.documentElement.style.setProperty('--mouse-y', y + 'px');
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Perform heavy operations here if needed
    }, 100);
}, { passive: true });
