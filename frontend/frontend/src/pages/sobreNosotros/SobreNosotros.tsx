import Hero from "../../components/sobreNosotros/Hero";
import Trayectoria from "../../components/sobreNosotros/Trayectoria";
import PremiosAtun from "../../components/sobreNosotros/PremiosAtun";
import ProductosCalidad from "../../components/sobreNosotros/ProductosCalidad";
import CTA from "../../components/sobreNosotros/CTA";

const SobreNosotros = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Trayectoria />
      <PremiosAtun />
      <ProductosCalidad />
      <CTA />
    </div>
  );
};

export default SobreNosotros;
