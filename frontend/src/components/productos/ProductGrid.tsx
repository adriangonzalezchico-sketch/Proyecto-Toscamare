import { ProductCard } from "./ProductCard";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  // Si no hay productos después de filtrar
  if (products.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
        <div className="bg-[#002B61]/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-[#002B61]/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#002B61] mb-2">
          No encontramos productos
        </h3>
        <p className="text-[#002B61]/60 max-w-xs mx-auto">
          Intenta ajustar los filtros de búsqueda o prueba con otra categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
