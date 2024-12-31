let pulsaciones = 0;
let carta1 = '';
let carta2 = '';
let aciertos = 0;
let errores = 0;
let timer;
let startTime;
let bestTime = localStorage.getItem('bestTime') || null;
let hintsAvailable = 3;
let totalParejas;
let score = 0;
const aciertoAudio = new Audio('../sound/acierto.mp3');
aciertoAudio.volume = 0.3;
const errorAudio = new Audio('../sound/Error.mp3');

document.addEventListener('DOMContentLoaded', function () {
    iniciarJuego();
    document.getElementById('resetButton').addEventListener('click', reiniciarJuego);
    document.getElementById('hintButton').addEventListener('click', useHint);
    document.getElementById('dificultad').addEventListener('change', reiniciarJuego);
    displayBestTime();
});

function iniciarJuego() {
    const dificultad = document.getElementById('dificultad').value;
    let cartas;

    if (dificultad === 'facil') {
        cartas = ['pikachu', 'charizard', 'articuno', 'charizard2'];
        totalParejas = 4;
    } else if (dificultad === 'medio') {
        cartas = ['pikachu', 'charizard', 'articuno', 'charizard2', 'blastoise', 'moltres'];
        totalParejas = 6;
    } else {
        cartas = ['pikachu', 'charizard', 'articuno', 'charizard2', 'blastoise', 'moltres', 'gyarados', 'zapdos'];
        totalParejas = 8;
    }

    const todasCartas = [...cartas, ...cartas];
    todasCartas.sort(() => 0.5 - Math.random());

    const arriba = document.querySelector('.arriba');
    const abajo = document.querySelector('.abajo');
    arriba.innerHTML = '';
    abajo.innerHTML = '';
    todasCartas.forEach((carta, index) => {
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('carta', carta);
        cartaDiv.innerHTML = '<div class="anverso"></div><div class="reverso"></div>';
        if (index % 2 === 0) {
            arriba.appendChild(cartaDiv);
        } else {
            abajo.appendChild(cartaDiv);
        }
    });

    document.querySelectorAll('.carta').forEach(element => {
        element.addEventListener('click', function () {
            if (!element.classList.contains('seleccionada')) {
                element.classList.toggle('seleccionada');
                pulsaciones++;
                if (pulsaciones == 1) {
                    carta1 = element;
                }
                if (pulsaciones == 2) {
                    carta2 = element;
                    pulsaciones = 0;
                    if (carta1.classList[1] != carta2.classList[1]) {
                        errores++;
                        score -= 5;
                        document.getElementById('errores').textContent = errores;
                        document.getElementById('score').textContent = score;
                        carta1.classList.add('error');
                        carta2.classList.add('error');
                        errorAudio.play();
                        setTimeout(() => {
                            carta1.classList.remove('seleccionada', 'error');
                            carta2.classList.remove('seleccionada', 'error');
                        }, 1000);
                    } else {
                        aciertos++;
                        score += 10;
                        document.getElementById('aciertos').textContent = aciertos;
                        document.getElementById('score').textContent = score;
                        aciertoAudio.play();
                        if (aciertos === totalParejas) {
                            aciertoAudio.play();
                            stopTimer();
                            checkBestTime();
                            setTimeout(() => {
                                alert('¡Has ganado!');
                                reiniciarJuego();
                            }, 500);
                        }
                    }
                }
            }
        });
    });

    startTimer();
}

function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        document.getElementById('timer').textContent = elapsedTime;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function displayBestTime() {
    if (bestTime) {
        document.getElementById('bestTime').textContent = `Mejor Tiempo: ${bestTime} segundos`;
    }
}

function checkBestTime() {
    const currentTime = Math.floor((new Date() - startTime) / 1000);
    if (!bestTime || currentTime < bestTime) {
        bestTime = currentTime;
        localStorage.setItem('bestTime', bestTime);
        displayBestTime();
    }
}

function useHint() {
    if (hintsAvailable > 0) {
        hintsAvailable--;
        const allCards = document.querySelectorAll('.carta:not(.seleccionada)');
        const hintCards = Array.from(allCards).sort(() => 0.5 - Math.random()).slice(0, 3);
        hintCards.forEach(card => card.classList.add('seleccionada'));
        setTimeout(() => {
            hintCards.forEach(card => card.classList.remove('seleccionada'));
        }, 1000);
    } else {
        alert('No te quedan pistas disponibles');
    }
}

function reiniciarJuego() {
    pulsaciones = 0;
    carta1 = '';
    carta2 = '';
    aciertos = 0;
    errores = 0;
    hintsAvailable = 3;
    score = 0;
    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('errores').textContent = errores;
    document.getElementById('timer').textContent = 0;
    document.getElementById('score').textContent = score;
    document.querySelectorAll('.carta').forEach(element => {
        element.classList.remove('seleccionada');
    });
    stopTimer();
    iniciarJuego();
}
