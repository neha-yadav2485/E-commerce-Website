let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const wishlistGrid = document.getElementById("wishlist-grid");

function updateWishlistCount() {
  const wishlistCountEl = document.getElementById("wishlist-count");
  if (wishlistCountEl) {
    wishlistCountEl.innerText = wishlist.length;
  }
}

function renderWishlist() {
  if (!wishlistGrid) return;

  wishlistGrid.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistGrid.innerHTML = `
      <div class="empty-wishlist">
        <h2>Your wishlist is empty</h2>
        <p>Save your favorite pieces and they will appear here.</p>
        <a href="index.html">Continue Shopping</a>
      </div>
    `;
    updateWishlistCount();
    return;
  }

  wishlist.forEach((item, index) => {
    wishlistGrid.innerHTML += `
      <div class="wishlist-card">
        <div class="wishlist-img">
          <img src="${item.image}" alt="${item.name}">
          <i class="fa-solid fa-heart remove-wishlist" onclick="removeFromWishlist(${index})"></i>
        </div>

        <h3>${item.name}</h3>
        <p>₹${item.price}</p>

        <div class="wishlist-actions">
          <button class="shop-btn" onclick="goToProductPage('${item.page || "women.html"}')">Shop Now</button>
          <button class="remove-btn" onclick="removeFromWishlist(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  updateWishlistCount();
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

function goToProductPage(page) {
  window.location.href = page;
}

renderWishlist();