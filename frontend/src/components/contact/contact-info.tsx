import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "contacto@tuempresa.com",
    description: "Te respondemos en 24h",
  },
  {
    icon: Phone,
    title: "Teléfono",
    content: "+34 000 000 000",
    description: "Lun - Vie, 9:00 - 18:00",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    content: "Calle Principal 123",
    description: "Madrid, España",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie",
    description: "9:00 - 18:00",
  },
]

export default function ContactInfo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {contactInfo.map((item) => (
        <Card 
          key={item.title} 
          className="border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <CardContent className="flex flex-col items-start gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3 shrink-0">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {item.title}
              </p>
              <p className="font-semibold text-foreground text-sm break-words">{item.content}</p>
              <p className="text-xs text-muted-foreground break-words">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
