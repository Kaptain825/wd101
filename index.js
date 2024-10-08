let userForm = document.getElementById("form1");
const email = document.getElementById("email");
const dobElement = document.getElementById("dob");

email.addEventListener("input", () => validate_email(email));

function validate_email(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("The Email is not in correct format");
    } else {
        element.setCustomValidity("");
    }
}

const retrieve_items = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieve_items(); 

function validate_dob(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 18 || age > 55) {
        return false;
    }
    return true;
}

const display = () => {
    const entries = retrieve_items();
    const rows = entries.map((entry) => {
        const name = `<td class='border px-2 py-2'>${entry.name}</td>`;
        const email = `<td class='border px-2 py-2'>${entry.email}</td>`;
        const password = `<td class='border px-2 py-2'>${entry.password}</td>`;
        const dob = `<td class='border px-2 py-2'>${entry.date_of_birth}</td>`;
        const accepted_terms_and_conditions = `<td class='border px-2 py-2'>${entry.accepted_terms_and_conditions}</td>`;
        return `<tr>${name}${email}${password}${dob}${accepted_terms_and_conditions}</tr>`;
    }).join("\n");

    const tbody = document.querySelector("#user-entries tbody");
    tbody.innerHTML = rows;
};

const saveuserform = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const box = document.getElementById("terms").checked;

    if (!validate_dob(dob)) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    validate_email(email);

    const entry = {
        name: name,
        email: emailValue,
        password: password,
        date_of_birth: dob,
        accepted_terms_and_conditions: box
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    display();
}

userForm.addEventListener("submit", saveuserform);
display();
