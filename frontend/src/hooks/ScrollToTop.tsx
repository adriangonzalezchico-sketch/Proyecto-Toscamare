import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Forzamos el scroll al inicio de forma INSTANTÁNEA 
    // para evitar que el 'smooth' de CSS active animaciones en el recorrido
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as any, 
    });

    // Refrescamos AOS para que recalcule las posiciones en la nueva página
    AOS.refresh();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
