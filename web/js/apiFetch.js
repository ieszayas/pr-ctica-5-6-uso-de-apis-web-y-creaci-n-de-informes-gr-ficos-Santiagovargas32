document.addEventListener("DOMContentLoaded", async () => {
    const API_KEY = "i8lEGWNN9A8667U5OBCavw==gtRNtvbINvdHTD1G";
    const tableBody = document.getElementById("carTableBody");
    const searchInput = document.getElementById("searchInput");
    const loadingSpinner = document.getElementById("loadingSpinner");

    const carBrands = ["Toyota", "Ford", "Audi", "BMW", "Mercedes-Benz", "Honda"];

    // Uso de fetch para recuperar datos de la API
    async function fetchCars(brand) {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/cars?make=${brand}`, {
                headers: { "X-Api-Key": API_KEY }
            });

            if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener datos`);

            // Procesa la respuesta con .json()
            return await response.json();
        } catch (error) {
            console.error("Error al obtener datos de la API:", error.message);
            return [];
        }
    }

    async function loadCars() {
        tableBody.innerHTML = ""; // Limpia la tabla antes de cargar nuevos datos
        loadingSpinner.style.display = "block"; // Indicación de carga antes de obtener los datos

        let counter = 1;

        for (const brand of carBrands) {
            try {
                const cars = await fetchCars(brand);
                cars.forEach(car => {
                    // Creación de elementos HTML dinámicos (filas de la tabla)
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${counter++}</td>
                        <td>${car.model}</td>
                        <td>${car.year}</td>
                        <td>${car.class}</td>
                        <td>${car.price ? `$${car.price.toLocaleString()}` : "N/A"}</td>
                    `;

                    // Añade las filas a la tabla usando funciones del DOM
                    tableBody.appendChild(row);
                });
            } catch (error) {
                console.error(`Error cargando coches de ${brand}:`, error.message);
            }
        }

        loadingSpinner.style.display = "none"; // Oculta el spinner cuando termina la carga
    }

    // Búsqueda en la tabla en tiempo real (mejora la accesibilidad y usabilidad)
    searchInput.addEventListener("keyup", function () {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    });

    await loadCars(); // Carga inicial de los datos al abrir la web
});
