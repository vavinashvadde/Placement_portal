/*=========================================================
    CHART.JS
    PART 1
    Common Charts
=========================================================*/

"use strict";

/*=========================
    COMMON COLORS
=========================*/

const chartColors={

    blue:"#2563eb",

    green:"#10b981",

    red:"#ef4444",

    yellow:"#f59e0b",

    purple:"#7c3aed",

    cyan:"#06b6d4",

    orange:"#f97316",

    gray:"#6b7280"

};

/*=========================
    DEFAULT OPTIONS
=========================*/

const defaultOptions={

    responsive:true,

    maintainAspectRatio:false,

    plugins:{

        legend:{

            position:"top"

        }

    }

};

/*=========================
    BAR CHART
=========================*/

function createBarChart(

    canvasId,

    labels,

    values,

    label

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"bar",

        data:{

            labels:labels,

            datasets:[{

                label:label,

                data:values,

                backgroundColor:chartColors.blue,

                borderRadius:10

            }]

        },

        options:defaultOptions

    });

}

/*=========================
    LINE CHART
=========================*/

function createLineChart(

    canvasId,

    labels,

    values,

    label

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"line",

        data:{

            labels,

            datasets:[{

                label,

                data:values,

                borderColor:chartColors.green,

                backgroundColor:"rgba(16,185,129,.2)",

                fill:true,

                tension:.4

            }]

        },

        options:defaultOptions

    });

}

/*=========================
    PIE CHART
=========================*/

function createPieChart(

    canvasId,

    labels,

    values

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"pie",

        data:{

            labels,

            datasets:[{

                data:values,

                backgroundColor:[

                    chartColors.blue,

                    chartColors.green,

                    chartColors.red,

                    chartColors.yellow,

                    chartColors.purple

                ]

            }]

        },

        options:defaultOptions

    });

}

/*=========================
    DOUGHNUT
=========================*/

function createDoughnutChart(

    canvasId,

    labels,

    values

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"doughnut",

        data:{

            labels,

            datasets:[{

                data:values,

                backgroundColor:[

                    chartColors.blue,

                    chartColors.green,

                    chartColors.red,

                    chartColors.yellow

                ]

            }]

        },

        options:defaultOptions

    });

}
/*=========================================================
    CHART.JS
    PART 2
    Advanced Charts
=========================================================*/

"use strict";

/*=========================
    AREA CHART
=========================*/

function createAreaChart(

    canvasId,

    labels,

    values,

    label

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"line",

        data:{

            labels,

            datasets:[{

                label,

                data:values,

                borderColor:chartColors.purple,

                backgroundColor:"rgba(124,58,237,.25)",

                fill:true,

                tension:.4

            }]

        },

        options:defaultOptions

    });

}

/*=========================
    RADAR CHART
=========================*/

function createRadarChart(

    canvasId,

    labels,

    values,

    label

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"radar",

        data:{

            labels,

            datasets:[{

                label,

                data:values,

                backgroundColor:"rgba(37,99,235,.2)",

                borderColor:chartColors.blue,

                pointBackgroundColor:chartColors.blue

            }]

        },

        options:defaultOptions

    });

}

/*=========================
    POLAR AREA
=========================*/

function createPolarChart(

    canvasId,

    labels,

    values

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"polarArea",

        data:{

            labels,

            datasets:[{

                data:values,

                backgroundColor:[

                    chartColors.blue,

                    chartColors.green,

                    chartColors.orange,

                    chartColors.red,

                    chartColors.purple

                ]

            }]

        },

        options:defaultOptions

    });

}

/*=========================
    MULTI LINE CHART
=========================*/

function createMultiLineChart(

    canvasId,

    labels,

    datasets

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"line",

        data:{

            labels,

            datasets

        },

        options:defaultOptions

    });

}

/*=========================
    STACKED BAR CHART
=========================*/

function createStackedBarChart(

    canvasId,

    labels,

    datasets

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"bar",

        data:{

            labels,

            datasets

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            scales:{

                x:{ stacked:true },

                y:{ stacked:true }

            }

        }

    });

}

/*=========================
    HORIZONTAL BAR
=========================*/

function createHorizontalBarChart(

    canvasId,

    labels,

    values,

    label

){

    const canvas=document.getElementById(canvasId);

    if(!canvas) return;

    return new Chart(canvas,{

        type:"bar",

        data:{

            labels,

            datasets:[{

                label,

                data:values,

                backgroundColor:chartColors.cyan

            }]

        },

        options:{

            ...defaultOptions,

            indexAxis:"y"

        }

    });

}

/*=========================
    DESTROY CHART
=========================*/

function destroyChart(chart){

    if(chart){

        chart.destroy();

    }

}

/*=========================
    UPDATE CHART DATA
=========================*/

function updateChart(chart,newLabels,newValues){

    if(!chart) return;

    chart.data.labels=newLabels;

    chart.data.datasets[0].data=newValues;

    chart.update();

}

/*=========================
    ADD DATA
=========================*/

function addChartData(chart,label,value){

    if(!chart) return;

    chart.data.labels.push(label);

    chart.data.datasets[0].data.push(value);

    chart.update();

}

/*=========================
    REMOVE LAST DATA
=========================*/

function removeLastChartData(chart){

    if(!chart) return;

    chart.data.labels.pop();

    chart.data.datasets[0].data.pop();

    chart.update();

}

/*=========================
    RANDOM DATA
=========================*/

function randomChartData(size){

    const data=[];

    for(let i=0;i<size;i++){

        data.push(

            Math.floor(

                Math.random()*100

            )

        );

    }

    return data;

}

/*=========================
    MONTH LABELS
=========================*/

function getMonthLabels(){

    return [

        "Jan",

        "Feb",

        "Mar",

        "Apr",

        "May",

        "Jun",

        "Jul",

        "Aug",

        "Sep",

        "Oct",

        "Nov",

        "Dec"

    ];

}
/*=========================================================
    CHART.JS
    PART 3
    Dashboard Charts • Export • Theme • Utilities
=========================================================*/

"use strict";

/*=========================
    CHART STORAGE
=========================*/

const chartInstances = {};

/*=========================
    ADMIN DASHBOARD
=========================*/

function loadAdminCharts(){

    chartInstances.adminChart = createDoughnutChart(

        "adminChart",

        ["Placed","Pending","Rejected"],

        [298,180,42]

    );

}

/*=========================
    STUDENT DASHBOARD
=========================*/

function loadStudentCharts(){

    chartInstances.studentChart = createBarChart(

        "studentChart",

        [

            "Applied",

            "Interview",

            "Selected",

            "Rejected"

        ],

        [

            18,

            5,

            2,

            3

        ],

        "Applications"

    );

}

/*=========================
    COMPANY DASHBOARD
=========================*/

function loadCompanyCharts(){

    chartInstances.companyChart = createLineChart(

        "companyChart",

        getMonthLabels(),

        [

            20,

            30,

            45,

            60,

            75,

            90,

            100,

            120,

            135,

            150,

            170,

            190

        ],

        "Applications"

    );

}

/*=========================
    PLACEMENT REPORT
=========================*/

function loadPlacementChart(){

    chartInstances.placementChart = createPieChart(

        "placementChart",

        [

            "Placed",

            "Not Placed",

            "Higher Studies"

        ],

        [

            300,

            180,

            40

        ]

    );

}

/*=========================
    REFRESH ALL
=========================*/

function refreshCharts(){

    Object.values(chartInstances)

    .forEach(chart=>{

        if(chart){

            chart.update();

        }

    });

}

/*=========================
    DESTROY ALL
=========================*/

function destroyAllCharts(){

    Object.values(chartInstances)

    .forEach(chart=>{

        destroyChart(chart);

    });

}

/*=========================
    EXPORT IMAGE
=========================*/

function exportChart(canvasId){

    const canvas = document.getElementById(canvasId);

    if(!canvas) return;

    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");

    link.download = canvasId + ".png";

    link.click();

}

/*=========================
    DOWNLOAD ALL
=========================*/

function exportAllCharts(){

    Object.keys(chartInstances)

    .forEach(id=>{

        exportChart(id);

    });

}

/*=========================
    THEME
=========================*/

function redrawCharts(){

    destroyAllCharts();

    initializeCharts();

}

/*=========================
    WINDOW RESIZE
=========================*/

window.addEventListener(

    "resize",

    ()=>{

        refreshCharts();

    }

);

/*=========================
    AUTO REFRESH
=========================*/

setInterval(

    ()=>{

        refreshCharts();

    },

    60000

);

/*=========================
    SAMPLE ANALYTICS
=========================*/

function analyticsSummary(){

    return{

        totalStudents:520,

        totalCompanies:82,

        totalJobs:146,

        placedStudents:298,

        placementRate:"57%"

    };

}

/*=========================
    INITIALIZATION
=========================*/

function initializeCharts(){

    loadAdminCharts();

    loadStudentCharts();

    loadCompanyCharts();

    loadPlacementChart();

}

document.addEventListener(

    "DOMContentLoaded",

    initializeCharts

);

/*=========================================================
    END OF CHART.JS
=========================================================*/