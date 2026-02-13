import { Link } from "react-router-dom";

const HeroVideo = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 1. EL FONDO - Le damos un fade suave para que el video no "salte" al cargar */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-15349386654201534938665420-4193effeacc4?q=80&w=2071"
      >
        <source src="/8879803-uhd_4096_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* 2. LA CAPA OSCURA */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 3. EL CONTENIDO */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Etiqueta superior: Aparece bajando suavemente */}
        <span
          data-aos="fade-down"
          data-aos-delay="300"
          className="text-[#57C3ED] font-bold tracking-[0.2em] uppercase mb-4"
        >
          Desde 1990
        </span>

        {/* Título: El elemento más importante, entra con un zoom sutil */}
        <h1
          data-aos="zoom-out"
          data-aos-duration="1200"
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight drop-shadow-lg"
        >
          Excelencia en productos del mar y alimentación
        </h1>

        {/* Subtítulo: Aparece desde abajo con un poco de retraso */}
        <p
          data-aos="fade-up"
          data-aos-delay="600"
          className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed drop-shadow-md"
        >
          Distribución mayorista y minorista en Huelva. Calidad, tradición y
          servicio cercano en cada uno de nuestros productos.
        </p>

        {/* Botones: Aparecen al final, cada uno desde un lado diferente */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/productos"
            data-aos="fade-right"
            data-aos-delay="900"
            className="px-8 py-4 bg-[#D90414] hover:bg-[#b00310] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg hover:scale-105"
          >
            Ver Productos
          </Link>

          <Link
            to="/contacto"
            data-aos="fade-left"
            data-aos-delay="900"
            className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#011468] text-white font-bold text-lg rounded-full transition-all duration-300"
          >
            Contactar Ahora
          </Link>
        </div>
      </div>

      {/* 4. FLECHA ANIMADA: Esta no necesita AOS porque ya tiene el 'animate-bounce' de Tailwind */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-8 h-8 text-white opacity-80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroVideo;
