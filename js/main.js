/*
Autor: Sergio Silva
Fecha: 2025-07-17
Descripción: Archivo JavaScript principal del sitio web del Restaurante. Controla animaciones, interacciones básicas y funciones del sitio.
Actualizaciones:
  - [2025-07-17] Creación del archivo con integración básica de ScrollReveal.
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
    const section = document.querySelector(link.hash);
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
