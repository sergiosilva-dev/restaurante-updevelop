/*
Autor: Sergio Silva
Fecha: 2025-07-17
Descripción: Funcionalidad JavaScript del sitio. Modo oscuro, menú móvil y scroll.
Historial:
- 2025-07-17: Estructura inicial con ScrollReveal.
- 2025-07-18: Menú móvil y modo oscuro (localStorage).
- 2025-07-24: Fix scroll en consola para enlaces vacíos.
- 2025-07-25: Ajustes visuales en la página para modo oscuro y contacto con sus validaciones.
- 2025-07-28: Implementación completa del sistema multilenguaje (i18n), placeholders y textos con HTML dinámico.
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

const form = document.getElementById("form-contacto");
const mensaje = document.getElementById("form-mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validación previa antes de enviar
  const correoOk = validarCorreo();
  const mensajeOk = validarMensaje();
  if (!correoOk || !mensajeOk) return;

  // Enviar datos al endpoint de Formspree
  const data = new FormData(form);
  const res = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  });

  // Mostrar mensaje de éxito si fue enviado correctamente
  if (res.ok) {
    form.reset();
    mensaje.classList.remove("hidden");
    setTimeout(() => mensaje.classList.add("hidden"), 5000);
  }
});

// Inputs y mensajes de error
const correoInput = document.getElementById("correo");
const mensajeInput = document.getElementById("mensaje");

const errorCorreo = document.getElementById("error-correo");
const errorMensaje = document.getElementById("error-mensaje");

// Validar campo correo electrónico
const validarCorreo = () => {
  const email = correoInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valido = regex.test(email);

  if (!valido) {
    correoInput.classList.add("border-red-500", "ring-1", "ring-red-500");
    correoInput.classList.remove("border-green-500", "ring-green-500");
    errorCorreo.classList.remove("hidden");
  } else {
    correoInput.classList.remove("border-red-500", "ring-red-500");
    correoInput.classList.add("border-green-500", "ring-1", "ring-green-500");
    errorCorreo.classList.add("hidden");
  }

  return valido;
};

// Validar campo mensaje
const validarMensaje = () => {
  const msg = mensajeInput.value.trim();
  const valido = msg.length > 3;

  if (!valido) {
    mensajeInput.classList.add("border-red-500", "ring-1", "ring-red-500");
    mensajeInput.classList.remove("border-green-500", "ring-green-500");
    errorMensaje.classList.remove("hidden");
  } else {
    mensajeInput.classList.remove("border-red-500", "ring-red-500");
    mensajeInput.classList.add("border-green-500", "ring-1", "ring-green-500");
    errorMensaje.classList.add("hidden");
  }

  return valido;
};

// Escuchar eventos en tiempo real
correoInput.addEventListener("input", validarCorreo);
mensajeInput.addEventListener("input", validarMensaje);

// Función auxiliar: fuera del DOMContentLoaded y antes de cambiarIdioma
const obtenerTraduccion = (obj, clave) => {
  return clave.split(".").reduce((o, i) => (o ? o[i] : null), obj);
};

// Función principal para cambiar idioma
const cambiarIdioma = async (idioma) => {
  try {
    const respuesta = await fetch(`lang/${idioma}.json`);
    const traducciones = await respuesta.json();

    const elementos = document.querySelectorAll("[data-i18n]");

    elementos.forEach((el) => {
      const clave = el.dataset.i18n;
      const texto = obtenerTraduccion(traducciones, clave);

      if (texto) {
        if (el.tagName.toLowerCase() === "meta" && el.name === "description") {
          el.setAttribute("content", texto);
        } else if (el.tagName.toLowerCase() === "title") {
          document.title = texto;
        } else {
          // Si el texto incluye etiquetas HTML, usar innerHTML
          if (texto.includes("<") && texto.includes(">")) {
            el.innerHTML = texto;
          } else {
            el.textContent = texto;
          }
        }
      }
    });

    // Traducción de atributos placeholder
    const elementosPlaceholder = document.querySelectorAll(
      "[data-i18n-placeholder]"
    );
    elementosPlaceholder.forEach((el) => {
      const clave = el.dataset.i18nPlaceholder;
      const texto = obtenerTraduccion(traducciones, clave);
      if (texto) {
        el.setAttribute("placeholder", texto);
      }
    });

    localStorage.setItem("idioma", idioma);
  } catch (error) {
    console.error("Error al cargar idioma:", error);
  }
};

// DOMContentLoaded y bandera
document.addEventListener("DOMContentLoaded", () => {
  const idiomaGuardado = localStorage.getItem("idioma") || "es";
  cambiarIdioma(idiomaGuardado);

  const banderaActual = document.getElementById("bandera-actual");
  if (banderaActual) {
    banderaActual.src =
      idiomaGuardado === "en"
        ? "https://flagcdn.com/w20/gb.png"
        : "https://flagcdn.com/w20/es.png";
  }
});

// Toggle visual del menú de idiomas
document.addEventListener("DOMContentLoaded", () => {
  const idiomaToggle = document.getElementById("idioma-toggle");
  const idiomasMenu = document.getElementById("idiomas-menu");

  idiomaToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Previene cierre inmediato
    idiomasMenu.classList.toggle("hidden");
  });

  // Cierra el menú si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!idiomasMenu.contains(e.target) && !idiomaToggle.contains(e.target)) {
      idiomasMenu.classList.add("hidden");
    }
  });

  // Manejador de cambio de idioma
  idiomasMenu.querySelectorAll("button[data-idioma]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idioma = btn.getAttribute("data-idioma");
      cambiarIdioma(idioma);

      // Cambiar bandera actual visualmente
      const banderaActual = document.getElementById("bandera-actual");
      banderaActual.src =
        idioma === "en"
          ? "https://flagcdn.com/w40/gb.png"
          : "https://flagcdn.com/w40/es.png";

      idiomasMenu.classList.add("hidden"); // Ocultar menú
    });
  });
});
