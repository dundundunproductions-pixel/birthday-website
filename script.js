// 🎯 Set the target date (year, monthIndex, day, hour, minute)
// NOTE: monthIndex is 0-based (0 = January, 11 = December)
const targetDate = new Date(2025, 8, 2, 0, 0, 0).getTime(); // Example: Sept 10, 2025 at midnight

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    // Countdown finished → show birthday page
    document.getElementById("countdown").style.display = "none";
    document.getElementById("content").style.display = "block";
    return;
  }

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update countdown text
  document.getElementById("countdown").innerHTML =
    `🎉 Countdown to the Kennie's big day :): ${days}d ${hours}h ${minutes}m ${seconds}s 🎉`;
}

// Run every second
setInterval(updateCountdown, 1000);

// Run once immediately
updateCountdown();

function showConfetti() {
  alert("🎉🎂 Happy Birthday!!! 🎂🎉");
}
