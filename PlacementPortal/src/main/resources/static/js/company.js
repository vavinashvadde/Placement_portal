const BASE_URL="http://localhost:6969/api";

document.addEventListener("DOMContentLoaded",()=>{

loadDashboard();

});

async function loadDashboard(){

const companyId=localStorage.getItem("companyId");

const companyName=localStorage.getItem("companyName");

document.getElementById("companyName").innerText=companyName;

try{

const companyResponse=await fetch(`${BASE_URL}/companies/${companyId}`);

const company=await companyResponse.json();

document.getElementById("companyLocation").innerText=company.location;

const jobResponse=await fetch(`${BASE_URL}/jobs`);

const jobs=await jobResponse.json();

const companyJobs=jobs.filter(j=>j.company && j.company.companyId==companyId);

document.getElementById("jobCount").innerText=companyJobs.length;

const applicationResponse=await fetch(`${BASE_URL}/applications`);

const applications=await applicationResponse.json();

let total=0;

companyJobs.forEach(job=>{

applications.forEach(app=>{

if(app.job.jobId===job.jobId){

total++;

}

});

});

document.getElementById("applicationCount").innerText=total;

displayJobs(companyJobs);

}

catch(error){

console.log(error);

}

}

function displayJobs(jobs){

const container=document.getElementById("companyJobs");

container.innerHTML="";

jobs.forEach(job=>{

container.innerHTML+=`

<div class="job-card">

<h3>${job.jobTitle}</h3>

<p><strong>Location :</strong> ${job.location}</p>

<p><strong>Salary :</strong> ₹${job.salary}</p>

<p><strong>Experience :</strong> ${job.experience}</p>

</div>

`;

});

}

function logout(){

localStorage.clear();

window.location.href="/login";

}