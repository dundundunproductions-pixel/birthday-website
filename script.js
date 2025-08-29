// ================================
// Countdown + Reveal + Music Toggle
// ================================

// 🎯 Target date (year, monthIndex, day, hour, minute)
const targetDate = new Date(2025, 8, 2, 0, 0, 0).getTime();

let revealed = false;

// === Music ===
const MUSIC_SRC = "videos/happy-birthday-jazz-171120.mp3"; // must exist in your repo
const birthdayMusic = new Audio(MUSIC_SRC);
birthdayMusic.loop = true;
birthdayMusic.volume = 0.4; // softer

// Wire the button AFTER DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("musicBtn");
  if (!musicBtn) {
    console.warn("Music button not found. Add <button id='musicBtn'>Play Music 🎶</button> to your HTML.");
    return;
  }

  // Toggle handler
  musicBtn.addEventListener("click", async () => {
    try {
      if (birthdayMusic.paused) {
        await birthdayMusic.play();
        musicBtn.textContent = "Pause Music ⏸️";
      } else {
        birthdayMusic.pause();
        musicBtn.textContent = "Play Music 🎶";
      }
    } catch (err) {
      console.error("Audio play failed. Check file path/extension:", err);
    }
  });
});

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0 && !revealed) {
    revealed = true;

    const countdownEl = document.getElementById("countdown");
    const contentEl = document.getElementById("content");
    if (countdownEl) countdownEl.style.display = "none";
    if (contentEl) contentEl.style.display = "block";

    blastConfetti();

    document.querySelectorAll(".balloon").forEach((balloon) => {
      balloon.addEventListener("animationend", () => balloon.remove());
    });

    return;
  }

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const el = document.getElementById("countdown");
    if (el) {
      el.innerHTML = `🎉 Countdown to Kennie's big day: ${days}d ${hours}h ${minutes}m ${seconds}s 🎉`;
    }
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 🎊 Confetti (5 seconds then stop)
function blastConfetti() {
  const end = Date.now() + 5000;
  const interval = setInterval(() => {
    confetti({
      particleCount: 7,
      spread: 60,
      startVelocity: 30,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
    if (Date.now() > end) clearInterval(interval);
  }, 200);
}

// Optional manual confetti button if you use it elsewhere
function showConfetti() {
  blastConfetti();
}
window.showConfetti = showConfetti;
