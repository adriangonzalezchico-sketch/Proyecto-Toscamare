import PedidosForm from "@/components/pedidos/pedidos-form";

export default function PedidosPage() {
  return (
    <main className="min-h-screen bg-[#F4F7F9]">
      {/* Hero Section - Fondo Azul */}
      <section className="relative bg-[#011468] pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            className="mx-auto max-w-4xl text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h1 className="mb-6 text-balance text-4xl font-black tracking-tight text-white md:text-5xl lg:text-7xl">
              Haz tu pedido, listo en minutos
            </h1>
            <p className="text-pretty text-lg text-blue-100 md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
              Gestiona tus pedidos de forma rápida y consulta nuestra gama de productos.
            </p>
          </div>
        </div>

        {/* ONDA SVG (Curvatura solicitada: copy-paste de catálogo) */}
        <div className="absolute left-0 right-0 bottom-[-1px] w-full z-[2] pointer-events-none h-[30px] md:h-[65px]">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1920 60"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-full"
          >
            <path
              d="M0 30C320 60 640 60 960 30C1280 0 1600 0 1920 30V60H0V30Z"
              fill="#F4F7F9"
            />
          </svg>
        </div>
      </section>

      {/* Form Section - Fondo Gris Claro / Blanco (Estilo contacto/catálogo) */}
      <section className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="mx-auto max-w-5xl">
          <PedidosForm />
        </div>
      </section>
    </main>
  );
}
