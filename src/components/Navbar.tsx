"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Inicio", href: "#hero" },
  { name: "Catálogo", href: "#featured" },
  { name: "Proceso", href: "#process" },
  { name: "Nosotros", href: "#ingredients" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      const handleScroll = () => {
        if (window.scrollY > 20) {
          navRef.current?.classList.add("apple-glass");
          gsap.to(navRef.current, {
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          navRef.current?.classList.remove("apple-glass");
          gsap.to(navRef.current, {
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    },
    { scope: navRef },
  );

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all px-6 md:px-8 py-4 flex items-center justify-between w-[95%] max-w-[1400px] rounded-full border border-transparent"
      >
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="relative w-48 h-10 md:w-64 md:h-12 origin-left -ml-2 md:-ml-4">
            <Image
              src="/artesanias-leny.svg"
              alt="Artesanias Leny"
              fill
              className="object-contain dark:invert"
              priority
            />
          </div>
        </Link>

        {/* 2. Center Navigation (Desktop) */}
        <div className="hidden md:flex items-center justify-center gap-2 z-50">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2.5 text-sm font-medium text-wood-primary/80 hover:text-wood-primary hover:bg-wood-secondary/20 rounded-full transition-all dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3 z-50">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-wood-primary dark:text-white transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}
          <button className="px-6 py-2.5 text-sm font-medium text-white bg-wood-primary rounded-full hover:bg-wood-primary/90 transition-all shadow-md hover:shadow-lg dark:bg-wood-details dark:text-wood-primary dark:hover:bg-wood-details/90">
            Contacto
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-wood-primary dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-90 bg-white dark:bg-wood-bg pt-32 px-6 flex flex-col gap-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-serif text-wood-primary font-medium border-b border-wood-primary/10 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="mt-4 px-6 py-4 text-lg font-medium text-white bg-wood-primary rounded-xl hover:bg-wood-primary/90 transition-all shadow-md">
            Contacto
          </button>
        </div>
      )}
    </>
  );
}
