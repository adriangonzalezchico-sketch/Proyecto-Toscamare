import React, { useState } from 'react';
import './ListaTiendas.css';
import { tiendasUbicaciones } from '../../data/tiendasUbicaciones';

interface ListaTiendasProps {
  onTiendaClick: (tienda: any) => void;
  selectedTienda: any;
}

const ListaTiendas: React.FC<ListaTiendasProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar y ordenar las tiendas
  const filteredTiendas = tiendasUbicaciones
    .filter(tienda =>
      tienda.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tienda.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const term = searchTerm.toLowerCase();
      const nameA = a.nombre.toLowerCase();
      const nameB = b.nombre.toLowerCase();

      const aNameMatch = nameA.includes(term);
      const bNameMatch = nameB.includes(term);

      // Prioritize name match over address match
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      // If both match by name, check for "starts with" for even better relevance
      if (aNameMatch && bNameMatch) {
        if (nameA.startsWith(term) && !nameB.startsWith(term)) return -1;
        if (!nameA.startsWith(term) && nameB.startsWith(term)) return 1;
      }

      return 0; // Maintain original order otherwise
    });

  return (
    <aside className="lista-tiendas-container">
      <div className="lista-header">
        <h2 className="lista-tiendas-titulo">Nuestras Tiendas</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Busca tu tienda..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTiendas.length > 0 ? (
        <div className="scroll-stack-scroller">
          <div className="scroll-stack-inner">
            {filteredTiendas.map((tienda) => (
              <div
                key={tienda.nombre}
                className={`scroll-stack-card ${
                  props.selectedTienda && props.selectedTienda.nombre === tienda.nombre ? 'seleccionada' : ''
                }`}
                onClick={() => props.onTiendaClick(tienda)}
              >
                <div className="nombre-tienda">
                  {tienda.nombre}
                  {tienda.nombre === 'SEDE CENTRAL' && <span className="principal-label"> (Sede Principal)</span>}
                </div>
                <div className="direccion-tienda">{tienda.direccion}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-results">
          <p>No encontramos ninguna tienda con ese nombre.</p>
        </div>
      )}
    </aside>
  );
};

export default ListaTiendas;
