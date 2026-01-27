# 🏗️ Proyecto-Toscamare (Entorno de Desarrollo)

## 🏢 Contexto del Negocio

Empresa familiar dedicada a la **distribución de productos alimentarios**. Actualmente, la operativa depende de procesos manuales y uso intensivo de papel, lo que genera ineficiencias que este proyecto busca solventar mediante la digitalización integral.

---

## 🛠️ Objetivos de Digitalización

### 1. Presencia Web (Prioridad 1)

- **Web Corporativa:** Moderna, optimizada y escalable.
- **Secciones:** Home, Tiendas, Sobre Nosotros y Contacto.
- **Integraciones:** Redes sociales, Google Maps y futuro E-commerce.

### 2. Gestión de Pedidos y Documentación

- **Digitalización:** Sustituir el email/papel por una base de datos centralizada.
- **Automatización OCR:** Escaneo de albaranes y facturas para conversión automática a datos (Excel/DB).
- **Firma Digital:** Implementación de confirmación de entrega vía DNI/Digital para eliminar el papel.

### 3. Logística y Almacén

- **Control de Stock:** Sistema de gestión mediante escaneo de códigos QR o barras.
- **Trazabilidad:** Seguimiento de movimientos de mercancía en tiempo real.

---

## 🚀 Guía de Desarrollo (Rama `dev`)

### 📂 Estructura de Archivos Clave

- **Assets:** Los logos de proveedores y marcas deben alojarse en `/public/logos/` para facilitar su acceso mediante rutas absolutas (ej. `/logos/elpozo.png`).
- **Componentes:** Desarrollar de forma modular (ej. `LogoLoop.jsx`).

### 🌿 Flujo de Trabajo (Git)

1.  **Main:** Solo código de producción 100% estable.
2.  **Dev:** Rama de integración (esta rama).
3.  **Features:** Crear ramas tipo `feature/nombre-de-la-mejora` para cada nueva funcionalidad antes de unirla a `dev`.

### 🛠️ Comandos Rápidos

- `npm install` - Instalar dependencias.
- `npm run dev` - Arrancar servidor local.

---

## 📈 Estado del Proyecto

- [x] Definición de retos y objetivos.
- [x] Configuración inicial de React + Vite.
- [x] Estructura de carpetas y assets.
- [ ] Desarrollo de la Landing Page.

---

© 2026 Toscamare - Digitalización y Crecimiento.
