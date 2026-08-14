const BASE_URL = "/api";

document.addEventListener("DOMContentLoaded",async()=>{

const students=await fetch(`${BASE_URL}/students`).then(r=>r.json());

const companies=await fetch(`${BASE_URL}/companies`).then(r=>r.json());

const jobs=await fetch(`${BASE_URL}/jobs`).then(r=>r.json());

const applications=await fetch(`${BASE_URL}/applications`).then(r=>r.json());

document.getElementById("studentReport").innerText=students.length;

document.getElementById("companyReport").innerText=companies.length;

document.getElementById("jobReport").innerText=jobs.length;

document.getElementById("applicationReport").innerText=applications.length;

});
