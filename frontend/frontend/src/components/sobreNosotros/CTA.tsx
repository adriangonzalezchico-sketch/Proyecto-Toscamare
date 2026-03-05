const CTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="bg-blue-900 rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          {/* Decoración abstracta de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/50 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-800/30 rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
              Haz tu pedido aquí
            </h2>

            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              ¿Eres profesional de la hostelería o un particular amante de la
              buena mesa? Ponte en contacto con nosotros y gestionaremos tu
              pedido de forma directa y personalizada.
            </p>

            <div className="flex flex-col items-center gap-4 w-full px-4">
              {/* Botón de Contacto Adaptable */}
              <a
                href="/contacto"
                className="bg-white text-blue-900 
               px-8 py-4 sm:px-10 sm:py-5 
               rounded-full font-bold 
               text-lg sm:text-xl 
               hover:bg-blue-50 transition-all shadow-xl 
               hover:scale-105 active:scale-95 
               flex items-center justify-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>

                <span className="whitespace-nowrap">
                  Contactar
                  <span className="hidden md:inline"> con nosotros</span>
                </span>
              </a>

              <p className="text-blue-300 text-[10px] sm:text-xs mt-4 uppercase tracking-[0.2em] font-semibold text-center">
                Servicio de atención preferente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
