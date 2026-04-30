"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/SplitText";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "BORN",
    title: "Brittany",
    description: "French father, Dutch mother. Childhood spent building model airplanes.",
  },
  {
    year: "6 YEARS",
    title: "Aircraft Tech",
    description: "Technical foundation in precision mechanics. Six years.",
  },
  {
    year: "1998",
    title: "Watch School",
    description: "Teacher's advice to pursue horology. The pivot begins.",
  },
  {
    year: "3 YEARS",
    title: "Franck Muller",
    description: "After-sales service. Learning complications from masters.",
  },
  {
    year: "7 YEARS",
    title: "F.P. Journe",
    description: "Worked on Sonnerie Souveraine. The pinnacle of chiming.",
  },
  {
    year: "2009",
    title: "Atelier Geneva",
    description: "Founded in Geneva countryside. Independence begins.",
  },
];

export default function Horologist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Timeline line reveal
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline items stagger with character split
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        items.forEach((item, index) => {
          const chars = item.querySelectorAll(".char");
          const dot = item.querySelector(".timeline-dot");
          
          gsap.fromTo(
            chars,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.01,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.05,
            }
          );

          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.05,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-[15vh] inverted-soft"
    >
      <div className="px-[var(--gutter)]">
        {/* Header */}
        <div ref={headerRef} className="mb-[15vh]">
          <div className="overflow-hidden mb-4">
            <p className="technical text-pencil/60 tracking-[0.3em]">
              <SplitText text="THE HOROLOGIST" />
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="display-section text-paper">
              <SplitText text="LUDOVIC BALLOUARD" />
            </h2>
          </div>
          <p className="editorial-large mt-12 text-pencil max-w-xl">
            Whimsical, humorous, deeply technical. 
            <br />
            An independent spirit crafting timepieces by hand in the Geneva countryside.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-px bg-pencil/20 origin-top"
          />

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="timeline-item relative pl-16 pb-[6vh] group cursor-default"
            >
              {/* Dot */}
              <div className="timeline-dot absolute left-0 top-1 w-2 h-2 rounded-full bg-pencil/40 group-hover:bg-paper transition-colors duration-500 -translate-x-1/2" />
              
              {/* Year */}
              <p className="technical text-pencil/60 mb-2 tracking-[0.2em]">
                <SplitText text={event.year} />
              </p>
              
              {/* Title */}
              <h3 className="display-subsection text-paper mb-3 magnetic-hover">
                <SplitText text={event.title} />
              </h3>
              
              {/* Description */}
              <p className="editorial-small text-pencil max-w-md">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy statement */}
        <div className="mt-[15vh] pt-[8vh] border-t border-pencil/20">
          <div className="overflow-hidden">
            <p className="editorial-large text-paper text-center max-w-2xl mx-auto">
              <SplitText text="Time is an illusion we make real." />
            </p>
          </div>
          <p className="editorial-small text-pencil/60 text-center mt-6">
            Past and future don&apos;t matter — only NOW.
          </p>
        </div>
      </div>
    </section>
  );
}
