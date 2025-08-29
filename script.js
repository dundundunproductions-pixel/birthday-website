// 🎯 Set the target date (year, monthIndex, day, hour, minute)
// NOTE: monthIndex is 0-based (0 = January, 11 = December)
const targetDate = new Date(2025, 7, 2, 0, 0, 0).getTime();

let revealed = false; // prevents reveal code from running every second

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0 && !revealed) {
    revealed = true; // ✅ run reveal only once

    // Hide countdown, show content
    document.getElementById("countdown").style.display = "none";
    document.getElementById("content").style.display = "block";

    // 🎊 Confetti blast for 5s
    blastConfetti();

    // 🎵 Play music only once per visitor
    if (!localStorage.getItem("playedMusic")) {
      playMusic();
      localStorage.setItem("playedMusic", "true");
    }

    // 🎈 Remove balloons after they float up
    document.querySelectorAll('.balloon').forEach(balloon => {
      balloon.addEventListener("animationend", () => balloon.remove());
    });

    return;
  }

  if (timeLeft > 0) {
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update countdown text
    document.getElementById("countdown").innerHTML =
      `🎉 Countdown to Kennie's big day: ${days}d ${hours}h ${minutes}m ${seconds}s 🎉`;
  }
}

// Run every second
setInterval(updateCountdown, 1000);
updateCountdown();

// 🎊 Confetti for 5 seconds then stop
function blastConfetti() {
  const duration = 5000; // 5 seconds
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    confetti({
      particleCount: 7,
      spread: 60,
      startVelocity: 30,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() > end) {
      clearInterval(interval); // ✅ stop bursts
    }
  }, 200); // burst every 200ms
}

// 🎊 Manual button confetti (5s burst as well)
function showConfetti() {
  blastConfetti();
}

// 🎵 Music
function playMusic() {
  const audio = new Audio("videos/happy-birthday-jazz-171120");
  audio.play();
}
