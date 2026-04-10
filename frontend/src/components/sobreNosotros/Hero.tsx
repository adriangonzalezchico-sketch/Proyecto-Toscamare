import heroBg from "../../assets/fotos_sobre_nosotros/sede central.webp";

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center min-h-screen">
      {/* Capa de Imagen de Fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Sede Central Toscamare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply"></div>
      </div>

      {/* Contenido Central */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-wider md:tracking-[0.2em] mb-6">
          Bienvenidos a <br className="md:hidden" /><span className="text-blue-200">Toscamare</span>
        </h1>

        <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>

        <p className="text-white text-lg md:text-2xl leading-relaxed font-light">
          Nos dedicamos a la venta y distribución de pescados, carnes, mariscos y
          productos congelados, tanto al por mayor como al por menor. Ofrecemos
          productos congelados y frescos, de calidad y adaptados a cada cliente desde{" "}
          <span className="font-semibold text-blue-100">1990</span>.
        </p>
      </div>

      {/* Flecha de scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
