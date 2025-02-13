document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistTable = document.getElementById("wishlist-items");

    function updateWishlistUI() {
        wishlistTable.innerHTML = "";
        if (wishlist.length === 0) {
            wishlistTable.innerHTML = `<tr><td colspan="3" class="text-center">No items in wishlist.</td></tr>`;
            return;
        }

        wishlist.forEach((item, index) => {
            let name = item.name && item.name.trim() !== "" ? item.name : "Unknown Plant";
            let price = (!isNaN(item.price) && item.price !== undefined) ? item.price : 0;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${name}</td>
                <td>₹${parseFloat(price).toFixed(2)}</td>
                <td>
                    <button class="btn btn-success add-to-cart" data-index="${index}">🛒 Add to Cart</button>
                    <button class="btn btn-danger remove-item" data-index="${index}">❌ Remove</button>
                </td>
            `;
            wishlistTable.appendChild(row);
        });

        console.log("Updated Wishlist:", wishlist); // Debugging
    }

    // ✅ REMOVE ITEM FROM WISHLIST
    wishlistTable.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            wishlist.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistUI();
        }
    });

    // ✅ MOVE FROM WISHLIST TO CART
    wishlistTable.addEventListener("click", function (e) {
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
            updateWishlistUI();
        }
    });

    // ✅ Call function to update UI on page load
    updateWishlistUI();
});
