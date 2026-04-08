
import Anedilco from "../../components/inicioBloques/Anedilco";
import RedTiendas from "../../components/inicioBloques/RedTiendas";
import CalidadProductos from "../../components/inicioBloques/CalidadProductos";
import ServicioHosteleria from "../../components/inicioBloques/ServicioHosteleria";
import SeccionContacto from "../../components/inicioBloques/SeccionContacto";
import HeroVideo from "../../components/inicioBloques/HeroVideo";

const Inicio = () => {
  return (
    <div>
      <HeroVideo />
      <ServicioHosteleria />
      <RedTiendas />

      <CalidadProductos />
      <Anedilco />
      <SeccionContacto />
    </div>
  );
};

export default Inicio;
