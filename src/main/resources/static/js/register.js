const BASE_URL = "http://localhost:6969/api";

let selectedRole = "student";

const dynamicFields = document.getElementById("dynamicFields");

// =============================
// Initial Form
// =============================

window.onload = () => {

    loadStudentForm();

};

// =============================
// Role Buttons
// =============================

document.querySelectorAll(".role").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".role")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedRole = button.dataset.role;

        if (selectedRole === "student") {

            loadStudentForm();

        }

        else {

            loadCompanyForm();

        }

    });

});

// =============================
// Student Form
// =============================

function loadStudentForm() {

    dynamicFields.innerHTML = `

    <div class="input-group">
        <label>Name</label>
        <input
            type="text"
            id="name"
            placeholder="Enter Full Name"
            required>
    </div>

    <div class="input-group">
        <label>Email</label>
        <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required>
    </div>

    <div class="input-group">
        <label>Password</label>
        <input
            type="password"
            id="password"
            placeholder="Password"
            required>
    </div>

    <div class="input-group">
        <label>Phone</label>
        <input
            type="text"
            id="phone"
            placeholder="9876543210">
    </div>

    <div class="input-group">
        <label>Branch</label>
        <input
            type="text"
            id="branch"
            placeholder="CSE">
    </div>

    <div class="input-group">
        <label>CGPA</label>
        <input
            type="number"
            id="cgpa"
            step="0.01"
            placeholder="8.5">
    </div>

    <div class="input-group">
        <label>Skills</label>
        <input
            type="text"
            id="skills"
            placeholder="Java, Spring Boot">
    </div>

    <div class="input-group">
        <label>Year</label>
        <input
            type="number"
            id="year"
            placeholder="2027">
    </div>

    `;

}

// =============================
// Company Form
// =============================

function loadCompanyForm() {

    dynamicFields.innerHTML = `

    <div class="input-group">
        <label>Company Name</label>
        <input
            type="text"
            id="companyName"
            placeholder="Infosys"
            required>
    </div>

    <div class="input-group">
        <label>Email</label>
        <input
            type="email"
            id="email"
            placeholder="company@gmail.com"
            required>
    </div>

    <div class="input-group">
        <label>Password</label>
        <input
            type="password"
            id="password"
            placeholder="Password"
            required>
    </div>

    <div class="input-group">
        <label>Phone</label>
        <input
            type="text"
            id="phone"
            placeholder="9876543210">
    </div>

    <div class="input-group">
        <label>Location</label>
        <input
            type="text"
            id="location"
            placeholder="Bangalore">
    </div>

    <div class="input-group">
        <label>Description</label>
        <textarea
            id="description"
            rows="4"
            placeholder="Company Description"></textarea>
    </div>

    `;

}
// =============================
// Register Form Submit
// =============================

document.getElementById("registerForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    if (selectedRole === "student") {

        await registerStudent();

    } else {

        await registerCompany();

    }

});

// =============================
// Register Student
// =============================

async function registerStudent() {

    const student = {

        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        branch: document.getElementById("branch").value.trim(),
        cgpa: parseFloat(document.getElementById("cgpa").value),
        skills: document.getElementById("skills").value.trim(),
        year: parseInt(document.getElementById("year").value),
        status: "ACTIVE"

    };

    if (student.name === "" ||
        student.email === "" ||
        student.password === "") {

        alert("Please fill all required fields.");

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/students`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(student)

        });

        if (response.ok) {

            alert("Student Registered Successfully!");

            window.location.href = "/login";

        } else {

            const msg = await response.text();

            alert(msg);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

}

// =============================
// Register Company
// =============================

async function registerCompany() {

    const company = {

        companyName: document.getElementById("companyName").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        location: document.getElementById("location").value.trim(),
        description: document.getElementById("description").value.trim()

    };

    if (company.companyName === "" ||
        company.email === "" ||
        company.password === "") {

        alert("Please fill all required fields.");

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/companies`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(company)

        });

        if (response.ok) {

            alert("Company Registered Successfully!");

            window.location.href = "/login";

        } else {

            const msg = await response.text();

            alert(msg);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

}