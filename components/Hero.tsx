"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character split animation for name
      const chars = nameRef.current?.querySelectorAll(".char");
      const yearChars = yearRef.current?.querySelectorAll(".char");
      
      if (chars) {
        gsap.fromTo(
          chars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.03,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      if (yearChars) {
        gsap.fromTo(
          yearChars,
          { y: "-100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
            delay: 0.8,
          }
        );
      }

      // Tagline reveal
      gsap.fromTo(
        taglineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
      );

      // Line reveal
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power3.inOut", delay: 1.5 }
      );

      // Parallax on scroll
      gsap.to(nameRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(yearRef.current, {
        y: -300,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-full flex flex-col justify-center"
      style={{ paddingLeft: '6rem' }}
    >
      {/* Year indicator — floating, inverted */}
      <div
        ref={yearRef}
        className="absolute top-[12vh] right-[var(--gutter)] technical text-pencil overflow-hidden"
        style={{ transform: "rotate(180deg)" }}
      >
        <SplitText text="SINCE 2009" className="upside-down" />
      </div>

      {/* Main name — massive, character split */}
      <div ref={nameRef} className="relative z-10">
        <h1 className="display-hero text-ink">
          <div>
            <SplitText text="LUDOVIC" />
          </div>
          <div className="mt-[-0.05em]">
            <SplitText text="BALLOUARD" />
          </div>
        </h1>
        <p className="technical mt-12 text-pencil tracking-[0.3em]">
          ATELIER GENEVA
        </p>
      </div>

      {/* Philosophy — bottom anchored */}
      <div ref={taglineRef} className="mt-auto pt-[25vh] max-w-xl">
        <p className="editorial-large text-ink">
          Only the present moment
          <br />
          <span className="text-pencil">has a meaning</span>
        </p>
      </div>

      {/* Architectural line */}
      <div
        ref={lineRef}
        className="absolute bottom-[20vh] left-[var(--gutter)] right-[var(--gutter)] h-px bg-gradient-to-r from-transparent via-whisper to-transparent origin-left"
      />
    </section>
  );
}
