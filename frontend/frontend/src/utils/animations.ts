// Configuraciones de animaciones reutilizables con Framer Motion
// Optimizadas para rendimiento y experiencia de usuario

// Variantes de fade in desde abajo
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] // easeOut suave
    }
  }
};

// Variantes con stagger para listas
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Variantes para cards
export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1] // easeOutBack
  }
};

export const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Variantes para botones
export const buttonHover = {
  scale: 1.05,
  y: -2,
  transition: {
    duration: 0.2,
    ease: [0.34, 1.56, 0.64, 1]
  }
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Animación de flecha o icono
export const arrowSlide = {
  x: 5,
  transition: { 
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1]
  }
};

// Configuración de viewport para intersección
export const defaultViewport = {
  once: true,
  margin: "-100px"
};

// Easing personalizado para suavidad
export const customEasing = [0.25, 0.1, 0.25, 1];

// Transición rápida
export const quickTransition = {
  duration: 0.2,
  ease: customEasing
};

// Transición media
export const mediumTransition = {
  duration: 0.4,
  ease: customEasing
};

// Transición larga
export const longTransition = {
  duration: 0.7,
  ease: customEasing
};

// Para optimizar rendimiento
export const willChangeTransform = {
  willChange: "transform"
};

// Configuración para reducir movimiento (accesibilidad)
export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Función helper para aplicar animaciones solo si el usuario no prefiere reducir movimiento
export const withMotion = (animation: any) => {
  return prefersReducedMotion ? {} : animation;
};
