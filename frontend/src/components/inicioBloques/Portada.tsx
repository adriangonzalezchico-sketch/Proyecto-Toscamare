import { Link } from "react-router-dom";

const Portada = () => {
  return (
    /* 1. ELIMINAMOS 'min-h-screen' y 'flex items-center'. 
       Ahora la sección solo medirá lo que dicte su contenido + el padding.
    */
    <section className="relative bg-white overflow-hidden">
      {/* 2. Mantenemos el contenedor maestro para que el ancho sea perfecto.
          Ajustamos el padding superior si sientes que el menú está muy pegado.
      */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- COLUMNA DE TEXTO (Izquierda) --- */}
          <div
            className="w-full lg:w-[55%] order-2 lg:order-1"
            data-aos="fade-right"
          >
            {/* Estilo unificado de línea azul */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#57C3ED]"></div>
              <span className="text-[#011468] font-bold uppercase tracking-[0.3em] text-xs">
                Tradición y Calidad
              </span>
            </div>

            {/* Título con tamaño consistente con el resto de la web */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#011468] mb-8">
              Alimentación al por mayor <br className="hidden xl:block" /> y al
              por menor
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
              Desde 1990 ofrecemos a nuestros clientes una selección de
              pescados, mariscos, carnes y productos congelados de máxima
              calidad en toda la provincia de Huelva.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contacto"
                className="inline-block bg-[#D90414] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-[#b50311] transform hover:-translate-y-1 active:scale-95"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* --- COLUMNA DE IMAGEN (Derecha) --- */}
          <div
            className="w-full lg:w-[45%] order-1 lg:order-2"
            data-aos="fade-left"
          >
            <div className="relative">
              {/* Sello circular "Desde 1990" */}
              <div className="absolute -top-4 -right-4 md:-top-10 md:-right-10 z-20 w-24 h-24 md:w-32 md:h-32 bg-[#011468] rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white rotate-[12deg]">
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter text-center leading-none">
                  Desde
                </span>
                <span className="text-lg md:text-2xl font-black italic">
                  1990
                </span>
                <span className="text-[8px] md:text-[10px] font-medium uppercase">
                  Garantía
                </span>
              </div>

              {/* Imagen con el marco blanco de 8px (Sello Toscamare) */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://www.ciad.mx/wp-content/uploads/2024/07/PRECAUCIONES-AL-CONSUMIR-PESCADOS-Y-MARISCOS-FRESCOS-EN-VERANO-1.jpg"
                  alt="Pescados y mariscos frescos"
                  /* h-[400px] o h-[500px] para que la imagen no sea infinita hacia abajo */
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portada;
