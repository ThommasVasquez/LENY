"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLLECTION_ITEMS = [
  {
    id: 1,
    title: "12 Porta Cazuelas",
    category: "Cocina Tradicional",
    image: "/images/1.jpg",
    price: "$50.000",
  },
  {
    id: 2,
    title: "Tabla de Picar Pequeña",
    category: "Preparación",
    image: "/images/2.jpg",
    price: "$8.000",
  },
  {
    id: 3,
    title: "Tabla de Picar Mediana",
    category: "Preparación",
    image: "/images/3.jpg",
    price: "$10.000",
  },
  {
    id: 4,
    title: "Tabla de Picar Grande",
    category: "Preparación",
    image: "/wooden.jpg",
    price: "$12.000",
  },
  {
    id: 5,
    title: "12 Tabla de Churrascos con Lámina",
    category: "Servicio",
    image: "/images/1.jpg",
    price: "$260.000",
  },
  {
    id: 6,
    title: "12 Servilleteros",
    category: "Mesa",
    image: "/images/2.jpg",
    price: "$36.000",
  },
  {
    id: 7,
    title: "Pataconera Botella",
    category: "Herramientas",
    image: "/images/3.jpg",
    price: "$15.000",
  },
  {
    id: 8,
    title: "Pataconera Cuadrada",
    category: "Herramientas",
    image: "/wooden.jpg",
    price: "$15.000",
  },
];

export default function FeaturedCollection() {
  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slider = sliderRef.current;
      if (!slider) return;

      const totalWidth = slider.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;

      gsap.to(slider, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="featured"
      ref={containerRef}
      className="w-full h-screen bg-wood-primary overflow-hidden relative"
    >
      <div className="absolute top-12 left-6 md:left-12 z-10 text-wood-bg">
        <h2 className="font-serif text-3xl md:text-5xl">Catálogo de Productos</h2>
        <p className="font-sans text-wood-bg/60 text-sm tracking-wide mt-2">
          DESPLÁZATE PARA EXPLORAR NUESTROS PRECIOS
        </p>
      </div>

      <div ref={sliderRef} className="h-full flex flex-nowrap w-max">
        {COLLECTION_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`w-[80vw] md:w-[50vw] h-full relative border-r border-wood-bg/10 group overflow-hidden flex items-end p-12`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
            />
            <div className="relative z-10 w-full flex justify-between items-end border-t border-white/30 pt-6">
              <div>
                <span className="block text-xs font-bold text-wood-details uppercase tracking-widest mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">
                  {item.title}
                </h3>
                <span className="inline-block px-4 py-2 bg-wood-details text-wood-primary font-bold rounded-full text-lg">
                  {item.price}
                </span>
              </div>
              <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-wood-primary transition-all">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
              </button>
            </div>
          </div>
        ))}
        {/* End Card */}
        <div className="w-[100vw] h-full flex items-center justify-center bg-wood-dark relative">
          <div className="text-center">
            <h3 className="font-serif text-6xl text-wood-bg mb-6">
              Contáctanos
            </h3>
            <button className="px-8 py-4 bg-wood-details text-wood-primary rounded-full font-bold hover:bg-white transition-colors">
              Hacer un Pedido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
