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

// Animaciones con ScrollReveal
ScrollReveal().reveal(".fade-in", {
  duration: 1000,
  distance: "40px",
  origin: "bottom",
  easing: "ease-in-out",
  reset: false,
});

// Navbar scroll activo
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

// Menú móvil
const toggleBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Modo oscuro
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (toggleBtn && themeIcon) {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    toggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      themeIcon.classList.toggle("fa-sun", isDark);
      themeIcon.classList.toggle("fa-moon", !isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});

// Función auxiliar para claves anidadas
const obtenerTraduccion = (obj, clave) =>
  clave.split(".").reduce((o, i) => (o ? o[i] : null), obj);

// Cambiar idioma
const cambiarIdioma = async (idioma) => {
  try {
    const res = await fetch(`lang/${idioma}.json`);
    const traducciones = await res.json();

    // data-i18n
    const elementos = document.querySelectorAll("[data-i18n]");
    elementos.forEach((el) => {
      const clave = el.dataset.i18n;
      const texto = obtenerTraduccion(traducciones, clave);
      if (texto) {
        if (el.tagName.toLowerCase() === "title") {
          document.title = texto;
        } else if (
          el.tagName.toLowerCase() === "meta" &&
          el.name === "description"
        ) {
          el.setAttribute("content", texto);
        } else if (texto.includes("<") && texto.includes(">")) {
          el.innerHTML = texto;
        } else {
          el.textContent = texto;
        }
      }
    });

    // data-i18n-placeholder
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

    // Guardar idioma
    localStorage.setItem("idioma", idioma);
  } catch (err) {
    console.error("Error al cambiar idioma:", err);
  }
};

// Cargar idioma inicial
document.addEventListener("DOMContentLoaded", () => {
  const idiomaGuardado = localStorage.getItem("idioma") || "es";
  cambiarIdioma(idiomaGuardado);

  const banderaActual = document.getElementById("bandera-actual");
  if (banderaActual) {
    banderaActual.src =
      idiomaGuardado === "en"
        ? "https://flagcdn.com/w40/gb.png"
        : "https://flagcdn.com/w40/es.png";
  }
});

// Toggle menú de idioma
document.addEventListener("DOMContentLoaded", () => {
  const idiomaToggle = document.getElementById("idioma-toggle");
  const idiomasMenu = document.getElementById("idiomas-menu");

  if (idiomaToggle && idiomasMenu) {
    idiomaToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      idiomasMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!idiomasMenu.contains(e.target) && !idiomaToggle.contains(e.target)) {
        idiomasMenu.classList.add("hidden");
      }
    });

    idiomasMenu.querySelectorAll("button[data-idioma]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idioma = btn.getAttribute("data-idioma");
        cambiarIdioma(idioma);

        const banderaActual = document.getElementById("bandera-actual");
        if (banderaActual) {
          banderaActual.src =
            idioma === "en"
              ? "https://flagcdn.com/w40/gb.png"
              : "https://flagcdn.com/w40/es.png";
        }

        idiomasMenu.classList.add("hidden");
      });
    });
  }
});

// Formulario (si existe)
const form = document.getElementById("form-contacto");
const mensaje = document.getElementById("form-mensaje");
const correoInput = document.getElementById("correo");
const mensajeInput = document.getElementById("mensaje");
const errorCorreo = document.getElementById("error-correo");
const errorMensaje = document.getElementById("error-mensaje");

if (form && correoInput && mensajeInput) {
  const validarCorreo = () => {
    const email = correoInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = regex.test(email);
    correoInput.classList.toggle("border-red-500", !valido);
    correoInput.classList.toggle("ring-red-500", !valido);
    correoInput.classList.toggle("border-green-500", valido);
    correoInput.classList.toggle("ring-green-500", valido);
    errorCorreo?.classList.toggle("hidden", valido);
    return valido;
  };

  const validarMensaje = () => {
    const valido = mensajeInput.value.trim().length > 3;
    mensajeInput.classList.toggle("border-red-500", !valido);
    mensajeInput.classList.toggle("ring-red-500", !valido);
    mensajeInput.classList.toggle("border-green-500", valido);
    mensajeInput.classList.toggle("ring-green-500", valido);
    errorMensaje?.classList.toggle("hidden", valido);
    return valido;
  };

  correoInput.addEventListener("input", validarCorreo);
  mensajeInput.addEventListener("input", validarMensaje);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validarCorreo() || !validarMensaje()) return;

    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok && mensaje) {
      form.reset();
      mensaje.classList.remove("hidden");
      setTimeout(() => mensaje.classList.add("hidden"), 5000);
    }
  });
}

// Filtros del menú
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".menu-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remover clase activa de todos
      filterButtons.forEach((b) =>
        b.classList.remove("border-black", "font-bold")
      );
      btn.classList.add("border-black", "font-bold");

      const category = btn.dataset.category;

      cards.forEach((card) => {
        const matches =
          category === "all" || card.dataset.category === category;
        card.style.display = matches ? "block" : "none";
      });
    });
  });
});

// Cargar categoría desde URL y activar botón correspondiente
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get("categoria");

  if (categoria) {
    const boton = document.querySelector(`[data-category="${categoria}"]`);
    if (boton) boton.click();
  }
});
