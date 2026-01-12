// --- Smooth Cursor with Lerp (Linear Interpolation) ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate dot movement
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

const animateCursor = () => {
    // Lerp for smooth trailing effect
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
};
animateCursor();

// --- Magnetic & Hover Effects ---
const interactables = document.querySelectorAll(".magnetic, a, .speaker-card, .topic-item");

interactables.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "80px";
        cursorOutline.style.height = "80px";
        cursorOutline.style.backgroundColor = "rgba(0, 242, 255, 0.1)";
        cursorOutline.style.borderColor = "transparent";
        cursorOutline.style.transform = `translate(${outlineX - 40}px, ${outlineY - 40}px)`;
    });
    
    el.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.borderColor = "var(--accent-color)";
    });

    // Magnetic effect for elements with .magnetic class
    if (el.classList.contains('magnetic')) {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    }
});

// --- Background Particles ---
const particlesContainer = document.getElementById('particles');
const particleCount = 40;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random floating animation
    const duration = Math.random() * 20 + 10;
    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)` }
    ], {
        duration: duration * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
    
    particlesContainer.appendChild(particle);
}

// --- Card Glow & Tilt Effect ---
const speakerCards = document.querySelectorAll('.speaker-card');
speakerCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

// Details Card Glow Follow
const detailsCard = document.querySelector('.details-card');
const glowFollow = document.querySelector('.card-glow-follow');

detailsCard.addEventListener('mousemove', (e) => {
    const rect = detailsCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowFollow.style.left = `${x}px`;
    glowFollow.style.top = `${y}px`;
});

// --- Scroll Effects ---
const header = document.getElementById("main-header");
const revealElements = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    // Header
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    // Reveal
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) el.classList.add("active");
    });

    // Parallax Orbs
    const scrolled = window.pageYOffset;
    document.querySelectorAll(".glow-orb").forEach((orb, i) => {
        const speed = (i + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Trigger initial reveal
window.dispatchEvent(new Event('scroll'));