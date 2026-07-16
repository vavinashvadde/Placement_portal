const BASE_URL = "http://localhost:6969/api";

document.addEventListener("DOMContentLoaded", () => {

    loadApplications();

});

async function loadApplications() {

    const studentId = localStorage.getItem("studentId");

    try {

        const response = await fetch(`${BASE_URL}/applications`);

        const applications = await response.json();

        const table = document.getElementById("applicationTable");

        table.innerHTML = "";

        const myApplications = applications.filter(app =>
            app.student &&
            app.student.studentId == studentId
        );

        if (myApplications.length === 0) {

            table.innerHTML = `

            <tr>

                <td colspan="4">

                    No Applications Found

                </td>

            </tr>

            `;

            return;

        }

        myApplications.forEach(app => {

            table.innerHTML += `

            <tr>

                <td>${app.job.jobTitle}</td>

                <td>${app.job.location}</td>

                <td>${app.applicationDate}</td>

                <td>${app.status}</td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}