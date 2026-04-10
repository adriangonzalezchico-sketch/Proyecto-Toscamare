import horeca from "../../assets/imagenes_home/image.webp";
import { Link } from "react-router-dom";

const ServicioHosteleria = () => {
  const categorias = [
    { nombre: "Pescados", icono: "🐟" },
    { nombre: "Mariscos", icono: "🦐" },
    { nombre: "Carnes", icono: "🥩" },
    { nombre: "Precocinados", icono: "🥘" },
  ];

  return (
    /* py-24 lg:py-32 para mantener la consistencia de espaciado con las otras secciones */
    <section className="py-24 lg:py-32 bg-[#011468] text-white overflow-hidden">
      {/* Contenedor estándar unificado max-w-7xl mx-auto px-6 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* --- COLUMNA IMAGEN (Izquierda) --- */}
          <div className="order-1 relative group">
            {/* Círculo decorativo de fondo */}
            <div
              data-aos="zoom-in"
              data-aos-duration="1500"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#57C3ED] opacity-10 rounded-full blur-3xl"
            ></div>

            {/* Imagen Principal con el mismo estilo de borde de la web (adaptado a azul) */}
            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/10"
            >
              <img
                src={horeca}
                alt="Servicio profesional a hostelería"
                className="w-full h-[450px] lg:h-[550px] object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Tarjeta flotante original (Desde 1990 / Distribución) */}
              <div
                data-aos="flip-up"
                data-aos-delay="600"
                className="absolute bottom-6 right-6 bg-white text-[#011468] p-6 rounded-xl shadow-2xl max-w-[220px]"
              >
                <p className="font-bold text-[14px] leading-tight">
                  Distribución diaria desde la provincia de Huelva
                </p>
              </div>
            </div>
          </div>

          {/* --- COLUMNA TEXTO (Derecha) --- */}
          <div className="order-2">
            {/* Badge superior con línea (Estilo unificado Toscamare) */}
            <div className="flex items-center gap-3 mb-6" data-aos="fade-down">
              <div className="h-px w-10 bg-[#57C3ED]"></div>
              <span className="text-[#57C3ED] font-bold uppercase tracking-[0.3em] text-xs">
                Servicio por canal horeca
              </span>
            </div>

            <h2
              data-aos="fade-left"
              data-aos-delay="400"
              className="text-3xl md:text-[42px] font-bold mb-8 leading-tight"
            >
              Proveedor de alimentación para hostelería en Andalucía
            </h2>

            <p
              data-aos="fade-left"
              data-aos-delay="500"
              className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed"
            >
              Especialistas en el suministro de productos alimentarios a
              hoteles, restaurantes, bares y empresas de catering, garantizando
              calidad, variedad y control total de la cadena de frío.
            </p>

            {/* Grid de iconos Categorías */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {categorias.map((cat, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={600 + index * 100}
                  className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                    {cat.icono}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-200">
                    {cat.nombre}
                  </span>
                </div>
              ))}
            </div>

            {/* Botón Principal (Redondeado para mimetizarse con el resto) */}
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
            >
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#D90414] hover:bg-[#b00310] text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Haz tu pedido aquí
              </Link>

              <p className="text-sm text-gray-400 font-medium">
                Respuesta preferente <br className="hidden sm:block" /> en menos
                de 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicioHosteleria;
