const logoToscamare = "/logoToscamare/logo-simple-sin-fondo.png";
import logoAnedilco from "../../assets/alianzas/logo-anedilco.png";
import { Link } from "react-router-dom";

const Anedilco = () => {
  return (
    /* Usamos un gris un poco más oscuro #f3f4f6 (gray-100) para acentuar 
       más la separación de los bloques blanco y azul claro. */
    <section className="py-24 lg:py-32 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
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
                Alianzas Estratégicas
              </span>
            </div>

            {/* Título adaptado */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#011468] mb-8">
              Calidad respaldada <br className="hidden xl:block" /> por Anedilco
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
              Formamos parte del grupo Aneldilco, el mayor grupo de distribución de 
              productos congelados en España. Gracias a esta conexión, ofrecemos 
              productos congelados de máxima calidad y de las marcas más destacadas. 
              Además, garantizamos una amplia variedad de productos y confianza a 
              clientes profesionales como hostelería, restauración, catering o 
              nuestras propias tiendas.
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
            {/* Contenedor centralizado para los logos con flex proporcional */}
            <div className="flex flex-col items-center justify-between gap-0 bg-white p-12 rounded-2xl shadow-xl border-4 border-gray-100 h-full min-h-[450px] md:min-h-[550px]">
              
              {/* Logo Anedilco */}
              <div className="flex-1 flex items-center justify-center w-full px-4">
                <img 
                  src={logoAnedilco} 
                  alt="Anedilco Logo" 
                  /* Aumentamos el tamaño de Anedilco manteniendo el balance visual */
                  className="max-h-[120px] md:max-h-[160px] w-auto object-contain filter drop-shadow-sm transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Separador Perfectamente Centrado */}
              <div className="flex-none flex items-center justify-center w-full gap-4 opacity-50 py-6">
                <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-[#011468] to-transparent"></div>
                <span className="text-[#011468] font-bold text-3xl">+</span>
                <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-[#011468] to-transparent"></div>
              </div>

              {/* Logo Toscamare */}
              <div className="flex-1 flex items-center justify-center w-full px-4">
                <img 
                  src={logoToscamare} 
                  alt="Toscamare Logo" 
                  /* Aumentamos Toscamare también en la misma proporción */
                  className="max-h-[140px] md:max-h-[180px] w-auto object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Anedilco;
