import "./Header.css";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Cambiamos Link por NavLink
import logo from "/logoToscamare/logo-simple-sin-fondo.png";
import { useState } from "react";

interface HeaderProps {
  links: {
    inicio: string;
    sobreNosotros: string;
    tiendas: string;
    contacto: string;
  };
}

function Header({ links }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Función para el logo: va al inicio y refresca si ya estás ahí
  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      window.location.reload(); // Recarga física si ya estás en inicio
    } else {
      navigate("/"); // Navega al inicio si estás en otra parte
    }
  };

  return (
    <header className="header-menu">
      <div
        className="header-logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Toscamare logo" />
      </div>

      <button className="hamburger-menu" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`header-nav ${menuOpen ? "active" : ""}`}>
        <nav>
          <ul className="header-nav-list">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                to={links.inicio}
                onClick={closeMenu}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                to={links.sobreNosotros}
                onClick={closeMenu}
              >
                Sobre Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                to={links.tiendas}
                onClick={closeMenu}
              >
                Tiendas
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                to={links.contacto}
                onClick={closeMenu}
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header-shop">
        <button className="shop-button">
          PRÓXIMAMENTE
          <FaShoppingCart />
        </button>
      </div>
    </header>
  );
}

export default Header;
