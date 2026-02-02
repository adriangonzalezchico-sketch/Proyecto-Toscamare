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
    <section className="py-16 md:py-24 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        {/* Título: Aparece con un fundido desde arriba */}
        <h2
          data-aos="fade-down"
          className="text-3xl md:text-4xl font-bold text-[#011468] mb-4"
        >
          Marcas con las que trabajamos
        </h2>

        {/* Descripción: Aparece justo después */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
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
        style={{ height: "160px" }}
      >
        {/* Degradados laterales: Fundido suave para los logos */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>

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

      {/* Cierre: Un pequeño detalle de entrada lateral */}
      <div
        className="text-center mt-8"
        data-aos="fade-left"
        data-aos-delay="600"
        data-aos-offset="50"
      >
        <p className="inline-block text-[#D90414] font-medium italic border-b border-[#D90414]/30 pb-1">
          Y mucho más…
        </p>
      </div>
    </section>
  );
};

export default CarruselMarcas;
