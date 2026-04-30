"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);
  const presentRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Past section — inverted, fading in
      const pastChars = pastRef.current?.querySelectorAll(".char");
      if (pastChars) {
        gsap.fromTo(
          pastChars,
          { y: 60, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 0.25,
            rotateX: 180,
            duration: 1.2,
            stagger: 0.02,
            ease: "power4.out",
            scrollTrigger: {
              trigger: pastRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Present section — pinned, dramatic reveal
      const presentChars = presentRef.current?.querySelectorAll(".char");
      if (presentChars) {
        gsap.fromTo(
          presentChars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.4,
            stagger: 0.015,
            ease: "power4.out",
            scrollTrigger: {
              trigger: presentRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Future section — inverted, fading
      const futureChars = futureRef.current?.querySelectorAll(".char");
      if (futureChars) {
        gsap.fromTo(
          futureChars,
          { y: -60, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 0.2,
            rotateX: 180,
            duration: 1.2,
            stagger: 0.02,
            ease: "power4.out",
            scrollTrigger: {
              trigger: futureRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Architectural lines
      gsap.fromTo(
        line1Ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        line2Ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] py-[10vh]"
    >
      {/* Architectural line */}
      <div
        ref={line1Ref}
        className="absolute top-[15vh] left-[var(--gutter)] right-[var(--gutter)] h-px bg-gradient-to-r from-whisper via-whisper to-transparent origin-left"
      />

      {/* Past — inverted, upside down, faded */}
      <div
        ref={pastRef}
        className="section-padded flex flex-col items-start perspective-1000"
      >
        <p className="technical text-pencil mb-8 tracking-[0.3em]">PAST</p>
        <div className="overflow-hidden" style={{ transform: "rotate(180deg)" }}>
          <h2 className="display-section text-pencil/25" style={{ transform: "rotate(180deg)" }}>
            <SplitText text="TIME IS AN ILLUSION" />
          </h2>
        </div>
      </div>

      {/* Present — full impact, maximum contrast */}
      <div
        ref={presentRef}
        className="section-padded flex flex-col justify-center min-h-[80vh]"
      >
        <p className="technical text-ink mb-12 tracking-[0.3em]">PRESENT</p>
        <div className="overflow-hidden">
          <h2 className="display-hero text-ink leading-[0.82]">
            <div className="overflow-hidden">
              <SplitText text="ONLY THE" />
            </div>
            <div className="overflow-hidden">
              <SplitText text="PRESENT" />
            </div>
            <div className="overflow-hidden">
              <SplitText text="MOMENT" />
            </div>
          </h2>
        </div>
        <p className="editorial-large mt-16 text-ink max-w-md">
          has a meaning
        </p>
      </div>

      {/* Architectural line */}
      <div
        ref={line2Ref}
        className="absolute top-[65vh] left-[var(--gutter)] right-[var(--gutter)] h-px bg-gradient-to-r from-transparent via-whisper to-whisper origin-right"
      />

      {/* Future — inverted, upside down, faded */}
      <div
        ref={futureRef}
        className="section-padded flex flex-col items-end perspective-1000"
      >
        <p className="technical text-pencil mb-8 tracking-[0.3em]">FUTURE</p>
        <div className="overflow-hidden" style={{ transform: "rotate(180deg)" }}>
          <h2 className="display-section text-pencil/20" style={{ transform: "rotate(180deg)" }}>
            <SplitText text="WE MAKE REAL" />
          </h2>
        </div>
      </div>

      {/* Diana Ross reference — subtle, bottom */}
      <div className="absolute bottom-[10vh] left-[var(--gutter)] right-[var(--gutter)] flex justify-between items-end">
        <p className="technical text-pencil">
          REFERENCE
        </p>
        <p className="editorial-small text-pencil italic">
          &ldquo;Upside down you turn me&rdquo; — Diana Ross, 1980
        </p>
      </div>
    </section>
  );
}
