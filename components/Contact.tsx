"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: 0.3,
        }
      );

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
            start: "top 50%",
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
      className="relative min-h-screen py-[20vh] flex flex-col justify-between"
    >
      <div className="px-[var(--gutter)]">
        {/* Header */}
        <div ref={headerRef} className="mb-[12vh]">
          <div className="overflow-hidden mb-4">
            <p className="technical text-pencil/60 tracking-[0.3em]">
              <SplitText text="THE ATELIER" />
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="display-section text-ink">
              <SplitText text="GENEVA COUNTRYSIDE" />
            </h2>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <div className="max-w-2xl mb-[15vh]">
            <p className="editorial-large text-ink mb-8">
              All cases, crowns, and buckles are hand-engraved in Geneva. 
              Each timepiece is crafted individually, not mass-produced.
            </p>
            <p className="editorial-small">
              Independent spirit. Poetic, not industrial.
            </p>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-[15vh]">
            <div>
              <p className="technical text-pencil mb-4 tracking-[0.2em]">ATELIER</p>
              <p className="font-mono text-sm text-ink leading-relaxed">
                Ludovic Ballouard
                <br />
                Geneva Countryside
                <br />
                Switzerland
              </p>
            </div>
            <div>
              <p className="technical text-pencil mb-4 tracking-[0.2em]">INQUIRIES</p>
              <p className="font-mono text-sm text-ink leading-relaxed">
                For appointments
                <br />
                and inquiries:
                <br />
                <span className="text-pencil">atelier@ballouard.com</span>
              </p>
            </div>
            <div>
              <p className="technical text-pencil mb-4 tracking-[0.2em]">CRAFT</p>
              <p className="font-mono text-sm text-ink leading-relaxed">
                Hand-engraved
                <br />
                In-house calibre
                <br />
                B01 movement
              </p>
            </div>
          </div>
        </div>

        {/* Architectural line */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-whisper via-whisper to-transparent origin-left mb-[8vh]"
        />

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="technical text-pencil/60">
              Website by Velocity Agency
            </p>
            <p className="font-mono text-xs text-pencil/40 mt-2">
              &copy;Velocity2026
            </p>
          </div>
          <div className="mt-12 text-center">
            <p className="technical text-pencil">
              &copy;Velocity Agency
            </p>
            <p className="technical text-pencil mt-2">
              Only the present moment has meaning
            </p>
            <p className="technical text-pencil mt-2">
              <a href="https://velocity.calyvent.com" className="text-pencil hover:text-ink transition-colors">
                velocity.calyvent.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
