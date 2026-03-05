import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cuánto tiempo tardan en responder?",
    answer:
      "Normalmente respondemos en un plazo de 24-48 horas hábiles. Para consultas urgentes, te recomendamos llamarnos directamente.",
  },
  {
    question: "¿Ofrecen soporte telefónico?",
    answer:
      "Sí, nuestro equipo de soporte está disponible de lunes a viernes de 9:00 a 18:00. Fuera de este horario, puedes dejarnos un mensaje y te contactaremos al día siguiente.",
  },
  {
    question: "¿Puedo agendar una reunión?",
    answer:
      "Por supuesto. Completa el formulario de contacto indicando tu disponibilidad y nos pondremos en contacto para coordinar una reunión virtual o presencial.",
  },
  {
    question: "¿Dónde están ubicados?",
    answer:
      "Nuestras oficinas están ubicadas en Madrid, España. También trabajamos de forma remota con clientes de toda Latinoamérica y Europa.",
  },
]

export default function ContactFaq() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Preguntas frecuentes
        </h2>
        <p className="text-muted-foreground">
          Respuestas a las preguntas más comunes sobre nuestro servicio.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
