import { motion } from "framer-motion";

export const ProductHero = () => {
  return (
    /* He quitado 'shadow-lg' y cualquier clase 'shadow' de aquí. 
       También he añadido 'border-none' por si acaso hubiera algún borde sutil.
    */
    <section
      className="relative w-full text-center overflow-visible border-none
      bg-[linear-gradient(135deg,#061a66_0%,#1a4186_100%)] 
      pt-[120px] px-4 pb-[120px] md:pt-[150px] md:pb-[140px]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h1
          className="font-bold leading-[1.1] tracking-[1px] text-white
                     text-[clamp(1.8rem,4vw,3.5rem)] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Nuestros productos más destacados
        </motion.h1>

        <motion.p
          className="font-normal opacity-90 text-white px-4
                     text-[clamp(1rem,1.8vw,1.5rem)] mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Descubre nuestra gran variedad de productos disponibles. Aun así, hay contamos con muchos más, consúltanos para saber más información.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="/Catalogo_Toscamare.pdf"
            download="Catalogo_Productos_Toscamare.pdf"
            className="inline-flex items-center gap-2 bg-[#D90414] hover:bg-[#b00310] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar catálogo de productos
          </a>
        </motion.div>
      </div>

      {/* ONDA SVG (Sin sombras ni efectos externos) */}
      <div
        className="absolute left-0 right-0 bottom-[-1px] w-full z-[2] pointer-events-none
                      h-[30px] md:h-[65px]"
      >
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
  );
};
