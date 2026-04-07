import { Plus, Minus, Package } from "lucide-react";

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
  onSelect: (product: Product) => void;
  index?: number;
  quantity: number;
  onUpdateCart: (productName: string, delta: number) => void;
}

export const ProductCard = ({ product, onSelect, index = 0, quantity, onUpdateCart }: Props) => {
  return (
    <div 
      onClick={() => onSelect(product)}
      data-aos="fade-up"
      data-aos-duration="400"
      data-aos-delay={(index % 6) * 50}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col cursor-pointer relative"
    >
      {/* Indicador de cantidad en el carrito */}
      {quantity > 0 && (
        <div className="absolute top-4 right-4 z-20 animate-in zoom-in duration-300">
          <div className="bg-[#D4AF37] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
            <Package className="h-3 w-3" />
            {quantity} EN PEDIDO
          </div>
        </div>
      )}

      {/* Imagen representativa */}
      <div className="relative h-64 overflow-hidden bg-gray-50 border-b border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md text-[#002B61] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md border border-blue-50/50">
            {product.category}
          </span>
        </div>
        
        {/* Capa de acción rápida al hover */}
        <div className="absolute inset-0 bg-[#002B61]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap3">
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateCart(product.name, 1);
              }}
              className="bg-white text-[#002B61] px-6 py-3 rounded-full font-black text-xs uppercase tracking-tighter shadow-2xl hover:bg-[#D4AF37] hover:text-white transition-all transform hover:scale-110 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4" /> Añadir al pedido
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white p-1 rounded-full shadow-2xl transform scale-110 bg-white/95 backdrop-blur-sm"
                 onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => onUpdateCart(product.name, -1)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#002B61] hover:bg-red-50 hover:text-red-500 transition-all hover:scale-110 cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="0"
                max="999"
                value={quantity}
                onChange={(e) => {
                  const val = Math.min(999, parseInt(e.target.value));
                  if (!isNaN(val)) {
                    onUpdateCart(product.name, val - quantity);
                  }
                }}
                className="w-10 text-center font-black text-[#002B61] bg-transparent border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => {
                  if (quantity < 999) onUpdateCart(product.name, 1);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#002B61] hover:bg-green-50 hover:text-green-600 transition-all hover:scale-110 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 justify-between bg-white relative">
        <h4 className="text-xl font-black text-[#002B61] group-hover:text-[#D4AF37] transition-colors leading-tight tracking-tight mb-4">
          {product.name}
        </h4>
        
        {/* Botón persistente en móvil / visible siempre si ya hay unidades */}
        {quantity > 0 && (
          <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4 animate-in slide-in-from-bottom-2">
            <span className="text-[10px] font-bold text-[#002B61]/40 uppercase tracking-widest">En tu orden</span>
            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
               <button 
                 onClick={() => onUpdateCart(product.name, -1)} 
                 className="text-[#002B61]/60 hover:text-red-500 transition-all hover:scale-125 cursor-pointer p-1"
               >
                 <Minus className="h-4 w-4"/>
               </button>
               <input
                 type="number"
                 min="0"
                 max="999"
                 value={quantity}
                 onChange={(e) => {
                   const val = Math.min(999, parseInt(e.target.value));
                   if (!isNaN(val)) {
                     onUpdateCart(product.name, val - quantity);
                   }
                 }}
                 className="w-8 text-center font-black text-[#002B61] bg-transparent border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
               />
               <button 
                 onClick={() => {
                   if (quantity < 999) onUpdateCart(product.name, 1);
                 }} 
                 className="text-[#002B61]/60 hover:text-green-600 transition-all hover:scale-125 cursor-pointer p-1"
               >
                 <Plus className="h-4 w-4"/>
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
