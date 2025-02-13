document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", email: "guest@example.com" };
    
    document.getElementById("customer-name").textContent = user.name;
    document.getElementById("profile-name").textContent = user.name;
    document.getElementById("profile-email").textContent = user.email;

    // Fetch order history
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderList = document.getElementById("order-history");
    orderList.innerHTML = orders.length
        ? orders.map(order => `<li class="list-group-item">📦 ${order.name} - ₹${order.price}</li>`).join("")
        : "<li class='list-group-item'>No orders found.</li>";

    // Fetch cart items
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-items").innerHTML = cart.length
        ? cart.map(item => `<li class="list-group-item">🛍️ ${item.name} - ₹${item.price}</li>`).join("")
        : "<li class='list-group-item'>Your cart is empty.</li>";

    // Fetch wishlist items
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById("wishlist-items").innerHTML = wishlist.length
        ? wishlist.map(item => `<li class="list-group-item">❤️ ${item.name} - ₹${item.price}</li>`).join("")
        : "<li class='list-group-item'>No items in wishlist.</li>";

    // Logout
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("user");
        window.location.href = "login.html";
    });
});
