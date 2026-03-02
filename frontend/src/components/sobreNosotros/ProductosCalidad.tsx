const ReyCasaAtun = () => {
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
                Calidad Diaria
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
              Garantizamos productos <br /> frescos a diario
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-justify">
              <p>
                Ofrecemos productos de **frescura garantizada** y variedad
                cuidada, combinando marcas líderes y productores artesanales,
                para que tanto profesionales como consumidores disfruten del
                mejor sabor y calidad del mar.
              </p>

              <p>
                Nuestra selección diaria en lonja y con proveedores de confianza
                asegura que cada pieza que sale de nuestras instalaciones cumpla
                con los estándares más exigentes del sector.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-blue-900 font-bold text-xl leading-none">
                  100%
                </span>
                <span className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
                  Calidad Controlada
                </span>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-blue-900 font-bold text-xl leading-none">
                  Fresco
                </span>
                <span className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
                  Origen Certificado
                </span>
              </div>
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
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-50 -z-10 rounded-full transition-transform group-hover:scale-110 duration-500"></div>

              <img
                src="https://adamecongelados.com/wp-content/uploads/2020/04/alimentos-frescos-o-congelados-1.png"
                alt="Variedad de productos frescos Toscamare"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover border-white border-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReyCasaAtun;
