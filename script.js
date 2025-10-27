// Función para manejar el menú móvil
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.add("hidden");
}

// Agregar evento a los enlaces del menú móvil para cerrar el menú al hacer clic
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Función para cambiar el estilo del navbar al hacer scroll
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
}

// Agregar evento de scroll para el navbar
window.addEventListener("scroll", handleNavbarScroll);

// Función para mostrar/ocultar el botón de volver arriba
function handleBackToTopButton() {
  const backToTopButton = document.getElementById("back-to-top");
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible");
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.remove("visible");
    backToTopButton.classList.add("hidden");
  }
}

// Agregar evento de scroll para el botón de volver arriba
window.addEventListener("scroll", handleBackToTopButton);

// Función para manejar el botón de volver arriba
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Función para manejar los tabs de habilidades
function openTab(evt, tabName) {
  // Ocultar todos los contenidos de tabs
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.add("hidden");
  }

  // Remover la clase active de todos los botones
  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // Mostrar el contenido del tab actual y marcar el botón como activo
  document.getElementById(tabName).classList.remove("hidden");
  evt.currentTarget.classList.add("active");
  
  // Animar el cambio de títulos con fade si son tabs de habilidades
  if (tabName === 'technical' || tabName === 'soft') {
    const techTitle = document.getElementById('tech-title');
    const softTitle = document.getElementById('soft-title');
    
    if (techTitle && softTitle) {
      if (tabName === 'technical') {
        // Fade out del título soft, fade in del título tech
        softTitle.style.opacity = '0';
        setTimeout(() => {
          softTitle.classList.add('hidden');
          techTitle.classList.remove('hidden');
          techTitle.style.opacity = '0';
          setTimeout(() => {
            techTitle.style.opacity = '1';
          }, 50);
        }, 500);
      } else {
        // Fade out del título tech, fade in del título soft
        techTitle.style.opacity = '0';
        setTimeout(() => {
          techTitle.classList.add('hidden');
          softTitle.classList.remove('hidden');
          softTitle.style.opacity = '0';
          setTimeout(() => {
            softTitle.style.opacity = '1';
          }, 50);
        }, 500);
      }
    }
  }
}

// Asignar la función openTab al objeto window para que sea accesible desde HTML
window.openTab = openTab;

// Función para animar elementos cuando son visibles en la pantalla
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-item");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add("animate");
    }
  });
}

// Agregar evento de scroll para las animaciones
window.addEventListener("scroll", animateOnScroll);
// Ejecutar una vez al cargar la página
window.addEventListener("load", animateOnScroll);

// Función para mover el logo según la posición del mouse
document.addEventListener("mousemove", function(e) {
  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    
    logoContainer.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    logoContainer.style.transition = "transform 0.2s ease-out";
  }
});

// Función para animar las barras de progreso de habilidades
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  
  skillBars.forEach((bar) => {
    const percentage = bar.getAttribute("data-percentage");
    bar.style.width = "0%";
    
    setTimeout(() => {
      bar.style.width = percentage + "%";
    }, 300);
  });
}

// Función para inicializar las animaciones de las barras de habilidades cuando el tab técnico está activo
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function() {
    const onclickAttr = this.getAttribute("onclick");
    if (onclickAttr && onclickAttr.includes("technical")) {
      setTimeout(animateSkillBars, 100);
    }
  });
});

// Inicializar las barras de habilidades si el tab técnico está activo por defecto
document.addEventListener("DOMContentLoaded", function() {
  const technicalTab = document.getElementById("technical");
  if (technicalTab && !technicalTab.classList.contains("hidden")) {
    setTimeout(animateSkillBars, 500);
  }
});

// Función para animar los contadores
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // duración en milisegundos
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Función para verificar si un elemento está en el viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Función para animar elementos cuando son visibles
function handleVisibleElements() {
  // Animar elementos con clases img-anim y text-anim
  document.querySelectorAll(".img-anim, .text-anim").forEach((el) => {
    if (isInViewport(el) && !el.classList.contains("visible")) {
      el.classList.add("visible");
    }
  });
  
  // Animar contadores cuando son visibles
  const statsSection = document.querySelector(".stats-section");
  if (statsSection && isInViewport(statsSection) && !statsSection.classList.contains("counted")) {
    statsSection.classList.add("counted");
    animateCounters();
  }
}

// Agregar eventos para manejar elementos visibles
window.addEventListener("scroll", handleVisibleElements);
window.addEventListener("resize", handleVisibleElements);
window.addEventListener("load", handleVisibleElements);

// Función para crear partículas en el fondo
function createParticles() {
  const particlesContainer = document.querySelector(".particles-container");
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    // Tamaño aleatorio
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posición aleatoria
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Opacidad aleatoria
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Animación aleatoria
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
    
    particlesContainer.appendChild(particle);
  }
}

// Crear partículas al cargar la página
window.addEventListener("load", createParticles);

// Función para validar el formulario de contacto
function validateContactForm(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  
  let isValid = true;
  
  // Validar nombre
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Please enter your name");
    isValid = false;
  } else {
    removeError(nameInput);
  }
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address");
    isValid = false;
  } else {
    removeError(emailInput);
  }
  
  // Validar asunto
  if (subjectInput.value.trim() === "") {
    showError(subjectInput, "Please enter a subject");
    isValid = false;
  } else {
    removeError(subjectInput);
  }
  
  // Validar mensaje
  if (messageInput.value.trim() === "") {
    showError(messageInput, "Please enter your message");
    isValid = false;
  } else {
    removeError(messageInput);
  }
  
  // Si el formulario es válido, enviar
  if (isValid) {
    // Aquí iría el código para enviar el formulario
    alert("Message sent successfully!");
    event.target.reset();
  }
}

// Función para mostrar error en un campo
function showError(input, message) {
  const formControl = input.parentElement;
  const errorElement = formControl.querySelector(".error-message") || document.createElement("div");
  
  errorElement.className = "error-message text-red-500 text-sm mt-1";
  errorElement.innerText = message;
  
  if (!formControl.querySelector(".error-message")) {
    formControl.appendChild(errorElement);
  }
  
  input.classList.add("border-red-500");
}

// Función para remover error de un campo
function removeError(input) {
  const formControl = input.parentElement;
  const errorElement = formControl.querySelector(".error-message");
  
  if (errorElement) {
    formControl.removeChild(errorElement);
  }
  
  input.classList.remove("border-red-500");
}

// Asignar la función de validación al formulario de contacto
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", validateContactForm);
}

// Inicializar AOS (Animate On Scroll)
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });
}

// Inicializar el tab por defecto
document.addEventListener("DOMContentLoaded", function() {
  // Abrir el primer tab por defecto
  const defaultTab = document.querySelector(".tab-btn");
  if (defaultTab) {
    defaultTab.click();
  }
});