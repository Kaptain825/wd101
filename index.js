let userForm = document.getElementById("form1");

const email = document.getElementById("Email");
email.addEventListener("input", () => validate_email(email));

let userEntries = retrieve_items(); 

function validate_email(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("The Email is not in correct format");
    } else {
        element.setCustomValidity("");
    }
}

const retrieve_items = () =>{
    let entries = localStorage.getItem("user-entries");
    if (entries){
        entries = JSON.parse(entries);
    }
    else{
        entries = [];
    }
    return entries;
}

function validate_dob(dob){
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 18 || age > 55){
        dob.setCustomValidity("Age must be between 18 and 55");
    }
    else{
        dobElement.setCustomValidity(""); 
    }
}

const display = () => {
    const entries = retrieve_items();
    entries.map((entry) => {
        const name = `<td class='border px-2 py-2'> ${entry.name} </td>`;
        const email = `<td class='border px-2 py-2'> ${entry.email} </td>`;
        const password = `<td class='border px-2 py-2'> ${entry.password} </td>`;
        const dob = `<td class='border px-2 py-2'> ${entry.dob} </td>`;
        const accepted_terms_and_conditions = `<td class='border px-2 py-2'> ${entry.accepted_terms_and_conditions} </td>`;

        const row = `<tr>${name}${email}${password}${dob}${accepted_terms_and_conditions}</tr>`;
        return row;
    }).join("\n");

    let details = document.getElementById("user-entries");
    details.innerHTML=table;
}

const saveuserform = (event) => {
    event.preventDefault();
    const name = getElementById("name").value;
    const email = getElementById("Email").value;
    const password = getElementById("Passowrd").value;
    const dob = getElementById("dob").value;
    const box = getElementById("checkbox").checked;

    if (!validate_dob(dob)) {
        dob.setCustomValidity("The Email is not in correct format");("You must be between 18 and 55 years old.");
        return;
    }

    if (!validate_email(email)) {
        return;
    }

    const entry = {
        name:name,
        email:email,
        password:password,
        date_of_birth:dob,
        accepted_terms_and_conditions:box
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    display();
}

userForm.addEventListener("submit",saveuserform)
display();
