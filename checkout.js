function makePayment() {
  const loader = document.getElementById("loader");
  const success = document.getElementById("success");
  const toast = document.getElementById("toast");

  loader.style.display = "block";

  setTimeout(() => {
    loader.style.display = "none";
    success.style.display = "block";

    // Show toast
    toast.classList.add("show");

    const orderId = "ORD" + Math.floor(Math.random() * 1000000);
        localStorage.setItem("orderId", orderId);
        localStorage.setItem("orderDate", new Date().toLocaleString());

        toast.classList.add("show");

    setTimeout(() => {
      window.location.href = "./order_success.html";
    }, 2000);

  }, 2000); // fake processing time
}