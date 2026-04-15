let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("totalPrice");
const subtotalPriceEl = document.getElementById("subtotalPrice");
const totalItemsEl = document.getElementById("totalItems");

// Toast function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.className = "toast show " + type;

  clearTimeout(toast.hideTimeout);
  toast.hideTimeout = setTimeout(() => {
    toast.className = "toast " + type;
  }, 2500);
}

// Update wishlist count
function updateWishlistCount() {
  const wishlistCountEl = document.getElementById("wishlist-count");
  if (wishlistCountEl) {
    wishlistCountEl.innerText = wishlist.length;
  }
}

// Add to wishlist
function addToWishlist(button, name, price, image = "", page = "women.html") {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const card = button.closest(".product-card");

  if (!image && card) {
    const imgEl = card.querySelector("img");
    if (imgEl) {
      image = imgEl.getAttribute("src");
    }
  }

  const alreadyExists = wishlist.some(
    item => item.name === name && item.page === page
  );

  if (alreadyExists) {
    showToast(name + " is already in wishlist!", "error");
    return;
  }

  wishlist.push({
    name: name,
    price: price,
    image: image,
    page: page
  });

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // refresh global wishlist variable
  window.wishlist = wishlist;

  updateWishlistCount();

  button.classList.remove("fa-regular");
  button.classList.add("fa-solid");
  button.style.color = "red";

  showToast(name + " added to wishlist!", "success");
}

// Add to cart with size
function addToCartWithSize(button, name, price) {
  const card = button.closest(".product-card");
  if (!card) return;

  const selectedSize = card.querySelector(".size-btn.selected");

  if (!selectedSize) {
    showToast("Please select a size!", "error");
    return;
  }

  const size = selectedSize.innerText.trim();

  const existingItem = cart.find(
    item => item.name === name && item.size === size
  );

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, size, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(name + " (" + size + ") added to cart!", "success");
}

// Select size buttons
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("size-btn")) {
    const parent = e.target.closest(".size-selector");
    if (!parent) return;

    parent.querySelectorAll(".size-btn").forEach(btn => {
      btn.classList.remove("selected");
    });

    e.target.classList.add("selected");
  }
});

// FILTER PRODUCTS
function filterProducts() {
  const categoryValue = document.getElementById("categoryFilter")?.value || "all";
  const priceValue = document.getElementById("priceFilter")?.value || "all";
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(card => {
    const category = card.getAttribute("data-category");
    const price = parseInt(card.getAttribute("data-price"));

    let categoryMatch = categoryValue === "all" || category === categoryValue;
    let priceMatch = false;

    if (priceValue === "all") {
      priceMatch = true;
    } else if (priceValue === "low") {
      priceMatch = price < 500;
    } else if (priceValue === "mid") {
      priceMatch = price >= 500 && price <= 1000;
    } else if (priceValue === "high") {
      priceMatch = price > 1000;
    }

    if (categoryMatch && priceMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// SIZE CHART MODAL OPEN
function openSizeChart() {
  const modal = document.getElementById("sizeChartModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

// SIZE CHART MODAL CLOSE
function closeSizeChart() {
  const modal = document.getElementById("sizeChartModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Close modal when clicking outside content
window.addEventListener("click", function (e) {
  const modal = document.getElementById("sizeChartModal");
  if (e.target === modal) {
    closeSizeChart();
  }
});

// Show Cart
function showCart() {
  if (!cartContainer || !totalPriceEl || !subtotalPriceEl || !totalItemsEl) return;

  cartContainer.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty 🛍️</h3>
        <p>Looks like you haven’t added anything yet.</p>
        <a href="index.html" class="shop-btn">Continue Shopping</a>
      </div>
    `;
    totalPriceEl.innerText = 0;
    subtotalPriceEl.innerText = 0;
    totalItemsEl.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    totalItems += item.qty;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-size">Size: ${item.size}</div>
        </div>

        <div class="item-price">₹${item.price}</div>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span class="qty-number">${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalPriceEl.innerText = total;
  subtotalPriceEl.innerText = total;
  totalItemsEl.innerText = totalItems;
}

// Change Quantity
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Clear cart
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Load
updateWishlistCount();
showCart();
filterProducts();