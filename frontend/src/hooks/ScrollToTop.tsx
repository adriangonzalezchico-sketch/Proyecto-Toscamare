import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Forzamos el scroll al inicio (0,0) cada vez que cambia la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
