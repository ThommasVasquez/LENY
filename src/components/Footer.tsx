"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-20 bg-black text-[#f5f0e6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Logo Section */}
        <div className="relative w-64 h-16 mb-12">
          <Image
            src="/artesanias-leny.svg"
            alt="Artesanias Leny"
            fill
            className="object-contain invert"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left w-full mb-16 border-t border-white/10 pt-16">
          <div>
            <h4 className="font-serif text-xl mb-6">Contacto</h4>
            <p className="font-sans text-white/80 text-sm leading-relaxed">
              hello@leny.com
              <br />
              +1 (555) 000-0000
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-serif text-xl mb-6">Redes Sociales</h4>
            <div className="flex gap-6 text-sm font-sans tracking-widest uppercase text-white/60">
              <a href="#" className="hover:text-white transition-colors">
                Insta
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Fb
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pin
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-serif text-xl mb-6">Visita</h4>
            <p className="font-sans text-white/80 text-sm leading-relaxed">
              123 Craftsman Lane
              <br />
              Woodstock, NY 12498
            </p>
          </div>
        </div>

        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center opacity-60 text-xs font-sans tracking-widest uppercase text-white">
          <span>© {new Date().getFullYear()} Leny Artículos de Madera</span>
          <span>Diseñado con la Naturaleza</span>
        </div>
      </div>
    </footer>
  );
}
