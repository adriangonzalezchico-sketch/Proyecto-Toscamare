import UsoCookies from "../../components/cookiesComp/UsoCookies";
import CookiesUtilizadas from "../../components/cookiesComp/CookiesUtilizadas";
import ManejoCookies from "../../components/cookiesComp/ManejoCookies";
import "../../components/avisolegal/EstilosAvisoLegal.css"; // Reutilizamos el CSS imponente
import { motion, easeOut } from "framer-motion";

const layoutVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const Cookies = () => {
  return (
    <div className="bg-white min-h-screen font-nunito text-slate-800 antialiased">
      <header className="pt-24 pb-16 px-6 max-w-6xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-rojo font-bold uppercase tracking-widest text-sm"
        >
          Transparencia Digital
        </motion.span>
        <h1 className="text-brand-marino text-7xl font-black mt-2 tracking-tighter uppercase">
          Cookies
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-15 md:ml-10 lg:ml-60">
          {/* 1. USO DE COOKIES - PUNTO AZUL */}
          <motion.section
            variants={layoutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-12 top-7 h-5 w-5 rounded-full bg-brand-marino shadow-lg"></div>
            <UsoCookies />
          </motion.section>

          {/* 2. TIPOS DE COOKIES - PUNTO ROJO */}
          <motion.section
            variants={layoutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-12 top-7 h-5 w-5 rounded-full bg-brand-rojo shadow-lg"></div>
            <CookiesUtilizadas />
          </motion.section>

          {/* 3. GESTIÓN Y CONFIGURACIÓN - PUNTO AZUL (En grid o bloque completo) */}
          <motion.section
            variants={layoutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-12 top-7 h-5 w-5 rounded-full bg-brand-marino shadow-lg"></div>
            <ManejoCookies />
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Cookies;
{
  /*}
const Cookies = () => {
  return (
    <div className="" bg-white min-h-screen font-sans text-slate-850>
      {/* Header de la página *

      <h1 className="text-black text-5xl font-black uppercase tracking-tighter text-center">
        {" "}
        COOKIES{" "}
      </h1>
      <div className="h-1.5 w-20 bg-brand-rojo mx-auto mt-6 rounded-full"></div>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-20">
          <section className="group">
            <div className="pl-8 border-l-2 border-slate-100 group-hover:border-brand-celeste transition-all duration-300">
              <UsoCookies />
            </div>
          </section>

          <section className="group">
            <div className="pl-8 border-l-2 border-slate-100 group-hover:border-brand-celeste transition-all duration-300">
              <CookiesUtilizadas />
            </div>
          </section>

          <section className="group">
            <div className="pl-8 border-l-2 border-slate-100 group-hover:border-brand-celeste transition-all duration-300">
              <ManejoCookies />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
export default Cookies;
*/
}
