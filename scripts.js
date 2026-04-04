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
}, { passive: true });

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

// ========== SMOOTH INFINITE SCROLL FOR EVENTS ==========
const eventsGrid = document.querySelector('.events-grid');
const eventCards = document.querySelectorAll('.event-card');
const sliderContainer = document.querySelector('.events-slider-container');

if (eventsGrid && eventCards.length > 0) {
    // Clone cards for infinite loop effect
    const clonedCards = Array.from(eventCards).map(card => card.cloneNode(true));
    clonedCards.forEach(card => eventsGrid.appendChild(card));
    
    let currentPosition = 0;
    let isAutoScrolling = true;
    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;
    let autoScrollSpeed = 0.5; // pixels per frame
    let lastFrameTime = Date.now();
    
    const cardWidth = eventCards[0].offsetWidth + 24; // width + gap
    const totalWidth = cardWidth * eventCards.length;
    
    function smoothScroll() {
        if (!isAutoScrolling || isDragging) return;
        
        const now = Date.now();
        const deltaTime = (now - lastFrameTime) / 16.67; // Normalize to 60fps
        lastFrameTime = now;
        
        currentPosition += autoScrollSpeed * deltaTime;
        
        // Infinite loop: reset position when reaching the end
        if (currentPosition >= totalWidth) {
            currentPosition = 0;
        }
        
        eventsGrid.style.transform = `translateX(-${currentPosition}px)`;
        eventsGrid.style.transition = 'none';
        
        requestAnimationFrame(smoothScroll);
    }
    
    // Start smooth scrolling
    smoothScroll();
    
    // ========== DRAG & TOUCH INTERACTION ==========
    let touchStartX = 0;
    let touchStartTime = 0;
    
    function handleDragStart(e) {
        isDragging = true;
        isAutoScrolling = false;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        dragDistance = 0;
        lastFrameTime = Date.now();
    }
    
    function handleDragMove(e) {
        if (!isDragging) return;
        
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        dragDistance = currentX - startX;
        
        eventsGrid.style.transition = 'none';
        eventsGrid.style.transform = `translateX(-${currentPosition - dragDistance}px)`;
    }
    
    function handleDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        // Smooth transition after drag
        eventsGrid.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Calculate swipe velocity
        const swipeThreshold = 50;
        if (Math.abs(dragDistance) > swipeThreshold) {
            const swipeDirection = dragDistance > 0 ? -cardWidth : cardWidth;
            currentPosition -= swipeDirection;
        }
        
        // Ensure position stays within bounds
        if (currentPosition < 0) {
            currentPosition = totalWidth + currentPosition;
        }
        if (currentPosition >= totalWidth) {
            currentPosition = currentPosition - totalWidth;
        }
        
        eventsGrid.style.transform = `translateX(-${currentPosition}px)`;
        
        // Resume auto-scrolling after a delay
        setTimeout(() => {
            isAutoScrolling = true;
            lastFrameTime = Date.now();
        }, 600);
    }
    
    // Mouse events
    sliderContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    
    // Touch events
    sliderContainer.addEventListener('touchstart', handleDragStart);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        isAutoScrolling = false;
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        if (!isDragging) {
            isAutoScrolling = true;
            lastFrameTime = Date.now();
        }
    });
    
    // Prevent text selection while dragging
    sliderContainer.addEventListener('selectstart', (e) => {
        if (isDragging) e.preventDefault();
    });
}

// ========== MAGNETIC EFFECT FOR CONTACT ICONS ==========
const contactCards = document.querySelectorAll('.contact-card');
let lastMagneticUpdate = 0;

contactCards.forEach(card => {
    const icon = card.querySelector('.contact-icon-box');
    
    card.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMagneticUpdate >= 16) { // ~60fps
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const strength = (1 - distance / maxDistance) * 15;
                icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
            }
            lastMagneticUpdate = now;
        }
    }, { passive: true });
    
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

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ========== PARALLAX EFFECT FOR HERO IMAGE ==========
const heroImage = document.querySelector('.hero-image');
let lastParallaxUpdate = 0;

window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastParallaxUpdate >= 16) { // ~60fps
        if (window.scrollY < window.innerHeight) {
            const offset = window.scrollY * 0.5;
            if (heroImage) {
                heroImage.style.transform = `translateY(${offset}px)`;
            }
        }
        lastParallaxUpdate = now;
    }
}, { passive: true });

// ========== ENHANCED SECTION TITLE ANIMATION ==========
const sectionTitles = document.querySelectorAll('.section-title');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'titleGlow 2s ease-in-out infinite';
            entry.target.style.willChange = 'filter';
        } else {
            entry.target.style.willChange = 'auto';
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
    // Preload animation for better performance
    item.style.willChange = 'transform, opacity';
});

// Clean up will-change after animations
setTimeout(() => {
    skillItems.forEach(item => {
        item.style.willChange = 'auto';
    });
}, 2000);

// ========== SMOOTH HOVER EFFECT FOR CARDS ==========
const allCards = document.querySelectorAll('.skill-item, .event-card, .course-group, .activity-group');

allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        this.style.willChange = 'transform, box-shadow';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.willChange = 'auto';
    });
});

// ========== CURSOR TRAIL EFFECT ==========
let lastMouseMove = 0;
const mouseMoveThrottle = 50; // milliseconds

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove >= mouseMoveThrottle) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update cursor position for potential use in other effects
        document.documentElement.style.setProperty('--mouse-x', x + 'px');
        document.documentElement.style.setProperty('--mouse-y', y + 'px');
        
        lastMouseMove = now;
    }
}, { passive: true });

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Perform heavy operations here if needed
    }, 100);
}, { passive: true });

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ========== WILL-CHANGE OPTIMIZATION ==========
// Remove will-change after animation completes to save memory
const animatedElements = document.querySelectorAll('.skill-item, .event-card, .contact-icon-box');
animatedElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.willChange = 'transform';
    });
    el.addEventListener('mouseleave', function() {
        this.style.willChange = 'auto';
    });
});

// ========== REDUCE ANIMATION FOR USERS WHO PREFER IT ==========
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-smooth', 'all 0.01ms ease');
    document.documentElement.style.setProperty('--transition-slow', 'all 0.01ms ease');
}
