"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const items = gsap.utils.toArray<HTMLElement>(".bento-item");

      gsap.fromTo(
        items,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="ingredients"
      ref={containerRef}
      className="w-full py-24 px-4 md:px-8 bg-wood-bg"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-wood-primary mb-4">
            La Colección
          </h2>
          <p className="font-sans text-wood-text/70 uppercase tracking-widest text-sm">
            Esenciales Curados
          </p>
        </div>

        {/* Horizontal Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Item 1: Large Main Feature (Left, spans 2 cols, 2 rows) */}
          <div className="bento-item col-span-1 md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-wood-primary text-wood-bg p-8 flex flex-col justify-between shadow-lg">
            <div className="absolute inset-0 bg-[url('/images/1.jpg')] bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-wood-primary/90 to-transparent" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full border border-wood-bg/30 text-xs uppercase tracking-wider mb-4 backdrop-blur-sm">
                Más Vendido
              </span>
              <h3 className="font-serif text-4xl md:text-5xl leading-tight mb-2">
                Tablas de Cortar <br /> Artesanales
              </h3>
            </div>

            <div className="relative z-10">
              <p className="text-wood-bg/90 mb-6 max-w-sm text-sm md:text-base">
                Talladas a mano a partir de piezas únicas de nogal sostenible.
                Cada tabla es única, capaz de durar generaciones con el cuidado
                adecuado.
              </p>
              <button className="bg-wood-bg text-wood-primary px-6 py-3 rounded-full font-bold uppercase tracking-wide text-xs hover:bg-white transition-colors">
                Comprar Ahora
              </button>
            </div>
          </div>

          {/* Item 2: Top Right (Wide, spans 2 cols, 1 row) */}
          <div className="bento-item col-span-1 md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl bg-[#E8E1D5] p-8 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col justify-center h-full z-10 max-w-[50%]">
              <h4 className="font-serif text-3xl text-wood-primary mb-2">
                Sostenible
              </h4>
              <p className="text-wood-text/80 text-sm mb-4">
                Obtenido responsablemente de bosques certificados.
              </p>
              <a
                href="#"
                className="text-wood-details font-bold uppercase text-xs tracking-wider hover:underline"
              >
                Ver Historia &rarr;
              </a>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
              <Image
                src="/images/2.jpg"
                alt="Madera sostenible"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Item 3: Bottom Middle (Square-ish, 1 col, 1 row) */}
          <div className="bento-item col-span-1 md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-wood-details text-wood-bg p-6 flex flex-col justify-center items-center text-center shadow-md">
            <div className="absolute inset-0 bg-[url('/images/3.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
            <div className="relative z-10">
              <h4 className="font-serif text-4xl mb-1">100%</h4>
              <p className="text-xs uppercase tracking-widest opacity-80">
                Acabado en Aceite Natural
              </p>
            </div>
          </div>

          {/* Item 4: Bottom Right (1 col, 1 row) */}
          <div className="bento-item col-span-1 md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-wood-primary p-6 flex flex-col justify-between shadow-md">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
            <div className="relative z-10">
              <h4 className="font-serif text-2xl text-wood-bg mb-2">
                Personalizado
              </h4>
              <p className="text-wood-bg/80 text-xs">
                Grabado láser disponible para regalos.
              </p>
            </div>
            <div className="relative z-10 self-end mt-4">
              <div className="w-10 h-10 rounded-full bg-wood-bg/20 flex items-center justify-center text-wood-bg cursor-pointer hover:bg-wood-bg hover:text-wood-primary transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
