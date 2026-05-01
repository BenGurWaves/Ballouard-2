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

    // ===== TEXT SPLITTING FOR WORD-BY-WORD ANIMATION =====
    function splitTextIntoWords() {
        const headlines = document.querySelectorAll('.mega-headline');
        headlines.forEach(headline => {
            const text = headline.textContent;
            const words = text.split(' ');
            headline.innerHTML = words.map(word => 
                `<span class="word" style="display: inline-block; overflow: hidden;"><span class="word-inner" style="display: inline-block; transform: translateY(100%); opacity: 0;">${word}</span></span>`
            ).join(' ');
            
            // Animate words in
            setTimeout(() => {
                const wordInners = headline.querySelectorAll('.word-inner');
                wordInners.forEach((inner, i) => {
                    setTimeout(() => {
                        inner.style.transition = 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 1.2s ease';
                        inner.style.transform = 'translateY(0)';
                        inner.style.opacity = '1';
                    }, i * 100);
                });
            }, 500);
        });
    }
    
    // Split text after loader
    setTimeout(splitTextIntoWords, 1000);

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

    // Sync Lenis scroll with temporal focus and kinetic effects
    lenis.on('scroll', ({ scroll, velocity }) => {
        applyTemporalFocus();
        
        // ===== KINETIC PARALLAX DEPTH =====
        const scrolled = scroll;
        const viewportHeight = window.innerHeight;
        
        // Apply parallax to mega headline
        const megaHeadline = document.querySelector('.mega-headline');
        if (megaHeadline) {
            const rect = megaHeadline.getBoundingClientRect();
            const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            const offset = scrolled * 0.3; // Slower than scroll
            megaHeadline.style.transform = `translateY(${offset * 0.5}px)`;
        }
        
        // Apply parallax to floating elements (opposite direction)
        const floatingElements = document.querySelectorAll('.floating-headline, .abstract-time');
        floatingElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const offset = scrolled * -0.15; // Faster than scroll
                el.style.transform = `translateY(${offset}px)`;
            }
        });
        
        // Massive text kinetic movement based on scroll velocity
        const massiveTexts = document.querySelectorAll('.massive-text');
        massiveTexts.forEach(text => {
            const rect = text.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Subtle rotation based on scroll position
                const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
                const rotation = centerOffset * 5; // Max 5 degrees
                text.style.transform = `rotate(${180 + rotation}deg)`;
            }
        });
        
        // ===== SCROLL STOP AT EMAIL CENTER =====
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
