import "./TiendasIntroduccion.css";
import { motion } from "framer-motion";

function TiendasIntroduccion() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as any }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any }
    }
  };

  return (
    <section className="introduccion-container">
      <motion.div 
        className="intro-info"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants}>
          Red de Tiendas en toda la provincia de Huelva
        </motion.h2>
        <motion.p variants={itemVariants}>
          En Toscamare ponemos a disposición de nuestros clientes una amplia red de tiendas repartidas por toda la provincia de Huelva, diseñadas para ofrecer un servicio cercano, rápido y adaptado tanto a particulares como a profesionales de la hostelería.
        </motion.p>
        <motion.ul variants={containerVariants}>
          <motion.li variants={itemVariants}><span className="check">✔</span> 20 tiendas estratégicamente ubicadas en toda la provincia</motion.li>
          <motion.li variants={itemVariants}><span className="check">✔</span> Atención personalizada por profesionales cualificados</motion.li>
          <motion.li variants={itemVariants}><span className="check">✔</span> Asesoramiento experto en pescados, mariscos y congelados</motion.li>
          <motion.li variants={itemVariants}><span className="check">✔</span> Sede principal y centro logístico en Cartaya</motion.li>
          <motion.li variants={itemVariants}><span className="check">✔</span> Servicio adaptado a particulares y hostelería</motion.li>
        </motion.ul>
      </motion.div>
      <motion.div 
        className="intro-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <h3>Horarios</h3>
        <hr className="intro-divider" />
        <div className="intro-hours">
          <div>
            <span className="intro-day">Lunes - Viernes</span>
            <span className="intro-time">9:00 - 14:00</span>
          </div>
          <div>
            <span className="intro-day"></span>
            <span className="intro-time">17:00 - 20:30</span>
          </div>
          <div>
            <span className="intro-day">Sábados</span>
            <span className="intro-time">9:00 - 14:00</span>
          </div>
        </div>
        <motion.a 
          href="/contacto" 
          className="intro-help"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          ¿Necesitas más información?<br />
          <span>Estamos aquí para ayudarte</span>
        </motion.a>
      </motion.div>
    </section>
  );
}

export default TiendasIntroduccion;