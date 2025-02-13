document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const registerMessage = document.getElementById("register-message");
    const passwordInput = document.getElementById("reg-password");
    const togglePassword = document.getElementById("toggle-reg-password");

    // Toggle Password Visibility
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = "password";
            togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });

    // Form Submission
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const username = document.getElementById("reg-username").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = passwordInput.value.trim();

        if (username.length < 3) {
            registerMessage.style.color = "red";
            registerMessage.textContent = "❌ Username must be at least 3 characters!";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            registerMessage.style.color = "red";
            registerMessage.textContent = "❌ Please enter a valid email!";
            return;
        }

        if (password.length < 6) {
            registerMessage.style.color = "red";
            registerMessage.textContent = "❌ Password must be at least 6 characters!";
            return;
        }

        registerMessage.style.color = "green";
        registerMessage.textContent = "✅ Registration Successful! Redirecting...";
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });

    // Inspirational Quotes
    const quotes = [
        "A single seed can start a forest. 🌱",
        "Herbs heal both body and soul. 🌿",
        "Plant your dreams and let them grow. 🌷",
        "In every drop of water, there is a story of life. 💧"
    ];

    document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
});
