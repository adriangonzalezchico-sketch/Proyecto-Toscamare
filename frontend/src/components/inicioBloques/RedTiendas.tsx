import { Link } from "react-router-dom";

const RedTiendas = () => {
  const beneficios = [
    "Atención cercana en cada tienda",
    "Servicio rápido y profesional",
    "Asesoramiento experto al cliente",
    "Calidad y trato personalizado",
  ];

  return (
    <section className="min-h-screen py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- COLUMNA IMAGEN (Izquierda) --- */}
          <div className="order-1 relative">
            {/* Marco decorativo: Aparece con un zoom sutil */}
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              className="absolute -top-4 -left-4 w-full h-full bg-[#ff0f23] rounded-2xl opacity-10"
            ></div>

            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://www.recetasderechupete.com/wp-content/uploads/2023/12/Patatas-fritas-al-horno-portada-1200x828.jpg"
                alt="Tienda Cialtos en Huelva"
                className="w-full h-full object-cover min-h-[400px] hover:scale-105 transition-transform duration-700"
              />

              {/* Badge: Aparece con un efecto de deslizamiento lateral */}
              <div
                data-aos="fade-left"
                data-aos-delay="800"
                className="absolute bottom-0 right-0 bg-[#011468] text-white py-3 px-6 rounded-tl-2xl shadow-lg"
              >
                <span className="font-bold text-lg tracking-wide">Huelva</span>
              </div>
            </div>
          </div>

          {/* --- COLUMNA TEXTO (Derecha) --- */}
          <div className="order-2">
            <span
              data-aos="fade-down"
              className="block text-[#D90414] font-bold tracking-wider uppercase text-sm mb-2"
            >
              Cerca de ti
            </span>

            <h2
              data-aos="fade-left"
              data-aos-delay="200"
              className="text-3xl md:text-4xl font-bold text-[#011468] mb-6 leading-tight"
            >
              Contamos con 20 Tiendas en la provincia de Huelva
            </h2>

            <p
              data-aos="fade-left"
              data-aos-delay="400"
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              Ponemos a tu disposición una amplia red de tiendas para que puedas
              disfrutar de nuestros productos con cercanía y comodidad. En cada
              punto de venta ofrecemos atención personalizada.
            </p>

            {/* Lista de Beneficios: Efecto Cascada (Staggered animation) */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {beneficios.map((item, index) => (
                <li
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={600 + index * 100} // Secuencia: 600, 700, 800, 900
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E5F6FD] flex items-center justify-center group-hover:bg-[#36ABD9] transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-[#36ABD9] group-hover:text-white transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#011468] font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Botón: Aparece con un zoom-in al final de la secuencia */}
            <div data-aos="zoom-in" data-aos-delay="1000" data-aos-offset="50">
              <Link
                to="/tiendas"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-[#011468] hover:bg-[#D90414] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Visita nuestras tiendas
                <svg
                  className="w-5 h-5 ml-2"
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
        </div>
      </div>
    </section>
  );
};

export default RedTiendas;
