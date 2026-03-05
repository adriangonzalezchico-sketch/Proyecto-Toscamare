import { Link } from "react-router-dom";

const RedTiendas = () => {
  const beneficios = [
    "Atención cercana en cada tienda",
    "Servicio rápido y profesional",
    "Asesoramiento experto al cliente",
    "Calidad y trato personalizado",
  ];

  return (
    /* py-24 lg:py-32 para mantener el ritmo vertical del resto de la web */
    <section className="py-24 lg:py-32 bg-gray-50 overflow-hidden">
      {/* Contenedor estándar max-w-7xl mx-auto px-6 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* --- COLUMNA IMAGEN (Izquierda) --- */}
          <div className="order-1 relative group">
            {/* Marco decorativo unificado con el estilo de la Portada */}
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              className="absolute top-4 right-4 w-full h-full border-2 border-[#D90414]/20 rounded-2xl z-0 transform translate-x-2 translate-y-2"
            ></div>

            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="relative rounded-2xl overflow-hidden shadow-2xl z-10 border-8 border-white"
            >
              <img
                src="https://www.recetasderechupete.com/wp-content/uploads/2023/12/Patatas-fritas-al-horno-portada-1200x828.jpg"
                alt="Tienda Toscamare en Huelva"
                className="w-full h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Badge de localización estilo Portada */}
              <div
                data-aos="fade-left"
                data-aos-delay="800"
                className="absolute bottom-6 right-6 bg-[#011468] text-white p-5 rounded-xl shadow-2xl"
              >
                <p className="font-bold text-xl tracking-tight leading-none">
                  Huelva
                </p>
                <p className="text-[10px] text-[#57C3ED] uppercase font-bold tracking-widest mt-1">
                  20 Puntos de venta
                </p>
              </div>
            </div>
          </div>

          {/* --- COLUMNA TEXTO (Derecha) --- */}
          <div className="order-2">
            {/* Badge superior con línea (Igual a Logistica y Calidad) */}
            <div className="flex items-center gap-3 mb-6" data-aos="fade-down">
              <div className="h-px w-10 bg-[#D90414]"></div>
              <span className="text-[#D90414] font-bold uppercase tracking-[0.3em] text-xs">
                Cerca de ti
              </span>
            </div>

            <h2
              data-aos="fade-left"
              data-aos-delay="200"
              className="text-3xl md:text-5xl font-bold text-[#011468] mb-8 leading-tight"
            >
              Contamos con 20 Tiendas en la provincia de Huelva
            </h2>

            <p
              data-aos="fade-left"
              data-aos-delay="400"
              className="text-gray-600 text-lg mb-10 leading-relaxed"
            >
              Ponemos a tu disposición una amplia red de tiendas para que puedas
              disfrutar de nuestros productos con cercanía y comodidad. En cada
              punto de venta ofrecemos atención personalizada.
            </p>

            {/* Lista de Beneficios */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {beneficios.map((item, index) => (
                <li
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={600 + index * 100}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#011468] transition-colors duration-300">
                    <svg
                      className="w-3.5 h-3.5 text-[#011468] group-hover:text-white transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#011468] font-semibold text-sm leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Botón Principal (Redondeado para mimetizarse con el resto) */}
            <div data-aos="zoom-in" data-aos-delay="1000">
              <Link
                to="/tiendas"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#011468] text-white font-bold rounded-full hover:bg-[#D90414] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
              >
                Visita nuestras tiendas
                <svg
                  className="w-5 h-5 ml-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedTiendas;
