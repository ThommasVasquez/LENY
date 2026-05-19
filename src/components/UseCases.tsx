"use client";

import Image from "next/image";

const USE_CASES = [
  {
    title: "Maestría Culinaria",
    description:
      "Herramientas artesanales que elevan tu experiencia culinaria. Desde tablas de cortar de precisión hasta rodillos ergonómicos, siente la diferencia del equilibrio natural.",
    image: "/images/1.jpg",
  },
  {
    title: "Calidez Interior",
    description:
      "Agregue un toque de naturaleza a su espacio vital. Nuestros cuencos, bandejas de servicio y acentos traen la presencia calmante del bosque a su hogar.",
    image: "/images/2.jpg",
  },
  {
    title: "Regalos Sostenibles",
    description:
      "Regalos que cuentan una historia. Los grabados personalizados en madera de origen sostenible crean recuerdos inolvidables que duran toda la vida.",
    image: "/artesanias-leny.svg",
  },
];

export default function UseCases() {
  return (
    <section id="process" className="w-full py-24 px-6 md:px-12 bg-wood-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <span className="font-sans text-wood-primary/60 text-sm uppercase tracking-widest mb-2 block">
            Casos de uso
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-wood-primary leading-tight">
            Donde generamos impacto
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USE_CASES.map((item, index) => (
            <div
              key={index}
              className="relative h-[500px] md:h-[600px] bg-wood-secondary/30 rounded-3xl overflow-hidden flex flex-col p-8 md:p-10 group hover:shadow-lg transition-shadow duration-300"
            >
              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-serif text-3xl md:text-4xl text-wood-primary mb-6 leading-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-wood-primary/80 text-base md:text-lg leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>

              {/* Bottom Image */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 w-full overflow-hidden">
                <div className="relative w-full h-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
