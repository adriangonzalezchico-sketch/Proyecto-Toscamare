import "./Header.css";
import { FaShoppingCart } from "react-icons/fa";

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

    return (
        <header className="header-menu">
            <div className="header-logo">
                <img src="/public/logoToscamare/logo-simple-sin-fondo.png" alt="Toscamare logo" />
            </div>

            <div className="header-nav">
                <nav>
                    <ul className="header-nav-list">
                        <li><a className="link" href="#">{links.inicio}</a></li>
                        <li><a className="link" href="#">{links.sobreNosotros}</a></li>
                        <li><a className="link" href="#">{links.tiendas}</a></li>
                        <li><a className="link" href="#">{links.contacto}</a></li>
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
