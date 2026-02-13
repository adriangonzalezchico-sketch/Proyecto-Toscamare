import Carousel from "./Carousel"
import './CardsTiendas.css';
import { motion } from "framer-motion";


function CardsTiendas() {
    return (
        <section className="cards-tiendas-section">
            <motion.h2 
                className="cards-tiendas-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Explora nuestras tiendas
            </motion.h2>
            <motion.div 
                className="cards-tiendas-carousel-container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <Carousel
                    baseWidth={820}
                    autoplay={true}
                    autoplayDelay={5000}
                    pauseOnHover={false}
                    loop={true}
                    round={false}
                />
            </motion.div>
            <motion.div 
                className="contact-cta-block refined"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
                <span className="contact-cta-lead">¿Tienes dudas o necesitas más información?</span>
                <motion.a 
                    href="/contacto" 
                    className="contact-cta-button refined"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    <span>Contactar con nosotros</span>
                    <motion.svg 
                        width="22" 
                        height="22" 
                        viewBox="0 0 22 22" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        style={{marginLeft:8,verticalAlign:'middle'}}
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <path d="M5.5 11H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.5 7L16.5 11L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                </motion.a>
                <div className="contact-cta-subtext">Te responderemos lo antes posible.</div>
            </motion.div>
        </section>
    )
}

export default CardsTiendas