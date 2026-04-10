import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import img_para_cabecera from "../../assets/imagenes_home/img_para_cabecera.webp";
import video_forward from "../../assets/videos/video_para_cabecera_home.mp4";
import video_reverse from "../../assets/videos/video_para_cabecera_reverse.mp4";

const HeroVideo = () => {
  const [isPlayingReverse, setIsPlayingReverse] = useState(false);
  const forwardRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);

  const handleForwardEnded = () => {
    setIsPlayingReverse(true);
    if (reverseRef.current) {
      reverseRef.current.currentTime = 0;
      reverseRef.current.play();
    }
  };

  const handleReverseEnded = () => {
    setIsPlayingReverse(false);
    if (forwardRef.current) {
      forwardRef.current.currentTime = 0;
      forwardRef.current.play();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 1. Video INFERIOR (Reverse) - Siempre está debajo listo para ser visto */}
      <video
        ref={reverseRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        playsInline
        onEnded={handleReverseEnded}
        style={{ zIndex: 1 }}
      >
        <source src={video_reverse} type="video/mp4" />
      </video>

      {/* 2. Video SUPERIOR (Forward) - Se desvanece para mostrar el de abajo */}
      <video
        ref={forwardRef}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        autoPlay
        muted
        playsInline
        onEnded={handleForwardEnded}
        poster={img_para_cabecera}
        style={{ 
          zIndex: 2,
          opacity: isPlayingReverse ? 0 : 1
        }}
      >
        <source src={video_forward} type="video/mp4" />
      </video>

      {/* 3. LA CAPA OSCURA - Ahora con un z-index superior para cubrir ambos */}
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 10 }}></div>

      {/* 4. EL CONTENIDO */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
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
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-7xl leading-tight drop-shadow-lg"
        >
          Venta y distribución de alimentos al por mayor y al por menor en
          Huelva
        </h1>

        {/* Subtítulo: Aparece desde abajo con un poco de retraso */}
        <h2
          data-aos="fade-up"
          data-aos-delay="600"
          className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed drop-shadow-md"
        >
          Especialistas en pescados, carnes y productos congelados, con la
          calidad, tradición y cercanía que nos caracterizan.
        </h2>

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

      {/* 5. FLECHA ANIMADA */}
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
