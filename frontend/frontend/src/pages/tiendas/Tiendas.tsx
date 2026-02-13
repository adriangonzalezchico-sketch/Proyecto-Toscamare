import TiendasTitulo from "../../components/tiendas/TiendasTitulo";
import TiendasIntroduccion from "../../components/tiendas/TiendasIntroduccion";

import MapTiendas from "../../components/tiendas/MapTiendas";
import ListaTiendas from "../../components/tiendas/ListaTiendas";

import "./Tiendas.css";
import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import CardsTiendas from "../../components/tiendas/CardsTiendas";
import { motion, easeOut } from "framer-motion";

function Tiendas() {
  const [selectedTienda, setSelectedTienda] = useState(null);

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

  return (
    <section className="tiendas-section">
      <TiendasTitulo />
      <TiendasIntroduccion />
      <motion.div
        className="tiendas-layout"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={layoutVariants}
      >
        <div className="tiendas-mapa-col">
          <APIProvider
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onLoad={() => console.log("Maps API has loaded.")}
          >
            <MapTiendas selectedTienda={selectedTienda} />
          </APIProvider>
        </div>
        <div className="tiendas-lista-col">
          <ListaTiendas
            onTiendaClick={setSelectedTienda}
            selectedTienda={selectedTienda}
          />
        </div>
      </motion.div>
      <CardsTiendas />
    </section>
  );
}

export default Tiendas;
