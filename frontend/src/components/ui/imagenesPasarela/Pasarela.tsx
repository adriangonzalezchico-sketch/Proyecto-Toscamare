import LogoLoop from "./LogoLoop";

// Array con las imágenes de los logos
const imageLogos = [
  {
    src: "/logosColaboradores/elpozo.png",
    alt: "El Pozo",
    href: "https://www.elpozo.com/",
  },
  {
    src: "/logosColaboradores/famadesa.png",
    alt: "Famadesa",
    href: "https://famadesa.es/",
  },
  {
    src: "/logosColaboradores/audens.png",
    alt: "Audens Foods",
    href: "https://www.audensfood.com/",
  },
  {
    src: "/logosColaboradores/eurofrits.png",
    alt: "Eurofrits",
    href: "https://www.eurofrits.com/",
  },
  {
    src: "/logosColaboradores/simons.png",
    alt: "Simon’s",
    href: "https://simonsfood.net/",
  },
  {
    src: "/logosColaboradores/laniñadelsur.png",
    alt: "La Niña del Sur",
    href: "https://laninadelsur.com/",
  },
  {
    src: "/logosColaboradores/elguijo.png",
    alt: "El Guijo",
    href: "https://www.dulcesguijo.com/",
  },
  {
    src: "/logosColaboradores/navarra.png",
    alt: "Congelados Navarra",
    href: "https://www.congeladosnavarra.com/es",
  },
  {
    src: "/logosColaboradores/mccain.png",
    alt: "McCain",
    href: "https://mccain.es/",
  },
];

function App() {
  return (
    <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
      <LogoLoop
        logos={imageLogos}
        speed={80}
        direction="left"
        logoHeight={150}
        gap={60}
        hoverSpeed={10}
        scaleOnHover={true}
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Nuestros proveedores"
      />
    </div>
  );
}

export default App;
