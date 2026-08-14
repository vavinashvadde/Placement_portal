const BASE_URL = "/api";

let selectedRole = "student";

// =========================
// Role Selection
// =========================

const roleButtons = document.querySelectorAll(".role");

roleButtons.forEach(button => {

    button.addEventListener("click", () => {

        roleButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedRole = button.dataset.role;

    });

});

// =========================
// Login
// =========================

document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {

        alert("Please fill all fields");

        return;

    }

    let endpoint = "";

    if (selectedRole === "student") {

        endpoint = "/students";

    }

    else if (selectedRole === "company") {

        endpoint = "/companies";

    }

    else {

        endpoint = "/admin";

    }

    try {

        const response = await fetch(BASE_URL + endpoint);

        const users = await response.json();

        let user = null;

        if (selectedRole === "student") {

            user = users.find(u =>
                u.email === email &&
                u.password === password
            );

        }

        else if (selectedRole === "company") {

            user = users.find(u =>
                u.email === email &&
                u.password === password
            );

        }

        else {

            user = users.find(u =>
                u.email === email &&
                u.password === password
            );

        }

        if (user) {

            if (selectedRole === "student") {

                localStorage.setItem("studentId", user.studentId);
                localStorage.setItem("studentName", user.name);
                localStorage.setItem("role", "student");

                alert("Student Login Successful");

                window.location.href = "/student/dashboard";

            }

            else if (selectedRole === "company") {

                localStorage.setItem("companyId", user.companyId);
                localStorage.setItem("companyName", user.companyName);
                localStorage.setItem("role", "company");

                alert("Company Login Successful");

                window.location.href = "/company/dashboard";

            }

            else {

                localStorage.setItem("adminId", user.adminId);
                localStorage.setItem("adminName", user.adminName);
                localStorage.setItem("role", "admin");

                alert("Admin Login Successful");

                window.location.href = "/admin/dashboard";

            }

        }

        else {

            alert("Invalid Email or Password");

        }

    }

	catch (error) {

	    console.error("Login Error:", error);

	    alert(error.message);

	}

});

// =========================
// Check Existing Login
// =========================

window.onload = function () {

    const role = localStorage.getItem("role");

    if (role === "student") {

        console.log("Student Logged In");

    }

    if (role === "company") {

        console.log("Company Logged In");

    }

    if (role === "admin") {

        console.log("Admin Logged In");

    }

};

// =========================
// Logout Function
// =========================

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}
