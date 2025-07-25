/*
Autor: Sergio Silva
Fecha: 2025-07-17
Descripción: Funcionalidad JavaScript del sitio. Modo oscuro, menú móvil y scroll.
Historial:
- 2025-07-17: Estructura inicial con ScrollReveal.
- 2025-07-18: Menú móvil y modo oscuro (localStorage).
- 2025-07-24: Fix scroll en consola para enlaces vacíos.
- 2025-07-25: Ajustes visuales en la página para modo oscuro y contacto.
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
      link.classList.add("text-neutral-500");
    } else {
      link.classList.remove("text-neutral-500");
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

// Enviar formulario de contacto
const form = document.getElementById("form-contacto");
const mensaje = document.getElementById("form-mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  });

  if (res.ok) {
    form.reset();
    mensaje.classList.remove("hidden");
    setTimeout(() => mensaje.classList.add("hidden"), 5000);
  }
});
