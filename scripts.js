// ========== ANIMATED TITLES IN HERO SECTION ==========
const titles = [
    'FCI-ZU Student',
    'UI/UX Designer',
    'Photography',
    'Graphic Designer'
];

let titleIndex = 0;
const swipeText = document.getElementById('swipeText');

function changeTitle() {
    // Fade out
    swipeText.style.opacity = '0';
    
    setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        swipeText.textContent = titles[titleIndex];
        
        // Fade in
        swipeText.style.opacity = '1';
    }, 400);
}

// Change title: 1500ms visible + 800ms transition = 2300ms total
setInterval(changeTitle, 2300);

// ========== NAVBAR SCROLL BEHAVIOR ==========
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
    if (window.scrollY > heroSection.offsetHeight - 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
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
            const progressBars = document.querySelectorAll('.skill-progress');
            
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
        }
    });
}, {
    threshold: 0.3
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ========== CONTACT ICONS DOUBLE CLICK ==========
const contactIcons = document.querySelectorAll('.contact-icon');

contactIcons.forEach(icon => {
    let clickCount = 0;
    let clickTimer = null;
    
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        clickCount++;
        
        if (clickCount === 1) {
            // First click - show effect
            icon.classList.add('clicked');
            
            clickTimer = setTimeout(() => {
                clickCount = 0;
                icon.classList.remove('clicked');
            }, 500);
        } else if (clickCount === 2) {
            // Second click - open link
            clearTimeout(clickTimer);
            clickCount = 0;
            icon.classList.remove('clicked');
            
            const url = icon.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
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
}
