// themeToggle.js
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("themeToggle");
    const body = document.body;

    function toggleTheme() {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            themeToggleButton.textContent = "Modo Oscuro";
            themeToggleButton.classList.replace("btn-outline-light", "btn-outline-dark");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.add("dark-mode");
            themeToggleButton.textContent = "Modo Claro";
            themeToggleButton.classList.replace("btn-outline-dark", "btn-outline-light");
            localStorage.setItem("theme", "dark");
        }
    }

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggleButton.textContent = "Modo Claro";
        themeToggleButton.classList.replace("btn-outline-dark", "btn-outline-light");
    }

    themeToggleButton.addEventListener("click", toggleTheme);
});
