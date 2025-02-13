// Import Firebase modules (if using ES6 modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyd2dS8hSrVDU4Q-iTxLnLBnhXTBHHM60",
    authDomain: "virtual-herbal-garden-ef584.firebaseapp.com",
    projectId: "virtual-herbal-garden-ef584",
    storageBucket: "virtual-herbal-garden-ef584.appspot.com", // Fixed storageBucket
    messagingSenderId: "288020098861",
    appId: "1:288020098861:web:4394e4cc96c2053fe5eda4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Export auth if using modules
