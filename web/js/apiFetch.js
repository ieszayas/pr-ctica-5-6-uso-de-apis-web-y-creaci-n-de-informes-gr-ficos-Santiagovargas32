// apiFetch.js
document.addEventListener("DOMContentLoaded", async () => {
    const API_KEY = "i8lEGWNN9A8667U5OBCavw==gtRNtvbINvdHTD1G";
    const tableBody = document.querySelector("tbody");
    const searchInput = document.getElementById("searchInput");

    const carBrands = ["Toyota", "Ford", "Audi", "BMW", "Mercedes-Benz", "Honda"];

    async function fetchCars(brand) {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/cars?make=${brand}`, {
                headers: { "X-Api-Key": API_KEY }
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener datos:", error);
            return [];
        }
    }

    async function loadCars() {
        tableBody.innerHTML = "";
        let counter = 1;

        for (const brand of carBrands) {
            const cars = await fetchCars(brand);
            cars.forEach(car => {
                const row = `
                    <tr>
                        <td>${counter++}</td>
                        <td>${car.model}</td>
                        <td>${car.year}</td>
                        <td>${car.class}</td>
                        <td>${car.price ? `$${car.price.toLocaleString()}` : "N/A"}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }

    searchInput.addEventListener("keyup", function () {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    });

    await loadCars();
});
