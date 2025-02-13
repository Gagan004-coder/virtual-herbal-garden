const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors"); // CORS Middleware

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

const razorpay = new Razorpay({
    key_id: "rzp_test_CxLeUawnYIkCno", // Your Razorpay Test Key
    key_secret: "4kiAu2tfcsHlZAj9DgP3McpV", // Replace with your Secret Key
});

app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: 50000, // ₹500 (in paisa)
            currency: "INR",
            receipt: "order_rcptid_" + new Date().getTime(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(500).json({ error: "Payment failed" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
