document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("botonSaludo");
    const mensaje = document.getElementById("mensaje");

    boton.addEventListener("click", function () {

        mensaje.textContent = "¡Gracias por visitar Barbería Salva! 💈";

    });

});