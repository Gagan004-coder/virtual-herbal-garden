document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");
    const totalPriceElement = document.getElementById("total-price");

    function updateCartUI() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = `<tr><td colspan="4" class="text-center">🛒 Your cart is empty.</td></tr>`;
            totalPriceElement.textContent = "₹0.00";
            cartSummary.innerHTML = "";
            return;
        }

        cart.forEach((item, index) => {
            let name = item.name && item.name.trim() !== "" ? item.name : "Unknown Item";
            let price = (!isNaN(item.price) && item.price !== undefined) ? parseFloat(item.price) : 0;
            let quantity = (!isNaN(item.quantity) && item.quantity > 0) ? item.quantity : 1;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${name}</td>
                <td>₹${price.toFixed(2)}</td>
                <td><input type="number" value="${quantity}" min="1" class="update-qty" data-index="${index}"></td>
                <td><button class="btn btn-danger remove-item" data-index="${index}">🗑️ Remove</button></td>
            `;
            cartItems.appendChild(row);

            totalPrice += price * quantity;
        });

        totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;

        cartSummary.innerHTML = `
            <h3>Total: ₹${totalPrice.toFixed(2)}</h3>
            <button class="btn btn-primary" id="modify-payment-btn">💳 Modify Payment</button>
            <a href="checkout.html" class="btn btn-success">Proceed to Checkout</a>
        `;

        document.getElementById("modify-payment-btn").addEventListener("click", function () {
            window.location.href = "checkout.html#modify-payment";
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ✅ REMOVE ITEM FROM CART
    cartItems.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartUI();
        }
    });

    // ✅ UPDATE QUANTITY IN CART
    cartItems.addEventListener("input", function (e) {
        if (e.target.classList.contains("update-qty")) {
            const index = e.target.getAttribute("data-index");
            const newQuantity = parseInt(e.target.value);

            if (!isNaN(newQuantity) && newQuantity > 0) {
                cart[index].quantity = newQuantity;
            } else {
                cart[index].quantity = 1;
                e.target.value = 1; // Reset to 1 if invalid
            }

            updateCartUI();
        }
    });

    updateCartUI();
});
