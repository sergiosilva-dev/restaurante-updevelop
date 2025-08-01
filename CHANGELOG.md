# 📒 CHANGELOG

Este archivo contiene un registro estructurado y detallado de todos los cambios realizados en el proyecto **restaurante-updevelop**, ordenados cronológicamente y conforme a las buenas prácticas de versionado.

---

## [v1.0.0] - 2025-07-18

🚀 **Primer lanzamiento oficial**

### ✨ Agregado

- Estructura base del proyecto: `index.html`, `style.css`, `main.js`, `assets/`, `.gitignore`, `README.md`, `LICENSE`.
- Secciones completas: Hero, Menú, Nosotros, Opiniones de Clientes, Contacto y Footer.
- Animaciones con ScrollReveal.js para una experiencia visual dinámica.
- Compatibilidad con Tailwind CDN.
- Documentación inicial incluida en cada archivo.
- Control de versiones en GitHub y seguimiento con `CHANGELOG.md`.

---

## [v1.0.1] - 2025-07-24

🎨 **Mejoras visuales y estructurales**

### 🛠️ Mejorado

- Header: estructura profesional, logo responsive, botón de tema y menú móvil.
- Footer: estructura en 3 columnas con enlaces internos, redes sociales y créditos.
- Hero: imagen profesional, llamado a la acción y diseño centrado.

### ✨ Agregado

- Logos claros/oscuros en PNG.
- Favicons y archivo `site.webmanifest` para PWA.
- Scroll activo con mejora de errores en consola.
- Paleta de colores personalizada: rojo, crema, vino, dorado.

---

## [v1.0.2] - 2025-07-25

🌗 **Modo oscuro y validaciones**

### ✨ Agregado

- Integración con Formspree para formulario funcional.
- Validación en tiempo real para inputs del formulario (JS + Tailwind).
- ScrollReveal aplicado globalmente.

### 🛠️ Mejorado

- Contraste y legibilidad en navbar para modo oscuro.
- Estilo visual en inputs y transiciones.
- Aplicación total del modo oscuro en todas las secciones.
- Organización semántica del HTML para accesibilidad.

### 🐞 Corregido

- Exclusión de archivos temporales y recursos no versionables en `.gitignore`.

---

## [v1.1.0] - 2025-07-28

🌍 **Interactividad avanzada: selector de idioma**

### ✨ Agregado

- Sistema multilenguaje (`i18n`) con archivos `es.json` y `en.json`.
- Selector de idioma visual con banderas (toggle JS).
- Persistencia del idioma seleccionado en `localStorage`.
- Traducción de `title` y `meta description`.
- Traducción dinámica de `placeholder` en formularios.

### 🛠️ Mejorado

- Aplicación de `data-i18n`, `data-i18n-placeholder` y renderización de textos dinámicos con `innerHTML` para contenidos con HTML como enlaces.
- Organización del script para manejar traducciones anidadas con acceso profundo a claves.
- Reestructuración del menú de idioma: de `hover` a `toggle` con cierre externo.

---

## [v1.2.0] - 2025-08-01

🧭 **Inicio de estructura multipágina**

### ✨ Agregado

- Nueva página `menu.html` completamente funcional con todos los platos, estructura responsive y animaciones.
- Filtro dinámico por categoría (`entradas`, `platos`, `postres`, `bebidas`) con `data-category` y URL query.
- Tarjetas organizadas por sección con imágenes optimizadas y texto internacionalizable (`data-i18n`).
- Redirección desde sección menú en `index.html` con query param.

### 🛠️ Mejorado

- Sección de menú en `index.html` actualizada a versión compatible con multipágina (`menu.html?categoria=...`).
- Validación de integridad visual y funcionalidad en tema claro/oscuro y multilenguaje en ambas páginas.

---

🧑‍💻 _Actualizado por: Sergio Silva – Up Develop_  
📅 Última actualización: **2025-08-01**
