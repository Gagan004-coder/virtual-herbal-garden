document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("proceed-payment").addEventListener("click", function () {
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        if (paymentMethod === "razorpay") {
            initiateRazorpayPayment();
        } else {
            alert("Cash on Delivery Selected. Your order has been placed.");
            window.location.href = "order-confirmation.html";
        }
    });

    function initiateRazorpayPayment() {
        fetch("http://localhost:5000/create-order", { method: "POST" }) // Make sure this is correct
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
                        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
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
                alert("Oops! Something went wrong. Payment Failed");
                console.error("Payment Error:", error);
            });
    }
});
