import CarruselMarcas from "./../../components/inicioBloques/CarruselMarcas";
import Portada from "../../components/inicioBloques/Portada";
import RedTiendas from "../../components/inicioBloques/RedTiendas";
import CalidadProductos from "./../../components/inicioBloques/CalidadProductos";
import ServicioHosteleria from "../../components/inicioBloques/ServicioHosteleria";
import SeccionContacto from "../../components/inicioBloques/SeccionContacto";
import HeroVideo from "../../components/inicioBloques/HeroVideo";

const Inicio = () => {
  return (
    <div>
      <HeroVideo />
      <Portada />
      <RedTiendas />
      <CalidadProductos />
      <ServicioHosteleria />
      <CarruselMarcas />
      <SeccionContacto />
    </div>
  );
};

export default Inicio;