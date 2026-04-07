import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { ProductLayout } from "../../components/productos/ProductLayout";
import { ProductFilters } from "../../components/productos/ProductFilters";
import { ProductSearch } from "../../components/productos/ProductSearch";
import { ProductGrid } from "../../components/productos/ProductGrid";
import { Pagination } from "../../components/productos/Pagination";
import { ProductHero } from "../../components/productos/ProductHero";
import { ScrollToTopButton } from "../../components/ui/ScrollToTopButton";
import { ProductModal } from "../../components/productos/ProductModal";
// Importación masiva de imágenes de categorías
import ahumadosImg from "../../assets/imagenes_categorias/Ahumados y salazones.webp";
import carnesImg from "../../assets/imagenes_categorias/Carnes.webp";
import embutidosImg from "../../assets/imagenes_categorias/Embutidos.webp";
import encurtidosImg from "../../assets/imagenes_categorias/Encurtidos.webp";
import frutasImg from "../../assets/imagenes_categorias/Frutas.webp";
import huevosImg from "../../assets/imagenes_categorias/Huevos.webp";
import mariscosImg from "../../assets/imagenes_categorias/Mariscos, moluscos y bivalvos.webp";
import monodosisImg from "../../assets/imagenes_categorias/Monodosis.webp";
import nataImg from "../../assets/imagenes_categorias/Nata.webp";
import patatasImg from "../../assets/imagenes_categorias/Patatas.webp";
import pescadosImg from "../../assets/imagenes_categorias/Pescados.webp";
import precocinadosImg from "../../assets/imagenes_categorias/Precocinados.webp";
import preparadosVerdurasImg from "../../assets/imagenes_categorias/Preparados con verduras.webp";
import preparadosPostresImg from "../../assets/imagenes_categorias/Preparados para postres.webp";
import preparadosPizzasImg from "../../assets/imagenes_categorias/Preparados y pizzas.webp";
import perecederosImg from "../../assets/imagenes_categorias/Productos no perecederos.webp";
import quesosImg from "../../assets/imagenes_categorias/Quesos.webp";
import reposteriaImg from "../../assets/imagenes_categorias/Repostería.webp";
import salsasImg from "../../assets/imagenes_categorias/Salsas.webp";
import sinGlutenImg from "../../assets/imagenes_categorias/Sin glúten.webp";
import tematicosImg from "../../assets/imagenes_categorias/Temáticos.webp";
import verdurasImg from "../../assets/imagenes_categorias/Verduras.webp";

import AOS from "aos";

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
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const itemsPerPage = 30;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/productos_destacados.csv");
        if (!response.ok) throw new Error("No se pudo cargar el archivo de productos");
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            const rawData = results.data as any[];
            
            // Definición de imágenes locales
            const localCategoryImages: Record<string, string> = {
              pescados: pescadosImg,
              carnes: carnesImg,
              mariscos: mariscosImg,
              precocinados: precocinadosImg,
              verduras: verdurasImg,
              "preparados con verduras": preparadosVerdurasImg,
              ahumados: ahumadosImg,
              embutidos: embutidosImg,
              encurtidos: encurtidosImg,
              "productos no perecederos": perecederosImg,
              temáticos: tematicosImg,
              "preparados y pizzas": preparadosPizzasImg,
              nata: nataImg,
              "sin gluten": sinGlutenImg,
              "sin glúten": sinGlutenImg,
              huevos: huevosImg,
              quesos: quesosImg,
              monodosis: monodosisImg,
              salsas: salsasImg,
              patatas: patatasImg,
              "preparados postres": preparadosPostresImg,
              "preparados para postres": preparadosPostresImg,
              repostería: reposteriaImg,
              frutas: frutasImg,
            };

            const categoryImages: Record<string, string> = {
              pescados: "1519708227418-c8fd9a32b7a2",
              mariscos: "1563379091339-03b21bc4a4f8",
              precocinados: "1541529086164-1dec306c83b4",
              verduras: "1546069901-ba9599a7e63c",
              frutas: "1619566639808-57ec61b58090",
              embutidos: "1607623814075-e51df1bdc822",
              carnes: "1607623814075-e51df1bdc822",
              pizzas: "1513104890138-7c749659a591",
              postres: "1484723088339-fe2a7a8f6d81",
              quesos: "1486297678162-ad2a19b05844",
              ahumados: "1485921325833-c519f76c4927",
            };

            const formattedProducts = rawData
              .map((row, index) => {
                const normalizedRow: any = {};
                Object.keys(row).forEach(key => {
                  if (!key) return; // Evitar llaves vacías
                  const normKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  normalizedRow[normKey] = row[key];
                });

                const rowName = normalizedRow.nombre || normalizedRow.name;
                const rowCat = normalizedRow.categoria || normalizedRow.category || "Otros";

                if (!rowName) return null;

                const cat = rowCat.toLowerCase();
                let finalImage = "";
                for (const key in localCategoryImages) {
                  if (cat.includes(key)) {
                    finalImage = localCategoryImages[key];
                    break;
                  }
                }

                if (!finalImage) {
                  let imageId = "1546552734-d9f7830cb826";
                  for (const key in categoryImages) {
                    if (cat.includes(key)) {
                      imageId = categoryImages[key];
                      break;
                    }
                  }
                  finalImage = `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=600&h=450&sig=${index % 10}`;
                }

                return {
                  id: index,
                  name: rowName,
                  category: rowCat,
                  price: 0,
                  image: finalImage,
                  description: "",
                };
              })
              .filter((p): p is Product => p !== null);

            const sortedProducts = [...formattedProducts].sort((a, b) => a.name.localeCompare(b.name, "es", { numeric: true }));
            setProducts(sortedProducts);
            setLoading(false);
            setTimeout(() => AOS.refresh(), 200);
          }
        });
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Efecto para hacer scroll suave al cambiar de página
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.name) return false;
      
      const normalizeStr = (str: string) => 
        str.toLowerCase()
           .normalize("NFD")
           .replace(/[\u0300-\u036f]/g, "")
           .replace(/,/g, "")
           .trim();
      
      const normalizedProductCat = normalizeStr(product.category || "");
      const normalizedFilterCat = normalizeStr(category);

      const matchesCategory =
        category === "todos" ||
        normalizedProductCat === normalizedFilterCat;

      const matchesSearch = normalizeStr(product.name)
        .includes(normalizeStr(search));
        
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [filteredProducts, startIndex, itemsPerPage]);

  // --- CÁLCULOS PARA EL CONTADOR DINÁMICO ---
  const firstItemNumber = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const lastItemNumber = Math.min(
    startIndex + itemsPerPage,
    filteredProducts.length,
  );

  // --- LÓGICA DE CARRITO / LOCALSTORAGE ---
  const [selectedProducts, setSelectedProducts] = useState<{name: string, quantity: number}[]>([]);

  // Cargar carrito al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("toscamare_pedido_pendiente");
    if (saved) {
      try {
        setSelectedProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar carrito del localStorage", e);
      }
    }
  }, []);

  // Guardar carrito al cambiar
  useEffect(() => {
    if (selectedProducts.length > 0) {
      localStorage.setItem("toscamare_pedido_pendiente", JSON.stringify(selectedProducts));
    } else {
      localStorage.removeItem("toscamare_pedido_pendiente");
    }
  }, [selectedProducts]);

  const handleUpdateCart = (productName: string, delta: number) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.name === productName);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter(p => p.name !== productName);
        }
        return prev.map(p => p.name === productName ? { ...p, quantity: newQty } : p);
      } else if (delta > 0) {
        return [...prev, { name: productName, quantity: delta }];
      }
      return prev;
    });
  };

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
            <div 
              className="flex items-center gap-2"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="200"
            >
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

          <div data-aos="fade-up" data-aos-delay="300">
            <ProductSearch onSearch={handleSearch} />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
            ))}
          </div>
        ) : (
          <>
            <ProductGrid 
              products={currentItems} 
              onSelect={setSelectedProduct} 
              selectedProducts={selectedProducts}
              onUpdateCart={handleUpdateCart}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
      }
    >
      <ScrollToTopButton />
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </ProductLayout>
  );
}
