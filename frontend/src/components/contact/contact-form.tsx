'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formLoadTime, setFormLoadTime] = useState(Date.now())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const form = e.currentTarget

    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(form)

    // Anti-bot: honeypot
    if (formData.get("website")) {
      setError("Error de validación")
      setIsSubmitting(false)
      return
    }

    // Anti-bot: tiempo mínimo
    const timeElapsed = Date.now() - formLoadTime
    if (timeElapsed < 3000) {
      setError("Por favor, tómate un momento para completar el formulario")
      setIsSubmitting(false)
      return
    }

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      formLoadTime,
    }

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Error al enviar el mensaje")
      }

      setIsSubmitted(true)
      form.reset()

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el mensaje")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewMessage = () => {
    setIsSubmitted(false)
    setError(null)
    setFormLoadTime(Date.now()) // 👈 reinicia anti-bot
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h3 className="mb-2 text-2xl font-semibold">
          Mensaje enviado
        </h3>
        <p className="text-muted-foreground">
          Gracias por contactarnos. Te responderemos pronto.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={handleNewMessage}
        >
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input id="lastName" name="lastName" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Asunto</Label>
        <Input id="subject" name="subject" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea id="message" name="message" rows={5} required />
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
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  )
}
