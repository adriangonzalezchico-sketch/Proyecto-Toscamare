import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Inicio from "./pages/inicio/Inicio";
import AvisoLegal from "./pages/avisoLegal/AvisoLegal";
import Cookies from "./pages/cookies/Cookies";
import Tiendas from "./pages/tiendas/Tiendas";

function App() {
  if ("scrollRestoration" in history) {
    // eslint-disable-next-line react-hooks/immutability
    history.scrollRestoration = "manual";
  }
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: false,
      offset: 100,
    });
  }, []);

  const linksHeader = {
    inicio: "Inicio",
    sobreNosotros: "Sobre Nosotros",
    tiendas: "Tiendas",
    contacto: "Contacto",
  };

  const linksFooter = {
    inicio: "Inicio",
    sobreNosotros: "Sobre Nosotros",
    tiendas: "Tiendas",
    contacto: "Contacto",
    avisoLegal: "Aviso Legal",
    cookies: "Cookies",
  };

  return (
    <>
      <Header links={linksHeader}></Header>
      <Inicio />
      <Footer links={linksFooter}></Footer>
      <AvisoLegal />
      <Cookies />
      <Tiendas />
    </>
  );
}

export default App;
