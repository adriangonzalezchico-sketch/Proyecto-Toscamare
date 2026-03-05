interface Props {
  activeCategory: string;
  setCategory: (cat: string) => void;
  // Opcional: podrías pasar un array de categorías si vienen de la base de datos
}

const categories = [
  { id: "todos", name: "Todos los productos" },
  { id: "pescados", name: "Pescados Frescos" },
  { id: "mariscos", name: "Mariscos Seleccionados" },
  { id: "carnes", name: "Carnes Premium" },
  { id: "conservas", name: "Conservas del Mar" },
  { id: "vinos", name: "Bodega y Vinos" },
];

export const ProductFilters = ({ activeCategory, setCategory }: Props) => {
  return (
    <div className="space-y-1">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 border border-transparent ${
            activeCategory === cat.id
              ? "bg-[#002B61]/5 text-[#002B61] font-bold shadow-sm border-blue-100/50" // Fondo azul muy sutil y elegante
              : "text-gray-500 hover:bg-gray-50 hover:text-[#002B61]"
          }`}
        >
          <span className="flex items-center gap-3">
            {/* El punto dorado que indica selección */}
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)] scale-110" // Dorado brillante
                  : "bg-gray-300 group-hover:bg-[#D4AF37]"
              }`}
            />
            {cat.name}
          </span>

          {/* Flecha deslizante */}
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              activeCategory === cat.id
                ? "translate-x-0 opacity-100 text-[#D4AF37]" // Flecha dorada al estar activo
                : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-[#002B61]"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};
