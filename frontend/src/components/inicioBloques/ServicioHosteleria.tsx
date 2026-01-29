const ServicioHosteleria = () => {
  // Categorías de productos para mostrar visualmente
  const categorias = [
    { nombre: "Pescados", icono: "🐟" },
    { nombre: "Mariscos", icono: "🦐" },
    { nombre: "Carnes", icono: "🥩" },
    { nombre: "Precocinados", icono: "🥘" },
  ];

  return (
    <section className="min-h-screen py-16 md:py-24 bg-[#011468] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- COLUMNA IMAGEN (Izquierda) --- */}
          <div className="order-1 relative">
            {/* Elemento decorativo: Círculo Celeste detrás */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#57C3ED] opacity-10 rounded-full blur-3xl"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Imagen sugerente de cocina profesional o chef */}
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                alt="Servicio profesional a hostelería"
                className="w-full h-[400px] lg:h-[500px] object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />

              {/* Tarjeta flotante "Servicio Diario" */}
              <div className="absolute bottom-6 right-6 bg-white text-[#011468] p-4 rounded-lg shadow-lg max-w-[200px]">
                <p className="font-bold text-lg leading-tight">
                  Distribución Diaria
                </p>
                <div className="h-1 w-10 bg-[#D90414] mt-2"></div>
              </div>
            </div>
          </div>

          {/* --- COLUMNA TEXTO (Derecha) --- */}
          <div className="order-2">
            <span className="inline-block py-1 px-3 rounded border border-[#57C3ED] text-[#57C3ED] text-xs font-bold uppercase tracking-wider mb-4">
              Canal HORECA
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Servicio integral a hoteles y restauración
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Ofrecemos el mejor servicio de distribución de productos
              alimentarios para el sector profesional. Garantizamos una cadena
              de frío impecable y una amplia variedad de productos seleccionados
              para tu cocina.
            </p>

            {/* Grid de iconos de productos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {categorias.map((cat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="text-2xl mb-1">{cat.icono}</span>
                  <span className="text-sm font-medium text-gray-200">
                    {cat.nombre}
                  </span>
                </div>
              ))}
            </div>

            {/* BOTÓN MAILTO (Acción directa) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:pedidos@cialtoscamare.es?subject=Consulta Pedido Hostelería"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D90414] hover:bg-[#b00310] text-white font-bold rounded-md transition-all duration-300 shadow-[0_0_20px_rgba(217,4,20,0.4)] hover:shadow-[0_0_30px_rgba(217,4,20,0.6)] transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Haz tu pedido aquí
              </a>

              {/* Opcional: Texto de ayuda */}
              <p className="mt-3 sm:mt-0 sm:ml-4 text-sm text-gray-400 flex items-center">
                Respuesta en <br className="hidden sm:block" /> menos de 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicioHosteleria;
