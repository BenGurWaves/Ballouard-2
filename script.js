// Ballouard Digital Atelier - Timeless Elegance
// Swiss International Style: Content informs design
// Lenis smooth scroll + Elegant custom cursor + Page loader

(function() {
    'use strict';

    // ===== PAGE LOADER =====
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 400);
        });
    }

    // ===== TEMPORAL FOCUS (defined before Lenis) =====
    const moments = document.querySelectorAll('.moment');
    const temporalTexts = document.querySelectorAll('.temporal-text');

    function applyTemporalFocus() {
        const viewportCenter = window.innerHeight / 2;
        let closestMoment = null;
        let closestDistance = Infinity;
        
        // Find which moment is closest to center of viewport
        moments.forEach(moment => {
            const rect = moment.getBoundingClientRect();
            const momentCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - momentCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestMoment = moment;
            }
        });
        
        const presentIndex = Array.from(moments).indexOf(closestMoment);
        
        temporalTexts.forEach(text => {
            const parentMoment = text.closest('.moment');
            const momentIndex = Array.from(moments).indexOf(parentMoment);
            
            text.classList.remove('blur-past', 'blur-future', 'sharp');
            
            if (momentIndex === presentIndex) {
                text.classList.add('sharp');
            } else if (momentIndex < presentIndex) {
                text.classList.add('blur-past');
            } else {
                text.classList.add('blur-future');
            }
        });
    }

    // Initialize temporal focus
    applyTemporalFocus();
    window.addEventListener('resize', applyTemporalFocus);

    // ===== LENIS SMOOTH SCROLL - Elegant & Timeless =====
    const lenis = new Lenis({
        duration: 1.2,        // Smooth duration (higher = slower)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Elegant easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8, // Slower wheel for weight
        touchMultiplier: 1.5,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis scroll with temporal focus
    lenis.on('scroll', ({ scroll }) => {
        applyTemporalFocus();
        
        // ===== SCROLL STOP AT EMAIL CENTER =====
        const contactLink = document.querySelector('.contact-link');
        if (contactLink) {
            const rect = contactLink.getBoundingClientRect();
            const emailCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            // If email is at or past center, stop scrolling
            if (emailCenter <= viewportCenter && scroll < maxScroll) {
                // Calculate scroll position where email is centered
                const emailOffset = rect.top + window.scrollY - viewportCenter + rect.height / 2;
                
                // Stop Lenis and set to email center position
                lenis.stop();
                lenis.scrollTo(emailOffset, { immediate: true });
                
                // Prevent further scrolling
                setTimeout(() => {
                    lenis.destroy();
                }, 100);
            }
        }
    });

    // ===== ELEGANT CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Main cursor follows immediately
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Follower has delay (elegant trailing effect)
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .contact-link, .nav-brand');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }
})();
