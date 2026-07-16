const BASE_URL = "http://localhost:6969/api";

// ==============================
// Dashboard Load
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    loadStudentName();
    loadDashboard();
    loadRecentJobs();

});

// ==============================
// Student Name
// ==============================

function loadStudentName() {

    const name = localStorage.getItem("studentName");

    if (name) {

        document.getElementById("studentName").innerText = name;

    }

}

// ==============================
// Dashboard Cards
// ==============================

async function loadDashboard() {

    const studentId = localStorage.getItem("studentId");

    try {

        const jobsRes = await fetch(BASE_URL + "/jobs");
        const jobs = await jobsRes.json();

        document.getElementById("jobCount").innerText = jobs.length;

        const appRes = await fetch(BASE_URL + "/applications");
        const applications = await appRes.json();

        const myApplications = applications.filter(app =>
            app.student &&
            app.student.studentId == studentId
        );

        document.getElementById("applicationCount").innerText =
            myApplications.length;

        const resumeRes = await fetch(BASE_URL + "/resumes");

        if (resumeRes.ok) {

            const resumes = await resumeRes.json();

            const resume = resumes.find(r =>
                r.student &&
                r.student.studentId == studentId
            );

            document.getElementById("resumeStatus").innerText =
                resume ? "Uploaded" : "No";

        }

        const notifyRes =
            await fetch(BASE_URL + "/notifications");

        if (notifyRes.ok) {

            const notifications =
                await notifyRes.json();

            const myNotifications =
                notifications.filter(n =>
                    n.student &&
                    n.student.studentId == studentId
                );

            document.getElementById("notificationCount").innerText =
                myNotifications.length;

        }

    }

    catch (error) {

        console.log(error);

    }

}

// ==============================
// Recent Jobs
// ==============================

async function loadRecentJobs() {

    try {

        const response =
            await fetch(BASE_URL + "/jobs");

        const jobs = await response.json();

        const container =
            document.getElementById("recentJobs");

        container.innerHTML = "";

        jobs.slice(0,6).forEach(job => {

            container.innerHTML += `

            <div class="job-card">

                <h3>${job.jobTitle}</h3>

                <p><strong>Location :</strong> ${job.location}</p>

                <p><strong>Experience :</strong> ${job.experience}</p>

                <p><strong>Salary :</strong> ₹${job.salary}</p>

                <button
                    class="apply-btn"
                    onclick="applyJob(${job.jobId})">

                    Apply Now

                </button>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// Apply Job
// ==============================

async function applyJob(jobId){

    const studentId =
        localStorage.getItem("studentId");

    if(studentId==null){

        alert("Please Login First");

        return;

    }

    const body={

        applicationDate:new Date().toISOString().split("T")[0],

        status:"Applied",

        student:{

            studentId:studentId

        },

        job:{

            jobId:jobId

        }

    };

    try{

        const response=await fetch(BASE_URL+"/applications",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(body)

        });

        if(response.ok){

            alert("Application Submitted Successfully");

            loadDashboard();

        }

        else{

            alert("Unable to Apply");

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// Logout
// ==============================

function logout(){

    localStorage.clear();

    window.location.href="/login";

}