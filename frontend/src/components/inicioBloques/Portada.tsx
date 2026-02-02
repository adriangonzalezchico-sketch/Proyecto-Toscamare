import { Link } from "react-router-dom";

const Portada = () => {
  return (
    <section className="relative bg-white overflow-hidden min-h-screen">
      {/* Contenedor Principal */}
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- COLUMNA DE TEXTO (Izquierda) --- */}
          <div className="order-2 lg:order-1">
            {/* Línea decorativa: Aparece estirándose */}
            <div
              data-aos="grow-right"
              data-aos-delay="200"
              className="w-20 h-1 bg-[#57C3ED] mb-6"
            ></div>

            {/* Título: Entrada suave desde la izquierda */}
            <h1
              data-aos="fade-right"
              data-aos-duration="1000"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#011468] mb-6"
            >
              Alimentación al por mayor y al por menor
            </h1>

            {/* Texto descriptivo: Aparece un poco después que el título */}
            <p
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="1000"
              className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
            >
              Desde 1990 ofrecemos a nuestros clientes una selección de
              pescados, mariscos, carnes y productos congelados de máxima
              calidad. Somos una empresa de alimentación con más de 20 tiendas
              repartidas por toda la provincia de Huelva.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contacto"
                className="inline-block bg-[#D90414] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg hover:shadow-xl hover:opacity-90 transform hover:-translate-y-0.5"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* --- COLUMNA DE IMAGEN (Derecha) --- */}
          <div className="order-1 lg:order-2 relative">
            {/* Fondo decorativo difuminado: Aparece con un zoom suave */}
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              className="absolute -z-10 top-0 right-0 w-64 h-64 bg-[#3F4F96] opacity-20 rounded-full blur-3xl transform translate-x-10 -translate-y-10"
            ></div>

            {/* Imagen Principal: Entrada desde la derecha */}
            <div
              data-aos="fade-left"
              data-aos-duration="1200"
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src="https://www.ciad.mx/wp-content/uploads/2024/07/PRECAUCIONES-AL-CONSUMIR-PESCADOS-Y-MARISCOS-FRESCOS-EN-VERANO-1.jpg"
                alt="Pescados y mariscos frescos"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />

              {/* Tarjeta flotante: Aparece con un salto (zoom-in-up) al final */}
              <div
                data-aos="zoom-in-up"
                data-aos-delay="800"
                className="absolute bottom-6 left-6 bg-[#011468] text-white p-4 rounded-lg shadow-lg"
              >
                <p className="font-bold text-xl">Desde 1990</p>
                <p className="text-sm text-[#57C3ED]">Calidad Garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portada;
