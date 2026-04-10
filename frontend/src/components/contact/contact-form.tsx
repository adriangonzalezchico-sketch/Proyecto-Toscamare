"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  MessageSquare,
  User,
  Mail,
  Phone,
  Building2,
  Send,
} from "lucide-react";

const API_URL = "http://localhost:3001";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoadTime, setFormLoadTime] = useState(Date.now());

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

    const data = {
      formType: "contacto",
      fullName: formData.get("fullName"),
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
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

      setIsSubmitted(true);
      form.reset();
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
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center scale-up-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h3 className="mb-2 text-2xl font-semibold">Mensaje enviado</h3>
        <p className="text-muted-foreground">
          Gracias por contactarnos. Te responderemos pronto.
        </p>
        <Button variant="outline" className="mt-6" onClick={handleNewMessage}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10 animate-in fade-in duration-500">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-2 rounded-3xl"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="fullName"
                className="text-[11px] font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <User className="h-3 w-3" /> Nombre Completo
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Tu nombre y apellidos"
                required
                className="h-12 border-gray-100 focus:border-[#011468] focus:ring-0 rounded-xl bg-gray-50 shadow-sm transition-all focus:bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="companyName"
                className="text-[11px] font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <Building2 className="h-3 w-3" /> Empresa (Opcional)
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Nombre de tu negocio"
                className="h-12 border-gray-100 focus:border-[#011468] focus:ring-0 rounded-xl bg-gray-50 shadow-sm transition-all focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-[11px] font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <Mail className="h-3 w-3" /> Email Profesional
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                className="h-12 border-gray-100 focus:border-[#011468] focus:ring-0 rounded-xl bg-gray-50 shadow-sm transition-all focus:bg-white"
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-[11px] font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
              >
                <Phone className="h-3 w-3" /> Teléfono
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="600 000 000"
                className="h-12 border-gray-100 focus:border-[#011468] focus:ring-0 rounded-xl bg-gray-50 shadow-sm transition-all focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="text-[11px] font-black text-[#011468]/60 uppercase tracking-widest flex items-center gap-2"
            >
              <MessageSquare className="h-3 w-3" /> Tu Mensaje
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Escribe aquí tu consulta o duda..."
              required
              className="border-gray-100 focus:border-[#011468] focus:ring-0 rounded-2xl bg-gray-50 shadow-sm resize-none py-4 transition-all focus:bg-white"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Label
              htmlFor="subject"
              className="text-[11px] font-black text-[#011468]/60 uppercase tracking-widest"
            >
              Asunto de tu consulta
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Escribe el motivo aquí..."
              required
              className="h-12 border-gray-100 focus:border-[#011468] focus:ring-0 rounded-xl bg-gray-50 shadow-sm transition-all focus:bg-white"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="pt-8">
            <Button
              type="submit"
              className={`w-full font-black text-xs tracking-[0.2em] h-14 rounded-2xl transition-all duration-500 cursor-pointer flex items-center justify-center gap-3 ${
                isSubmitting
                  ? ""
                  : "hover:scale-[1.02] shadow-2xl bg-[#011468] hover:bg-[#D4AF37] hover:rotate-[0.5deg]"
              }`}
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "ENVIANDO..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  ENVIAR CONSULTA
                </>
              )}
            </Button>
            <p className="text-center mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
              Al enviar, aceptas nuestra política de privacidad y tratamiento de
              datos.
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
