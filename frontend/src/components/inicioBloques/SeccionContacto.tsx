import { Link } from "react-router-dom";

const SeccionContacto = () => {
  return (
    <section className="min-h-screen py-16 md:py-24 bg-[#F0F9FF]">
      {" "}
      {/* Un celeste muy muy clarito */}
      <div className="container mx-auto px-4">
        {/* Cabecera del bloque */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D90414] font-bold tracking-wider uppercase text-sm">
            ¿Hablamos?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#011468] mt-2 mb-6">
            Estamos aquí para ayudarte
          </h2>
          <p className="text-gray-600 text-lg">
            Tanto si eres un particular buscando calidad para tu casa, como si
            eres un profesional de la hostelería, nuestro equipo está listo para
            atenderte.
          </p>
        </div>

        {/* Grid de 3 Tarjetas de Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* TARJETA 1: Teléfono */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-transparent hover:border-[#D90414] transition-all duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-[#FFF5F5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {/* Icono Teléfono */}
              <svg
                className="w-8 h-8 text-[#D90414]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#011468] mb-2">Llámanos</h3>
            <p className="text-gray-500 mb-4 text-sm">
              De Lunes a Viernes, 9h a 18h
            </p>
            <a
              href="tel:+34959000000"
              className="text-lg font-bold text-[#011468] hover:text-[#D90414]"
            >
              959 XX XX XX
            </a>
          </div>

          {/* TARJETA 2: Email (Destacada) */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-[#011468] relative transform md:-translate-y-4 z-10 text-center">
            {/* Etiqueta "Recomendado" */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#011468] text-white text-xs font-bold px-3 py-1 rounded-full">
              Respuesta Rápida
            </span>
            <div className="w-16 h-16 mx-auto bg-[#E5F6FD] rounded-full flex items-center justify-center mb-6">
              {/* Icono Email */}
              <svg
                className="w-8 h-8 text-[#011468]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#011468] mb-2">
              Escríbenos
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              Para pedidos o información general
            </p>
            <a
              href="mailto:pedidos@cialtoscamare.es"
              className="text-lg font-bold text-[#011468] hover:text-[#D90414] break-all"
            >
              pedidos@cialtoscamare.es
            </a>
          </div>

          {/* TARJETA 3: Ubicación */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-transparent hover:border-[#D90414] transition-all duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-[#FFF5F5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {/* Icono Mapa */}
              <svg
                className="w-8 h-8 text-[#D90414]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#011468] mb-2">Visítanos</h3>
            <p className="text-gray-500 mb-4 text-sm">
              Nuestras oficinas centrales
            </p>
            <p className="text-lg font-bold text-[#011468]">Huelva, España</p>
          </div>
        </div>

        {/* Botón Final Grande */}
        <div className="text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#011468] text-white font-bold rounded-full hover:bg-[#D90414] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Ir a la página de contacto completa
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeccionContacto;
