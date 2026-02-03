import "./Header.css";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "/logoToscamare/logo-simple-sin-fondo.png";
import { useState } from "react";


/* Definición de las props que recibe el componente Header */
interface HeaderProps {
    links: {
        inicio: string;
        sobreNosotros: string;
        tiendas: string;
        contacto: string;
    };
}

/*
Componente Header que recibe un objeto de enlaces como props y renderiza el encabezado del sitio web.
*/
function Header({ links }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="header-menu">
            <div className="header-logo">
              <img src={logo} alt="Toscamare logo" />
            </div>

            <button className="hamburger-menu" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`header-nav ${menuOpen ? "active" : ""}`}>
        <nav>
          <ul className="header-nav-list">
            <li>
              <Link className="link" to={links.inicio} onClick={closeMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <Link className="link" to={links.sobreNosotros} onClick={closeMenu}>
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link className="link" to={links.tiendas} onClick={closeMenu}>
                Tiendas
              </Link>
            </li>
            <li>
              <Link className="link" to={links.contacto} onClick={closeMenu}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>

            <div className="header-shop">
                <button className="shop-button" onClick={() => {}}>
                    PRÓXIMAMENTE
                    <FaShoppingCart />
                </button>
            </div>
            
        </header>
    );
}

export default Header
