const BASE_URL = "http://localhost:6969/api";

document.getElementById("resumeForm").addEventListener("submit", uploadResume);

// ======================================
// Upload Resume
// ======================================

async function uploadResume(e) {

    e.preventDefault();

    const studentId = localStorage.getItem("studentId");

    const title = document.getElementById("title").value;

    const file = document.getElementById("resumeFile").files[0];

    if (!file) {

        alert("Please select a resume file.");

        return;

    }

    const formData = new FormData();

    formData.append("title", title);

    formData.append("studentId", studentId);

    formData.append("file", file);

    try {

        const response = await fetch(`${BASE_URL}/resumes/upload`, {

            method: "POST",

            body: formData

        });

        if (response.ok) {

            alert("Resume Uploaded Successfully!");

            document.getElementById("resumeForm").reset();

        } else {

            const message = await response.text();

            alert(message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to upload resume.");

    }

}

// ======================================
// Logout
// ======================================

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}