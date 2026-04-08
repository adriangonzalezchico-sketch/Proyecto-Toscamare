"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Search, X, Package } from "lucide-react";
import Papa from "papaparse";

interface Product {
  name: string;
  category: string;
}

interface SelectedProduct {
  name: string;
  quantity: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ContactForm() {
  const [formType, setFormType] = useState<"pedidos" | "contacto">("pedidos");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoadTime, setFormLoadTime] = useState(Date.now());

  // Estado para el buscador de productos
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [showResults, setShowResults] = useState(false);

  // 1. Cargar productos seleccionados del localStorage al inicio
  useEffect(() => {
    const savedProducts = localStorage.getItem("toscamare_pedido_pendiente");
    if (savedProducts) {
      try {
        setSelectedProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Error cargando pedido pendiende del localStorage", e);
      }
    }
  }, []);

  // 2. Guardar productos seleccionados en el localStorage cada vez que cambien
  useEffect(() => {
    if (selectedProducts.length > 0) {
      localStorage.setItem("toscamare_pedido_pendiente", JSON.stringify(selectedProducts));
    } else {
      localStorage.removeItem("toscamare_pedido_pendiente");
    }
  }, [selectedProducts]);

  // Cargar productos al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/productos_destacados.csv");
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const products = (results.data as Array<Record<string, string>>)
              .map((row) => ({
                name: row.Nombre || row.nombre,
                category: row.Categoria || row.categoria
              }))
              .filter((p: Product) => p.name);
            setAllProducts(products);
          },
        });
      } catch (err) {
        console.error("Error cargando productos para el buscador:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = allProducts
    .filter(p => 
      p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(
        searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      ) && !selectedProducts.some(sp => sp.name === p.name)
    )
    .slice(0, 8);

  const handleSelectProduct = (productName: string) => {
    setSelectedProducts([...selectedProducts, { name: productName, quantity: 1 }]);
    setSearchQuery("");
    setShowResults(false);
  };

  const handleQuantityChange = (productName: string, delta: number) => {
    setSelectedProducts(prev => prev.map(p => {
      if (p.name === productName) {
        const newQty = Math.max(1, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

  const handleRemoveProduct = (productName: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.name !== productName));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(form);

    // Anti-bot: honeypot
    if (formData.get("website")) {
      setError("Error de validación");
      setIsSubmitting(false);
      return;
    }

    // Anti-bot: tiempo mínimo
    const timeElapsed = Date.now() - formLoadTime;
    if (timeElapsed < 3000) {
      setError("Por favor, tómate un momento para completar el formulario");
      setIsSubmitting(false);
      return;
    }

    const productSummary = selectedProducts
      .map(p => `${p.quantity}x ${p.name}`)
      .join(", ");

    const data = {
      formType,
      fullName: formData.get("fullName"),
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      // Si es un pedido, el asunto incluye los productos seleccionados
      subject: formType === "pedidos" 
        ? `PEDIDO: ${productSummary || formData.get("subject")}`
        : formData.get("subject"),
      message: formData.get("message"),
      selectedProducts,
      formLoadTime,
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Error al enviar el mensaje");
      }

      localStorage.removeItem("toscamare_pedido_pendiente"); // 3. Limpiar almacenamiento al enviar con éxito
      setIsSubmitted(true);
      form.reset();
      setSelectedProducts([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar el mensaje",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewMessage = () => {
    setIsSubmitted(false);
    setError(null);
    setFormLoadTime(Date.now());
    setSelectedProducts([]);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center scale-up-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h3 className="mb-2 text-2xl font-semibold">
          {formType === "pedidos" ? "Pedido enviado" : "Mensaje enviado"}
        </h3>
        <p className="text-muted-foreground">
          Gracias por {formType === "pedidos" ? "tu pedido" : "contactarnos"}. Te responderemos pronto.
        </p>
        <Button variant="outline" className="mt-6" onClick={handleNewMessage}>
          Enviar otro {formType === "pedidos" ? "pedido" : "mensaje"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Selector de tipo de formulario */}
      <div className="flex p-1 bg-muted rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setFormType("pedidos")}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-500 cursor-pointer ${
            formType === "pedidos"
              ? "bg-white text-[#011468] shadow-sm scale-[1.02]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/50"
          }`}
        >
          Hacer un pedido
        </button>
        <button
          type="button"
          onClick={() => setFormType("contacto")}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-500 cursor-pointer ${
            formType === "contacto"
              ? "bg-white text-[#011468] shadow-sm scale-[1.02]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/50"
          }`}
        >
          Contacto general
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input id="fullName" name="fullName" placeholder="Tu nombre y apellidos" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Nombre comercial (opcional)</Label>
          <Input id="companyName" name="companyName" placeholder="Nombre de tu negocio" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono de contacto (opcional)</Label>
            <Input id="phone" name="phone" type="tel" placeholder="600 000 000" />
          </div>
        </div>



        <div className="space-y-2">
          <Label htmlFor="message">
            {formType === "pedidos" ? "Notas adicionales o instrucciones" : "Mensaje"}
          </Label>
          <Textarea 
            id="message" 
            name="message" 
            rows={4} 
            placeholder={formType === "pedidos" ? "Ej: Reparto por la mañana..." : "Escribe aquí tu duda..."} 
            required 
          />
        </div>

        {/* BUSCADOR DE PRODUCTOS / ASUNTO (Movido aquí) */}
        <div className="space-y-4 pt-4 border-t border-muted-foreground/10">
          <Label htmlFor="productSearch">
            {formType === "pedidos" ? "Añade más productos a tu pedido" : "Asunto de tu consulta"}
          </Label>
          
          {formType === "pedidos" ? (
            <div className="space-y-4">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-[#011468] transition-colors" />
                <Input 
                  id="productSearch"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  className="pl-11 h-12 rounded-xl border-muted-foreground/20 focus:border-[#011468] focus:ring-0"
                  placeholder="Busca aquí productos para añadir..."
                />

                {/* Resultados de búsqueda */}
                {showResults && searchQuery.length > 1 && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-border rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectProduct(p.name)}
                            className="w-full text-left px-5 py-3.5 hover:bg-muted flex flex-col gap-0.5 border-b last:border-0 border-border/50 transition-colors"
                          >
                            <span className="font-bold text-sm text-[#011468]">{p.name}</span>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{p.category}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-4 text-sm text-muted-foreground italic">No se encontraron productos</div>
                      )}
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowResults(false)}
                      className="w-full py-2 bg-muted/30 text-[10px] text-center font-bold tracking-widest text-[#011468] hover:bg-muted transition-colors uppercase"
                    >
                      Cerrar buscador
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Input id="subject" name="subject" placeholder="Escribe el motivo aquí..." required />
          )}
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* LISTA DE PRODUCTOS SELECCIONADOS (Con altura máxima y scroll) */}
        {formType === "pedidos" && selectedProducts.length > 0 && (
          <div className="pt-6 border-t border-dashed border-muted-foreground/30 animate-in slide-in-from-bottom-4 duration-700">
            <h4 className="text-xs font-black text-[#011468]/50 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Package className="h-3 w-3" /> Resumen de tu pedido seleccionado
            </h4>
            <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {selectedProducts.map((p) => (
                <div key={p.name} className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#011468]/10 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#011468]/5 p-2 rounded-lg">
                      <Package className="h-4 w-4 text-[#011468]" />
                    </div>
                    <span className="font-bold text-sm text-[#011468] truncate max-w-[150px] md:max-w-[250px]">
                      {p.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-muted/50 p-1 rounded-lg">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(p.name, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-border hover:bg-red-50 hover:text-red-600 transition-all hover:scale-110 cursor-pointer shadow-sm"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="0"
                          max="999"
                          value={p.quantity}
                          onChange={(e) => {
                            const val = Math.min(999, parseInt(e.target.value));
                            if (!isNaN(val)) {
                              handleQuantityChange(p.name, val - p.quantity);
                            }
                          }}
                          className="w-10 text-center font-black text-[#011468] bg-transparent border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (p.quantity < 999) handleQuantityChange(p.name, 1);
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-border hover:bg-blue-50 hover:text-blue-600 transition-all hover:scale-110 cursor-pointer shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(p.name)}
                      className="p-1.5 hover:text-red-500 transition-colors cursor-pointer"
                      title="Eliminar producto"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6">
          <Button
            type="submit"
            className={`w-full font-black text-lg h-14 transition-all duration-500 cursor-pointer ${isSubmitting ? "" : "hover:scale-[1.01] shadow-xl bg-[#011468] hover:bg-[#D90414] hover:rotate-[0.5deg]"}`}
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? "Enviando..." 
              : formType === "pedidos" 
                ? "CONFIRMAR PEDIDO" 
                : "ENVIAR MENSAJE"}
          </Button>
        </div>
      </form>
    </div>
  );
}
