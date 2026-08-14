// ============================================
// SMART PLACEMENT PORTAL
// home.js
// ============================================
const BASE_URL = "/api";

document.addEventListener("DOMContentLoaded", () => {

    loadStatistics();
    loadJobs();
    loadCompanies();
    checkLogin();
    setupSearch();
    setupScrollButton();

});

// ============================================
// Load Statistics
// ============================================

async function loadStatistics() {

    try {

        const students = await fetch(`${BASE_URL}/students`);
        const companies = await fetch(`${BASE_URL}/companies`);
        const jobs = await fetch(`${BASE_URL}/jobs`);
        const applications = await fetch(`${BASE_URL}/applications`);

        document.getElementById("studentCount").innerHTML =
            (await students.json()).length;

        document.getElementById("companyCount").innerHTML =
            (await companies.json()).length;

        document.getElementById("jobCount").innerHTML =
            (await jobs.json()).length;

        document.getElementById("applicationCount").innerHTML =
            (await applications.json()).length;

    }

    catch (error) {

        console.error(error);

    }

}

// ============================================
// Load Jobs
// ============================================

async function loadJobs() {

    try {

        const response = await fetch(`${BASE_URL}/jobs`);

        const jobs = await response.json();

        const container = document.getElementById("jobsContainer");

        container.innerHTML = "";

        jobs.slice(0,6).forEach(job => {

            container.innerHTML += `

            <div class="job-card">

                <h3>${job.jobTitle}</h3>

                <p><b>Location :</b> ${job.location}</p>

                <p><b>Experience :</b> ${job.experience}</p>

                <p class="salary">

                    ₹ ${job.salary}

                </p>

                <div class="job-info">

                    <span class="job-tag">

                        ${job.jobType}

                    </span>

                    <button
                        class="primary-btn"
                        onclick="applyJob(${job.jobId})">

                        Apply

                    </button>

                </div>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

// ============================================
// Load Companies
// ============================================

async function loadCompanies(){

    try{

        const response = await fetch(`${BASE_URL}/companies`);

        const companies = await response.json();

        const container =
            document.getElementById("companyContainer");

        container.innerHTML="";

        companies.slice(0,8).forEach(company=>{

            container.innerHTML += `

<div class="company-card">

    <img src="/images/companies/${company.companyName.toLowerCase()}.png"
         alt="${company.companyName}">

    <h3>${company.companyName}</h3>

    <p>${company.location}</p>

</div>

`;

        });

    }

    catch(e){

        console.log(e);

    }

}

// ============================================
// Apply Job
// ============================================

function applyJob(jobId){

    let studentId =
        localStorage.getItem("studentId");

    if(studentId==null){

        alert("Please Login First");

        window.location.href="/login";

        return;

    }

    const body = {

        status:"Applied",

        applicationDate:new Date().toISOString().split("T")[0],

        student:{

            studentId:studentId

        },

        job:{

            jobId:jobId

        }

    };

    fetch(`${BASE_URL}/applications`,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(body)

    })

    .then(res=>res.json())

    .then(data=>{

        alert("Application Submitted Successfully");

    })

    .catch(err=>{

        console.log(err);

    });

}

// ============================================
// Search
// ============================================

function setupSearch(){

    let search=document.getElementById("searchInput");

    if(search==null) return;

    search.addEventListener("keyup",function(){

        let keyword=this.value.toLowerCase();

        let cards=document.querySelectorAll(".job-card");

        cards.forEach(card=>{

            if(card.innerText.toLowerCase().includes(keyword))

                card.style.display="block";

            else

                card.style.display="none";

        });

    });

}

// ============================================
// Login Check
// ============================================

function checkLogin(){

    let id=localStorage.getItem("studentId");

    if(id!=null){

        console.log("Student Logged In");

    }

}

// ============================================
// Back To Top Button
// ============================================

function setupScrollButton(){

    let btn=document.getElementById("topBtn");

    if(btn==null) return;

    window.onscroll=function(){

        if(document.documentElement.scrollTop>400)

            btn.style.display="block";

        else

            btn.style.display="none";

    }

}

function topFunction(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
