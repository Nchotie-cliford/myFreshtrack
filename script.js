// --- Translation Handling ---

// Global object to store loaded translations
let translationsData = {};

// Helper: get nested value by key path (e.g., "hero.title")
function getNestedValue(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => (acc ? acc[key] : null), obj);
}

// Apply translations from the given language
function applyTranslations(lang) {
  if (!translationsData[lang]) {
    console.error("No translations found for", lang);
    return;
  }
  // Find every element with a data-i18n attribute and update its text
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translatedText = getNestedValue(translationsData[lang], key);
    if (translatedText) {
      el.textContent = translatedText;
    }
  });
}

// Load the translations from lang.json on page load
fetch("lang.json")
  .then((response) => response.json())
  .then((data) => {
    translationsData = data;
    // Apply default language (assumes the active lang-btn has the default language code)
    const defaultLang =
      document.querySelector(".lang-btn.active")?.dataset.lang || "en";
    applyTranslations(defaultLang);
  })
  .catch((err) => console.error("Error loading translations:", err));

// --- Smooth Scroll for Navigation ---
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

// --- DOMContentLoaded: Other Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  // Cookie Banner
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  // Check if the user already made a choice and hide the banner if so
  if (document.cookie.indexOf("cookies_accepted") !== -1) {
    cookieBanner.style.display = "none";
  }

  acceptBtn.addEventListener("click", () => {
    // Set a cookie that lasts one year (365 days)
    document.cookie =
      "cookies_accepted=true; path=/; max-age=" + 60 * 60 * 24 * 365;
    cookieBanner.style.display = "none";
  });

  rejectBtn.addEventListener("click", () => {
    document.cookie =
      "cookies_accepted=false; path=/; max-age=" + 60 * 60 * 24 * 365;
    cookieBanner.style.display = "none";
  });

  // --- Language Switching Functionality ---
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      document
        .querySelectorAll(".lang-btn")
        .forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get selected language from data attribute
      const lang = this.dataset.lang;
      applyTranslations(lang);
    });
  });

  // --- Animation for Feature Cards ---
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

  // --- Pricing Card Hover Effect ---
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

  // --- Contact Form Handling ---
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
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

  // --- Newsletter Subscription ---
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
});
