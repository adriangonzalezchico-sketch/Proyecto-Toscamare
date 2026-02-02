import Seguridad from "../../components/avisolegal/Seguridad";
import Privacidad from "../../components/avisolegal/Privacidad";
import UsoInfo from "../../components/avisolegal/UsoInfo";
import ObtenerInfo from "../../components/avisolegal/ObtenerInfo";

const AvisoLegal = () => {
  return (
    <div className="" bg-white min-h-screen font-sans text-slate-850>
      {/* Header de la página */}

      <h1 className="text-black text-5xl font-black uppercase tracking-tighter text-center">
        {" "}
        AVISO LEGAL{" "}
      </h1>
      <div className="h-1.5 w-20 bg-brand-rojo mx-auto mt-6 rounded-full"></div>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-20">
          <section className="group">
            <div className="pl-8 border-l-2 border-slate-100 group-hover:border-brand-celeste transition-all duration-300">
              <Privacidad />
            </div>
          </section>

          <section className="group">
            <div className="pl-8 border-l-2 border-slate-100 group-hover:border-brand-celeste transition-all duration-300">
              <Seguridad />
            </div>
          </section>

          <section className="group bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <ObtenerInfo />
          </section>

          <section className="group">
            <div className="pl-8 border-l-2 border-slate-100 group-hover:border-brand-celeste transition-all duration-300">
              <UsoInfo />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AvisoLegal;
