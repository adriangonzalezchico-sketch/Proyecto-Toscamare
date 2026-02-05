import Hero from "../../components/sobreNosotros/hero";
import NuestraEsencia from "../../components/sobreNosotros/NuestraEsencia";
import LogisticaCompromiso from "../../components/sobreNosotros/LogisticaCompromiso";
import ReyCasaAtun from "../../components/sobreNosotros/ReyCasaAtun";
import Confianza from "../../components/sobreNosotros/Confianza";
import CTA from "../../components/sobreNosotros/CTA";

const SobreNosotros = () => {
  return (
    <div className="bg-white">
      <Hero />
      <NuestraEsencia />
      <LogisticaCompromiso />
      <ReyCasaAtun />
      <Confianza />
      <CTA />
    </div>
  );
};

export default SobreNosotros;
