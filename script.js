/**
 * Ballouard — The Guilloché Reveal
 * A Velocity Website
 * 
 * Navigation: Standard scroll, but the guilloché pattern spiral-cuts away.
 * Invention: "Spiral Guilloché Reveal" — Canvas pattern reveals content on scroll
 */

(function() {
    'use strict';

    const canvas = document.getElementById('guillocheCanvas');
    const ctx = canvas.getContext('2d');
    const progressBar = document.querySelector('.progress-bar');
    
    let scrollProgress = 0;
    let targetProgress = 0;
    let animationId = null;

    // Guilloché pattern parameters
    const waves = [
        { freq: 20, amp: 15, speed: 0.002, phase: 0 },
        { freq: 15, amp: 10, speed: 0.003, phase: Math.PI / 3 },
        { freq: 25, amp: 8, speed: 0.0015, phase: Math.PI / 2 },
        { freq: 12, amp: 12, speed: 0.0025, phase: Math.PI }
    ];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw guilloché pattern
    function drawGuilloche() {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.sqrt(width * width + height * height) / 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Calculate reveal radius based on scroll progress
        // 0 = full pattern (no reveal)
        // 1 = fully revealed (pattern completely cut away)
        const revealRadius = maxRadius * scrollProgress * 1.5;
        
        // Draw pattern
        ctx.strokeStyle = '#796F66';
        ctx.lineWidth = 1;
        
        // Create spiral wave pattern
        for (let r = 0; r < maxRadius; r += 3) {
            // Check if this ring should be visible
            // Pattern is visible when r > revealRadius (outside the cut)
            if (r < revealRadius) continue;
            
            ctx.beginPath();
            
            for (let angle = 0; angle <= Math.PI * 2; angle += 0.02) {
                // Calculate wave displacement
                let displacement = 0;
                waves.forEach((wave, i) => {
                    displacement += Math.sin(angle * wave.freq + wave.phase + r * wave.speed) * wave.amp;
                });
                
                // Add spiral twist
                const spiralOffset = r * 0.01;
                const finalAngle = angle + spiralOffset;
                
                const x = centerX + Math.cos(finalAngle) * (r + displacement);
                const y = centerY + Math.sin(finalAngle) * (r + displacement);
                
                if (angle === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.closePath();
            
            // Gradient opacity based on distance from reveal edge
            const distanceFromReveal = r - revealRadius;
            const maxFade = 100;
            let opacity = 1;
            
            if (distanceFromReveal < maxFade) {
                opacity = distanceFromReveal / maxFade;
            }
            
            // Fade pattern at outer edges too
            if (r > maxRadius - 50) {
                opacity *= (maxRadius - r) / 50;
            }
            
            ctx.globalAlpha = Math.max(0, Math.min(1, opacity * 0.6));
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
    }

    // Smooth scroll animation loop
    function animate() {
        // Lerp scrollProgress toward targetProgress
        const diff = targetProgress - scrollProgress;
        if (Math.abs(diff) > 0.001) {
            scrollProgress += diff * 0.1;
            drawGuilloche();
            
            // Update progress bar
            if (progressBar) {
                progressBar.style.width = (scrollProgress * 100) + '%';
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }

    // Scroll handler
    function handleScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        targetProgress = Math.min(1, Math.max(0, scrollTop / docHeight));
    }

    // Lenis smooth scroll
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with our scroll handler
    lenis.on('scroll', handleScroll);

    // Start animation loop
    animate();

    // Initial draw
    drawGuilloche();
})();
