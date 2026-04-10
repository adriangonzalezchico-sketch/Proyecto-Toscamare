import { IoClose } from "react-icons/io5";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
      data-aos="fade"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#002B61]/40 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col min-h-[600px] max-h-[90vh]"
        data-aos="zoom-in"
        data-aos-duration="400"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 bg-white/80 backdrop-blur-md p-2 rounded-full text-[#002B61] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-lg"
        >
          <IoClose size={24} />
        </button>

        {/* Product Image Section */}
        <div className="w-full h-[350px] relative bg-gray-50 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6">
            <span className="bg-[#D4AF37] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full p-10 flex flex-col flex-1 justify-between bg-white text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#002B61] leading-tight mb-4 text-center">
              {product.name}
            </h2>
            <div className="h-1.5 w-16 bg-[#D4AF37] rounded-full"></div>
          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={onClose}
              className="bg-[#002B61] text-white px-12 py-4 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Cerrar Vista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
