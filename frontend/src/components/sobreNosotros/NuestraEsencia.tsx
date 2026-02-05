export default function SobreNosotros() {
  return (
    <div className="bg-white overflow-hidden">
      {/* 2. BLOQUE: NUESTRA ESENCIA (ZIG-ZAG 1) */}
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
                  Tradición Familiar
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
                Venta y distribución <br /> de confianza
              </h2>

              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                En **Toscamare** nos dedicamos a la venta y distribución de
                pescados, carnes, mariscos y productos congelados, tanto al por
                mayor como al por menor, ofreciendo productos frescos, de
                calidad y adaptados a cada cliente desde 1990.
              </p>

              <div className="flex items-center gap-4 text-blue-900 font-semibold italic border-l-4 border-blue-100 pl-4">
                <p className="text-gray-500">
                  Comprometidos con la excelencia en cada entrega.
                </p>
              </div>
            </div>

            {/* Imagen (Entra desde la derecha) */}
            <div
              className="w-full md:w-1/2"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-50 -z-10 rounded-full"></div>
                <img
                  src="https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1887&auto=format&fit=crop"
                  alt="Productos de calidad Toscamare"
                  className="rounded-2xl shadow-2xl w-full h-[450px] object-cover border-white border-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
