const BASE_URL = "/api";

const companyId = localStorage.getItem("companyId");

document.addEventListener("DOMContentLoaded", loadApplicants);

// ======================================
// Load Applicants
// ======================================

async function loadApplicants() {

    try {

        // Company Jobs
        const jobsResponse = await fetch(`${BASE_URL}/jobs`);
        const jobs = await jobsResponse.json();

        const myJobs = jobs.filter(job =>
            job.company &&
            job.company.companyId == companyId
        );

        // Applications
        const applicationsResponse =
            await fetch(`${BASE_URL}/applications`);

        const applications =
            await applicationsResponse.json();

        // Resumes
        const resumeResponse =
            await fetch(`${BASE_URL}/resumes`);

        const resumes =
            await resumeResponse.json();

        const table =
            document.getElementById("applicantTable");

        table.innerHTML = "";

        let found = false;

        applications.forEach(application => {

            const companyJob =
                myJobs.find(job =>
                    job.jobId === application.job.jobId
                );

            if (companyJob) {

                found = true;

                const resume =
                    resumes.find(r =>
                        r.student &&
                        r.student.studentId === application.student.studentId
                    );

                table.innerHTML += `

                <tr>

                    <td>${application.student.name}</td>

                    <td>${application.student.email}</td>

                    <td>${application.student.phone}</td>

                    <td>${application.job.jobTitle}</td>

                    <td>${application.applicationDate}</td>

                    <td>${application.status}</td>

                    <td>

                        ${
                            resume
                            ?

                            `<a href="${resume.filePath}"
                                target="_blank"
                                class="primary-btn">

                                View Resume

                            </a>`

                            :

                            `<button
                                class="delete-btn"
                                onclick="alert('No Resume Uploaded')">

                                No Resume

                            </button>`
                        }

                    </td>

                </tr>

                `;

            }

        });

        if (!found) {

            table.innerHTML = `

            <tr>

                <td colspan="7">

                    No Applicants Yet

                </td>

            </tr>

            `;

        }

    }

    catch (error) {

        console.log(error);

        alert("Unable to load applicants.");

    }

}

// ======================================
// Logout
// ======================================

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}
