"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const upsideDownRef = useRef<HTMLDivElement>(null);
  const halfTimeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      const headerChars = headerRef.current?.querySelectorAll(".char");
      if (headerChars) {
        gsap.fromTo(
          headerChars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.02,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Line reveal
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // UPSIDE DOWN reveal
      const udChars = upsideDownRef.current?.querySelectorAll(".char");
      if (udChars) {
        gsap.fromTo(
          udChars,
          { y: 80, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.4,
            stagger: 0.01,
            ease: "power4.out",
            scrollTrigger: {
              trigger: upsideDownRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // HALF TIME reveal
      const htChars = halfTimeRef.current?.querySelectorAll(".char");
      if (htChars) {
        gsap.fromTo(
          htChars,
          { y: 80, opacity: 0, rotateY: 15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.4,
            stagger: 0.01,
            ease: "power4.out",
            scrollTrigger: {
              trigger: halfTimeRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] py-[10vh]"
    >
      {/* Section header */}
      <div className="section-padded">
        <div ref={headerRef} className="overflow-hidden mb-4">
          <p className="technical text-pencil tracking-[0.3em]">
            <SplitText text="THE COLLECTIONS" />
          </p>
        </div>
        <div className="overflow-hidden">
          <h2 className="display-section text-ink">
            <SplitText text="TIMEPIECES" />
          </h2>
        </div>
      </div>

      {/* Architectural line */}
      <div
        ref={lineRef}
        className="absolute top-[35vh] left-[var(--gutter)] right-[var(--gutter)] h-px bg-gradient-to-r from-whisper via-whisper to-transparent origin-left"
      />

      {/* UPSIDE DOWN — 2009 */}
      <div
        ref={upsideDownRef}
        className="section-padded cursor-pointer magnetic-hover"
        onMouseEnter={() => setHoveredCollection("upside-down")}
        onMouseLeave={() => setHoveredCollection(null)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left — Year and Title */}
          <div className="lg:col-span-5">
            <p className="technical text-pencil mb-6 tracking-[0.3em]">2009</p>
            <h3 className="display-section text-ink leading-[0.9]">
              <div className="overflow-hidden">
                <SplitText text="UPSIDE" />
              </div>
              <div className="overflow-hidden mt-[-0.02em]">
                <span 
                  className="inline-block transition-transform duration-1000 ease-out"
                  style={{ 
                    transform: hoveredCollection === "upside-down" ? "rotate(0deg)" : "rotate(180deg)"
                  }}
                >
                  <SplitText text="DOWN" />
                </span>
              </div>
            </h3>
          </div>

          {/* Right — Description and Specs */}
          <div className="lg:col-span-7 lg:pt-16">
            <p className="editorial-large text-ink mb-12 max-w-lg">
              All hour numerals upside down except the current hour.
              <br />
              <span className="text-pencil">Past and future literally inverted.</span>
            </p>
            
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="technical text-pencil mb-2">MOVEMENT</p>
                <p className="font-mono text-sm text-ink leading-relaxed">
                  51 jewels
                  <br />
                  228 components
                </p>
              </div>
              <div>
                <p className="technical text-pencil mb-2">CALIBRE</p>
                <p className="font-mono text-sm text-ink">B01</p>
              </div>
              <div>
                <p className="technical text-pencil mb-2">PATENTED</p>
                <p className="font-mono text-sm text-ink">In-house</p>
              </div>
            </div>

            {/* Mechanism reveal */}
            <div 
              className="mt-12 overflow-hidden transition-all duration-700"
              style={{ 
                maxHeight: hoveredCollection === "upside-down" ? "100px" : "0",
                opacity: hoveredCollection === "upside-down" ? 1 : 0
              }}
            >
              <p className="editorial-small text-pencil">
                Hour discs jump simultaneously at the hour change.
                Snail-cam mechanism visible through caseback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider — minimal */}
      <div className="h-[15vh]" />

      {/* HALF TIME — 2013 */}
      <div
        ref={halfTimeRef}
        className="section-padded cursor-pointer magnetic-hover"
        onMouseEnter={() => setHoveredCollection("half-time")}
        onMouseLeave={() => setHoveredCollection(null)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left — Year and Title */}
          <div className="lg:col-span-5">
            <p className="technical text-pencil mb-6 tracking-[0.3em]">2013</p>
            <h3 className="display-section text-ink leading-[0.9]">
              <div className="overflow-hidden">
                <SplitText text="HALF" />
              </div>
              <div className="overflow-hidden mt-[-0.02em]">
                <SplitText text="TIME" />
              </div>
            </h3>
          </div>

          {/* Right — Description and Specs */}
          <div className="lg:col-span-7 lg:pt-16">
            <p className="editorial-large text-ink mb-12 max-w-lg">
              Hour numerals split in half across two discs.
              <br />
              <span className="text-pencil">Only the current hour is complete — lines up at 12 o&apos;clock.</span>
            </p>
            
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="technical text-pencil mb-2">MECHANISM</p>
                <p className="font-mono text-sm text-ink leading-relaxed">
                  Outer counter-
                  <br />
                  clockwise
                </p>
              </div>
              <div>
                <p className="technical text-pencil mb-2">INNER</p>
                <p className="font-mono text-sm text-ink">Clockwise</p>
              </div>
              <div>
                <p className="technical text-pencil mb-2">COMPLEXITY</p>
                <p className="font-mono text-sm text-ink">More than UD</p>
              </div>
            </div>

            {/* Split disc visualization */}
            <div 
              className="mt-12 grid grid-cols-3 gap-4 transition-all duration-1000"
              style={{ opacity: hoveredCollection === "half-time" ? 1 : 0.3 }}
            >
              <div className="border border-whisper/50 p-6 text-center">
                <div className="font-mono text-4xl text-ink mb-2 transition-transform duration-700"
                  style={{ transform: hoveredCollection === "half-time" ? "translateX(-8px)" : "translateX(0)" }}
                >1</div>
                <p className="technical text-pencil">INNER</p>
              </div>
              <div className="border border-whisper/50 p-6 text-center">
                <div className="font-mono text-4xl text-ink mb-2 transition-transform duration-700"
                  style={{ transform: hoveredCollection === "half-time" ? "translateX(8px)" : "translateX(0)" }}
                >2</div>
                <p className="technical text-pencil">OUTER</p>
              </div>
              <div className="border border-ink bg-ink p-6 text-center">
                <div className="font-mono text-4xl text-paper mb-2">12</div>
                <p className="technical text-paper/70">COMPLETE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
