const BASE_URL = "/api";

const companyId = localStorage.getItem("companyId");
const editJobId = localStorage.getItem("editJobId");

document.addEventListener("DOMContentLoaded", () => {

    if (editJobId) {

        loadJob();

    }

});

document.getElementById("jobForm").addEventListener("submit", saveJob);

// ==========================================
// Load Job for Editing
// ==========================================

async function loadJob() {

    try {

        const response = await fetch(`${BASE_URL}/jobs/${editJobId}`);

        const job = await response.json();

        document.getElementById("jobTitle").value = job.jobTitle;

        document.getElementById("location").value = job.location;

        document.getElementById("salary").value = job.salary;

        document.getElementById("experience").value = job.experience;

        document.getElementById("jobType").value = job.jobType;

        document.getElementById("requiredSkills").value = job.requiredSkills;

        document.getElementById("deadline").value = job.deadline;

        document.getElementById("description").value = job.description;

        document.querySelector("#jobForm button").innerText = "Update Job";

    }

    catch (error) {

        console.log(error);

    }

}

// ==========================================
// Save / Update Job
// ==========================================

async function saveJob(e) {

    e.preventDefault();

    if (!companyId) {

        alert("Please Login");

        window.location.href = "/login";

        return;

    }

    const job = {

        jobId: editJobId,

        jobTitle: document.getElementById("jobTitle").value,

        location: document.getElementById("location").value,

        salary: parseFloat(document.getElementById("salary").value),

        experience: document.getElementById("experience").value,

        jobType: document.getElementById("jobType").value,

        requiredSkills: document.getElementById("requiredSkills").value,

        deadline: document.getElementById("deadline").value,

        description: document.getElementById("description").value,

        company: {

            companyId: companyId

        }

    };

    let url = `${BASE_URL}/jobs`;

    let method = "POST";

    if (editJobId) {

        url = `${BASE_URL}/jobs/${editJobId}`;

        method = "PUT";

    }

    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(job)

        });

        if (response.ok) {

            alert(editJobId ? "Job Updated Successfully" : "Job Posted Successfully");

            localStorage.removeItem("editJobId");

            window.location.href = "/company/manage-jobs";

        }

        else {

            alert("Operation Failed");

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// ==========================================
// Logout
// ==========================================

function logout() {

    localStorage.removeItem("editJobId");

    localStorage.clear();

    window.location.href = "/login";

}
