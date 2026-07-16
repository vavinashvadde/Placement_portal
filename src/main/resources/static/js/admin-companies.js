const BASE_URL="http://localhost:6969/api";

document.addEventListener("DOMContentLoaded",loadCompanies);

async function loadCompanies(){

const response=await fetch(`${BASE_URL}/companies`);

const companies=await response.json();

const table=document.getElementById("companyTable");

table.innerHTML="";

companies.forEach(company=>{

table.innerHTML+=`

<tr>

<td>${company.companyId}</td>

<td>${company.companyName}</td>

<td>${company.email}</td>

<td>${company.location}</td>

<td>

<button class="delete-btn"

onclick="deleteCompany(${company.companyId})">

Delete

</button>

</td>

</tr>

`;

});

}

async function deleteCompany(id){

if(!confirm("Delete Company?")) return;

await fetch(`${BASE_URL}/companies/${id}`,{

method:"DELETE"

});

loadCompanies();

}