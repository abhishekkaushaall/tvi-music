let musicStarted = false;
let typed = false;
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

// 🔒 CHUCK BASS SECRET PASSCODE
const SECRET_PASSCODE = "chair";

// Passcode Check on Page Load
window.addEventListener("DOMContentLoaded", () => {
  const userEntry = prompt("🍸 Security Check: 3 words, 8 letters... Enter the secret passcode to unlock your UES surprise:");
  
  if (userEntry === null || userEntry.trim().toLowerCase() !== SECRET_PASSCODE.toLowerCase()) { 
    alert("Wrong code! Access Denied 😜");
    document.body.innerHTML = `
      <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; text-align:center; padding:20px;">
        <h1 style="color:#ff4d6d; font-size:1.8rem; margin-bottom:10px;">Access Denied! 🛑</h1>
        <p style="color:#666; font-size:1rem;">Only my Blair Waldorf gets to view this page!</p>
      </div>
    `;
  } else {
    attemptPlayMusic();
  }
});

// Fallback: Start music on first touch anywhere
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

// Spawner for Ambient Background Floating Hearts
function createAmbientHeart() {
  const hearts = ["💖", "💕", "🌸", "✨", "❤️"];
  const heart = document.createElement("span");
  heart.className = "bg-heart";
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${Math.random() * 95}vw`;
  heart.style.fontSize = `${Math.random() * 1.5 + 1.0}rem`;
  
  const duration = Math.random() * 5 + 6;
  heart.style.animationDuration = `${duration}s`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createAmbientHeart, 700);

// Floating Heart Trail on Clicks
document.addEventListener("click", (e) => {
  if (e.target.id === "music-toggle") return;

  const hearts = ["💖", "💕", "✨", "🌸", "❤️"];
  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${e.clientX - 12}px`;
  heart.style.top = `${e.clientY - 12}px`;
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
});

// Mute Toggle Logic
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

  // Grand Finale Triggers (Card 5)
  if (cardId === 'card-5') {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    startTypewriter();
  }
}

// Typewriter Logic
function startTypewriter() {
  if (typed) return;
  typed = true;

  const h1Text = "I knew you couldn't resist! Happy Girlfriend's Day, my favorite headache! 💖✨";
  const pText = "You're stuck with me forever now! Thanks for putting up with me. I love you so much! 😘";
  
  let h1Index = 0;
  let pIndex = 0;
  
  const h1Elem = document.getElementById("typewriter-h1");
  const pElem = document.getElementById("typewriter-p");

  if (!h1Elem || !pElem) return;

  function typeH1() {
    if (h1Index < h1Text.length) {
      h1Elem.textContent += h1Text.charAt(h1Index);
      h1Index++;
      setTimeout(typeH1, 35);
    } else {
      setTimeout(typeP, 200);
    }
  }

  function typeP() {
    if (pIndex < pText.length) {
      pElem.textContent += pText.charAt(pIndex);
      pIndex++;
      setTimeout(typeP, 25);
    }
  }

  typeH1();
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
