import { Link } from "react-router-dom";

const RedTiendas = () => {
  // Lista de beneficios para renderizarla limpia
  const beneficios = [
    "Atención cercana en cada tienda",
    "Servicio rápido y profesional",
    "Asesoramiento experto al cliente",
    "Calidad y trato personalizado",
  ];

  return (
    <section className="min-h-screen py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- COLUMNA IMAGEN (Izquierda) --- */}
          <div className="order-1 relative">
            {/* Marco decorativo detrás (Rojo corporativo suave para contraste) */}
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 bg-[#D90414] rounded-2xl opacity-10"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {/* Usa una foto de una tienda real o mostrador si tienes. Esta es de ejemplo */}
              <img
                src="https://images.unsplash.com/photo-1578916171728-56b74e2d46e1?q=80&w=1974&auto=format&fit=crop"
                alt="Tienda Cialtos en Huelva"
                className="w-full h-full object-cover min-h-[400px]"
              />

              {/* Badge flotante destacando la ubicación */}
              <div className="absolute bottom-0 right-0 bg-[#011468] text-white py-3 px-6 rounded-tl-2xl">
                <span className="font-bold text-lg">Huelva</span>
              </div>
            </div>
          </div>

          {/* --- COLUMNA TEXTO (Derecha) --- */}
          <div className="order-2">
            {/* Título pequeño (Subtítulo) */}
            <span className="block text-[#D90414] font-bold tracking-wider uppercase text-sm mb-2">
              Cerca de ti
            </span>

            {/* Título Principal */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#011468] mb-6 leading-tight">
              Contamos con 20 Tiendas en la provincia de Huelva
            </h2>

            {/* Párrafo */}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Ponemos a tu disposición una amplia red de tiendas para que puedas
              disfrutar de nuestros productos con cercanía y comodidad. En cada
              punto de venta ofrecemos atención personalizada, asesoramiento y
              un servicio pensado para familias, hostelería y comercios.
            </p>

            {/* Lista de Características (Grid 2x2) */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {beneficios.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  {/* Icono Check SVG manual (Color Celeste Secundario: #36ABD9) */}
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E5F6FD] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#36ABD9]"
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

            {/* Botón (Azul Marino sólido para diferenciar del rojo de la portada) */}
            <Link
              to="/tiendas"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-[#011468] hover:bg-[#0460A9] transition-colors duration-300 shadow-lg"
            >
              Visita nuestras tiendas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedTiendas;
