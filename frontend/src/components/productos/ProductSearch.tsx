interface SearchProps {
  onSearch: (value: string) => void;
}

export const ProductSearch = ({ onSearch }: SearchProps) => {
  return (
    <div className="relative w-full group">
      {/* Icono de Lupa */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        placeholder="¿Qué producto estás buscando hoy?"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full bg-white py-4 pl-12 pr-40 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] outline-none 
                   focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] 
                   transition-all duration-300 placeholder:text-gray-400 text-[#002B61] font-medium"
      />

      {/* Etiqueta flotante decorativa */}
      <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
        <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-[#002B61]/30">
          ToscaMare Selects
        </span>
      </div>
    </div>
  );
};
