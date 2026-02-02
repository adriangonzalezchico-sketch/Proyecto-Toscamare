import "./Footer.css";
import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa";

/* Definición de las props que recibe el componente Footer */
interface FooterProps {
  links: {
    inicio: string;
    sobreNosotros: string;
    tiendas: string;
    contacto: string;
    avisoLegal: string;
    cookies?: string;
  };
}

/*
Componente Footer que recibe un objeto de enlaces como props y renderiza el pie de página del sitio web.
*/
function Footer({ links }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-info">
          <img
            className="footer-logo"
            src="/public/logoToscamare/icono-toscamare-blanco.webp"
            alt="Toscamare "
          />
          <p className="txt-footer">
            Distribuidor y venta de alimentos al por mayor y al por menor con
            sede en Cartaya, Huelva.
          </p>
        </div>

        <div className="footer-menu">
          <p className="titulo-footer">Enlaces de interés</p>
          <p>
            <a href="">{links.inicio}</a>
          </p>
          <p>
            <a href="">{links.sobreNosotros}</a>
          </p>
          <p>
            <a href="">{links.tiendas}</a>
          </p>
          <p>
            <a href="">{links.contacto}</a>
          </p>
          <p>
            <a href="">{links.avisoLegal}</a>
          </p>
          <p>
            <a href="">{links.cookies}</a>
          </p>
        </div>

        <div className="footer-contact">
          <p className="titulo-footer">Contacta con nosotros</p>
          <p>
            <FaPhone />
            959 38 22 21
          </p>
          <p>
            <FaEnvelope />
            administracion@cialtoscamare.es
          </p>

          <br />
          <p className="titulo-footer">Estamos en redes sociales</p>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/toscanocongelados"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/toscamare"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          {new Date().getFullYear()} © Toscamare - Todos los derechos reservados
        </span>

        {/*
        <div className="footer-social">
          <a href="https://www.facebook.com/toscanocongelados" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/toscamare" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
        */}
      </div>
    </footer>
  );
}

export default Footer;
