let musicStarted = false;
const bgMusic = document.getElementById("bg-music");

function goToCard(cardId) {
  // Plays music continuously starting on first tap
  if (!musicStarted) {
    bgMusic.play().catch(e => console.log("Audio play deferred:", e));
    musicStarted = true;
  }

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('active'));

  const targetCard = document.getElementById(cardId);
  if (targetCard) {
    targetCard.classList.add('active');
  }
}

const moveBtn = document.getElementById("move-random");

if (moveBtn) {
  function moveButton() {
    if (!musicStarted) {
      bgMusic.play().catch(e => console.log("Audio play deferred:", e));
      musicStarted = true;
    }

    moveBtn.style.position = "fixed";
    const x = Math.random() * (window.innerWidth - moveBtn.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - moveBtn.offsetHeight - 40) + 20;

    moveBtn.style.left = `${x}px`;
    moveBtn.style.top = `${y}px`;
  }

  moveBtn.addEventListener("mouseenter", moveButton);
  moveBtn.addEventListener("touchstart", moveButton);
}
