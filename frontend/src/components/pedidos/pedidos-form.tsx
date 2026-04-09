"use client";

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Search,
  Package,
  AlertTriangle,
  Trash2,
  ShoppingBag,
  User,
  Mail,
  Phone,
  Building2,
  Send,
  Truck,
  Store,
} from "lucide-react";
import Papa from "papaparse";
import { tiendasUbicaciones } from "../../data/tiendasUbicaciones";

interface Product {
  name: string;
  category: string;
}

interface SelectedProduct {
  name: string;
  quantity: number;
  unit: string;
  note?: string;
}

const UNITS = ["Uds", "Kg", "gr"];

const API_URL = "http://localhost:3001";

export default function PedidosForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoadTime] = useState(() => Date.now());

  // Estado para el buscador de productos
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const [showResults, setShowResults] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Opciones de entrega
  const [deliveryMethod, setDeliveryMethod] = useState<"domicilio" | "tienda">(
    "domicilio",
  );
  const [selectedStore, setSelectedStore] = useState("");

  // Estado para errores de validación de campos
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedProducts = localStorage.getItem("toscamare_pedido_pendiente");
    if (savedProducts) {
      try {
        setSelectedProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Error cargando pedido pendiente", e);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedProducts.length > 0) {
      localStorage.setItem(
        "toscamare_pedido_pendiente",
        JSON.stringify(selectedProducts),
      );
    } else {
      localStorage.removeItem("toscamare_pedido_pendiente");
    }
    window.dispatchEvent(new Event("cart-updated"));
  }, [selectedProducts]);

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
                category: row.Categoria || row.categoria,
              }))
              .filter((p: Product) => p.name);
            setAllProducts(products);
          },
        });
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = allProducts
    .filter(
      (p) =>
        p.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchQuery
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
          ) && !selectedProducts.some((sp) => sp.name === p.name),
    )
    .slice(0, 8);

  const handleSelectProduct = (productName: string) => {
    setSelectedProducts([
      ...selectedProducts,
      { name: productName, quantity: 1, unit: "Uds", note: "" },
    ]);
    setSearchQuery("");
    setShowResults(false);
  };

  const handleUpdateProduct = (
    productName: string,
    quantity: number,
    unit: string,
    note?: string,
  ) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.name === productName ? { ...p, quantity, unit, note } : p,
      ),
    );
  };

  const handleRemoveProduct = (productName: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.name !== productName));
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
    setShowClearConfirm(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("website")) return;

    // No ponemos isSubmitting a true hasta pasar las validaciones locales
    setError(null);
    const newFieldErrors: Record<string, string> = {};

    // Validación de campos básicos
    const emailStr = formData.get("email")?.toString() || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.get("fullName")) {
      newFieldErrors.fullName = "El nombre es obligatorio";
    }
    
    if (!emailStr) {
      newFieldErrors.email = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(emailStr)) {
      newFieldErrors.email = "Introduce un correo válido (ej: nombre@empresa.com)";
    }
    
    if (!formData.get("companyName")) {
      newFieldErrors.companyName = "El nombre comercial es obligatorio";
    }
    
    // El teléfono ahora es opcional

    if (selectedProducts.length === 0) {
      newFieldErrors.products = "Debes añadir al menos un producto a tu pedido";
    }

    if (deliveryMethod === "tienda" && !selectedStore) {
      newFieldErrors.selectedStore = "Debes seleccionar una tienda para recoger tu pedido";
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError("Por favor, revisa los campos marcados en rojo.");
      setIsSubmitting(false);
      
      // Hacer scroll al primer error
      const firstErrorField = Object.keys(newFieldErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (firstErrorField === 'products') {
        const productSection = document.getElementById('productSearch');
        productSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    setFieldErrors({});

    const timeElapsed = Date.now() - formLoadTime;
    console.log("Submit attempt:", { timeElapsed, formLoadTime, now: Date.now() });
    
    if (timeElapsed < 1000) {
      console.warn("Anti-bot triggered: Submission too fast (", timeElapsed, "ms < 1000ms)");
      setError("Por favor, tómate un momento para completar el formulario");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const productSummary = selectedProducts
      .map(
        (p) =>
          `${p.quantity} ${p.unit} de ${p.name}${p.note ? ` (Nota: ${p.note})` : ""}`,
      )
      .join(", ");

    const data = {
      formType: "pedidos",
      fullName: formData.get("fullName"),
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: `PEDIDO: ${productSummary}`,
      message: `Método: ${deliveryMethod === "domicilio" ? "A domicilio" : "Recoger en tienda (" + selectedStore + ")"}\nNotas: ${formData.get("message")}`,
      selectedProducts,
      deliveryMethod,
      selectedStore: deliveryMethod === "tienda" ? selectedStore : null,
      formLoadTime,
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Error al enviar");

      localStorage.removeItem("toscamare_pedido_pendiente");
      setIsSubmitted(true);
      setSelectedProducts([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar el pedido",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-[2rem] shadow-2xl border border-gray-100 scale-up-center max-w-2xl mx-auto my-12">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative rounded-full bg-green-500 p-6 shadow-lg shadow-green-500/30">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
        </div>
        <h3 className="mb-4 text-4xl font-black text-[#011468] tracking-tight">
          ¡Pedido Recibido!
        </h3>
        <p className="max-w-md text-gray-600 text-lg leading-relaxed">
          Gracias por confiar en <span className="text-[#D90414] font-bold">Toscamare</span>. 
          Hemos recibido tu solicitud y nuestro equipo se pondrá en contacto contigo muy pronto para confirmar los detalles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center">
          <Link to="/">
            <Button
              className="bg-[#011468] hover:bg-[#0a1e7a] text-white h-14 px-10 rounded-full font-bold shadow-xl shadow-blue-900/10 transition-all hover:-translate-y-1 w-full sm:w-auto"
            >
              Volver al inicio
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setSelectedProducts([]);
            }}
            className="border-[#011468]/20 text-[#011468] hover:bg-gray-50 h-14 px-10 rounded-full font-bold w-full sm:w-auto"
          >
            Hacer otro pedido
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 pb-20">
      {error && (
        <div 
          className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-4 duration-300 shadow-sm"
          role="alert"
        >
          <div className="bg-red-500 p-2 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-red-800 font-bold mb-1">Ha ocurrido un error</h4>
            <p className="text-red-700 text-sm md:text-base">{error}</p>
          </div>
          <button 
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 transition-colors p-1"
            aria-label="Cerrar error"
          >
            <FaTimes />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="relative space-y-10">
        {/* Bloque de Información Personal - Fondo Blanco */}
        <div
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group"
          data-aos="fade-up"
        >
          <div className="absolute top-0 right-0 -m-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-1000"></div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="fullName"
                className="text-xs font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <User className="h-4 w-4" /> Nombre Completo
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Juan Pérez"
                className={`h-14 bg-gray-50 border-gray-100 text-[#011468] placeholder:text-gray-400 focus:bg-white focus:border-[#011468] focus:ring-0 rounded-2xl transition-all shadow-sm ${fieldErrors.fullName ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                onFocus={() => setFieldErrors(prev => ({ ...prev, fullName: "" }))}
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-1 ml-2 animate-in fade-in slide-in-from-top-1">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="companyName"
                className="text-xs font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" /> Nombre Comercial
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Mi Negocio SL"
                className={`h-14 bg-gray-50 border-gray-100 text-[#011468] placeholder:text-gray-400 focus:bg-white focus:border-[#011468] focus:ring-0 rounded-2xl transition-all shadow-sm ${fieldErrors.companyName ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                onFocus={() => setFieldErrors(prev => ({ ...prev, companyName: "" }))}
              />
              {fieldErrors.companyName && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-1 ml-2 animate-in fade-in slide-in-from-top-1">
                  {fieldErrors.companyName}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-xs font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Email Profesional
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="empresa@ejemplo.com"
                className={`h-14 bg-gray-50 border-gray-100 text-[#011468] placeholder:text-gray-400 focus:bg-white focus:border-[#011468] focus:ring-0 rounded-2xl transition-all shadow-sm ${fieldErrors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                onFocus={() => setFieldErrors(prev => ({ ...prev, email: "" }))}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-1 ml-2 animate-in fade-in slide-in-from-top-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-xs font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> Teléfono{" "}
                <span className="text-[10px] text-gray-400 ml-1 font-bold">
                  (OPCIONAL)
                </span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="600 000 000"
                className="h-14 bg-gray-50 border-gray-100 text-[#011468] placeholder:text-gray-400 focus:bg-white focus:border-[#011468] focus:ring-0 rounded-2xl transition-all shadow-sm"
              />
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-500 font-medium">
            Si eres nuevo cliente, necesitamos más información.{" "}
            <Link
              to="/contacto"
              className="text-[#011468] hover:text-[#D90414] underline underline-offset-4 font-black transition-colors"
            >
              ¡Contacta con nosotros!
            </Link>
          </p>
        </div>

        {/* Bloque de Productos - Fondo Blanco */}
        <div
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8"
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#011468] flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-[#011468]/40" /> Tu Pedido
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                Busca y añade productos a tu lista de confianza
              </p>
            </div>
            <Link
              to="/productos"
              className="text-xs font-black text-[#011468]/60 hover:text-[#D90414] transition-all flex items-center gap-2 tracking-widest group"
            >
              VER CATÁLOGO COMPLETO
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Buscador de productos */}
          <div className="relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#011468] transition-colors" />
              <Input
                id="productSearch"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="pl-12 h-14 rounded-2xl bg-gray-50 border-gray-100 text-[#011468] placeholder:text-gray-400 focus:bg-white focus:border-[#011468] focus:ring-0 shadow-sm"
                placeholder="Busca calamares, merluza, gambas..."
              />
            </div>

            {showResults && searchQuery.length > 1 && (
              <div className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
                <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectProduct(p.name)}
                        className="w-full text-left px-6 py-4 hover:bg-white/5 flex flex-col gap-0.5 border-b border-white/5 last:border-0 transition-colors"
                      >
                        <span className="font-bold text-[#011468] tracking-wide">
                          {p.name}
                        </span>
                        <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
                          {p.category}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-6 py-6 text-sm text-gray-400 italic">
                      No hay resultados para esta búsqueda
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowResults(false)}
                  className="w-full py-3 bg-gray-50 text-[10px] font-black text-[#011468]/60 hover:text-[#011468] transition-colors uppercase tracking-[0.2em]"
                >
                  Cerrar buscador
                </button>
              </div>
            )}
          </div>

          {fieldErrors.products && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl animate-in shake duration-500">
              <p className="text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {fieldErrors.products}
              </p>
            </div>
          )}

          {/* Lista de productos seleccionados */}
          {selectedProducts.length > 0 ? (
            <div className="space-y-4 pt-4 border-t border-white/5 animate-in fade-in duration-700">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                  Items añadidos ({selectedProducts.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="text-[10px] font-black text-red-500 hover:text-red-600 py-2 px-3 hover:bg-red-50 rounded-lg transition-all flex items-center gap-2 tracking-widest"
                >
                  <Trash2 className="h-3.5 w-3.5" /> LIMPIAR LISTA
                </button>
              </div>

              <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedProducts.map((p) => (
                  <div
                    key={p.name}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-[#011468]/20 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#011468]/5 p-2 rounded-lg">
                            <Package className="h-5 w-5 text-[#011468]" />
                          </div>
                          <span className="font-bold text-[#011468] text-lg">
                            {p.name}
                          </span>
                        </div>
                        <Input
                          placeholder="Añadir nota (marca, detalle...)"
                          value={p.note}
                          onChange={(e) =>
                            handleUpdateProduct(
                              p.name,
                              p.quantity,
                              p.unit,
                              e.target.value,
                            )
                          }
                          className="h-10 bg-white border-gray-100 text-[#011468] text-sm focus:border-[#011468] rounded-xl"
                        />
                      </div>
                      <div className="flex items-center gap-3 bg-white border border-gray-100 p-2 rounded-2xl h-fit self-end md:self-center shadow-sm">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={p.quantity}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              if (!isNaN(v))
                                handleUpdateProduct(p.name, v, p.unit, p.note);
                            }}
                            className="w-16 h-12 bg-transparent text-[#011468] font-black text-center focus:outline-none text-lg"
                          />
                          <select
                            value={p.unit}
                            onChange={(e) =>
                              handleUpdateProduct(
                                p.name,
                                p.quantity,
                                e.target.value,
                                p.note,
                              )
                            }
                            className="bg-gray-100 text-[#011468] text-xs font-black p-2 rounded-lg border-none focus:ring-0 cursor-pointer"
                          >
                            {UNITS.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(p.name)}
                          className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center gap-4 group hover:border-gray-200 transition-colors bg-gray-50/50">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="text-gray-400 font-bold tracking-widest text-[10px] uppercase">
                El pedido está vacío. Añade productos arriba.
              </p>
            </div>
          )}
        </div>

        {/* Bloque de Entrega y Envío - Fondo Blanco */}
        <div
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-black text-[#011468] flex items-center gap-3">
            <Truck className="h-6 w-6 text-[#011468]/40" /> Método de Entrega
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setDeliveryMethod("domicilio")}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-4 text-left group ${deliveryMethod === "domicilio" ? "bg-[#011468]/5 border-[#011468]" : "bg-gray-50 border-transparent hover:border-gray-100"}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${deliveryMethod === "domicilio" ? "bg-[#011468] text-white" : "bg-white text-gray-300 shadow-sm"}`}
              >
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <span className="font-black text-[#011468] text-lg block">
                  Envío a domicilio
                </span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Pedido mínimo 100 euros
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryMethod("tienda")}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-4 text-left group ${deliveryMethod === "tienda" ? "bg-[#011468]/5 border-[#011468]" : "bg-gray-50 border-transparent hover:border-gray-100"}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${deliveryMethod === "tienda" ? "bg-[#011468] text-white" : "bg-white text-gray-300 shadow-sm"}`}
              >
                <Store className="h-6 w-6" />
              </div>
              <div>
                <span className="font-black text-[#011468] text-lg block">
                  Recoger en tienda
                </span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Selecciona tu punto de recogida
                </span>
              </div>
            </button>
          </div>

          {deliveryMethod === "tienda" && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
              <Label
                htmlFor="selectedStore"
                className="text-xs font-black text-[#011468]/60 uppercase tracking-widest"
              >
                Punto de recogida
              </Label>
              <select
                id="selectedStore"
                value={selectedStore}
                onChange={(e) => {
                  setSelectedStore(e.target.value);
                  setFieldErrors(prev => ({ ...prev, selectedStore: "" }));
                }}
                className={`w-full h-14 bg-gray-50 border border-gray-100 text-[#011468] rounded-2xl px-5 focus:border-[#011468] outline-none font-bold shadow-sm cursor-pointer ${fieldErrors.selectedStore ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              >
                <option value="" disabled>
                  Selecciona una tienda...
                </option>
                {tiendasUbicaciones.map((t, idx) => (
                  <option key={idx} value={t.nombre}>
                    {t.nombre} - {t.direccion}
                  </option>
                ))}
              </select>
              {fieldErrors.selectedStore && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-2">
                  {fieldErrors.selectedStore}
                </p>
              )}
            </div>
          )}

          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="text-xs font-black text-[#011468]/60 uppercase tracking-widest"
            >
              Notas adicionales
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Cualquier otra instrucción para el transportista o detalle importante..."
              className="bg-gray-50 border-gray-100 text-[#011468] placeholder:text-gray-400 focus:bg-white focus:border-[#011468] focus:ring-0 rounded-3xl resize-none p-6 shadow-sm"
            />
          </div>
        </div>

        {/* Hidden Global Error removed in favor of inline errors */}

        <div className="pt-4 flex flex-col items-center gap-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full max-w-xl h-20 rounded-[2rem] font-black text-lg tracking-[0.2em] transition-all duration-700 shadow-2xl uppercase flex items-center justify-center gap-4 ${
              isSubmitting ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#011468] text-white hover:bg-[#D90414] hover:scale-[1.05] cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              "PROCESANDO..."
            ) : (
              <>
                <Send className="h-6 w-6" /> ENVIAR PEDIDO
              </>
            )}
          </Button>
          <p className="text-[10px] font-bold text-blue-400/50 uppercase tracking-[0.3em]">
            Toscamare S.L. · Calidad y Confianza
          </p>
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
        />
      </form>

      {/* Modal Clear Confirm */}
      {showClearConfirm &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowClearConfirm(false)}
          >
            <div
              className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-gray-100 scale-up-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                  <AlertTriangle className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#011468]">
                    ¿Vaciar cesta?
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Se eliminarán todos los productos de tu lista. Esta acción
                    no se puede deshacer.
                  </p>
                </div>
                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={handleClearAll}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black tracking-widest transition-all active:scale-95 shadow-xl shadow-red-200"
                  >
                    SÍ, BORRAR TODO
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-bold transition-all active:scale-95"
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
