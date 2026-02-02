import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import ContactFaq from "@/components/contact/contact-faq"

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Contacta con nosotros
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              ¿Tienes alguna pregunta o proyecto en mente? Estamos aquí para ayudarte.
              Completa el formulario y te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y te contactaremos en menos de 24 horas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 lg:col-span-2">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Información de contacto
                </h2>
                <p className="text-muted-foreground">
                  También puedes contactarnos directamente a través de estos canales.
                </p>
              </div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <ContactFaq />
          </div>
        </div>
      </section>
    </main>

  )
}
