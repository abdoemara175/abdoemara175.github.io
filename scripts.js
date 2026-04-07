// ========== LOADING SPINNER ==========
window.addEventListener('load', () => {
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (loadingSpinner) {
    setTimeout(() => {
      loadingSpinner.classList.add('hidden');
    }, 500); // Hide after 500ms of page load
  }
});

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

// Start animation when page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', typeAndDeleteAnimation);
} else {
  typeAndDeleteAnimation();
}

// ========== NAVBAR SCROLL BEHAVIOR ==========
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
 // Get the height of the hero section
 const heroHeight = heroSection ? heroSection.offsetHeight : 100;
 
 // Show navbar only after scrolling past the hero section
 if (window.scrollY > heroHeight - 100) {
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
    
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentPos = 0;

    // Function to get current transform value
    function getTranslateX() {
        const style = window.getComputedStyle(eventsGrid);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    }

    function handleDragStart(e) {
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        
        // Get current position from animation
        currentTranslate = getTranslateX();
        prevTranslate = currentTranslate;
        
        eventsGrid.classList.add('dragging');
        eventsGrid.style.transform = `translateX(${currentTranslate}px)`;
        
        cancelAnimationFrame(animationID);
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        
        // Infinite loop logic during drag
        const totalWidth = eventsGrid.scrollWidth / 2;
        if (currentTranslate > 0) {
            currentTranslate -= totalWidth;
            startX = currentX;
            prevTranslate = currentTranslate;
        } else if (currentTranslate < -totalWidth) {
            currentTranslate += totalWidth;
            startX = currentX;
            prevTranslate = currentTranslate;
        }
        
        eventsGrid.style.transform = `translateX(${currentTranslate}px)`;
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const totalWidth = eventsGrid.scrollWidth / 2;
        let finalTranslate = currentTranslate % totalWidth;
        if (finalTranslate > 0) finalTranslate -= totalWidth;
        
        eventsGrid.style.transform = `translateX(${finalTranslate}px)`;
        eventsGrid.classList.remove('dragging');
        startJSAnimation(finalTranslate);
    }

    function startJSAnimation(startPos = 0) {
        currentPos = startPos;
        const totalWidth = eventsGrid.scrollWidth / 2;
        
        function animate() {
            if (isDragging) return;
            
            currentPos -= 0.8; // Speed of scroll
            if (currentPos <= -totalWidth) {
                currentPos = 0;
            }
            
            eventsGrid.style.transform = `translateX(${currentPos}px)`;
            animationID = requestAnimationFrame(animate);
        }
        
        cancelAnimationFrame(animationID);
        animationID = requestAnimationFrame(animate);
    }

    // Start the JS-based smooth animation
    setTimeout(() => {
        const totalWidth = eventsGrid.scrollWidth / 2;
        if (totalWidth > 0) startJSAnimation(0);
    }, 500);

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        if (!isDragging) cancelAnimationFrame(animationID);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        if (!isDragging) startJSAnimation(currentPos);
    });

    sliderContainer.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    
    sliderContainer.addEventListener('touchstart', handleDragStart, { passive: true });
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);

    sliderContainer.addEventListener('contextmenu', e => {
        if (isDragging) e.preventDefault();
    });
}
