# Guía de Desarrollo y Mantenimiento - Proyecto Toscamare

Este documento está diseñado para que cualquier desarrollador o persona con conocimientos técnicos pueda entender, modificar, añadir o eliminar partes de la página web de Toscamare fácilmente.

---

## 1. Arquitectura del Proyecto

El proyecto está dividido en dos partes principales que se comunican entre sí:

*   **Frontend (Carpeta `/frontend`):** Es la interfaz visual de la web. Está construida usando **React**, **Vite**, **TypeScript** y **Tailwind CSS**.
*   **Backend (Carpeta `/backend`):** Es el motor lógico que procesa el envío de correos (Avisos de Contacto y Pedidos). Está programado en **PHP** puro utilizando la librería **PHPMailer**.
*   **Servidor de Producción:** Alojado en **Ionos** (servidor Apache). Todo el enrutamiento, caché y seguridad del servidor se maneja mediante el archivo `.htaccess`.

---

## 2. Estructura de Carpetas

Entender dónde está cada cosa es el primer paso para modificar la web:

```text
Proyecto-Toscamare/
├── backend/
│   └── api/
│       ├── config.php       # ¡IMPORTANTE! Aquí van las contraseñas de los correos. (No subir a GitHub)
│       ├── contact.php      # Script principal que recibe las peticiones de React y envía los emails.
│       └── PHPMailer/       # Librería de terceros para envío seguro de emails mediante SMTP.
│
├── frontend/
│   ├── public/              # Archivos estáticos que no pasan por Vite (.htaccess, robots.txt, CSVs).
│   ├── src/
│   │   ├── assets/          # Imágenes de la web, iconos, vídeos y fuentes.
│   │   ├── components/      # "Trozos" de código reutilizables (botones, formularios, tarjetas).
│   │   ├── data/            # Datos estáticos (ej. ubicaciones de tiendas en TypeScript).
│   │   ├── layout/          # Estructura principal de la web (Header, Footer, MainLayout).
│   │   ├── pages/           # Cada una de las pestañas de la web (Inicio, Contacto, Pedidos, etc.).
│   │   ├── lib/ & utils/    # Funciones de ayuda y animaciones.
│   │   ├── App.tsx          # Configuración del enrutador (React Router). Define qué página carga cada URL.
│   │   └── main.tsx         # Punto de entrada de la aplicación React.
│   ├── package.json         # Dependencias y scripts del proyecto (npm).
│   └── vite.config.ts       # Configuración del empaquetador Vite.
```

---

## 3. Guía de Tareas Comunes (Frontend)

### Preparar el entorno local
Para probar la web en tu ordenador, abre la terminal en la carpeta `/frontend` y ejecuta:
1. `npm install` (Solo la primera vez, para descargar las dependencias).
2. `npm run dev` (Arranca el servidor de pruebas en `http://localhost:5173`).

### ¿Cómo añadir o modificar una Página/Sección?
1. Ve a `frontend/src/pages/` y busca la página que quieres cambiar (por ejemplo, `Contacto.tsx` o `sobreNosotros/`).
2. Si quieres editar un bloque específico (por ejemplo, el "Hero" de inicio), ve a `frontend/src/components/inicioBloques/`.
3. Todos los estilos se manejan con **Tailwind CSS** (clases como `className="flex flex-col text-center bg-blue-500"`). Para cambiar colores o tamaños, simplemente edita esas clases en el HTML.

### ¿Cómo cambiar los enlaces del Menú de Navegación?
1. El menú superior está en `frontend/src/layout/Header.tsx`.
2. El pie de página está en `frontend/src/layout/Footer.tsx`.

### ¿Cómo añadir una página nueva?
1. Crea un archivo nuevo en `frontend/src/pages/` (ej. `NuevaPagina.tsx`).
2. Ve a `frontend/src/App.tsx`.
3. Importa tu nueva página arriba: `import NuevaPagina from './pages/NuevaPagina';`
4. Añádela a las rutas: `<Route path="/nueva-pagina" element={<NuevaPagina />} />`
5. Añade un enlace en el `Header.tsx` apuntando a `/nueva-pagina`.

### ¿Cómo cambiar imágenes o el logo?
*   **Logo principal:** Está guardado en `frontend/public/logoToscamare/`.
*   **Imágenes generales:** Están en `frontend/src/assets/`. Reemplaza el archivo manteniendo el mismo nombre o importa el nuevo archivo en el componente React que lo necesite.

---

## 4. Guía de Tareas Comunes (Backend)

### ¿Cómo modificar los correos o contraseñas?
1. En producción, entra al panel de Ionos y edita el archivo `api/config.php`.
2. Ahí podrás cambiar el `email_destino` (quién recibe los avisos) y el `password` (la contraseña de la cuenta para usar el SMTP).

### ¿Cómo cambiar el diseño del correo que llega a la empresa?
1. Abre `backend/api/contact.php`.
2. Busca la variable `$htmlBody` (sobre la línea 150). Ahí está todo el código HTML con el diseño del correo. Puedes cambiar colores, añadir el logo de la empresa por URL, etc.

---

## 5. Proceso de Subida a Producción (Despliegue en Ionos)

Cuando hayas hecho cambios en tu ordenador local y quieras subirlos a la web real (`toscamare.es`):

1. Abre la terminal en la carpeta `/frontend`.
2. Ejecuta el comando: `npm run build`
    *   *Esto comprimirá y optimizará todo tu código React.*
3. Se generará una carpeta llamada `/frontend/dist`.
4. Abre tu programa de FTP (como FileZilla) o el panel de archivos de Ionos.
5. Sube **el contenido interior** de la carpeta `dist` a la carpeta raíz pública de Ionos (`/`).
6. Si hiciste cambios en el PHP, sube también la carpeta `/backend/api` a esa misma raíz de Ionos (quedando como una subcarpeta llamada `api/`).

### ¡Atención al archivo `.htaccess`!
En la carpeta `frontend/public/` hay un archivo oculto llamado `.htaccess`. Este archivo se copia automáticamente a `dist/` al hacer el *build*.
**Es crucial no borrarlo de Ionos**. Este archivo se encarga de:
1.  Hacer que funcionen las descargas rápidas (Caché).
2.  Comprimir los archivos (GZIP) para que la web cargue muy rápido.
3.  Proteger la web de hackers (Cabeceras SSL y Anti-XSS).
4.  Permitir que las rutas de React funcionen sin dar Error 404.