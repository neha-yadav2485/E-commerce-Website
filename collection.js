// ===== SIZE SELECTION =====
document.querySelectorAll(".size-selector").forEach(selector => {
  const sizeButtons = selector.querySelectorAll(".size-btn");

  sizeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      sizeButtons.forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
});

// ===== FILTER PRODUCTS =====
function filterProducts() {
  const categoryValue = document.getElementById("categoryFilter").value;
  const priceValue = document.getElementById("priceFilter").value;
  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const category = product.getAttribute("data-category");
    const price = parseInt(product.getAttribute("data-price"), 10);

    const categoryMatch = categoryValue === "all" || category === categoryValue;

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

    product.style.display = (categoryMatch && priceMatch) ? "" : "none";
  });
}

// ===== WISHLIST =====
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(icon, name, price, image, page) {
  const existingIndex = wishlist.findIndex(item => item.name === name);

  if (existingIndex !== -1) {
    wishlist.splice(existingIndex, 1);
    icon.classList.remove("fa-solid", "active");
    icon.classList.add("fa-regular");
  } else {
    wishlist.push({ name, price, image, page });
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid", "active");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// ===== SIZE CHART MODAL =====
function openSizeChart(button) {
  const card = button.closest(".product-card");
  const chartImage = card.getAttribute("data-sizechart");
  const modal = document.getElementById("sizeChartModal");
  const modalImage = document.getElementById("sizeChartImage");

  modalImage.src = chartImage;
  modal.classList.add("active");
}

function closeSizeChart() {
  document.getElementById("sizeChartModal").classList.remove("active");
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("sizeChartModal");
  if (e.target === modal) {
    closeSizeChart();
  }
});

// ===== ON PAGE LOAD =====
window.addEventListener("DOMContentLoaded", () => {
  // filter dropdowns
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");

  if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
  if (priceFilter) priceFilter.addEventListener("change", filterProducts);

  // wishlist active state + click working
  const icons = document.querySelectorAll(".wishlist");

  icons.forEach(icon => {
    const card = icon.closest(".product-card");
    const name = card.getAttribute("data-name");
    const priceText = card.querySelector("p").innerText.replace("₹", "").trim();
    const price = parseInt(priceText, 10);
    const image = card.querySelector("img").getAttribute("src");
    const page = window.location.pathname.split("/").pop();

    const found = wishlist.find(item => item.name === name);
    if (found) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "active");
    }

    icon.addEventListener("click", function () {
      toggleWishlist(this, name, price, image, page);
    });
  });

  // apply filters once on load
  filterProducts();
});