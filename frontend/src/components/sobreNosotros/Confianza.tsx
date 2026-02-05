export default function SobreNosotros() {
  return (
    <div className="bg-white overflow-hidden">
      {/* 5. BLOQUE: PRODUCTOS FRESCOS A DIARIO (ZIG-ZAG 4 - INVERTIDO) */}
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
                <span className="text-blue-700 font-bold uppercase tracking-[0.3em] text-xs font-sans">
                  Variedad y Calidad
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
                Garantizamos productos <br /> frescos a diario
              </h2>

              <p className="text-gray-600 leading-relaxed text-lg mb-6 text-justify">
                Ofrecemos productos de frescura garantizada y variedad cuidada,
                combinando **marcas líderes** y **productores artesanales**,
                para que tanto profesionales como consumidores disfruten del
                mejor sabor y calidad del mar.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                Nuestra selección diaria asegura que cada cliente reciba
                exactamente lo que necesita, con el respaldo de los mejores
                proveedores del sector alimentario.
              </p>

              {/* Enlace Interno a la Home (donde están las marcas) */}
              <a
                href="/"
                className="inline-flex items-center gap-2 text-blue-900 font-bold uppercase text-xs tracking-[0.2em] group border-b border-blue-900/20 pb-2 hover:border-blue-900 transition-all"
              >
                Ver nuestras marcas colaboradoras
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
              <div className="relative group">
                {/* Elemento decorativo detrás */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-900/5 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>

                <img
                  src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop"
                  alt="Variedad de productos frescos Toscamare"
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
