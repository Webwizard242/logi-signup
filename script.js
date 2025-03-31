const API_URL = "http://localhost:5000";
document.getElementById("signupForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("email", document.getElementById("email").value);
    formData.append("username", document.getElementById("username").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("confirmPassword", document.getElementById("confirmPassword").value);
    formData.append("skills", document.getElementById("skills").value);
    formData.append("govId", document.getElementById("govId").files[0]);
    formData.append("profilePic", document.getElementById("profilePic").files[0]);

    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (result.success) {
        alert("Signup Successful!");
        window.location.href = "login.html";
    } else {
        alert("Signup Failed: " + result.error);
    }
});

// 🔹 Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const credentials = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    const result = await response.json();
    if (result.success) {
        alert("Login Successful!");
        localStorage.setItem("token", result.token);
    } else {
        alert("Login Failed: " + result.error);
    }
});
