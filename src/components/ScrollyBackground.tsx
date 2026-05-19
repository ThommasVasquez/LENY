"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // 1. Initial State
      gsap.set(imageRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        scale: 0.8,
        rotation: -15,
        opacity: 0,
      });

      // Reveal animation
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });

      // Float animation
      gsap.to(imageRef.current, {
        yPercent: -45,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // SECTION 1: HERO -> STORY 1 (Origin) [Text is LEFT]
      gsap.to(imageRef.current, {
        left: "80%", // Target: RIGHT (Safe)
        rotation: -45,
        scale: 0.6,
        opacity: 1,
        scrollTrigger: {
          trigger: "#story-origin",
          start: "top bottom", // Start moving as soon as section enters
          end: "center center", // Finish by the time it's centered
          scrub: 1,
        },
      });

      // SECTION 2: STORY 1 -> STORY 2 (Modern Love) [Text is RIGHT]
      gsap.to(imageRef.current, {
        left: "20%", // Target: LEFT (Safe)
        top: "40%",
        rotation: 45,
        scale: 0.7,
        opacity: 1,
        scrollTrigger: {
          trigger: "#story-modern",
          start: "top bottom", // Start moving early to clear the Right side
          end: "center center",
          scrub: 1,
        },
      });

      // SECTION 3: STORY 2 -> STORY 3 (Connect) [Text is LEFT]
      gsap.to(imageRef.current, {
        left: "80%", // Target: RIGHT (Safe)
        top: "60%",
        rotation: 15,
        scale: 0.5,
        opacity: 1,
        scrollTrigger: {
          trigger: "#story-connect",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });

      // SECTION 4: STORY 3 -> FOOTER
      // Landing: Position below text or to the side
      gsap.to(imageRef.current, {
        top: "75%",
        left: "50%",
        scale: 0.6,
        rotation: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: "footer",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    >
      <img
        ref={imageRef}
        src="/wood-utensil.png"
        alt="Wooden Utensil"
        className="absolute w-[60vh] h-auto object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
      />
    </div>
  );
}
