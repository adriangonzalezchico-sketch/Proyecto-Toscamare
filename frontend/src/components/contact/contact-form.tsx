'use client';

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"

/**
 * CONFIGURACIÓN DE WEB3FORMS (GRATIS)
 * 
 * 1. Ve a https://web3forms.com/ y haz clic en "Create your Access Key"
 * 2. Ingresa el email donde quieres recibir los mensajes del formulario
 * 3. Recibirás tu Access Key por email
 * 4. Reemplaza "TU_ACCESS_KEY_AQUI" abajo con tu clave
 * 
 * Características:
 * - Gratis e ilimitado
 * - Sin registro de tarjeta
 * - Protección anti-spam incluida
 * - Los mensajes llegan directamente a tu email
 */
const WEB3FORMS_ACCESS_KEY = "TU_ACCESS_KEY_AQUI"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formLoadTime] = useState(() => Date.now())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    // PROTECCIÓN ANTI-BOT 1: Verificar honeypot (campo oculto que los bots rellenan)
    const honeypot = formData.get("website")
    if (honeypot) {
      // Si el honeypot tiene valor, es un bot
      setError("Error de validación")
      setIsSubmitting(false)
      return
    }

    // PROTECCIÓN ANTI-BOT 2: Verificar tiempo mínimo (los bots envían muy rápido)
    const timeElapsed = Date.now() - formLoadTime
    if (timeElapsed < 3000) { // Menos de 3 segundos = probablemente bot
      setError("Por favor, tómate un momento para completar el formulario")
      setIsSubmitting(false)
      return
    }
    
    // Añadir la access key de Web3Forms
    formData.append("access_key", WEB3FORMS_ACCESS_KEY)
    
    // PROTECCIÓN ANTI-BOT 3: Activar botcheck de Web3Forms
    formData.append("botcheck", "true")
    
    // Configurar el asunto del email
    const subject = formData.get("subject")
    formData.append("subject", `Nuevo mensaje de contacto: ${subject}`)
    
    // Nombre completo para el email
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    formData.append("from_name", `${firstName} ${lastName}`)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Error al enviar el mensaje")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el mensaje")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-foreground">
          Mensaje enviado
        </h3>
        <p className="text-muted-foreground">
          Gracias por contactarnos. Te responderemos pronto.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 bg-transparent"
          onClick={() => setIsSubmitted(false)}
        >
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* HONEYPOT: Campo oculto para atrapar bots - NO eliminar */}
      <input
        type="text"
        name="website"
        className="absolute -left-[9999px] top-0 h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Tu nombre"
            required
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Tu apellido"
            required
            className="bg-background"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Asunto</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="¿En qué podemos ayudarte?"
          required
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Escribe tu mensaje aquí..."
          rows={5}
          required
          className="resize-none bg-background"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar mensaje
          </>
        )}
      </Button>
    </form>
  )
}
