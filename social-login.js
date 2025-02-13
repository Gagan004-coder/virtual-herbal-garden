document.addEventListener("DOMContentLoaded", () => {
    const googleLoginBtn = document.getElementById("google-login-btn");
    const facebookLoginBtn = document.getElementById("facebook-login-btn");

    // Google Login
    googleLoginBtn.addEventListener("click", () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log("Google User:", result.user);
                alert("✅ Google Login Successful!");
                window.location.href = "dashboard.html"; // Redirect to Dashboard
            })
            .catch((error) => {
                console.error("Google Login Error:", error);
                alert("❌ Google Login Failed!");
            });
    });

    // Facebook Login
    facebookLoginBtn.addEventListener("click", () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log("Facebook User:", result.user);
                alert("✅ Facebook Login Successful!");
                window.location.href = "dashboard.html"; // Redirect to Dashboard
            })
            .catch((error) => {
                console.error("Facebook Login Error:", error);
                alert("❌ Facebook Login Failed!");
            });
    });
});
