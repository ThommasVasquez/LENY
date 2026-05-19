"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHILOSOPHY_LINES = [
  "La madera no es solo un material.",
  "Es un recuerdo vivo del bosque.",
  "Honramos este recuerdo.",
  "Creando artefactos.",
  "Que respiran.",
  "Que perduran.",
  "Que inspiran.",
];

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".phi-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2 screens worth of scroll
          scrub: 1,
          pin: true,
        },
      });

      // Stagger visually revealing lines
      tl.fromTo(
        lines,
        { opacity: 0.1, y: 20, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-wood-bg flex items-center justify-center overflow-hidden"
    >
      <div ref={textRef} className="max-w-5xl px-6 text-center">
        {PHILOSOPHY_LINES.map((line, index) => (
          <h2
            key={index}
            className="phi-line font-serif text-4xl md:text-6xl lg:text-7xl text-wood-primary leading-tight py-2"
          >
            {line}
          </h2>
        ))}
        <div className="mt-12 opacity-0 phi-line">
          <p className="font-sans text-wood-primary/60 text-sm tracking-widest uppercase">
            El Alma de la Madera
          </p>
        </div>
      </div>
    </section>
  );
}
