// ===== GLOBAL ELEMENTS =====
const sideMenu = document.getElementById("sideMenu");
const menuBtn = document.querySelector(".hamburger");
const body = document.body;

// ===== MENU TOGGLE =====
function menuClick() {
  sideMenu.classList.toggle("active");
  document.addEventListener("click", closeMenuOnOutsideClick);
}

function closeMenuOnOutsideClick(e) {
  if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    sideMenu.classList.remove("active");
    document.removeEventListener("click", closeMenuOnOutsideClick);
  }
}

// ===== CART / WISHLIST =====
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.innerText = cart.length;
}
updateCartCount();

function updateWishlistCount() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistCountEl = document.getElementById("wishlist-count");
  if (wishlistCountEl) {
    wishlistCountEl.innerText = wishlist.length;
  }
}
updateWishlistCount();

// ===== SMOOTH SCROLL NAVIGATION =====
function goHome() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  sideMenu.classList.remove("active");
}

function goTo(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
  sideMenu.classList.remove("active");
}

function forHer() {
  window.location.href = "holiday-her.html";
}

function forHim() {
  window.location.href = "holiday-him.html";
}

function goToCategory(category) {
  if (category === "Women") {
    window.location.href = "women.html";
  } else if (category === "Men") {
    window.location.href = "men.html";
  } else if (category === "Unisex") {
    window.location.href = "unisex.html";
  }
}

// ===== MODAL FUNCTIONS =====
function openSkinToneModal() {
  const modal = document.getElementById("skinToneModal");
  if (modal) {
    modal.classList.add("active");
    body.style.overflow = "hidden";
  }
}

function openStyleGuide() {
  const modal = document.getElementById("styleGuideModal");
  if (modal) {
    modal.classList.add("active");
    body.style.overflow = "hidden";
  }
}

function openModal(modalType) {
  const modalContent = {
    shipping: `
      <h2>Shipping & Returns</h2>
      <p><strong>Free Shipping:</strong> On all orders over ₹499</p>
      <p><strong>Delivery Time:</strong> 3-7 business days</p>
      <p><strong>Returns:</strong> 15-day return policy</p>
    `,
    "size-guide": `
      <h2>Size Guide</h2>
      <p>Check our detailed size chart to find your perfect fit.</p>
      <p>We recommend measuring yourself and comparing with our chart.</p>
    `,
    privacy: `
      <h2>Privacy Policy</h2>
      <p>We respect your privacy and protect your personal information.</p>
      <p>Your data is secure with us.</p>
    `
  };

  const oldModal = document.querySelector(".dynamic-modal");
  if (oldModal) oldModal.remove();

  const modal = document.createElement("div");
  modal.className = "modal active dynamic-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-close">&times;</div>
      ${modalContent[modalType] || "<h2>Information</h2><p>Content coming soon.</p>"}
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  const closeBtn = modal.querySelector(".modal-close");

  closeBtn.addEventListener("click", function () {
    modal.remove();
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = "auto";
    }
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    body.style.overflow = "auto";
  }
}

// ===== ACTION FUNCTIONS =====
function searchClick() {
  const box = document.getElementById("searchBox");
  box.style.display = "inline-block";
  box.focus();
}

function searchRedirect(event) {
  if (event.key === "Enter") {
    let value = document.getElementById("searchBox").value.toLowerCase().trim();

    if (value === "women") {
      window.location.href = "women.html";
    } else if (value === "men") {
      window.location.href = "men.html";
    } else if (value === "unisex") {
      window.location.href = "unisex.html";
    } else {
      alert("No results found for: " + value);
    }
  }
}

function profileClick() {
  window.location.href = "login-signup.html";
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function cartClick() {
  window.location.href = "cart.html";
}

function callUs() {
  alert("Phone: +1 (555) 123-4567");
}

function wishlistClick() {
  window.location.href = "wishlist.html";
}

function openSkinToneModalFromMenu() {
  sideMenu.classList.remove("active");
  openSkinToneModal();
}

function contactUs() {
  const email = "style@unifyd.com";
  const phone = "+1 (555) 123-4567";
  alert(`Contact UNIFYD\n\nEmail: ${email}\nPhone: ${phone}\n\nWe'd love to hear from you!`);
}

// ===== CLOSE MODAL ON OUTSIDE CLICK =====
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
    if (e.target.classList.contains("dynamic-modal")) {
      e.target.remove();
    }
    body.style.overflow = "auto";
  }
});

// ===== STICKY NAV ON SCROLL =====
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);
window.addEventListener("load", handleNavbarScroll);

// ===== INITIAL LOAD ANIMATION =====
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach(modal => {
      modal.classList.remove("active");
      if (modal.classList.contains("dynamic-modal")) {
        modal.remove();
      }
    });
    body.style.overflow = "auto";
    sideMenu.classList.remove("active");
  }

  if (e.ctrlKey && e.key === "/") {
    searchClick();
  }
});

function goToCollection() {
  const section = document.getElementById("collections");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}