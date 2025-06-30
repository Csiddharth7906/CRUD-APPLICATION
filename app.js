// student.js
const API_URL = "http://localhost:3000/students";

let currentEditId = null;

// Fetch and display students
document.addEventListener("DOMContentLoaded", () => {
  fetchStudents();
  document.getElementById("addStudentBtn").addEventListener("click", addStudent);
  document.getElementById("saveEditBtn").addEventListener("click", saveEdit);
  document.getElementById("cancelEditBtn").addEventListener("click", () => toggleModal("editModal", false));
  document.getElementById("cancelDeleteBtn").addEventListener("click", () => toggleModal("deleteModal", false));
});

async function fetchStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  const tableBody = document.getElementById("studentTableBody");
  const cardContainer = document.getElementById("studentCardContainer");
  const total = document.getElementById("totalStudents");
  const emptyState = document.getElementById("emptyState");

  tableBody.innerHTML = "";
  cardContainer.innerHTML = "";
  total.textContent = students.length;

  if (students.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  students.forEach(student => {
    const { _id, name, roll, class: studentClass, marks } = student;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4 text-sm text-gray-900">${name}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${roll}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${studentClass}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${marks}</td>
      <td class="px-6 py-4 text-sm space-x-2">
        <button onclick="openEdit('${_id}', '${name}', '${roll}', '${studentClass}', ${marks})" class="edit-btn bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Edit</button>
        <button onclick="openDelete('${_id}')" class="delete-btn bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">Delete</button>
      </td>`;
    tableBody.appendChild(row);

    const card = document.createElement("div");
    card.className = "bg-gray-50 rounded-lg p-4 border hover:shadow-md";
    card.innerHTML = `
      <div class="flex justify-between mb-3">
        <div>
          <h3 class="font-semibold text-lg">${name}</h3>
          <p class="text-sm text-gray-600">Roll: ${roll}</p>
        </div>
        <span class="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">${marks}</span>
      </div>
      <p class="text-sm text-gray-600 mb-3">Class: <span class="font-medium">${studentClass}</span></p>
      <div class="flex space-x-2">
        <button onclick="openEdit('${_id}', '${name}', '${roll}', '${studentClass}', ${marks})" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit</button>
        <button onclick="openDelete('${_id}')" class="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
      </div>`;
    cardContainer.appendChild(card);
  });
}

async function addStudent() {
  const name = document.getElementById("studentName").value;
  const roll = document.getElementById("rollNumber").value;
  const studentClass = document.getElementById("studentClass").value;
  const marks = document.getElementById("marks").value;

  if (!name || !roll || !studentClass || marks === "") return alert("All fields are required.");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, roll, class: studentClass, marks: parseInt(marks) })
  });

  document.querySelector("form").reset();
  fetchStudents();
}

function openEdit(id, name, roll, studentClass, marks) {
  currentEditId = id;
  document.getElementById("editName").value = name;
  document.getElementById("editRollNumber").value = roll;
  document.getElementById("editClass").value = studentClass;
  document.getElementById("editMarks").value = marks;
  toggleModal("editModal", true);
}

async function saveEdit() {
  const updated = {
    name: document.getElementById("editName").value,
    roll: document.getElementById("editRollNumber").value,
    class: document.getElementById("editClass").value,
    marks: parseInt(document.getElementById("editMarks").value)
  };

  await fetch(`${API_URL}/${currentEditId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  });

  toggleModal("editModal", false);
  fetchStudents();
}

function openDelete(id) {
  currentEditId = id;
  toggleModal("deleteModal", true);
  document.getElementById("confirmDeleteBtn").onclick = async () => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    toggleModal("deleteModal", false);
    fetchStudents();
  };
}

function toggleModal(id, show) {
  document.getElementById(id).classList.toggle("hidden", !show);
}
