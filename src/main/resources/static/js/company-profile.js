const BASE_URL = "/api";

const companyId = localStorage.getItem("companyId");

document.addEventListener("DOMContentLoaded", () => {

    if (!companyId) {

        alert("Please Login");

        window.location.href = "/login";

        return;

    }

    loadCompany();

});

async function loadCompany() {

    try {

        const response = await fetch(`${BASE_URL}/companies/${companyId}`);

        const company = await response.json();

        document.getElementById("companyName").value = company.companyName;
        document.getElementById("email").value = company.email;
        document.getElementById("password").value = company.password;
        document.getElementById("phone").value = company.phone;
        document.getElementById("location").value = company.location;
        document.getElementById("description").value = company.description;

    }

    catch (error) {

        console.log(error);

    }

}

document.getElementById("companyProfileForm").addEventListener("submit", updateCompany);

async function updateCompany(e) {

    e.preventDefault();

    const company = {

        companyId: companyId,

        companyName: document.getElementById("companyName").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        phone: document.getElementById("phone").value,

        location: document.getElementById("location").value,

        description: document.getElementById("description").value

    };

    try {

        const response = await fetch(`${BASE_URL}/companies/${companyId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(company)

        });

        if (response.ok) {

            localStorage.setItem("companyName", company.companyName);

            alert("Profile Updated Successfully");

        }

        else {

            alert("Unable to Update");

        }

    }

    catch (error) {

        console.log(error);

    }

}

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}
