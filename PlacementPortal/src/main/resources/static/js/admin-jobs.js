const BASE_URL="http://localhost:6969/api";

document.addEventListener("DOMContentLoaded",loadJobs);

async function loadJobs(){

const response=await fetch(`${BASE_URL}/jobs`);

const jobs=await response.json();

const table=document.getElementById("jobTable");

table.innerHTML="";

jobs.forEach(job=>{

table.innerHTML+=`

<tr>

<td>${job.jobTitle}</td>

<td>${job.location}</td>

<td>${job.salary}</td>

<td>${job.company.companyName}</td>

<td>

<button class="delete-btn"

onclick="deleteJob(${job.jobId})">

Delete

</button>

</td>

</tr>

`;

});

}

async function deleteJob(id){

if(!confirm("Delete Job?")) return;

await fetch(`${BASE_URL}/jobs/${id}`,{

method:"DELETE"

});

loadJobs();

}