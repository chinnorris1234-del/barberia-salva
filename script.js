
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

// Abrir y cerrar el menú en móviles
menuToggle.addEventListener("click", () => {
  const abierto = nav.classList.toggle("open");

  menuToggle.textContent = abierto ? "×" : "☰";
  menuToggle.setAttribute("aria-expanded", abierto);
});

// Cerrar el menú al seleccionar una sección
nav.querySelectorAll("a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Galería de fotografías
const imagenes = [...document.querySelectorAll(".gallery-grid img")];
const lightbox = document.querySelector("#lightbox");
const imagenGrande = lightbox.querySelector("img");

let indiceActual = 0;

function mostrarImagen(indice) {
  indiceActual = (indice + imagenes.length) % imagenes.length;

  imagenGrande.src = imagenes[indiceActual].src.replace("w=700", "w=1400");
  imagenGrande.alt = imagenes[indiceActual].alt;

  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarGaleria() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

imagenes.forEach((imagen, indice) => {
  imagen.addEventListener("click", () => mostrarImagen(indice));
});

// Botón para ver la galería
document.querySelector("#gallery-more").addEventListener("click", () => {
  mostrarImagen(0);
});

// Controles de la galería
lightbox.querySelector(".close").addEventListener("click", cerrarGaleria);

lightbox.querySelector(".prev").addEventListener("click", () => {
  mostrarImagen(indiceActual - 1);
});

lightbox.querySelector(".next").addEventListener("click", () => {
  mostrarImagen(indiceActual + 1);
});

// Cerrar al pulsar fuera de la foto
lightbox.addEventListener("click", evento => {
  if (evento.target === lightbox) {
    cerrarGaleria();
  }
});

// Teclas del teclado
document.addEventListener("keydown", evento => {
  if (!lightbox.classList.contains("open")) return;

  if (evento.key === "Escape") cerrarGaleria();
  if (evento.key === "ArrowLeft") mostrarImagen(indiceActual - 1);
  if (evento.key === "ArrowRight") mostrarImagen(indiceActual + 1);
});

// Marcar en el menú la sección que está visible
const secciones = document.querySelectorAll(
  "main section[id], #inicio"
);

const enlacesMenu = document.querySelectorAll(".nav a");

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
  rootMargin: "-30% 0px -60% 0px"
});

secciones.forEach(seccion => observador.observe(seccion));
