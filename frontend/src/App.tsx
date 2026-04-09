import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Inicio from "./pages/inicio/Inicio";
import AvisoLegal from "./pages/avisoLegal/AvisoLegal";
import Cookies from "./pages/cookies/Cookies";
import Tiendas from "./pages/tiendas/Tiendas";
import Contacto from "./pages/Contacto";
import Pedidos from "./pages/Pedidos";
import SobreNosotros from "./pages/sobreNosotros/SobreNosotros";
import Productos from "./pages/productos/Productos";
import NotFound from "./pages/NotFound";

function AOSRefresh() {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
      // Un refresh extra por si acaso hay contenido dinámico
      setTimeout(() => AOS.refresh(), 500);
    }, 100);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    (window as any).AOS = AOS;
    AOS.init({
      duration: 400, // Más rápido
      once: true,
      offset: 50,
      easing: "ease-out",
      disableMutationObserver: false,
    });
    // Forzar refresh inicial
    setTimeout(() => AOS.refresh(), 100);
  }, []);

  const linksHeader = {
    inicio: "/",
    sobreNosotros: "/sobre-nosotros",
    tiendas: "/tiendas",
    contacto: "/contacto",
    productos: "/productos",
  };

  const linksFooter = {
    inicio: "/",
    sobreNosotros: "/sobre-nosotros",
    tiendas: "/tiendas",
    contacto: "/contacto",
    avisoLegal: "/aviso-legal",
    cookies: "/cookies",
    productos: "/productos",
  };

  return (
    <>
      <BrowserRouter>
        <AOSRefresh />
        <Routes>
          <Route element={<MainLayout linksHeader={linksHeader} linksFooter={linksFooter} />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/tiendas" element={<Tiendas />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/productos" element={<Productos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
