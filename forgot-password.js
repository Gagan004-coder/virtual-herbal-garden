// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("send-otp-btn").addEventListener("click", sendOTP);
document.getElementById("forgot-password-form").addEventListener("submit", verifyOTP);

// Function to send OTP
function sendOTP() {
    let email = document.getElementById("forgot-email").value;
    if (!email) {
        document.getElementById("forgot-message").innerText = "⚠️ Please enter a valid email.";
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            document.getElementById("forgot-message").innerText = "✅ OTP sent to your email. Check your inbox!";
            document.getElementById("otp-section").style.display = "block";
            startOTPTimer();
        })
        .catch((error) => {
            document.getElementById("forgot-message").innerText = "❌ Error: " + error.message;
        });
}

// OTP Timer Countdown
function startOTPTimer() {
    let timeLeft = 30;
    let timer = setInterval(() => {
        document.getElementById("countdown").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("forgot-message").innerText = "⚠️ OTP expired! Request a new one.";
            document.getElementById("otp-section").style.display = "none";
        }
        timeLeft--;
    }, 1000);
}

// Function to verify OTP and reset password
function verifyOTP(event) {
    event.preventDefault();
    let otp = document.getElementById("otp-input").value;

    if (!otp) {
        document.getElementById("forgot-message").innerText = "⚠️ Please enter the OTP.";
        return;
    }

    auth.confirmPasswordReset(otp)
        .then(() => {
            document.getElementById("forgot-message").innerText = "✅ Password reset successful! Redirecting to login...";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        })
        .catch((error) => {
            document.getElementById("forgot-message").innerText = "❌ Invalid OTP. Please try again.";
        });
}
