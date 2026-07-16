const BASE_URL="http://localhost:6969/api";

document.addEventListener("DOMContentLoaded",loadNotifications);

async function loadNotifications(){

const studentId=localStorage.getItem("studentId");

try{

const response=await fetch(`${BASE_URL}/notifications`);

const notifications=await response.json();

const container=document.getElementById("notificationContainer");

container.innerHTML="";

const myNotifications=notifications.filter(n=>n.student.studentId==studentId);

if(myNotifications.length===0){

container.innerHTML="<h3>No Notifications</h3>";

return;

}

myNotifications.forEach(n=>{

container.innerHTML+=`

<div class="job-card">

<h3>${n.title}</h3>

<p>${n.message}</p>

<p><strong>Date :</strong> ${n.notificationDate}</p>

</div>

`;

});

}

catch(error){

console.log(error);

}

}

function logout(){

localStorage.clear();

window.location.href="/login";

}