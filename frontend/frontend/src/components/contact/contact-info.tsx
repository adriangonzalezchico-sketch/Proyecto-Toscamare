import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Sector+Suelo+Sapu+I3+3+21450+Cartaya+Huelva"

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
    content: "+34 959 39 22 21",
    description: "Lun - Vie, 9:00 - 18:00",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    content: "Sector Suelo Sapu I3, 3, 21450",
    description: "Cartaya, Huelva",
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
          className={`border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:bg-card ${item.title === "Ubicación" ? "cursor-pointer hover:border-primary/50" : ""}`}
          onClick={item.title === "Ubicación" ? () => window.open(MAPS_URL, "_blank") : undefined}
        >
          <CardContent className="flex flex-col items-start gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3 shrink-0">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {item.title}
              </p>
              <p className={`font-semibold text-sm break-words ${item.title === "Ubicación" ? "text-primary underline underline-offset-2 decoration-primary/40" : "text-foreground"}`}>
                {item.content}
                {item.title === "Ubicación" && (
                  <ExternalLink className="inline-block h-3.5 w-3.5 ml-1.5 align-text-top" />
                )}
              </p>
              <p className="text-xs text-muted-foreground break-words">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}