"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORY_ITEMS = [
  {
    id: "natural",
    title: "Natural",
    text: "Creado con los mejores materiales sostenibles, aportando el toque de la naturaleza a tu espacio culinario. Cada veta cuenta una historia del bosque del que proviene.",
    image: "/images/3.jpg",
    align: "left",
  },
  {
    id: "timeless",
    title: "Atemporal",
    text: "Diseños que resisten las tendencias y el tiempo, envejeciendo bellamente con cada uso. Una pieza de legado para tu cocina que gana carácter con los años.",
    image: "/images/2.jpg",
    align: "right",
  },
  {
    id: "essential",
    title: "Esencial",
    text: "Herramientas que te conectan con el arte de cocinar. Simples, funcionales y elegantes. Redescubre el placer de la preparación con instrumentos que se sienten correctos.",
    image: "/images/1.jpg",
    align: "left",
  },
];

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".story-item");

      items.forEach((item, index) => {
        const textCol = item.querySelector(".story-text");
        const imgCol = item.querySelector(".story-image");

        // Animate Text
        gsap.fromTo(
          textCol,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%", // Start when top of item hits 80% of viewport
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Animate Image with Parallax
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          imgCol,
          {
            y: 100,
            scale: 1.1,
            opacity: 0,
            rotate: isLeft ? -5 : 5,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
              scrub: 1, // Slight scrub for the image parity
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full py-24 px-4 md:px-12 bg-wood-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {STORY_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={`story-item flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
              item.align === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Column */}
            <div className="story-text flex-1 flex flex-col justify-center">
              <h2 className="font-serif text-5xl md:text-7xl text-wood-primary mb-6">
                {item.title}
              </h2>
              <div className="h-1 w-20 bg-wood-details mb-6" />
              <p className="font-sans text-lg md:text-xl leading-relaxed text-wood-text/80 max-w-md">
                {item.text}
              </p>
            </div>

            {/* Image Column */}
            <div className="story-image flex-1 w-full relative aspect-4/5 md:aspect-square group overflow-hidden rounded-sm shadow-2xl origin-bottom">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Optional overlay */}
              <div className="absolute inset-0 bg-wood-primary/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
