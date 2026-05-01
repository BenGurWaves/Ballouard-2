/**
 * Ballouard — The Timekeeper's Dial
 * A Velocity Website
 * 
 * Navigation: NO SCROLL. Click & drag to rotate. Click markers to expand.
 * Invention: "Rotating Dial Navigation" — like turning a watch crown
 */

(function() {
    'use strict';

    const dialRing = document.getElementById('dialRing');
    const markers = document.querySelectorAll('.dial-marker');
    
    let currentRotation = 0;
    let isDragging = false;
    let startAngle = 0;
    let startRotation = 0;
    let activeIndex = 0;

    // Position markers in a circle
    function positionMarkers() {
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
        
        markers.forEach((marker, index) => {
            const baseAngle = parseFloat(marker.dataset.angle);
            // Position around the dial
            marker.style.transform = `rotate(${baseAngle}deg) translateY(-${radius}px) rotate(-${baseAngle}deg)`;
        });
    }

    // Get angle from center to point
    function getAngle(x, y) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    }

    // Update which marker is active (at 12 o'clock position)
    function updateActiveMarker() {
        // Normalize rotation to 0-360
        const normalizedRotation = ((currentRotation % 360) + 360) % 360;
        
        // Find which marker is closest to top (0 degrees / 360 degrees)
        // Top position corresponds to -currentRotation
        const targetAngle = (360 - normalizedRotation) % 360;
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        markers.forEach((marker, index) => {
            const markerAngle = parseFloat(marker.dataset.angle);
            const distance = Math.abs(markerAngle - targetAngle);
            const wrapDistance = Math.abs(markerAngle - (targetAngle + 360));
            const minDistance = Math.min(distance, wrapDistance);
            
            if (minDistance < closestDistance) {
                closestDistance = minDistance;
                closestIndex = index;
            }
            
            marker.classList.remove('active');
        });
        
        markers[closestIndex].classList.add('active');
        activeIndex = closestIndex;
    }

    // Rotate to a specific marker
    function rotateToMarker(index) {
        const targetAngle = parseFloat(markers[index].dataset.angle);
        // Calculate shortest rotation to get this marker to top (0 degrees)
        const targetRotation = -targetAngle;
        
        // Animate to target
        dialRing.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        currentRotation = targetRotation;
        dialRing.style.transform = `rotate(${currentRotation}deg)`;
        
        setTimeout(() => {
            dialRing.style.transition = '';
            updateActiveMarker();
        }, 600);
    }

    // Mouse/Touch Events for Dragging
    function startDrag(e) {
        isDragging = true;
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        startAngle = getAngle(x, y);
        startRotation = currentRotation;
        dialRing.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        const currentAngle = getAngle(x, y);
        
        const angleDiff = currentAngle - startAngle;
        currentRotation = startRotation + angleDiff;
        
        dialRing.style.transform = `rotate(${currentRotation}deg)`;
        updateActiveMarker();
    }

    function endDrag() {
        isDragging = false;
        dialRing.style.cursor = 'grab';
        
        // Snap to nearest marker
        const normalizedRotation = ((currentRotation % 360) + 360) % 360;
        const targetAngle = (360 - normalizedRotation) % 360;
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        markers.forEach((marker, index) => {
            const markerAngle = parseFloat(marker.dataset.angle);
            const distance = Math.abs(markerAngle - targetAngle);
            const wrapDistance = Math.abs(markerAngle - (targetAngle + 360));
            const minDistance = Math.min(distance, wrapDistance);
            
            if (minDistance < closestDistance) {
                closestDistance = minDistance;
                closestIndex = index;
            }
        });
        
        rotateToMarker(closestIndex);
    }

    // Click on markers to rotate to them
    markers.forEach((marker, index) => {
        marker.addEventListener('click', (e) => {
            if (isDragging) return;
            e.stopPropagation();
            rotateToMarker(index);
        });
    });

    // Dial ring events
    dialRing.addEventListener('mousedown', startDrag);
    dialRing.addEventListener('touchstart', startDrag, { passive: false });
    
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag, { passive: false });
    
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    // Initialize
    positionMarkers();
    updateActiveMarker();
    
    // Handle resize
    window.addEventListener('resize', () => {
        positionMarkers();
    });
})();
