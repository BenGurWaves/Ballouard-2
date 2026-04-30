"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
      return isTouch;
    };
    
    if (checkTouch()) return; // Exit early if touch device

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let scale = 1;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    // Elegant smooth follow
    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.08;
      cursorY += dy * 0.08;
      
      // Subtle scale on hover
      const targetScale = isHovering ? 1.3 : 1;
      scale += (targetScale - scale) * 0.15;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px) scale(${scale})`;
      cursorDot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px) scale(${isHovering ? 0.8 : 1})`;

      requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const handleLinkEnter = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], .magnetic-hover, .cursor-pointer"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkEnter);
        el.addEventListener("mouseleave", handleLinkLeave);
      });
    };

    addHoverListeners();
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], .magnetic-hover, .cursor-pointer"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, [isHovering]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Elegant thin ring cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          willChange: "transform",
          mixBlendMode: "difference"
        }}
      >
        <div className="absolute inset-0 border border-white/80 rounded-full transition-all duration-500" />
        <div className="absolute inset-1 border border-white/30 rounded-full transition-all duration-500" />
      </div>
      
      {/* Subtle center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1 h-1 rounded-full bg-white pointer-events-none z-[9999] transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          willChange: "transform",
          mixBlendMode: "difference"
        }}
      />
    </>
  );
}
