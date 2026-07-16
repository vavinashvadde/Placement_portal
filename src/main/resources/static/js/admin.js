const BASE_URL="http://localhost:6969/api";

document.addEventListener("DOMContentLoaded",loadDashboard);

async function loadDashboard(){

document.getElementById("adminName").innerText=
localStorage.getItem("adminName") || "Administrator";

try{

const students=
await fetch(`${BASE_URL}/students`).then(r=>r.json());

document.getElementById("studentCount").innerText=
students.length;

const companies=
await fetch(`${BASE_URL}/companies`).then(r=>r.json());

document.getElementById("companyCount").innerText=
companies.length;

const jobs=
await fetch(`${BASE_URL}/jobs`).then(r=>r.json());

document.getElementById("jobCount").innerText=
jobs.length;

const applications=
await fetch(`${BASE_URL}/applications`).then(r=>r.json());

document.getElementById("applicationCount").innerText=
applications.length;

}
catch(error){

console.log(error);

}

}

function logout(){

localStorage.clear();

window.location.href="/login";

}