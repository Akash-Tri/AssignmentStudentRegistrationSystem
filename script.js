document.addEventListener("DOMContentLoaded", loadStudents);

document.getElementById("student-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let studentId = document.getElementById("student-id").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Student name should contain only letters.");
        return;
    }
    if (!/^\d+$/.test(studentId)) {
        alert("Student ID should contain only numbers.");
        return;
    }
    if (!/^\d{10}$/.test(contact)) {
        alert("Contact number should be exactly 10 digits.");
        return;
    }

    let student = { name, studentId, email, contact };
    saveStudent(student);
    displayStudent(student);
    document.getElementById("student-form").reset();
});

function saveStudent(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(displayStudent);
}

function displayStudent(student) {
    let table = document.getElementById("student-table").getElementsByTagName("tbody")[0];
    let row = table.insertRow();
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="edit" onclick="editStudent(this)">Edit</button>
            <button class="delete" onclick="deleteStudent(this)">Delete</button>
        </td>
    `;
}

function editStudent(button) {
    let row = button.parentElement.parentElement;
    document.getElementById("name").value = row.cells[0].innerText;
    document.getElementById("student-id").value = row.cells[1].innerText;
    document.getElementById("email").value = row.cells[2].innerText;
    document.getElementById("contact").value = row.cells[3].innerText;
    row.remove();
}

function deleteStudent(button) {
    let row = button.parentElement.parentElement;
    let studentId = row.cells[1].innerText;
    let students = JSON.parse(localStorage.getItem("students")) || [];
    localStorage.setItem("students", JSON.stringify(students.filter(s => s.studentId !== studentId)));
    row.remove();
}
