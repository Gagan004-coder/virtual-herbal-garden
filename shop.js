document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    function updateCartUI() {
        const cartItems = document.getElementById("cart-items");
        if (!cartItems) return; // Prevent error on non-cart pages

        cartItems.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="update-qty" data-index="${index}"></td>
                <td><button class="btn btn-danger remove-item" data-index="${index}">❌ Remove</button></td>
            `;
            totalPrice += item.price * item.quantity;
            cartItems.appendChild(row);
        });

        document.getElementById("total-price").textContent = `₹${totalPrice.toFixed(2)}`;
    }

    function updateWishlistUI() {
        const wishlistTable = document.getElementById("wishlist-items");
        if (!wishlistTable) return;

        wishlistTable.innerHTML = "";
        if (wishlist.length === 0) {
            wishlistTable.innerHTML = `<tr><td colspan="3" class="text-center">No items in wishlist.</td></tr>`;
            return;
        }

        wishlist.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-success add-to-cart" data-index="${index}">🛒 Add to Cart</button>
                    <button class="btn btn-danger remove-item" data-index="${index}">❌ Remove</button>
                </td>
            `;
            wishlistTable.appendChild(row);
        });
    }

    // 🛍️ ADD TO CART FUNCTION
    document.getElementById("shop-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            const name = e.target.getAttribute("data-name");
            const price = parseFloat(e.target.getAttribute("data-price"));
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("🛒 Added to Cart!");
            updateCartUI();
        }
    });

    // ❤️ ADD TO WISHLIST FUNCTION
    document.getElementById("shop-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-wishlist")) {
            const name = e.target.getAttribute("data-name");
            const price = parseFloat(e.target.getAttribute("data-price"));

            if (!wishlist.some(item => item.name === name)) {
                wishlist.push({ name, price });
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                alert("❤️ Added to Wishlist!");
                updateWishlistUI();
            } else {
                alert("❤️ Already in Wishlist!");
            }
        }
    });

    // 🛒 REMOVE ITEM FROM CART
    document.getElementById("cart-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    });

    // ❤️ REMOVE ITEM FROM WISHLIST
    document.getElementById("wishlist-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            wishlist.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistUI();
        }
    });

    // ✅ MOVE FROM WISHLIST TO CART
    document.getElementById("wishlist-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            const index = e.target.getAttribute("data-index");
            const item = wishlist[index];

            let cartItem = cart.find(cartItem => cartItem.name === item.name);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...item, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            wishlist.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            alert("Moved to Cart! 🛒");
            updateCartUI();
            updateWishlistUI();
        }
    });

    // 🔄 UPDATE CART QUANTITY
    document.getElementById("cart-items").addEventListener("input", function (e) {
        if (e.target.classList.contains("update-qty")) {
            const index = e.target.getAttribute("data-index");
            cart[index].quantity = parseInt(e.target.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    });

    updateCartUI();
    updateWishlistUI();
});
