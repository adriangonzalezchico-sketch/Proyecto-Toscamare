interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,43,97,0.1)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
      {/* Imagen del Producto */}
      <div className="relative h-60 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Etiqueta de Categoría Flotante */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md text-[#002B61] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm border border-blue-50">
            {product.category}
          </span>
        </div>
      </div>

      {/* Detalles del Producto */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-[#002B61] mb-2 group-hover:text-[#D4AF37] transition-colors leading-tight">
            {product.name}
          </h4>
          <p className="text-[#002B61]/60 text-sm line-clamp-2 mb-6 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer de la tarjeta con Precio y Botón Dorado */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
              Precio
            </span>
            <span className="text-2xl font-black text-[#002B61]">
              {product.price}€
            </span>
          </div>

          {/* Botón de Acción en Dorado ToscaMare */}
          <button className="bg-[#D4AF37] hover:bg-[#b8962e] text-white p-3.5 rounded-2xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-lg hover:-translate-y-1 active:scale-95 group/btn">
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover/btn:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
