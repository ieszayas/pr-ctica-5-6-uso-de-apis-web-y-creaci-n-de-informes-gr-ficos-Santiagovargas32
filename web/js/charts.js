// Esperamos a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", async () => {
    // Obtenemos el contexto del canvas donde se renderizará el gráfico
    const ctx = document.getElementById("carTypeChart").getContext("2d");

    // Lista de marcas de coches que vamos a consultar en la API
    const carBrands = ["Toyota", "Ford", "Audi", "BMW", "Mercedes-Benz", "Honda"];

    // Clave de la API para hacer las peticiones
    const API_KEY = "i8lEGWNN9A8667U5OBCavw==gtRNtvbINvdHTD1G";

    // Función asincrónica para obtener los coches de una marca específica
    async function fetchCars(brand) {
        try {
            // Realizamos la solicitud a la API con la marca como parámetro
            const response = await fetch(`https://api.api-ninjas.com/v1/cars?make=${brand}`, {
                headers: { "X-Api-Key": API_KEY } // Agregamos la clave en los headers
            });

            // Si la respuesta no es exitosa, lanzamos un error con el código HTTP
            if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener datos`);

            // Convertimos la respuesta en formato JSON y la retornamos
            return await response.json();
        } catch (error) {
            // Capturamos errores y los mostramos en consola
            console.error("Error al obtener datos de la API:", error.message);
            return []; // Retornamos un array vacío en caso de error
        }
    }

    // Función para generar el gráfico con los datos obtenidos de la API
    async function generateChart() {
        const carTypesCount = {}; // Objeto para contar la cantidad de coches por tipo (class)

        // Iteramos sobre cada marca de coche
        for (const brand of carBrands) {
            const cars = await fetchCars(brand); // Obtenemos los coches de la API

            // Iteramos sobre los coches obtenidos para agruparlos por tipo (class)
            cars.forEach(car => {
                const type = car.class || "Desconocido"; // Si no tiene clase, se asigna "Desconocido"
                carTypesCount[type] = (carTypesCount[type] || 0) + 1; // Incrementamos el contador del tipo
            });
        }

        // Extraemos los nombres de los tipos de coches (las claves del objeto)
        const labels = Object.keys(carTypesCount);

        // Extraemos las cantidades de cada tipo de coche (los valores del objeto)
        const data = Object.values(carTypesCount);

        // Creamos el gráfico de barras con Chart.js
        new Chart(ctx, {
            type: "bar", // Tipo de gráfico: Barras
            data: {
                labels: labels, // Etiquetas del eje X (tipos de coches)
                datasets: [{
                    label: "Cantidad de Coches por Tipo", // Etiqueta del conjunto de datos
                    data: data, // Datos en el eje Y (cantidad de coches por tipo)
                    backgroundColor: "rgba(54, 162, 235, 0.5)", // Color de las barras con opacidad
                    borderColor: "rgba(54, 162, 235, 1)", // Color del borde de las barras
                    borderWidth: 1 // Grosor del borde
                }]
            },
            options: {
                responsive: true, // Hace que el gráfico sea adaptable al tamaño de la pantalla
                scales: {
                    y: {
                        beginAtZero: true // El eje Y comienza desde 0
                    }
                }
            }
        });
    }

    // Llamamos a la función para generar el gráfico después de cargar los datos
    await generateChart();
});
