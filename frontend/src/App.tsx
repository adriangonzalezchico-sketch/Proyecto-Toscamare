import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./hooks/ScrollToTop";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./layout/Footer";
import Header from "./layout/Header";

import Inicio from "./pages/inicio/Inicio";
import AvisoLegal from "./pages/avisoLegal/AvisoLegal";
import Cookies from "./pages/cookies/Cookies";
import Tiendas from "./pages/tiendas/Tiendas";
import Contacto from "./pages/Contacto";
import SobreNosotros from "./pages/sobreNosotros/SobreNosotros";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Duración elegante
      once: true, //Solo anima una vez
      offset: 100, // Empieza 100px antes de llegar al elemento
      easing: "ease-in-out", // Curva de suavizado fluida
      disableMutationObserver: false, // Ayuda a que AOS no se pierda en SPAs de React
    });
  }, []);

  const linksHeader = {
    inicio: "/",
    sobreNosotros: "/sobre-nosotros",
    tiendas: "/tiendas",
    contacto: "/contacto",
  };

  const linksFooter = {
    inicio: "/",
    sobreNosotros: "/sobre-nosotros",
    tiendas: "/tiendas",
    contacto: "/contacto",
    avisoLegal: "/aviso-legal",
    cookies: "/cookies",
  };

  return (
    <>
      <BrowserRouter>
        <Header links={linksHeader} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tiendas" element={<Tiendas />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>

        <Footer links={linksFooter} />
      </BrowserRouter>
    </>
  );
}

export default App;
