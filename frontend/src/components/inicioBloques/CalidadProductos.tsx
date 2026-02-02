import { Link } from "react-router-dom";

const CalidadProductos = () => {
  return (
    <section className="min-h-screen py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- COLUMNA TEXTO (Izquierda) --- */}
          <div className="order-2 lg:order-1">
            {/* Badge: Aparece con un pequeño rebote */}
            <span
              data-aos="zoom-in"
              className="inline-block py-1 px-3 rounded-full bg-[#E5F6FD] text-[#0460A9] text-xs font-bold uppercase tracking-wider mb-4"
            >
              Producción Propia
            </span>

            <h2
              data-aos="fade-right"
              data-aos-duration="1000"
              className="text-3xl md:text-4xl font-bold text-[#011468] mb-6 leading-tight"
            >
              Productos elaborados con la mayor calidad
            </h2>

            <p
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              Elaboramos productos del mar como mojama, huevas, atún fresco o
              mariscos cocidos entre otros, siguiendo procesos tradicionales y
              utilizando materia prima seleccionada.
            </p>

            {/* --- CAJA DESTACADA DEL PREMIO: Aparece con un efecto de "revelado" --- */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="mb-8 p-6 bg-yellow-50 border-l-4 border-[#FFE184] rounded-r-lg relative overflow-hidden"
            >
              {/* Icono de medalla: Animación de pulso sutil */}
              <div className="absolute top-4 right-4 text-[#FFE184] opacity-50 animate-pulse">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 001-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h3 className="text-[#011468] font-bold text-lg mb-2">
                Mejor Mojama de Atún 2022
              </h3>
              <p className="text-sm text-gray-700 italic">
                Reconocimiento otorgado en el XX Encuentro de Capitanes de
                Almadraba (Jornadas de Arráez y Sotarráez). Un galardón que
                avala la autenticidad de nuestra producción.
              </p>
            </div>

            {/* Botón: Aparece desde abajo al final */}
            <div data-aos="fade-up" data-aos-delay="600">
              <Link
                to="/sobre-nosotros"
                className="group inline-flex items-center font-bold text-[#011468] border-b-2 border-[#D90414] pb-1 hover:text-[#D90414] transition-colors duration-300"
              >
                Conócenos mejor
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* --- COLUMNA IMAGEN (Derecha) --- */}
          <div className="order-1 lg:order-2 relative group">
            {/* El marco decorativo: Entra con un retraso para dar profundidad */}
            <div
              data-aos="fade-up-left"
              data-aos-delay="300"
              className="absolute top-4 right-4 w-full h-full border-2 border-[#011468] rounded-2xl z-0 transform translate-x-2 translate-y-2"
            ></div>

            <div
              data-aos="fade-left"
              data-aos-duration="1200"
              className="relative rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <img
                src="https://productimages.etrusted.com/products/prt-0cdc40dd-9000-4a0d-a362-db5ecddaaceb/35/original.jpg"
                alt="Mojama de atún de calidad superior"
                className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Sello de Calidad: Animación de zoom-in para que "salte" a la vista */}
              <div
                data-aos="zoom-in"
                data-aos-delay="800"
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">🏆</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Galardón
                    </p>
                    <p className="text-[#011468] font-bold text-sm">
                      Calidad Certificada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalidadProductos;
