// formValidation.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const clearButton = document.getElementById("clearForm");
    const toastElement = document.getElementById("toastNotification");
    const toast = new bootstrap.Toast(toastElement);

    // Validaciones adicionales
    function validateForm() {
        let isValid = true;
        const nameInput = document.getElementById("name");
        const nameError = document.getElementById("nameError");
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(nameInput.value)) {
            nameError.textContent = "El nombre solo puede contener letras y espacios.";
            nameError.classList.remove("d-none");
            isValid = false;
        } else {
            nameError.classList.add("d-none");
        }

        const dobInput = document.getElementById("dob");
        const dobError = document.getElementById("dobError");
        const minDate = new Date("1900-01-01");
        const maxDate = new Date();
        const dob = new Date(dobInput.value);
        if (dob < minDate || dob > maxDate || isNaN(dob)) {
            dobError.textContent = "La fecha debe estar entre 1900-01-01 y hoy.";
            dobError.classList.remove("d-none");
            isValid = false;
        } else {
            dobError.classList.add("d-none");
        }

        const checkbox = document.getElementById("subscribe");
        const checkboxError = document.getElementById("checkboxError");
        if (!checkbox.checked) {
            checkboxError.textContent = "Debe aceptar los términos y condiciones.";
            checkboxError.classList.remove("d-none");
            isValid = false;
        } else {
            checkboxError.classList.add("d-none");
        }

        const phoneInput = document.getElementById("phone");
        const phoneError = document.getElementById("phoneError");
        const phoneRegex = /^[0-9]{9,}$/;  
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.textContent = "El teléfono debe contener al menos 9 dígitos.";
            phoneError.classList.remove("d-none");
            isValid = false;
        } else {
            phoneError.classList.add("d-none");
        }

        return isValid;
    }

    function showToast(message) {
        const toastBody = toastElement.querySelector(".toast-body");
        toastBody.textContent = message;
        toast.show();
    }

    clearButton.addEventListener("click", function () {
        form.reset();
        showToast("Todos los campos se han borrado correctamente.");
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
            showToast("Formulario enviado correctamente.");
            setTimeout(() => form.reset(), 4000);
        } else {
            showToast("Por favor, corrija los errores antes de enviar.");
        }
    });
});
