import LogoLoop from "../ui/LogoLoop/LogoLoop";

const CarruselMarcas = () => {
  const imageLogos = [
    {
      src: "./logosColaboradores/elpozo.png",
      alt: "El Pozo",
      href: "https://www.elpozo.com/",
    },
    {
      src: "./logosColaboradores/famadesa.png",
      alt: "Famadesa",
      href: "https://famadesa.es/",
    },
    {
      src: "./logosColaboradores/audens.png",
      alt: "Audens Foods",
      href: "https://www.audensfood.com/",
    },
    {
      src: "./logosColaboradores/eurofrits.png",
      alt: "Eurofrits",
      href: "https://www.eurofrits.com/",
    },
    {
      src: "./logosColaboradores/simons.png",
      alt: "Simon’s",
      href: "https://simonsfood.net/",
    },
    {
      src: "./logosColaboradores/laniñadelsur.png",
      alt: "La Niña del Sur",
      href: "https://laninadelsur.com/",
    },
    {
      src: "./logosColaboradores/elguijo.png",
      alt: "El Guijo",
      href: "https://www.dulcesguijo.com/",
    },
    {
      src: "./logosColaboradores/navarra.png",
      alt: "Congelados Navarra",
      href: "https://www.congeladosnavarra.com/es",
    },
    {
      src: "./logosColaboradores/mccain.png",
      alt: "McCain",
      href: "https://mccain.es/",
    },
  ];

  return (
    /* py-24 lg:py-32 para igualar el espaciado vertical de LogisticaCompromiso */
    <section className="py-24 lg:py-32 bg-white border-t border-gray-100 overflow-hidden">
      {/* Contenedor estandarizado max-w-7xl mx-auto px-6 */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        {/* Badge superior opcional para máxima consistencia */}
        <div
          className="flex justify-center items-center gap-3 mb-6"
          data-aos="zoom-in"
        >
          <div className="h-px w-10 bg-blue-700"></div>
          <span className="text-blue-700 font-bold uppercase tracking-[0.3em] text-xs">
            Alianzas Estratégicas
          </span>
          <div className="h-px w-10 bg-blue-700"></div>
        </div>

        <h2
          data-aos="fade-down"
          className="text-3xl md:text-5xl font-bold text-[#011468] mb-8 leading-tight"
        >
          Marcas con las que trabajamos
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Colaboramos con los mejores proveedores de alimentación nacional e
          internacional para garantizar la máxima calidad en tu mesa o negocio.
        </p>
      </div>

      {/* --- ZONA DEL CARRUSEL --- */}
      <div
        data-aos="fade-in"
        data-aos-duration="1500"
        data-aos-delay="400"
        className="relative w-full overflow-hidden"
        style={{ height: "180px" }}
      >
        {/* Degradados laterales optimizados */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 z-10 h-full w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>

        <LogoLoop
          logos={imageLogos}
          speed={60}
          direction="left"
          logoHeight={100}
          gap={80}
          hoverSpeed={0}
          scaleOnHover={true}
          fadeOut={false}
          ariaLabel="Nuestros proveedores de confianza"
        />
      </div>

      {/* Cierre */}
      <div
        className="text-center mt-12"
        data-aos="fade-left"
        data-aos-delay="600"
        data-aos-offset="50"
      >
        <p className="inline-block text-[#D90414] font-bold uppercase text-xs tracking-[0.2em] border-b-2 border-[#D90414]/20 pb-2">
          Y mucho más de 2.000 referencias…
        </p>
      </div>
    </section>
  );
};

export default CarruselMarcas;
