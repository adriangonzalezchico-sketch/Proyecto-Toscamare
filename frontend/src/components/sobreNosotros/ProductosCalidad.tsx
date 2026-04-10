import imgSardinas from "../../assets/fotos_sobre_nosotros/sardinas lonja.webp";

const ReyCasaAtun = () => {
  return (
    <section className="py-24 lg:py-32 bg-gray-50/50">
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

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-justify mt-8">
              <p>
                En nuestras veinte tiendas repartidas por la provincia de
                Huelva, ofrecemos una gran variedad de productos de las mejores
                marcas y productos frescos diarios.
              </p>

              <p>
                Contamos con la mejor selección diaria de pescados adquiridos en
                lonjas locales con la mejor calidad en cada pieza.
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
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-50 -z-10 rounded-full transition-transform group-hover:scale-110 duration-500"></div>

              <img
                src={imgSardinas}
                alt="Sardinas de lonja Toscamare"
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
