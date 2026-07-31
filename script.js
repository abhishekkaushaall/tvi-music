let musicStarted = false;
const bgMusic = document.getElementById("bg-music");

// 1. Try playing immediately as soon as the site loads
window.addEventListener("DOMContentLoaded", () => {
  attemptPlayMusic();
});

// 2. Fallback: Start music on the VERY FIRST tap/click anywhere on screen
document.addEventListener("click", attemptPlayMusic, { once: true });
document.addEventListener("touchstart", attemptPlayMusic, { once: true });

function attemptPlayMusic() {
  if (!musicStarted && bgMusic) {
    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(e => {
      // Browser blocked instant autoplay (waiting for first user tap)
      console.log("Autoplay waiting for touch event:", e);
    });
  }
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
