import imgAlmacen from "../../assets/fotos_sobre_nosotros/sala inicial almacen.png";
import imgCamion from "../../assets/fotos_sobre_nosotros/camion toscamare.png";

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
                Desde hace más de tres décadas, suministramos a hostelería,
                restauración y catering, asegurando la calidad de nuestros
                productos con un servicio personalizado a las necesidades de
                cada cliente.
              </p>

              <p>
                Contamos con almacenes frigoríficos, cámaras de ultracongelación
                y de refrigeración para garantizar el mantenimiento de cada
                producto. Además, contamos con una flota propia de transporte de
                mercancías alimentarias, que ayudan a mantener la cadena de frío
                del producto en todo momento.
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
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={imgAlmacen}
                  alt="Almacén Toscamare"
                  className="rounded-2xl shadow-xl w-full h-[240px] md:h-[480px] object-cover border-white border-4 md:border-8 -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
                <img
                  src={imgCamion}
                  alt="Flota Toscamare"
                  className="rounded-2xl shadow-xl w-full h-[240px] md:h-[480px] object-cover border-white border-4 md:border-8 rotate-2 hover:rotate-0 transition-transform duration-500 mt-4 md:mt-10"
                />
              </div>

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
