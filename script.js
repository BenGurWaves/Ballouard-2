// Ballouard Digital Atelier - Timeless Elegance by Velocity
// Swiss International Style: Content informs design
// Clean, refined, no broken effects

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

    // ===== LENIS SMOOTH SCROLL - Clean & Refined =====
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ===== TEMPORAL FOCUS - Simple opacity only =====
    const moments = document.querySelectorAll('.moment');
    const temporalTexts = document.querySelectorAll('.temporal-text');

    function applyTemporalFocus() {
        const viewportCenter = window.innerHeight / 2;
        let closestMoment = null;
        let closestDistance = Infinity;
        
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

    applyTemporalFocus();
    lenis.on('scroll', applyTemporalFocus);
    window.addEventListener('resize', applyTemporalFocus);

    // ===== SCROLL STOP AT EMAIL CENTER =====
    lenis.on('scroll', ({ scroll }) => {
        const contactLink = document.querySelector('.contact-link');
        if (contactLink) {
            const rect = contactLink.getBoundingClientRect();
            const emailCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            if (emailCenter <= viewportCenter && scroll < maxScroll) {
                const emailOffset = rect.top + window.scrollY - viewportCenter + rect.height / 2;
                lenis.stop();
                lenis.scrollTo(emailOffset, { immediate: true });
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
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .contact-link, .nav-credit');
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
