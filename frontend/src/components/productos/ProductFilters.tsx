interface Props {
  activeCategory: string;
  setCategory: (cat: string) => void;
  // Opcional: podrías pasar un array de categorías si vienen de la base de datos
}

const categories = [
  { id: "todos", name: "Todos los productos" },
  { id: "pescados", name: "Pescados" },
  { id: "mariscos, moluscos y bivalvos", name: "Mariscos, moluscos y bivalvos" },
  { id: "carnes", name: "Carnes" },
  { id: "precocinados", name: "Precocinados" },
  { id: "verduras", name: "Verduras" },
  { id: "preparados con verduras", name: "Preparados con verduras" },
  { id: "ahumados", name: "Ahumados" },
  { id: "embutidos", name: "Embutidos" },
  { id: "encurtidos", name: "Encurtidos" },
  { id: "productos no perecederos", name: "Productos no perecederos" },
  { id: "temáticos", name: "Temáticos" },
  { id: "preparados y pizzas", name: "Preparados y pizzas" },
  { id: "nata", name: "Nata" },
  { id: "sin gluten", name: "Sin gluten" },
  { id: "huevos", name: "Huevos" },
  { id: "quesos", name: "Quesos" },
  { id: "monodosis", name: "Monodosis" },
  { id: "salsas", name: "Salsas" },
  { id: "patatas", name: "Patatas" },
  { id: "preparados postres", name: "Preparados postres" },
  { id: "repostería", name: "Repostería" },
  { id: "frutas", name: "Frutas" },
];


export const ProductFilters = ({ activeCategory, setCategory }: Props) => {
  return (
    <div className="space-y-1">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`w-full group flex items-start justify-between px-4 py-3 rounded-xl transition-all duration-300 border border-transparent cursor-pointer ${
            activeCategory === cat.id
              ? "bg-[#002B61]/5 text-[#002B61] font-extrabold shadow-sm border-blue-100/50"
              : "text-gray-500 hover:bg-gray-50 hover:text-[#002B61] font-medium"
          }`}
        >
          <span className="flex items-start gap-3 mt-1 text-left">
            {/* El punto dorado */}
            <span
              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 group-hover:scale-125 ${
                activeCategory === cat.id
                  ? "bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)] scale-110"
                  : "bg-gray-300 group-hover:bg-[#D4AF37]"
              }`}
            />
            <span className="text-[13px] md:text-sm leading-tight uppercase tracking-wide">
              {cat.name}
            </span>
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
