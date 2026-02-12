import { useState, useEffect } from "react";
import Papa from "papaparse";
import { ProductLayout } from "../../components/productos/ProductLayout";
import { ProductFilters } from "../../components/productos/ProductFilters";
import { ProductSearch } from "../../components/productos/ProductSearch";
import { ProductGrid } from "../../components/productos/ProductGrid";
import { Pagination } from "../../components/productos/Pagination";
import { ProductHero } from "../../components/productos/ProductHero";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    Papa.parse("/productos_finales_toscamare.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setProducts(results.data as Product[]);
      },
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!product.name) return false;
    const matchesCategory =
      category === "todos" ||
      product.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // --- CÁLCULOS PARA EL CONTADOR DINÁMICO ---
  const firstItemNumber = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const lastItemNumber = Math.min(
    startIndex + itemsPerPage,
    filteredProducts.length,
  );

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <ProductLayout
      intro={<ProductHero />}
      filters={
        <ProductFilters
          activeCategory={category}
          setCategory={handleCategoryChange}
        />
      }
      content={
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            {/* CONTADOR DINÁMICO MEJORADO */}
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <p className="text-xs md:text-sm font-bold text-[#002B61] uppercase tracking-widest opacity-70">
                Mostrando{" "}
                <span className="text-[#002B61]">
                  {firstItemNumber} – {lastItemNumber}
                </span>
                <span className="mx-2 text-gray-400 font-normal">de</span>
                <span className="text-[#D4AF37]">
                  {filteredProducts.length}
                </span>{" "}
                productos
              </p>
            </div>

            <ProductSearch onSearch={handleSearch} />
          </div>

          <ProductGrid products={currentItems} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      }
    />
  );
}
