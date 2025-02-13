document.getElementById("google-login").addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("Google Login Success", result.user);
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => console.error("Google Login Error:", error));
});

document.getElementById("facebook-login").addEventListener("click", () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("Facebook Login Success", result.user);
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => console.error("Facebook Login Error:", error));
});
