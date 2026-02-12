interface Props {
  intro: React.ReactNode;
  filters: React.ReactNode;
  content: React.ReactNode;
}

export const ProductLayout = ({ intro, filters, content }: Props) => {
  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans">
      {/* 🌊 SECCIÓN INTRO / HERO */}
      {/* HEMOS QUITADO 'shadow-lg' de aquí para eliminar la sombra */}
      <header className="relative w-full overflow-visible">
        {/* Nota: He quitado el fondo azul y el SVG de aquí 
           porque ya los incluimos dentro del componente ProductHero.
           Si los dejas aquí, se duplicarían.
        */}
        <div className="relative z-10">{intro}</div>
      </header>

      {/* 🛒 CUERPO PRINCIPAL */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 🔍 ASIDE (FILTROS) */}
          <aside className="w-full lg:w-[280px] flex-shrink-0">
            <div className="lg:sticky lg:top-8 z-20">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <div className="bg-[#002B61] py-4 px-6 border-b-4 border-[#D4AF37]">
                  <h3 className="text-white font-bold flex items-center gap-3 text-sm uppercase tracking-widest">
                    <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></span>
                    Filtros
                  </h3>
                </div>
                <div className="p-5 bg-white">{filters}</div>
              </div>
            </div>
          </aside>

          {/* 📦 CONTENIDO (Buscador + Grid) */}
          <main className="flex-1 flex flex-col gap-8 min-w-0">
            <div className="w-full">{content}</div>
          </main>
        </div>
      </div>

      <footer className="py-12 text-center border-t border-gray-200 mt-10">
        <p className="text-[#002B61]/60 text-sm font-medium">
          ToscaMare © {new Date().getFullYear()} - Calidad de Origen
        </p>
      </footer>
    </div>
  );
};
