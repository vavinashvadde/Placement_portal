const BASE_URL="http://localhost:6969/api";

document.addEventListener("DOMContentLoaded",loadStudents);

async function loadStudents(){

try{

const response=await fetch(`${BASE_URL}/students`);

const students=await response.json();

const table=document.getElementById("studentTable");

table.innerHTML="";

students.forEach(student=>{

table.innerHTML+=`

<tr>

<td>${student.studentId}</td>

<td>${student.name}</td>

<td>${student.email}</td>

<td>${student.branch}</td>

<td>${student.cgpa}</td>

<td>

<button class="delete-btn"

onclick="deleteStudent(${student.studentId})">

Delete

</button>

</td>

</tr>

`;

});

}

catch(error){

console.log(error);

}

}

async function deleteStudent(id){

if(!confirm("Delete Student?")) return;

const response=await fetch(`${BASE_URL}/students/${id}`,{

method:"DELETE"

});

if(response.ok){

alert("Student Deleted");

loadStudents();

}

}

function logout(){

localStorage.clear();

window.location.href="/login";

}