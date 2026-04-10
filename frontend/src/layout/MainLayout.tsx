import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../hooks/ScrollToTop";

interface MainLayoutProps {
  linksHeader: {
    inicio: string;
    sobreNosotros: string;
    tiendas: string;
    contacto: string;
    productos: string;
  };
  linksFooter: {
    inicio: string;
    sobreNosotros: string;
    tiendas: string;
    contacto: string;
    avisoLegal: string;
    cookies: string;
    productos: string;
  };
}

const MainLayout = ({ linksHeader, linksFooter }: MainLayoutProps) => {
  return (
    <>
      <Header links={linksHeader} />
      <ScrollToTop />
      <Outlet />
      <Footer links={linksFooter} />
    </>
  );
};

export default MainLayout;
