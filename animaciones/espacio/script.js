let gasolina = 95;
let intervaloGasolina;
function disminuirGasolinaGradualmente() {
    intervaloGasolina = setInterval(function() {
        if (gasolina > 0) {
            gasolina -= 1;
            document.getElementById('contadorGasolina').innerText = "Gasolina: " + gasolina;
        }
        if (gasolina <= 0) {
            clearInterval(intervaloGasolina);
        }
    }, 1000);
}
disminuirGasolinaGradualmente();
document.getElementById('palanca').addEventListener('click', function() {
    var fondo = document.getElementById('fondo');
    var sonidoAceleracion = document.getElementById('sonidoAceleracion');
    fondo.classList.add('hiperespacio');
    sonidoAceleracion.currentTime = 0;
    sonidoAceleracion.play();
    gasolina -= 40;
    if (gasolina < 0) gasolina = 0;
    document.getElementById('contadorGasolina').innerText = "Gasolina: " + gasolina;
    setTimeout(function() {
        fondo.style.backgroundImage = "url('img/hiperespacio.jpeg')";
    }, 3000);
});