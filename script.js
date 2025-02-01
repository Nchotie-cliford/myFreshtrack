// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animation for feature cards
const featureCards = document.querySelectorAll(".feature-card");
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

featureCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.6s ease";
  featureObserver.observe(card);
});

// Pricing card hover effect
document.querySelectorAll(".price-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    if (!card.classList.contains("popular")) {
      card.style.transform = "translateY(-10px)";
    }
  });

  card.addEventListener("mouseleave", () => {
    if (!card.classList.contains("popular")) {
      card.style.transform = "translateY(0)";
    }
  });
});

// Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  if (validateContactForm(formData)) {
    showFormMessage("success", "Message sent successfully!");
    this.reset();
  } else {
    showFormMessage("error", "Please fill all required fields");
  }
});

function validateContactForm(formData) {
  return (
    formData.get("name") && formData.get("email") && formData.get("message")
  );
}

// Form Message Display
function showFormMessage(type, message) {
  const form = document.getElementById("contactForm");
  const existingMessage = form.querySelector(".form-message");
  if (existingMessage) existingMessage.remove();

  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  form.insertBefore(messageDiv, form.firstChild);

  setTimeout(() => {
    messageDiv.style.opacity = "1";
  }, 10);
}

// Newsletter Subscription
document
  .querySelector(".newsletter .cta-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.querySelector(".newsletter input").value;

    if (validateEmail(email)) {
      showNewsletterMessage("success", "Thanks for subscribing!");
      document.querySelector(".newsletter input").value = "";
    } else {
      showNewsletterMessage("error", "Please enter a valid email");
    }
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showNewsletterMessage(type, message) {
  const newsletter = document.querySelector(".newsletter");
  const existingMsg = newsletter.querySelector(".form-message");
  if (existingMsg) existingMsg.remove();

  const msgDiv = document.createElement("div");
  msgDiv.className = `form-message ${type}`;
  msgDiv.textContent = message;

  newsletter.appendChild(msgDiv);

  setTimeout(() => {
    msgDiv.style.opacity = "1";
  }, 10);
}

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  if (localStorage.getItem("cookieConsent") === "accepted") {
    banner.style.display = "none";
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
  });

  rejectBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "rejected");
    banner.style.display = "none";
  });
});

// Language switching functionality
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    document
      .querySelectorAll(".lang-btn")
      .forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    this.classList.add("active");

    // Get selected language
    const lang = this.dataset.lang;

    // Implement your language change logic here
    console.log("Switching to language:", lang);
    // You would typically load translations or redirect to language-specific page
  });
});
