import { Plus, Package, Trash2, ChevronDown } from "lucide-react";

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
  unit: string;
  onUpdateCart: (productName: string, quantity: number, unit: string) => void;
}

const UNITS = ["Uds", "Kg", "gr"];

export const ProductCard = ({ product, onSelect, index = 0, quantity, unit, onUpdateCart }: Props) => {
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
            {quantity} {unit} EN PEDIDO
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
        
      </div>

      <div className="p-8 flex flex-col flex-1 justify-between bg-white relative">
        <h4 className="text-xl font-black text-[#002B61] group-hover:text-[#D4AF37] transition-colors leading-tight tracking-tight mb-4">
          {product.name}
        </h4>
        
        <div className="mt-auto">
          {quantity > 0 ? (
            <div className="border-t border-gray-100 pt-5 animate-in slide-in-from-bottom-2">
              <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) onUpdateCart(product.name, val, unit);
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#002B61] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                      placeholder="Cantidad"
                      min="0"
                    />
                  </div>
                  <div className="relative flex-1">
                    <select
                      value={unit}
                      onChange={(e) => onUpdateCart(product.name, quantity, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#002B61] appearance-none cursor-pointer focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                    >
                      {UNITS.map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                  </div>
                  <button 
                    onClick={() => onUpdateCart(product.name, 0, unit)}
                    className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all cursor-pointer group/trash"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-100 pt-5 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateCart(product.name, 1, "Uds");
                }}
                className="w-full py-3.5 bg-[#011468] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-[#D4AF37] active:scale-95 transition-all shadow-lg shadow-blue-900/10 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Añadir al pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
