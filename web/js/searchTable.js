// searchTable.js
const searchInput = document.getElementById("searchInput");
const tableRows = document.querySelectorAll(".table tbody tr");

searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    let found = false;

    tableRows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
        if (rowText.includes(query)) {
            found = true;
            row.style.display = "";
            row.style.backgroundColor = "#fffa90"; 
            setTimeout(() => row.style.backgroundColor = "", 2000);
            row.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            row.style.display = "none";
        }
    });

    if (!found && query !== "") {
        console.log("No se encontraron coincidencias.");
    }

    if (query === "") {
        tableRows.forEach(row => (row.style.display = ""));
    }
});
