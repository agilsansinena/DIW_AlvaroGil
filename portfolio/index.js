
document.addEventListener("DOMContentLoaded", () => {
    const dynamicText = document.getElementById("dynamic-text");
    const phrases = ["la música", "los juegos", "leer libros", "la tecnología"];
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

  document.querySelectorAll('.verticalNav').forEach(nav => {
    nav.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

