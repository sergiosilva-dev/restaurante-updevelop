/*
Autor: Sergio Silva
Fecha: 2025-07-17
Descripción: Archivo JavaScript principal del sitio web del Restaurante. Controla animaciones, interacciones básicas y funciones del sitio.
Actualizaciones:
  - [2025-07-17] Creación del archivo con integración básica de ScrollReveal.
  - [2025-07-18] Implementación de menú móvil toggle.
  - [2025-07-18] Implementado modo oscuro/claro con switch e íconos Font Awesome. Se guarda la preferencia del usuario en localStorage.
  - [2025-07-24] Fix en scroll navbar: validación de enlaces sin hash y secciones inexistentes para evitar errores en consola.
*/

// Configuración básica de ScrollReveal
ScrollReveal().reveal(".fade-in", {
  duration: 1000,
  distance: "40px",
  origin: "bottom",
  easing: "ease-in-out",
  reset: false,
});

// Scroll activo en navbar (highlight de enlaces al hacer scroll)
const links = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY;

  links.forEach((link) => {
    const hash = link.hash;

    if (!hash) return;

    const section = document.querySelector(hash);

    if (!section) return;

    if (
      section.offsetTop <= fromTop + 80 &&
      section.offsetTop + section.offsetHeight > fromTop + 80
    ) {
      link.classList.add("text-red-600");
    } else {
      link.classList.remove("text-red-600");
    }
  });
});

// Menú móvil toggle
const toggleBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Cambiar tema y guardar preferencia
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Aplicar tema guardado
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
});
