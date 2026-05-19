"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    number: "01",
    title: "Selección",
    description:
      "Obtenemos solo las mejores maderas duras cosechadas de manera sostenible. Cada pieza es elegida por su carácter de veta único y durabilidad.",
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "La ergonomía se une a la estética. Nuestros diseños se iteran hasta que se sienten como una extensión natural de la mano del chef.",
  },
  {
    number: "03",
    title: "Artesanía",
    description:
      "Acabado a mano con aceites y ceras naturales. Sin lacas sintéticas. Solo protección pura y orgánica que respira.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        steps,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2, // Stagger effect for steps
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full py-32 px-6 bg-wood-primary text-wood-bg relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-4">
            Nuestro Proceso
          </h2>
          <p className="font-sans text-wood-accent/80 max-w-2xl mx-auto">
            Del bosque a la mesa, cada paso es deliberado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="process-step border-t border-wood-details/30 pt-8"
            >
              <span className="block font-serif text-6xl text-wood-details/20 mb-4">
                {step.number}
              </span>
              <h3 className="font-serif text-3xl mb-4">{step.title}</h3>
              <p className="font-sans text-wood-bg/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
