const tableBody = document.getElementById("data-table-body");

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderTable(data);
    })
    .catch(error => {
        console.log("Error fetching data:", error);
    });

function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(student => {
        const row = `
            <tr>
                <th scope="row">${student.id}</th>
                <td class="editable-name">${student.name}</td>
                <td class="editable-course">${student.course}</td>
                <td><button class="btn btn-sm btn-dark edit-btn">edit</button></td>
                <td><button class="btn btn-sm btn-danger delete-btn">delete</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Event delegation for edit/delete buttons
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        const button = e.target;
        const row = button.closest("tr");
        const nameCell = row.querySelector(".editable-name");
        const courseCell = row.querySelector(".editable-course");

        if (button.innerText === "edit") {
                                               // Enable editing
            nameCell.contentEditable = "true";
            courseCell.contentEditable = "true";
            nameCell.focus();
            button.innerText = "save";
            button.classList.remove("btn-dark");
            button.classList.add("btn-success");
        } else {
                                                // Save changes
            nameCell.contentEditable = "false";
            courseCell.contentEditable = "false";
            button.innerText = "edit";
            button.classList.remove("btn-success");
            button.classList.add("btn-dark");

            console.log("Updated Data:", {
                id: row.cells[0].innerText,
                name: nameCell.innerText,
                course: courseCell.innerText
            });
        }
    } else if (e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        if (confirm("Are you sure you want to delete this row?")) {
            row.remove();
            updateIDs();
        }
    }
});

function updateIDs() {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.querySelector("th").innerText = index + 1;
    });
}
