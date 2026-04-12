document.getElementById("orderId").textContent =
    localStorage.getItem("orderId") || "ORD000000";

document.getElementById("orderDate").textContent =
    localStorage.getItem("orderDate") || new Date().toLocaleString();