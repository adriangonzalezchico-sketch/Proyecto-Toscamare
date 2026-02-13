import "./TiendasTitulo.css";
import { motion } from "framer-motion";

function TiendasTitulo() {
  return (
    <section className="title-container">
        <motion.h1 
          className="title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Nuestras Tiendas
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Encuentra tu tienda Toscamare más cercana
        </motion.p>
    </section>
  )
}

export default TiendasTitulo