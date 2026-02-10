import { motion } from "framer-motion";

export const ProductHero = () => {
  return (
    /* He quitado 'shadow-lg' y cualquier clase 'shadow' de aquí. 
       También he añadido 'border-none' por si acaso hubiera algún borde sutil.
    */
    <section
      className="relative w-full text-center overflow-visible border-none
      bg-[linear-gradient(135deg,#061a66_0%,#1a4186_100%)] 
      pt-[80px] px-4 pb-[120px] md:pt-[100px] md:pb-[140px]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h1
          className="font-bold leading-[1.1] tracking-[1px] text-white
                     text-[clamp(2rem,5vw,4rem)] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Sabores del Mar y la Tierra
        </motion.h1>

        <motion.p
          className="font-normal opacity-90 text-white px-4
                     text-[clamp(1rem,2.5vw,2rem)] mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Explora nuestra selección premium. Calidad garantizada desde el origen
          hasta tu cocina.
        </motion.p>
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
