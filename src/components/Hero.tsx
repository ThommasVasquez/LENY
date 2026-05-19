"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const HERO_PRODUCTS = [
  { image: "/images/1.jpg", price: "$50.000", name: "12 Porta Cazuelas" },
  { image: "/images/2.jpg", price: "$8.000", name: "Tabla de Picar Pequeña" },
  { image: "/images/3.jpg", price: "$10.000", name: "Tabla de Picar Mediana" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const mainImageRef = useRef<HTMLImageElement>(null);

  // Refs for quickTo animations
  const bgTextX = useRef<gsap.QuickToFunc>(null);
  const bgTextY = useRef<gsap.QuickToFunc>(null);
  const productX = useRef<gsap.QuickToFunc>(null);
  const productY = useRef<gsap.QuickToFunc>(null);
  const productRotX = useRef<gsap.QuickToFunc>(null);
  const productRotY = useRef<gsap.QuickToFunc>(null);
  const featureX = useRef<gsap.QuickToFunc>(null);
  const featureY = useRef<gsap.QuickToFunc>(null);

  const changeSlide = (index: number) => {
    if (index === activeThumb) return;

    // Optimized transition: Faster fade out/in
    gsap.to(mainImageRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveThumb(index);
        gsap.to(mainImageRef.current, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.inOut",
        });
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((activeThumb + 1) % HERO_PRODUCTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeThumb]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Setup quickTo - Optimized for snappier feel (reduced durations)
      bgTextX.current = gsap.quickTo(".hero-bg-text", "x", {
        duration: 0.5,
        ease: "power2.out",
      });
      bgTextY.current = gsap.quickTo(".hero-bg-text", "y", {
        duration: 0.5,
        ease: "power2.out",
      });

      productX.current = gsap.quickTo(".main-product-container", "x", {
        duration: 0.4,
        ease: "power2.out",
      });
      productY.current = gsap.quickTo(".main-product-container", "y", {
        duration: 0.4,
        ease: "power2.out",
      });
      productRotX.current = gsap.quickTo(
        ".main-product-container",
        "rotationX",
        { duration: 0.4, ease: "power2.out" },
      );
      productRotY.current = gsap.quickTo(
        ".main-product-container",
        "rotationY",
        { duration: 0.4, ease: "power2.out" },
      );

      featureX.current = gsap.quickTo(".feature-card", "x", {
        duration: 0.6,
        ease: "power2.out",
      });
      featureY.current = gsap.quickTo(".feature-card", "y", {
        duration: 0.6,
        ease: "power2.out",
      });

      // 1. Reveal Background Text
      tl.from(".hero-bg-text", {
        y: 100,
        opacity: 0,
        duration: 1.2, // Slightly faster reveal
        stagger: 0.1,
      })
        // 2. Pop in the Main Product
        .from(
          ".main-product-container",
          {
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 1.0, // Slightly faster pop
            ease: "back.out(1.7)",
          },
          "-=0.8",
        )
        // 3. Reveal Left/Right Content
        .from(
          ".hero-content-item",
          {
            y: 30,
            opacity: 0,
            duration: 0.6, // Faster content reveal
            stagger: 0.1,
          },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY, innerWidth, innerHeight } = {
        clientX: e.clientX,
        clientY: e.clientY,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      };

      // Calculate normalized position (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      // Update via quickTo (no new tweens created)
      bgTextX.current?.(xPos * 20);
      bgTextY.current?.(yPos * 20);

      productX.current?.(-xPos * 30);
      productY.current?.(-yPos * 30);
      productRotX.current?.(-yPos * 5);
      productRotY.current?.(xPos * 5);

      featureX.current?.(-xPos * 15);
      featureY.current?.(-yPos * 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[110vh] w-full bg-wood-bg overflow-hidden flex flex-col justify-center pt-28"
    >
      {/* BACKGROUND TYPOGRAPHY */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none opacity-10 md:opacity-100">
        <h1 className="hero-bg-text text-[15vw] leading-[0.8] font-serif text-wood-primary/10 font-bold tracking-tighter text-center mix-blend-multiply">
          Esenciales
          <br />
          en cocina
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center h-full">
        {/* LEFT COLUMN: Description & Thumbs */}
        <div className="md:col-span-3 flex flex-col justify-center md:items-start space-y-8 order-2 md:order-1">
          <div className="hero-content-item">
            <p className="text-wood-details uppercase tracking-[0.2em] text-xs font-bold mb-4">
              Esenciales de Cocina
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-wood-primary mb-6">
              Naturaleza <span className="italic">Redefinida</span>
            </h2>
            <p className="text-wood-text/70 leading-relaxed text-sm md:text-base max-w-xs">
              Herramientas de madera hechas a mano que aportan calidez y
              funcionalidad a tu espacio culinario. Sostenibles, duraderas y
              atemporales.
            </p>
          </div>

          <div className="hero-content-item flex gap-4">
            {HERO_PRODUCTS.map((prod, idx) => (
              <div
                key={idx}
                onClick={() => changeSlide(idx)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeThumb === idx ? "border-wood-primary scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN: Main Product (Floating) */}
        <div className="md:col-span-6 flex justify-center items-center relative order-1 md:order-2 h-[50vh] md:h-auto">
          {/* Decorative Circle Behind */}
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-wood-accent/30 rounded-full blur-3xl -z-10" />

          <div className="main-product-container relative w-[280px] h-[380px] md:w-[400px] md:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border-1 border-white">
            <Image
              ref={mainImageRef}
              src={HERO_PRODUCTS[activeThumb].image}
              alt={HERO_PRODUCTS[activeThumb].name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 400px"
              priority
            />

            {/* Product Tag */}
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-10">
              <span className="text-wood-primary font-bold text-sm">
                {HERO_PRODUCTS[activeThumb].price}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Feature Card */}
        <div className="md:col-span-3 flex flex-col md:items-end justify-center space-y-6 order-3 md:order-3">
          <div className="hero-content-item feature-card bg-[#394D6A] p-6 rounded-3xl shadow-xl max-w-xs w-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-30">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white stroke-current"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 12L11 15L16 9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="font-serif text-xl text-white mb-2">
              Colección cocina esencial!
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Nuestras tablas de nogal de grano final se curan naturalmente de
              los cortes de los cuchillos, manteniéndolas suaves durante años.
            </p>
            <div className="w-full h-24 rounded-xl overflow-hidden relative">
              <Image
                src="/images/2.jpg"
                alt="Detalle"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>

          <div className="hero-content-item">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-wood-primary flex items-center justify-center transition-colors group-hover:bg-wood-primary group-hover:text-white text-wood-primary">
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
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-wood-primary group-hover:underline">
                Ver Video
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
