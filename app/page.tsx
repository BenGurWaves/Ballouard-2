"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Collections from "@/components/Collections";
import Horologist from "@/components/Horologist";
import Contact from "@/components/Contact";
import LiveTime from "@/components/LiveTime";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Velocity-based skew effect
    let currentSkew = 0;
    let targetSkew = 0;

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      targetSkew = velocity * 0.02;
      targetSkew = Math.max(-2, Math.min(2, targetSkew));
    });

    const updateSkew = () => {
      currentSkew += (targetSkew - currentSkew) * 0.1;
      
      const skewElements = document.querySelectorAll(".velocity-skew");
      skewElements.forEach((el) => {
        gsap.set(el, { skewY: currentSkew });
      });

      targetSkew *= 0.95;
      requestAnimationFrame(updateSkew);
    };

    updateSkew();

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <main className="relative w-full">
      <LiveTime />
      <Hero />
      <Philosophy />
      <Collections />
      <Horologist />
      <Contact />
    </main>
  );
}
