const NuestraEsencia = () => {
  return (
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
                Nuestra Trayectoria
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
              Experiencia y <br /> compromiso
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-justify">
              <p>
                Con más de tres décadas de trayectoria, suministramos a
                hostelería, restauración, catering y tiendas especializadas,
                asegurando frescura, calidad y servicio personalizado.
              </p>

              <p>
                Contamos con{" "}
                <span className="text-blue-900 font-semibold">
                  almacenamiento frigorífico propio y flota de transporte
                </span>
                , garantizando que cada producto llegue en perfectas condiciones
                a su destino, manteniendo la cadena de frío en todo momento.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 text-blue-900 font-semibold italic border-l-4 border-blue-100 pl-4">
              <p className="text-gray-500">
                Más de 30 años al servicio de nuestros clientes.
              </p>
            </div>
          </div>

          {/* Imagen (Entra desde la derecha) */}
          <div
            className="w-full md:w-1/2"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative group">
              {/* Elemento decorativo detrás */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-50 -z-10 rounded-full transition-transform group-hover:scale-110 duration-500"></div>

              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                alt="Logística y flota Toscamare"
                className="rounded-2xl shadow-2xl w-full h-[480px] object-cover border-white border-8"
              />

              {/* Badge flotante */}
              <div className="absolute -bottom-6 left-10 bg-white shadow-xl p-6 rounded-lg hidden md:block border-b-4 border-blue-600">
                <p className="text-blue-900 font-bold text-2xl leading-none">
                  1990
                </p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1 text-center">
                  Fundación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NuestraEsencia;
