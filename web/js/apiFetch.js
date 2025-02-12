document.addEventListener("DOMContentLoaded", async () => {
    const API_KEY = "i8lEGWNN9A8667U5OBCavw==gtRNtvbINvdHTD1G";
    const tableBody = document.getElementById("carTableBody");
    const searchInput = document.getElementById("searchInput");
    const loadingSpinner = document.getElementById("loadingSpinner");

    const carBrands = ["Toyota", "Ford", "Audi", "BMW", "Mercedes-Benz", "Honda"];

    // Función para obtener los datos de la API
    async function fetchCars(brand) {
        try {
            console.log(`Solicitando datos para la marca: ${brand}`); // Ver el inicio de la solicitud
            const response = await fetch(`https://api.api-ninjas.com/v1/cars?make=${brand}`, {
                headers: { "X-Api-Key": API_KEY }
            });

            if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener datos`);

            // Procesa la respuesta en formato JSON
            const data = await response.json();
            console.log(`Datos recibidos para ${brand}:`, data); // Ver los datos recibidos de la API
            return data;
        } catch (error) {
            console.error("Error al obtener datos de la API:", error.message);
            return [];
        }
    }

    // Función para cargar todos los coches
    async function loadCars() {
        console.log("Iniciando carga de coches..."); // Mensaje para indicar que se comienza la carga
        tableBody.innerHTML = ""; // Limpia la tabla antes de cargar nuevos datos
        loadingSpinner.style.display = "block"; // Muestra el spinner de carga

        let counter = 1;

        // Recorre todas las marcas de coches y obtiene los datos
        for (const brand of carBrands) {
            try {
                console.log(`Cargando coches de la marca: ${brand}`); // Indica qué marca se está cargando
                const cars = await fetchCars(brand);

                // Verifica si se recibieron coches antes de intentar agregarlos a la tabla
                if (cars.length === 0) {
                    console.log(`No se encontraron coches para ${brand}`); // Si no hay coches, mostrar mensaje
                    continue; // Salta a la siguiente marca
                }

                cars.forEach(car => {
                    console.log(`Coche encontrado: ${car.model}, Año: ${car.year}, Precio: ${car.price}`); // Muestra detalles del coche
                    // Crear fila dinámica para cada coche
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${counter++}</td>
                        <td>${car.model}</td>
                        <td>${car.year}</td>
                        <td>${car.class}</td>
                        <td>${car.price ? `$${car.price.toLocaleString()}` : "N/A"}</td>
                    `;

                    // Añadir la fila a la tabla
                    tableBody.appendChild(row);
                });
            } catch (error) {
                console.error(`Error cargando coches de ${brand}:`, error.message); // Captura errores específicos por marca
            }
        }

        loadingSpinner.style.display = "none"; // Oculta el spinner cuando termina la carga
        console.log("Carga de coches completada"); // Mensaje de finalización
    }

    // Función de búsqueda en la tabla en tiempo real
    searchInput.addEventListener("keyup", function () {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        // Filtra las filas según el texto ingresado
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });

        console.log(`Filtrando resultados con: ${filter}`); // Ver qué palabra se está buscando
    });

    await loadCars(); // Carga inicial de los datos al abrir la web
});
