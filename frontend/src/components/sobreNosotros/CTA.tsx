export default function SobreNosotros() {
  return (
    <div className="bg-white overflow-hidden">
      {/* 6. BLOQUE FINAL: CONTACTO / PEDIDOS (CTA) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="bg-blue-900 rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
            data-aos="zoom-in-up"
          >
            {/* Elementos decorativos de fondo (Círculos abstractos) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/50 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-800/30 rounded-full -ml-20 -mb-20"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
                Haz tu pedido aquí
              </h2>

              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                ¿Eres profesional o particular y quieres disfrutar de la mejor
                calidad? Escríbenos directamente y gestionaremos tu solicitud de
                forma personalizada.
              </p>

              <div className="flex flex-col items-center gap-4">
                <a
                  href="mailto:pedidos@cialtoscamare.es"
                  className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  pedidos@cialtoscamare.es
                </a>

                <p className="text-blue-300 text-sm mt-4 uppercase tracking-[0.2em] font-medium">
                  Atención rápida y profesional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
