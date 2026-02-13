import Seguridad from "../../components/avisolegal/Seguridad";
import Privacidad from "../../components/avisolegal/Privacidad";
import UsoInfo from "../../components/avisolegal/UsoInfo";
import ObtenerInfo from "../../components/avisolegal/ObtenerInfo";
import "../../components/avisolegal/EstilosAvisoLegal.css";
import { motion, easeOut } from "framer-motion";

const layoutVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const AvisoLegal = () => {
  return (
    <div className="bg-white min-h-screen font-nunito text-slate-800 antialiased">
      {/* HEADER: Mantenemos el título a la izquierda */}
      <header className="pt-24 pb-16 px-6 max-w-6xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-rojo font-bold uppercase tracking-widest text-sm"
        >
          Información Corporativa
        </motion.span>
        <h1 className="text-brand-marino text-7xl font-black mt-2 tracking-tighter uppercase">
          Aviso <span className="text-slate-400 font-light">Legal</span>
        </h1>
      </header>

      {/* MAIN: Añadimos un margen izquierdo grande (ml-auto o padding específico) 
          para que el texto empiece donde termina el título "AVISO" */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Este contenedor empuja todo el contenido hacia la derecha del título */}
        <div className="flex flex-col gap-32 md:ml-40 lg:ml-60">
          {/* 1. PRIVACIDAD - PUNTO AZUL */}
          <motion.section
            variants={layoutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Punto posicionado a la izquierda del texto, pero dentro del margen nuevo */}
            <div className="absolute -left-12 top-4 h-5 w-5 rounded-full bg-brand-marino shadow-lg shadow-blue-100"></div>
            <Privacidad />
          </motion.section>

          {/* 2. SEGURIDAD - PUNTO ROJO */}
          <motion.section
            variants={layoutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-12 top-4 h-5 w-5 rounded-full bg-brand-rojo shadow-lg shadow-red-100"></div>
            <Seguridad />
          </motion.section>

          {/* GRID INFERIOR */}
          <div className="grid md:grid-cols-2 gap-20 pt-10 border-t border-slate-50">
            {/* 3. OBTENCIÓN - PUNTO AZUL */}
            <motion.div
              variants={layoutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-10 top-3 h-5 w-5 rounded-full bg-brand-marino shadow-lg"></div>
              <ObtenerInfo />
            </motion.div>

            {/* 4. USO - PUNTO ROJO */}
            <motion.div
              variants={layoutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-10 top-3 h-5 w-5 rounded-full bg-brand-rojo shadow-lg"></div>
              <UsoInfo />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvisoLegal;

{
  /*}
const layoutVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

const AvisoLegal = () => {
  return (
    <div className="bg-white min-h-screen font-nunito text-slate-800 antialiased">
      {/* HEADER: Sin caja, integrado en el fondo pero con peso visual 
      <header className="pt-24 pb-16 px-6 max-w-5xl mx-auto border-b border-slate-100">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-rojo font-bold uppercase tracking-widest text-sm"
        >
          Información Corporativa
        </motion.span>
        <h1 className="text-brand-marino text-6xl font-black mt-2 tracking-tighter uppercase">
          Aviso <span className="text-slate-400 font-light">Legal</span>
        </h1>
      </header>

      {/* CUERPO: Texto libre con guías visuales sutiles 
      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid gap-24">
          {/* Sección con acento lateral azul 
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative pl-12 border-l-4 border-brand-marino/10 hover:border-brand-marino transition-colors duration-500"
          >
            <div className="absolute -left-2.5 top-0 h-4 w-4 rounded-full bg-brand-marino"></div>
            <Privacidad />
          </motion.section>

          {/* Sección con acento lateral rojo *
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative pl-12 border-l-4 border-brand-rojo/10 hover:border-brand-rojo transition-colors duration-500"
          >
            <div className="absolute -left-2.5 top-0 h-4 w-4 rounded-full bg-brand-rojo"></div>
            <Seguridad />
          </motion.section>

          {/* Bloque de información a dos columnas más ligero 
          <div className="grid md:grid-cols-2 gap-16 pt-10 border-t border-slate-50">
            <div className="hover:translate-y-1.25 transition-transform duration-300">
              <ObtenerInfo />
            </div>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative pl-12 border-l-4 border-brand-rojo/10 hover:border-brand-rojo transition-colors duration-500"
            ></motion.section>
            <div className="hover:translate-y-1.25 transition-transform duration-300 border-l border-slate-100 pl-8">
              <UsoInfo />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvisoLegal;
*/
}
