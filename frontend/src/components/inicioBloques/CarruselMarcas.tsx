import LogoLoop from "../ui/LogoLoop/LogoLoop"; // Asegúrate de que la ruta a tu UI es correcta

const CarruselMarcas = () => {
  // Aquí defines los datos.
  // TIP: Asegúrate de que estas imágenes existan en tu carpeta "public/logosColaboradores/"
  const imageLogos = [
    {
      src: "/logosColaboradores/elpozo.png",
      alt: "El Pozo",
      href: "https://www.elpozo.com/",
    },
    {
      src: "/logosColaboradores/famadesa.png",
      alt: "Famadesa",
      href: "https://famadesa.es/",
    },
    {
      src: "/logosColaboradores/audens.png",
      alt: "Audens Foods",
      href: "https://www.audensfood.com/",
    },
    {
      src: "/logosColaboradores/eurofrits.png",
      alt: "Eurofrits",
      href: "https://www.eurofrits.com/",
    },
    {
      src: "/logosColaboradores/simons.png",
      alt: "Simon’s",
      href: "https://simonsfood.net/",
    },
    {
      src: "/logosColaboradores/laniñadelsur.png",
      alt: "La Niña del Sur",
      href: "https://laninadelsur.com/",
    },
    {
      src: "/logosColaboradores/elguijo.png",
      alt: "El Guijo",
      href: "https://www.dulcesguijo.com/",
    },
    {
      src: "/logosColaboradores/navarra.png",
      alt: "Congelados Navarra",
      href: "https://www.congeladosnavarra.com/es",
    },
    {
      src: "/logosColaboradores/mccain.png",
      alt: "McCain",
      href: "https://mccain.es/",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 mb-12 text-center">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#011468] mb-4">
          Marcas con las que trabajamos
        </h2>

        {/* Descripción */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Colaboramos con los mejores proveedores de alimentación nacional e
          internacional para garantizar la máxima calidad en tu mesa o negocio.
        </p>
      </div>

      {/* --- ZONA DEL CARRUSEL (Usando tu componente LogoLoop) --- */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "160px" }}
      >
        {/* Degradados laterales para suavizar la entrada/salida de logos */}
        <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

        <LogoLoop
          logos={imageLogos}
          speed={60} // Un poco más lento para que se lean bien las marcas
          direction="left"
          logoHeight={100} // Altura ajustada para que no sean gigantes
          gap={80} // Espacio entre logos
          hoverSpeed={0} // Pausa al pasar el ratón (opcional)
          scaleOnHover={true} // Efecto zoom bonito
          fadeOut={false} // Lo controlo manualmente con los divs de arriba
          ariaLabel="Nuestros proveedores de confianza"
        />
      </div>

      {/* Cierre */}
      <div className="text-center mt-8">
        <p className="inline-block text-[#D90414] font-medium italic border-b border-[#D90414]/30 pb-1">
          Y mucho más…
        </p>
      </div>
    </section>
  );
};

export default CarruselMarcas;
