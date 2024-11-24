let sliceCount = 0;
let chefs = 0;
let ovens = 0;
const baseMilestone = 100;
let currentMilestone = baseMilestone;

// DOM elements
const pizza = document.getElementById("pizza");
const sliceCounter = document.getElementById("slice-count");
const buyChef = document.getElementById("buy-chef");
const buyOven = document.getElementById("buy-oven");
const chefCountDisplay = document.getElementById("chef-count");
const ovenCountDisplay = document.getElementById("oven-count");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const clickSound = document.getElementById("click-sound");
const dingSound = document.getElementById("ding-sound");

// Add slices on click and show pizza emoji
pizza.addEventListener("click", () => {
  sliceCount++;
  playSound(clickSound);
  showAnimation("🍕", true); // Show pizza emoji near the pizza
  updateDisplay();
});

// Hire a chef
buyChef.addEventListener("click", () => {
  if (sliceCount >= 10) {
    sliceCount -= 10;
    chefs++;
    playSound(dingSound);
    showAnimation("👨‍🍳");
    updateDisplay();
  }
});

// Buy an oven
buyOven.addEventListener("click", () => {
  if (sliceCount >= 50) {
    sliceCount -= 50;
    ovens++;
    playSound(dingSound);
    showAnimation("🔥");
    updateDisplay();
  }
});

// Generate slices passively
setInterval(() => {
  sliceCount += chefs; // Each chef generates 1 slice per second
  sliceCount += ovens * 5; // Each oven generates 5 slices per second
  updateDisplay();
}, 1000);

// Update the display and progress bar
function updateDisplay() {
  sliceCounter.textContent = `${sliceCount} slices`;
  buyChef.disabled = sliceCount < 10;
  buyOven.disabled = sliceCount < 50;
  chefCountDisplay.textContent = `Chefs: ${chefs}`;
  ovenCountDisplay.textContent = `Ovens: ${ovens}`;
  updateProgressBar();
}

// Progress Bar with difficulty scaling
function updateProgressBar() {
  // Adjust the milestone difficulty based on the number of chefs and ovens
  currentMilestone = baseMilestone + (chefs + ovens) * 50; // More chefs and ovens = more difficult

  // Calculate progress
  const progress = Math.min((sliceCount / currentMilestone) * 100, 100);
  progressBar.style.width = `${progress}%`;

  // Check if progress bar is complete
  if (progress === 100) {
    displayMilestoneMessage();
  }
}

// Display message when milestone is reached
function displayMilestoneMessage() {
  const message = document.createElement("div");
  message.textContent = "Congratulations! You've reached a milestone!";
  message.style.position = "absolute";
  message.style.top = "50%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.fontSize = "2em";
  message.style.color = "#fff";
  message.style.backgroundColor = "#e74c3c";
  message.style.padding = "20px";
  message.style.borderRadius = "10px";
  message.style.boxShadow = "0 0 10px #000";
  message.style.opacity = 0;
  document.body.appendChild(message);

  // Fade in the message
  setTimeout(() => {
    message.style.opacity = 1;
  }, 100);

  // Reset progress bar after the message
  setTimeout(() => {
    message.style.opacity = 0;
    progressBar.style.width = "0%"; // Reset progress bar
    sliceCount = 0; // Reset slice count
    updateDisplay();
    setTimeout(() => message.remove(), 1000); // Remove message after fade out
  }, 2000); // Message stays for 3 seconds
}

// Play sound
function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}

// Show animation for upgrades or pizza clicks
function showAnimation(emoji, nearPizza = false) {
  const animation = document.createElement("div");
  animation.textContent = emoji;
  animation.style.position = "absolute";

  // Position for pizza clicks
  if (nearPizza) {
    const pizzaRect = pizza.getBoundingClientRect();
    animation.style.left = `${Math.random() * pizzaRect.width + pizzaRect.left}px`;
    animation.style.top = `${Math.random() * pizzaRect.height + pizzaRect.top}px`;
  } else {
    // Position for upgrades (anywhere on the screen)
    animation.style.left = `${Math.random() * 80 + 10}%`;
    animation.style.top = `${Math.random() * 80 + 10}%`;
  }

  animation.style.fontSize = "2em";
  animation.style.transition = "opacity 2s ease-in-out, transform 2s ease-in-out";
  animation.style.opacity = 1;
  animation.style.transform = "translateY(-50px)";
  document.body.appendChild(animation);

  setTimeout(() => {
    animation.style.opacity = 0;
    animation.style.transform = "translateY(-150px)";
  }, 0);

  setTimeout(() => animation.remove(), 2000);
}
