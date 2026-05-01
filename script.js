/**
 * Ballouard — The Chronometer's Breath
 * A Velocity Website
 * 
 * Metaphor: Time as living mechanism, breathing at 3Hz
 * Invention: "Escapement Tension" — magnetic cursor resistance
 */

(function() {
    'use strict';

    // ===== TENSION FIELD — The Escapement Invention =====
    const tensionField = document.querySelector('.tension-field');
    const escapementAnchor = document.querySelector('.escapement-anchor');
    const orbits = document.querySelectorAll('.orbit');
    const breathingNodes = document.querySelectorAll('.breathing-node');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let tensionX = mouseX;
    let tensionY = mouseY;
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Tension field animation with magnetic resistance
    function animateTension() {
        // Smooth follow with resistance (like winding a watch)
        tensionX += (mouseX - tensionX) * 0.08;
        tensionY += (mouseY - tensionY) * 0.08;
        
        if (tensionField) {
            tensionField.style.left = tensionX + 'px';
            tensionField.style.top = tensionY + 'px';
            
            // Calculate distance from anchor for tension effect
            const anchorRect = escapementAnchor.getBoundingClientRect();
            const anchorX = anchorRect.left + anchorRect.width / 2;
            const anchorY = anchorRect.top + anchorRect.height / 2;
            const distance = Math.sqrt(Math.pow(tensionX - anchorX, 2) + Math.pow(tensionY - anchorY, 2));
            
            // Apply tension class when close to anchor
            if (distance < 200) {
                tensionField.classList.add('tension-high');
            } else {
                tensionField.classList.remove('tension-high');
            }
        }
        
        requestAnimationFrame(animateTension);
    }
    animateTension();
    
    // ===== ORBIT ACTIVATION — Scroll-based focus =====
    function updateOrbits() {
        const viewportCenter = window.innerHeight / 2;
        
        orbits.forEach(orbit => {
            const rect = orbit.getBoundingClientRect();
            const orbitCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - orbitCenter);
            
            // Activate orbit when near viewport center
            if (distance < window.innerHeight / 3) {
                orbit.classList.add('active');
            } else {
                orbit.classList.remove('active');
            }
            
            // Magnetic pull toward cursor for active orbits
            if (orbit.classList.contains('active')) {
                const pullStrength = 0.02;
                const offsetX = (mouseX - window.innerWidth / 2) * pullStrength;
                const offsetY = (mouseY - window.innerHeight / 2) * pullStrength;
                
                const node = orbit.querySelector('.breathing-node');
                if (node) {
                    node.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            }
        });
    }
    
    // ===== LENIS SMOOTH SCROLL =====
    const lenis = new Lenis({
        duration: 1.8, // Slower, more elegant
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.6, // Heavier feel
        touchMultiplier: 1.2,
        infinite: false,
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Sync scroll with orbit updates
    lenis.on('scroll', () => {
        updateOrbits();
        updateProgressWheel();
    });
    
    // ===== ESCAPEMENT PROGRESS WHEEL =====
    const progressFill = document.querySelector('.wheel-fill');
    
    function updateProgressWheel() {
        if (!progressFill) return;
        
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / docHeight;
        const circumference = 283; // 2 * PI * 45
        const offset = circumference - (progress * circumference);
        
        progressFill.style.strokeDashoffset = offset;
    }
    
    // ===== INITIALIZE =====
    updateOrbits();
    window.addEventListener('resize', updateOrbits);
    
    // Click to release tension (escapement snap)
    document.addEventListener('click', () => {
        orbits.forEach(orbit => {
            const node = orbit.querySelector('.breathing-node');
            if (node) {
                // Snap animation
                node.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                node.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    node.style.transition = '';
                    node.style.transform = '';
                }, 300);
            }
        });
    });
})();
