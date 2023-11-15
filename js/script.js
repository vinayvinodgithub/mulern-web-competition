function updateCountdown() {
  const endDate = new Date("2023-12-31T23:59:59"); // Set your end date and time
  const currentDate = new Date("2023-11-31T:59:59);
  const difference = endDate - currentDate;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = formatTime(days);
  document.getElementById("hours").innerText = formatTime(hours);
  document.getElementById("minutes").innerText = formatTime(minutes);
  document.getElementById("seconds").innerText = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Call once to set initial values
