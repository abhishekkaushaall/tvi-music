let musicStarted = false;
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

// Attempt play on load
window.addEventListener("DOMContentLoaded", () => {
  attemptPlayMusic();
});

// Fallback: Start music on first tap anywhere
document.addEventListener("click", attemptPlayMusic, { once: true });
document.addEventListener("touchstart", attemptPlayMusic, { once: true });

function attemptPlayMusic() {
  if (!musicStarted && bgMusic) {
    bgMusic.play().then(() => {
      musicStarted = true;
      if (musicBtn) musicBtn.innerText = "🔊";
    }).catch(e => {
      console.log("Autoplay waiting for touch event:", e);
    });
  }
}

// Feature 2: Sound Toggle Logic
if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.innerText = "🔊";
      musicStarted = true;
    } else {
      bgMusic.pause();
      musicBtn.innerText = "🔇";
    }
  });
}

// Card Navigation
function goToCard(cardId) {
  attemptPlayMusic();

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('active'));

  const targetCard = document.getElementById(cardId);
  if (targetCard) {
    targetCard.classList.add('active');
  }

  // Feature 1: Trigger Confetti Burst on YES Page
  if (cardId === 'card-5' && typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

// Dodging "No" Button Logic
const moveBtn = document.getElementById("move-random");

if (moveBtn) {
  function moveButton() {
    attemptPlayMusic();

    moveBtn.style.position = "fixed";
    const x = Math.random() * (window.innerWidth - moveBtn.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - moveBtn.offsetHeight - 40) + 20;

    moveBtn.style.left = `${x}px`;
    moveBtn.style.top = `${y}px`;
  }

  moveBtn.addEventListener("mouseenter", moveButton);
  moveBtn.addEventListener("touchstart", moveButton);
}


