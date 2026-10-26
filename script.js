// Clave de acceso
const SECRET_PIN = "1102";
let currentPin = "";

// Referencias del DOM
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const errorMsg = document.getElementById("errorMsg");
const dots = document.querySelectorAll(".dot");
const memoryVideo = document.getElementById("memoryVideo");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

// Crear fondo de corazones
function createHearts() {
  const container = document.getElementById("heartBg");
  const heartIcons = ["fa-heart", "fa-heart"];
  
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("i");
    const isSolid = Math.random() > 0.5;
    heart.className = `${isSolid ? 'fas' : 'far'} fa-heart floating-heart`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.fontSize = `${0.8 + Math.random() * 1}rem`;
    container.appendChild(heart);
  }
}

// Lógica de ingreso del PIN
function pressKey(num) {
  if (currentPin.length < 4) {
    currentPin += num;
    updateDots();
    
    if (currentPin.length === 4) {
      setTimeout(checkPin, 200);
    }
  }
}

function deleteKey() {
  if (currentPin.length > 0) {
    currentPin = currentPin.slice(0, -1);
    updateDots();
  }
}

function clearPin() {
  currentPin = "";
  updateDots();
}

function updateDots() {
  dots.forEach((dot, index) => {
    if (index < currentPin.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}

function checkPin() {
  if (currentPin === SECRET_PIN) {
    // Abrir app
    lockScreen.classList.remove("active");
    lockScreen.classList.add("hidden");
    
    setTimeout(() => {
      mainContent.classList.remove("hidden");
      mainContent.classList.add("active");
      
      // Intentar reproducir video y música suavemente
      if (memoryVideo) {
        memoryVideo.play().catch(() => console.log("Interacción requerida para autostart del video"));
      }
    }, 400);
  } else {
    // Error en el PIN
    const lockCard = document.querySelector(".lock-card");
    lockCard.classList.add("shake");
    errorMsg.classList.add("visible");
    
    setTimeout(() => {
      lockCard.classList.remove("shake");
      clearPin();
    }, 600);

    setTimeout(() => {
      errorMsg.classList.remove("visible");
    }, 2500);
  }
}

// Control de Música de fondo
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.classList.add("playing");
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("playing");
  }
}

// Inicializar animación al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  createHearts();
});
