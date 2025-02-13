document.addEventListener("DOMContentLoaded", function () {
    const payBtn = document.getElementById("pay-btn");
    const paymentOptions = document.querySelectorAll(".payment-option");
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");

    // Load Cart Data
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    totalItems.textContent = cart.length;
    totalPrice.textContent = `₹${totalAmount.toFixed(2)}`;

    // Highlight Selected Payment Method
    paymentOptions.forEach(option => {
        option.addEventListener("click", () => {
            paymentOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            option.querySelector("input").checked = true;
        });
    });

    // Payment Process
    payBtn.addEventListener("click", function () {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

        if (selectedPayment === "razorpay") {
            initiateRazorpayPayment();
        } else {
            alert("✅ Cash on Delivery Selected! Your order has been placed.");
            localStorage.removeItem("cart"); // Clear cart after order
            window.location.href = "order-confirmation.html";
        }
    });

    // Razorpay Payment
    function initiateRazorpayPayment() {
        fetch("http://localhost:5000/create-order", { method: "POST" }) 
            .then(response => response.json())
            .then(order => {
                const options = {
                    key: "rzp_test_CxLeUawnYIkCno",
                    amount: order.amount,
                    currency: "INR",
                    name: "Virtual Herbal Garden",
                    description: "Payment for Herbs",
                    order_id: order.id,
                    handler: function (response) {
                        alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
                        localStorage.removeItem("cart");
                        window.location.href = "order-confirmation.html";
                    },
                    prefill: {
                        name: "Gagan",
                        email: "gagan@example.com",
                        contact: "9999999999",
                    },
                    theme: { color: "#0a870a" },
                };

                const rzp = new Razorpay(options);
                rzp.open();
            })
            .catch(error => {
                alert("❌ Payment Failed! Please try again.");
                console.error("Payment Error:", error);
            });
    }
});
