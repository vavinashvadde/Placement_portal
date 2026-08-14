const BASE_URL = "/api";

document.addEventListener("DOMContentLoaded", () => {

    loadJobs();

});

// ===============================
// Load All Jobs
// ===============================

async function loadJobs() {

    try {

        const response = await fetch(`${BASE_URL}/jobs`);

        const jobs = await response.json();

        displayJobs(jobs);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load jobs.");

    }

}

// ===============================
// Display Jobs
// ===============================

function displayJobs(jobs) {

    const container = document.getElementById("jobsContainer");

    container.innerHTML = "";

    if (jobs.length === 0) {

        container.innerHTML = "<h3>No Jobs Available</h3>";

        return;

    }

    jobs.forEach(job => {

        container.innerHTML += `

        <div class="job-card">
			<h3>${job.jobTitle}</h3>

			<p>🏢 <strong>Company :</strong> ${job.company.companyName}</p>

			<p>📍 <strong>Location :</strong> ${job.location}</p>

			<p>💼 <strong>Experience :</strong> ${job.experience}</p>

			<p>💰 <strong>Salary :</strong> ₹${job.salary}</p>

			<p>📝 <strong>Job Type :</strong> ${job.jobType}</p>

			<p>🛠 <strong>Skills :</strong> ${job.requiredSkills}</p>

			<p>📄 <strong>Description :</strong> ${job.description}</p>

            <button
                class="apply-btn"
                onclick="applyJob(${job.jobId})">

                Apply Now

            </button>

        </div>

        `;

    });

}

// ===============================
// Search Jobs
// ===============================

async function searchJobs() {

    const keyword = document.getElementById("searchJob").value.trim();

    if (keyword === "") {

        loadJobs();

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/jobs/search/${keyword}`);

        const jobs = await response.json();

        displayJobs(jobs);

    }

    catch (error) {

        console.error(error);

        alert("Search Failed");

    }

}

// ===============================
// Apply Job
// ===============================

async function applyJob(jobId) {

    const studentId = localStorage.getItem("studentId");

    if (!studentId) {

        alert("Please Login First");

        window.location.href = "/login";

        return;

    }

    const application = {

        applicationDate: new Date().toISOString().split("T")[0],

        status: "Applied",

        student: {

            studentId: studentId

        },

        job: {

            jobId: jobId

        }

    };

    try {

        const response = await fetch(`${BASE_URL}/applications`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(application)

        });

        if (response.ok) {

            alert("Application Submitted Successfully!");

        }

        else {

            alert("Unable to Apply.");

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ===============================
// Logout
// ===============================

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}
