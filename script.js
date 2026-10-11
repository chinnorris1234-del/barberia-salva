
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

// Menú para móviles
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const abierto = nav.classList.toggle("open");

    menuToggle.textContent = abierto ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú" : "Abrir menú"
    );
  });

  nav.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

// Galería de fotografías
const imagenes = [...document.querySelectorAll(".gallery-card img")];
const lightbox = document.querySelector("#lightbox");
const imagenGrande = lightbox?.querySelector("img");

let indiceActual = 0;

function mostrarImagen(indice) {
  if (!imagenes.length || !lightbox || !imagenGrande) return;

  indiceActual = (indice + imagenes.length) % imagenes.length;

  imagenGrande.src = imagenes[indiceActual].src.replace(
    "w=700",
    "w=1400"
  );

  imagenGrande.alt = imagenes[indiceActual].alt;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function cerrarGaleria() {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Pulsar una fotografía para ampliarla
imagenes.forEach((imagen, indice) => {
  imagen.closest(".gallery-card")?.addEventListener("click", () => {
    mostrarImagen(indice);
  });
});

// Botón "Ver más fotos"
document.querySelector("#gallery-more")?.addEventListener("click", () => {
  mostrarImagen(0);
});

// Controles de la galería
lightbox?.querySelector(".close")?.addEventListener(
  "click",
  cerrarGaleria
);

lightbox?.querySelector(".prev")?.addEventListener("click", () => {
  mostrarImagen(indiceActual - 1);
});

lightbox?.querySelector(".next")?.addEventListener("click", () => {
  mostrarImagen(indiceActual + 1);
});

// Cerrar al pulsar fuera de la fotografía
lightbox?.addEventListener("click", evento => {
  if (evento.target === lightbox) {
    cerrarGaleria();
  }
});

// Controlar la galería con el teclado
document.addEventListener("keydown", evento => {
  if (!lightbox?.classList.contains("open")) return;

  if (evento.key === "Escape") {
    cerrarGaleria();
  }

  if (evento.key === "ArrowLeft") {
    mostrarImagen(indiceActual - 1);
  }

  if (evento.key === "ArrowRight") {
    mostrarImagen(indiceActual + 1);
  }
});

// Resaltar la sección actual en el menú
const secciones = document.querySelectorAll(
  "main section[id], #inicio"
);

const enlacesMenu = document.querySelectorAll(".nav a");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;

      enlacesMenu.forEach(enlace => {
        enlace.classList.toggle(
          "active",
          enlace.getAttribute("href") === `#${entrada.target.id}`
        );
      });
    });
  }, {
    rootMargin: "-25% 0px -65% 0px"
  });

  secciones.forEach(seccion => observador.observe(seccion));
}
