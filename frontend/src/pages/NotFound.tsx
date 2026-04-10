import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import "../App.css";

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '20px'
    }}>
      <FaExclamationTriangle style={{ fontSize: '80px', color: '#dc3545', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#343a40' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#6c757d' }}>Página no encontrada</h2>
      <p style={{ maxWidth: '500px', marginBottom: '40px', color: '#6c757d', lineHeight: '1.6' }}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida. 
        Puedes volver al inicio utilizando el botón de abajo.
      </p>
      <Link 
        to="/" 
        className="shop-button" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          textDecoration: 'none',
          padding: '12px 24px'
        }}
      >
        <FaHome /> VOLVER AL INICIO
      </Link>
    </div>
  );
};

export default NotFound;
