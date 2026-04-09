import "./Header.css";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Cambiamos Link por NavLink
import logo from "/logoToscamare/logo-simple-sin-fondo-ajustado.png";
import { useState, useEffect } from "react";

interface HeaderProps {
  links: {
    inicio: string;
    sobreNosotros: string;
    tiendas: string;
    contacto: string;
    productos: string;
  };
}

function Header({ links }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };  const [cartCount, setCartCount] = useState(0);
  const [isBumping, setIsBumping] = useState(false);

  // Efecto para cargar y escuchar cambios en el carrito
  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem("toscamare_pedido_pendiente");
      if (saved) {
        try {
          const products = JSON.parse(saved);
          if (products.length !== cartCount) {
            setCartCount(products.length);
            setIsBumping(true);
            setTimeout(() => setIsBumping(false), 300);
          }
        } catch {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    // Carga inicial
    updateCount();

    // Escuchar eventos personalizados y de sistema
    window.addEventListener("cart-updated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, [cartCount]);
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
                to={links.productos}
                onClick={closeMenu}
              >
                Catálogo de productos
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
        <NavLink 
          to={cartCount > 0 ? "/pedidos" : links.productos} 
          className={`shop-button ${cartCount > 0 ? "has-items" : ""} ${isBumping ? "bump" : ""}`} 
          onClick={closeMenu}
        >
          <div className="shop-icon-wrapper">
            <FaShoppingCart className="shop-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          <span className="shop-text">
            {cartCount > 0 ? "MI PEDIDO" : "HACER PEDIDO"}
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
