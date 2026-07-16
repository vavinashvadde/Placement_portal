const BASE_URL = "http://localhost:6969/api";

const studentId = localStorage.getItem("studentId");

let currentStudent = null;

// ==============================
// Load Student Profile
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    if (!studentId) {

        alert("Please Login First");

        window.location.href = "/login";

        return;

    }

    loadProfile();

});

// ==============================
// Get Student Details
// ==============================

async function loadProfile() {

    try {

        const response = await fetch(`${BASE_URL}/students/${studentId}`);

        if (!response.ok) {

            alert("Unable to load profile");

            return;

        }

        const student = await response.json();

        currentStudent = student;

        document.getElementById("name").value = student.name || "";

        document.getElementById("email").value = student.email || "";

        document.getElementById("password").value = student.password || "";

        document.getElementById("phone").value = student.phone || "";

        document.getElementById("branch").value = student.branch || "";

        document.getElementById("cgpa").value = student.cgpa || "";

        document.getElementById("skills").value = student.skills || "";

        document.getElementById("year").value = student.year || "";

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ==============================
// Update Student Profile
// ==============================

document.getElementById("profileForm").addEventListener("submit", updateProfile);

async function updateProfile(e) {

    e.preventDefault();

    const student = {

        studentId: studentId,

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        phone: document.getElementById("phone").value,

        branch: document.getElementById("branch").value,

        cgpa: parseFloat(document.getElementById("cgpa").value),

        skills: document.getElementById("skills").value,

        year: parseInt(document.getElementById("year").value),

        status: currentStudent.status

    };

    try {

        const response = await fetch(`${BASE_URL}/students/${studentId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(student)

        });

        if (response.ok) {

            currentStudent = student;

            localStorage.setItem("studentName", student.name);

            alert("Profile Updated Successfully");

        }

        else {

            const error = await response.text();

            alert(error);

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ==============================
// Logout
// ==============================

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}