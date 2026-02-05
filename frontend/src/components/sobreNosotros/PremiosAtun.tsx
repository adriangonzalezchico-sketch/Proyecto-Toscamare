const LogisticaCompromiso = () => {
  return (
    <section className="py-24 lg:py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          {/* Texto (Entra desde la derecha) */}
          <div
            className="w-full md:w-1/2"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-blue-700"></div>
              <span className="text-blue-700 font-bold uppercase tracking-[0.3em] text-xs">
                Excelencia Premium
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
              Calidad reconocida
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-justify">
              <p>
                Entre todos nuestros productos destaca el{" "}
                <span className="text-blue-900 font-bold">atún</span>,
                catalogado como uno de los más valorados por nuestros clientes
                gracias a su sabor, textura y frescura.
              </p>

              <p className="italic">
                Con esta especialidad hemos recibido reconocimientos en eventos
                como los **Encuentros de Capitanes de la Almadraba de Isla
                Cristina**, ganando premios en la categoría de{" "}
                <span className="text-blue-900 font-bold">
                  “Mejor Mojama de Atún”
                </span>
                , lo que certifica nuestro compromiso con la excelencia del
                producto.
              </p>
            </div>

            {/* Enlace de interés */}
            <div className="mt-8">
              <a
                href="https://www.asociacionamigosdelatun.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-900 font-bold uppercase text-xs tracking-[0.2em] group border-b border-blue-900/20 pb-2 hover:border-blue-900 transition-all"
              >
                Saber más sobre el galardón
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 group-hover:rotate-45 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Imagen (Entra desde la izquierda) */}
          <div
            className="w-full md:w-1/2"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <div className="relative group">
              {/* Sello de Premio (Invertido al otro lado para el zigzag) */}
              <div className="absolute -top-10 -right-10 z-20 w-32 h-32 bg-yellow-500 rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white rotate-[12deg] group-hover:rotate-0 transition-transform duration-500">
                <span className="text-[10px] font-bold uppercase tracking-tighter text-center">
                  Mejor Mojama
                </span>
                <span className="text-2xl font-black italic">PREMIO</span>
                <span className="text-[10px] font-medium uppercase">
                  Isla Cristina
                </span>
              </div>

              <img
                src="https://productimages.etrusted.com/products/prt-0cdc40dd-9000-4a0d-a362-db5ecddaaceb/35/original.jpg"
                alt="Calidad reconocida Atún Toscamare"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover border-white border-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticaCompromiso;
