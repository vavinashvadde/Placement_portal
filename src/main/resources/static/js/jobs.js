/*=========================================================
    JOBS.JS
    PART 1
    Search • Filter • Sorting • Pagination
=========================================================*/

"use strict";

/*=========================
    DOM ELEMENTS
=========================*/

const searchInput = document.getElementById("jobSearch");
const filterSelect = document.getElementById("jobFilter");
const sortSelect = document.getElementById("jobSort");
const jobCards = document.querySelectorAll(".job-card");
const jobsContainer = document.getElementById("jobsContainer");

/*=========================
    LIVE SEARCH
=========================*/

function searchJobs(){

    if(!searchInput) return;

    const keyword = searchInput.value.toLowerCase();

    jobCards.forEach(card=>{

        const value = card.innerText.toLowerCase();

        card.style.display =
            value.includes(keyword)
            ? ""
            : "none";

    });

}

if(searchInput){

    searchInput.addEventListener(

        "input",

        searchJobs

    );

}

/*=========================
    FILTER JOBS
=========================*/

function filterJobs(){

    if(!filterSelect) return;

    const category =

        filterSelect.value.toLowerCase();

    jobCards.forEach(card=>{

        const type =

            card.dataset.category;

        if(

            category==="all" ||

            type===category

        ){

            card.style.display="";

        }

        else{

            card.style.display="none";

        }

    });

}

if(filterSelect){

    filterSelect.addEventListener(

        "change",

        filterJobs

    );

}

/*=========================
    SORT JOBS
=========================*/

function sortJobs(){

    if(!sortSelect || !jobsContainer) return;

    const cards=[...jobCards];

    const option=sortSelect.value;

    cards.sort((a,b)=>{

        if(option==="salary"){

            return Number(

                b.dataset.salary

            )-

            Number(

                a.dataset.salary

            );

        }

        if(option==="title"){

            return a.dataset.title.localeCompare(

                b.dataset.title

            );

        }

        if(option==="company"){

            return a.dataset.company.localeCompare(

                b.dataset.company

            );

        }

        return 0;

    });

    cards.forEach(card=>{

        jobsContainer.appendChild(card);

    });

}

if(sortSelect){

    sortSelect.addEventListener(

        "change",

        sortJobs

    );

}

/*=========================
    PAGINATION
=========================*/

let currentPage = 1;

const jobsPerPage = 6;

function paginateJobs(){

    const cards=[...jobCards];

    cards.forEach((card,index)=>{

        const start=(currentPage-1)*jobsPerPage;

        const end=start+jobsPerPage;

        card.style.display=

            index>=start && index<end

            ? ""

            : "none";

    });

}

function nextPage(){

    currentPage++;

    paginateJobs();

}

function previousPage(){

    if(currentPage>1){

        currentPage--;

    }

    paginateJobs();

}

/*=========================
    LOAD MORE
=========================*/

let visibleJobs=6;

function loadMoreJobs(){

    const cards=[...jobCards];

    visibleJobs+=6;

    cards.forEach((card,index)=>{

        if(index<visibleJobs){

            card.style.display="";

        }

    });

}

/*=========================
    INITIALIZE
=========================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        paginateJobs();

    }

);
/*=========================================================
    JOBS.JS
    PART 2
    Save • Apply • Favorites • Details
=========================================================*/

"use strict";

/*=========================
    LOCAL STORAGE
=========================*/

let savedJobs = JSON.parse(

    localStorage.getItem("savedJobs")

) || [];

let appliedJobs = JSON.parse(

    localStorage.getItem("appliedJobs")

) || [];

let recentJobs = JSON.parse(

    localStorage.getItem("recentJobs")

) || [];

/*=========================
    SAVE JOB
=========================*/

function saveJob(jobId){

    if(savedJobs.includes(jobId)){

        showToast(

            "Job already saved",

            "warning"

        );

        return;

    }

    savedJobs.push(jobId);

    localStorage.setItem(

        "savedJobs",

        JSON.stringify(savedJobs)

    );

    showToast(

        "Job Saved",

        "success"

    );

}

/*=========================
    REMOVE SAVED JOB
=========================*/

function removeSavedJob(jobId){

    savedJobs = savedJobs.filter(

        id=>id!==jobId

    );

    localStorage.setItem(

        "savedJobs",

        JSON.stringify(savedJobs)

    );

    showToast(

        "Removed from Saved Jobs",

        "info"

    );

}

/*=========================
    FAVORITE TOGGLE
=========================*/

function toggleFavorite(button,jobId){

    if(savedJobs.includes(jobId)){

        removeSavedJob(jobId);

        button.classList.remove("active");

    }

    else{

        saveJob(jobId);

        button.classList.add("active");

    }

}

/*=========================
    APPLY JOB
=========================*/

async function applyJob(jobId){

    if(appliedJobs.includes(jobId)){

        showToast(

            "Already Applied",

            "warning"

        );

        return;

    }

    try{

        showLoader();

        const response = await fetch(

            "/jobs/apply/"+jobId,

            {

                method:"POST"

            }

        );

        hideLoader();

        if(response.ok){

            appliedJobs.push(jobId);

            localStorage.setItem(

                "appliedJobs",

                JSON.stringify(appliedJobs)

            );

            showToast(

                "Application Submitted",

                "success"

            );

        }

        else{

            showToast(

                "Application Failed",

                "error"

            );

        }

    }

    catch(error){

        hideLoader();

        console.error(error);

        showToast(

            "Server Error",

            "error"

        );

    }

}

/*=========================
    WITHDRAW APPLICATION
=========================*/

function withdrawApplication(jobId){

    appliedJobs = appliedJobs.filter(

        id=>id!==jobId

    );

    localStorage.setItem(

        "appliedJobs",

        JSON.stringify(appliedJobs)

    );

    showToast(

        "Application Withdrawn",

        "warning"

    );

}

/*=========================
    JOB DETAILS
=========================*/

async function openJobDetails(jobId){

    try{

        showLoader();

        const response = await fetch(

            "/jobs/"+jobId

        );

        const job = await response.json();

        hideLoader();

        console.table(job);

        addRecentJob(jobId);

    }

    catch(error){

        hideLoader();

        console.error(error);

    }

}

/*=========================
    RECENTLY VIEWED
=========================*/

function addRecentJob(jobId){

    recentJobs = recentJobs.filter(

        id=>id!==jobId

    );

    recentJobs.unshift(jobId);

    recentJobs = recentJobs.slice(0,10);

    localStorage.setItem(

        "recentJobs",

        JSON.stringify(recentJobs)

    );

}

/*=========================
    LOAD RECENT JOBS
=========================*/

function loadRecentJobs(){

    console.log(

        "Recent Jobs :",

        recentJobs

    );

}

/*=========================
    NOTIFICATIONS
=========================*/

let jobNotifications=[];

function addJobNotification(message){

    jobNotifications.unshift({

        message,

        time:new Date().toLocaleTimeString()

    });

}

/*=========================
    SHARE JOB
=========================*/

function shareJob(jobId){

    const url=

        window.location.origin+

        "/jobs/"+jobId;

    navigator.clipboard.writeText(url);

    showToast(

        "Job Link Copied",

        "success"

    );

}

/*=========================
    COPY JOB LINK
=========================*/

function copyJobLink(jobId){

    shareJob(jobId);

}

/*=========================
    LOAD SAVED
=========================*/

function loadSavedJobs(){

    savedJobs.forEach(id=>{

        const btn=document.querySelector(

            `[data-job='${id}']`

        );

        if(btn){

            btn.classList.add("active");

        }

    });

}
/*=========================================================
    JOBS.JS
    PART 3
    Analytics • Theme • Session • Utilities
=========================================================*/

"use strict";

/*=========================
    JOB STATISTICS
=========================*/

function loadJobStatistics(){

    const statistics={

        totalJobs:146,

        appliedJobs:18,

        savedJobs:savedJobs.length,

        recentJobs:recentJobs.length,

        interviews:5,

        selected:2

    };

    console.table(statistics);

}

/*=========================
    JOB CHART
=========================*/

function initializeJobChart(){

    if(typeof Chart==="undefined") return;

    const canvas=document.getElementById("jobChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"pie",

        data:{

            labels:[

                "Applied",

                "Saved",

                "Interviews",

                "Selected"

            ],

            datasets:[{

                data:[

                    appliedJobs.length,

                    savedJobs.length,

                    5,

                    2

                ]

            }]

        }

    });

}

/*=========================
    REFRESH JOB PAGE
=========================*/

function refreshJobs(){

    paginateJobs();

    loadSavedJobs();

    loadRecentJobs();

    loadJobStatistics();

    initializeJobChart();

}

/*=========================
    SESSION CHECK
=========================*/

function checkSession(){

    const user=sessionStorage.getItem(

        "loggedUser"

    );

    if(!user){

        window.location.href="/login";

    }

}

/*=========================
    LOGOUT
=========================*/

function logoutJobs(){

    sessionStorage.clear();

    showToast(

        "Logged Out Successfully",

        "success"

    );

    setTimeout(()=>{

        window.location.href="/login";

    },1000);

}

/*=========================
    DARK MODE
=========================*/

function toggleJobsTheme(){

    document.body.classList.toggle(

        "dark-theme"

    );

    localStorage.setItem(

        "jobsTheme",

        document.body.classList.contains(

            "dark-theme"

        )

        ? "dark"

        : "light"

    );

}

function loadJobsTheme(){

    if(

        localStorage.getItem(

            "jobsTheme"

        )==="dark"

    ){

        document.body.classList.add(

            "dark-theme"

        );

    }

}

/*=========================
    NOTIFICATION POLLING
=========================*/

function checkJobNotifications(){

    console.log(

        "Checking latest job notifications..."

    );

}

setInterval(

    checkJobNotifications,

    60000

);

/*=========================
    EXPORT JOB LIST
=========================*/

function exportJobs(){

    window.print();

}

/*=========================
    ONLINE / OFFLINE
=========================*/

window.addEventListener(

    "online",

    ()=>{

        showToast(

            "Internet Connected",

            "success"

        );

    }

);

window.addEventListener(

    "offline",

    ()=>{

        showToast(

            "Internet Connection Lost",

            "warning"

        );

    }

);

/*=========================
    BEFORE UNLOAD
=========================*/

window.addEventListener(

    "beforeunload",

    ()=>{

        hideLoader();

    }

);

/*=========================
    INITIALIZATION
=========================*/

function initializeJobs(){

    checkSession();

    paginateJobs();

    loadSavedJobs();

    loadRecentJobs();

    loadJobStatistics();

    initializeJobChart();

    loadJobsTheme();

}

document.addEventListener(

    "DOMContentLoaded",

    initializeJobs

);

/*=========================================================
    END OF JOBS.JS
=========================================================*/