document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("toggle-password");

    // Simulated Users (For Testing)
    const users = [
        { username: "admin@gmail.com", password: "admin123", role: "admin" },
        { username: "user@gmail.com", password: "user123", role: "user" }
    ];

    // Toggle Password Visibility
    togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        togglePassword.innerHTML = passwordInput.type === "password" 
            ? '<i class="fas fa-eye"></i>' 
            : '<i class="fas fa-eye-slash"></i>';
    });

    // Login Form Submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value.trim();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            loginMessage.style.color = "green";
            loginMessage.textContent = "✅ Login Successful! Redirecting...";

            // Store user session in localStorage
            localStorage.setItem("user", JSON.stringify(user));

            setTimeout(() => {
                window.location.href = user.role === "admin" ? "admin-dashboard.html" : "customer-dashboard.html";
            }, 1500);
        } else {
            loginMessage.style.color = "red";
            loginMessage.textContent = "❌ Invalid username or password!";
        }
    });

    // Inspirational Quotes
    const quotes = [
        "Nature is not a place to visit. It is home. 🍃",
        "Plants give us oxygen for the lungs and the soul. 🌿",
        "The greatest wealth is health. 🌱",
        "Each plant is a lesson in patience and care. 🌷"
    ];

    document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
});
