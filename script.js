document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.length;
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            cart.push({ name, price, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    document.querySelectorAll(".add-to-wishlist").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.parentNode.querySelector("h3").textContent;
            wishlist.push(name);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert(name + " added to Wishlist ❤️");
        });
    });

    updateCartCount();
});
