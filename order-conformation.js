document.addEventListener("DOMContentLoaded", function () {
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");

    // Retrieve order details from sessionStorage (if available)
    const order = JSON.parse(sessionStorage.getItem("order")) || { items: 0, amount: 0 };

    totalItems.textContent = order.items;
    totalPrice.textContent = `₹${order.amount.toFixed(2)}`;

    // Clear the cart after order confirmation
    localStorage.removeItem("cart");
    sessionStorage.removeItem("order");

    // 🎉 Confetti Effect
    launchConfetti();
});

// 🎉 Confetti Animation
function launchConfetti() {
    const confettiCanvas = document.getElementById("confetti");
    const confettiCtx = confettiCanvas.getContext("2d");

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettiPieces = [];
    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 8 + 2,
            speedY: Math.random() * 3 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function drawConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiPieces.forEach((p) => {
            confettiCtx.fillStyle = p.color;
            confettiCtx.beginPath();
            confettiCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            confettiCtx.fill();
            p.y += p.speedY;
            if (p.y > confettiCanvas.height) p.y = 0;
        });
        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}
