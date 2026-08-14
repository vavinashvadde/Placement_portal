const BASE_URL = "/api";

const companyId = localStorage.getItem("companyId");

document.addEventListener("DOMContentLoaded", loadJobs);

// ==========================================
// Load Company Jobs
// ==========================================

async function loadJobs() {

    try {

        const response = await fetch(`${BASE_URL}/jobs`);

        const jobs = await response.json();

        const myJobs = jobs.filter(job =>
            job.company &&
            job.company.companyId == companyId
        );

        displayJobs(myJobs);

    }

    catch(error){

        console.log(error);

    }

}

// ==========================================
// Display Jobs
// ==========================================

function displayJobs(jobs){

    const table = document.getElementById("jobTable");

    table.innerHTML = "";

    if(jobs.length==0){

        table.innerHTML = `

        <tr>

        <td colspan="6">

        No Jobs Posted

        </td>

        </tr>

        `;

        return;

    }

    jobs.forEach(job=>{

        table.innerHTML += `

        <tr>

        <td>${job.jobTitle}</td>

        <td>${job.location}</td>

        <td>₹${job.salary}</td>

        <td>${job.experience}</td>

        <td>${job.jobType}</td>

        <td>

        <button
        class="edit-btn"
        onclick="editJob(${job.jobId})">

        Edit

        </button>

        <button
        class="delete-btn"
        onclick="deleteJob(${job.jobId})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}

// ==========================================
// Search
// ==========================================

function searchJobs(){

    const keyword =
    document.getElementById("search").value.toLowerCase();

    const rows =
    document.querySelectorAll("#jobTable tr");

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(keyword))

            row.style.display="";

        else

            row.style.display="none";

    });

}

// ==========================================
// Delete Job
// ==========================================

async function deleteJob(jobId){

    if(!confirm("Delete this Job?"))

        return;

    try{

        const response = await fetch(`${BASE_URL}/jobs/${jobId}`,{

            method:"DELETE"

        });

        if(response.ok){

            alert("Job Deleted");

            loadJobs();

        }

        else{

            alert("Delete Failed");

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==========================================
// Edit Job
// ==========================================

function editJob(jobId){

    localStorage.setItem("editJobId",jobId);

    window.location.href="/company/post-job";

}

// ==========================================
// Logout
// ==========================================

function logout(){

    localStorage.clear();

    window.location.href="/login";

}
