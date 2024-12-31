AOS.init();
document.addEventListener("DOMContentLoaded", () => {
  const dynamicText = document.getElementById("dynamic-text");
  const phrases = [
    "el Desarrollo Web",
    "la Programación",
    "las Tecnologías de la Información",
    "el Desarrollo Móvil",
    "la Inteligencia Artificial",
    "la Ciberseguridad",
    "el Desarrollo de Software",
    "la Automatización"
  ];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (deleting) {
      currentCharIndex--;
    } else {
      currentCharIndex++;
    }

    dynamicText.textContent = currentPhrase.slice(0, currentCharIndex);

    if (!deleting && currentCharIndex === currentPhrase.length) {
      setTimeout(() => {
        deleting = true;
      }, 1000);
    } else if (deleting && currentCharIndex === 0) {
      deleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }

    dynamicText.style.background = 'linear-gradient(40deg, #8c1df3 20%, #f714d1 30%, #9d01cd 70%, #621aaf 80%)';
    dynamicText.style.webkitBackgroundClip = 'text';
    dynamicText.style.webkitTextFillColor = 'transparent';
    dynamicText.style.color = '#007BFF';

    const speed = deleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }

  typeEffect();
});

const toggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar el tema guardado en localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.classList.add(currentTheme);
  toggle.checked = currentTheme === 'dark-theme';
}

// Cambiar el tema al hacer clic en el interruptor
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  } else {
    body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light-theme');
  }
});

$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#scrollToTop').fadeIn();
    } else {
      $('#scrollToTop').fadeOut();
    }
  });
  $('#scrollToTop').click(function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });
});




