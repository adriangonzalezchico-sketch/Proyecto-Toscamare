import { Link } from "react-router-dom";

const SeccionContacto = () => {
  return (
    /* py-24 lg:py-32 para mantener la consistencia de espaciado con las secciones anteriores */
    <section className="py-24 lg:py-32 bg-[#F0F9FF] overflow-hidden">
      {/* Contenedor estándar unificado max-w-7xl mx-auto px-6 */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera de Sección */}
        <div
          className="text-center max-w-3xl mx-auto mb-20"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* Badge superior con línea (Estilo unificado Toscamare) */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#D90414]"></div>
            <span className="text-[#D90414] font-bold uppercase tracking-[0.3em] text-xs">
              ¿Hablamos?
            </span>
            <div className="h-px w-10 bg-[#D90414]"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#011468] mb-8 leading-tight">
            Estamos aquí para ayudarte
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Tanto si eres un particular buscando calidad para tu casa, como si
            eres un profesional de la hostelería, nuestro equipo está listo para
            atenderte.
          </p>
        </div>

        {/* Grid de Tarjetas de Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* TARJETA 1: Teléfono */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl border-b-8 border-transparent hover:border-[#D90414] transition-all duration-500 group text-center"
          >
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-300">
              <svg
                className="w-10 h-10 text-[#D90414]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#011468] mb-3">Llámanos</h3>
            <p className="text-gray-400 mb-6 font-medium">
              Lunes a Viernes, 9h a 18h
            </p>
            <a
              href="tel:+34959000000"
              className="text-xl font-black text-[#011468] hover:text-[#D90414] transition-colors"
            >
              959 00 00 00
            </a>
          </div>

          {/* TARJETA 2: Email (Resaltada) */}
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className="bg-white p-10 rounded-3xl shadow-xl border-b-8 border-[#011468] relative transform md:-translate-y-6 z-10 text-center"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#011468] text-white text-[10px] font-black tracking-widest px-4 py-2 rounded-full shadow-lg">
              RESPUESTA RÁPIDA
            </span>
            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
              <svg
                className="w-10 h-10 text-[#011468]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#011468] mb-3">
              Escríbenos
            </h3>
            <p className="text-gray-400 mb-6 font-medium">
              Pedidos e información
            </p>
            <a
              href="mailto:pedidos@cialtoscamare.es"
              className="text-lg font-black text-[#011468] hover:text-[#D90414] break-all underline decoration-[#57C3ED] decoration-4 underline-offset-4 transition-colors"
            >
              pedidos@cialtoscamare.es
            </a>
          </div>

          {/* TARJETA 3: Ubicación */}
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl border-b-8 border-transparent hover:border-[#D90414] transition-all duration-500 group text-center"
          >
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:-rotate-12 transition-transform duration-300">
              <svg
                className="w-10 h-10 text-[#D90414]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#011468] mb-3">
              Visítanos
            </h3>
            <p className="text-gray-400 mb-6 font-medium">Oficinas centrales</p>
            <p className="text-xl font-black text-[#011468]">Huelva, España</p>
          </div>
        </div>

        {/* Botón Final Redondeado */}
        <div
          className="text-center mt-12"
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center px-12 py-5 bg-[#011468] text-white font-black rounded-full hover:bg-[#D90414] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 tracking-wide"
          >
            IR AL CONTACTO COMPLETO
            <svg
              className="w-6 h-6 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeccionContacto;
