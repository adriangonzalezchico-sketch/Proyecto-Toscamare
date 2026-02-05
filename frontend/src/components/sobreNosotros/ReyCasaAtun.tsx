export default function SobreNosotros() {
  return (
    <div className="bg-white overflow-hidden">
      {/* 4. BLOQUE: CALIDAD RECONOCIDA - EL ATÚN (ZIG-ZAG 3) */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Texto (Entra desde la izquierda) */}
            <div
              className="w-full md:w-1/2"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-blue-700"></div>
                <span className="text-blue-700 font-bold uppercase tracking-[0.3em] text-xs">
                  Nuestro Producto Estrella
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
                Calidad reconocida <br /> en cada pieza
              </h2>

              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Entre todos nuestros productos destaca el **atún**, catalogado
                como uno de los más valorados por nuestros clientes gracias a su
                sabor, textura y frescura.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg mb-8 italic">
                Con esta especialidad hemos recibido reconocimientos en eventos
                como los **Encuentros de Capitanes de la Almadraba de Isla
                Cristina**, ganando premios en la categoría de{" "}
                <span className="text-blue-900 font-bold underline decoration-blue-200 underline-offset-4">
                  “Mejor Mojama de Atún 2022”
                </span>
                .
              </p>

              {/* Enlace Externo */}
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

            {/* Imagen con Sello de Premio (Entra desde la derecha) */}
            <div
              className="w-full md:w-1/2"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="relative group">
                {/* Sello de Premio Dorado */}
                <div className="absolute -top-10 -left-10 z-20 w-32 h-32 bg-yellow-500 rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500">
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    Mejor Mojama
                  </span>
                  <span className="text-2xl font-black">2022</span>
                  <span className="text-[8px] font-medium uppercase">
                    Isla Cristina
                  </span>
                </div>

                <img
                  src="https://productimages.etrusted.com/products/prt-0cdc40dd-9000-4a0d-a362-db5ecddaaceb/35/original.jpg"
                  alt="Premio Mejor Mojama de Atún Toscamare"
                  className="rounded-2xl shadow-2xl w-full h-[550px] object-cover border-white border-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
