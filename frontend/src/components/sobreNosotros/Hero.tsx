export default function SobreNosotros() {
  return (
    <div className="bg-white overflow-hidden">
      {/* 1. HERO SECTION - BIENVENIDOS A TOSCAMARE */}
      <section className="relative h-[70vh] flex items-center justify-center min-h-screen">
        {/* Capa de Imagen de Fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fotos/Atun.jpg.webp"
            alt="Fondo Toscamare"
            className="w-full h-full object-cover"
          />
          {/* Overlay azul marino */}
          <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply"></div>
        </div>

        {/* Contenido Central con Animación de AOS */}
        <div
          className="relative z-10 text-center px-6"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-4">
            Bienvenidos a <span className="text-blue-200">Toscamare</span>
          </h1>

          <div className="w-32 h-1.5 bg-blue-400 mx-auto rounded-full"></div>

          <p className="mt-6 text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide italic">
            "Calidad y tradición en la distribución alimentaria desde 1990"
          </p>
        </div>

        {/* Icono de flecha animada */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Aquí irán los siguientes bloques */}
    </div>
  );
}
