export default function SobreNosotros() {
  return (
    <div className="bg-white overflow-hidden">
      {/* 3. BLOQUE: EXPERIENCIA Y COMPROMISO (ZIG-ZAG 2 - INVERTIDO) */}
      <section className="py-24 bg-gray-50/50">
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
                  Infraestructura y Servicio
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
                Experiencia y <br /> compromiso
              </h2>

              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Con más de tres décadas de trayectoria, suministramos a
                hostelería, restauración, catering y tiendas especializadas,
                asegurando frescura, calidad y servicio personalizado.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Contamos con almacenamiento frigorífico propio y flota de
                transporte, garantizando que cada producto llegue en perfectas
                condiciones.
              </p>

              {/* Enlace Externo */}
              <a
                href="https://goo.gl/maps/tu-enlace-aqui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-900 font-bold uppercase text-xs tracking-[0.2em] group border-b border-blue-900/20 pb-2 hover:border-blue-900 transition-all"
              >
                Localiza nuestras instalaciones
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            {/* Imagen (Entra desde la izquierda) */}
            <div
              className="w-full md:w-1/2"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <div className="relative">
                <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-blue-900/5 rounded-2xl -z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                  alt="Logística y flota Toscamare"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover border-white border-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
