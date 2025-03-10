document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita l'enviament del formulari per defecte

        // Aquí pots afegir la validació de les dades del formulari si cal

        // Emmagatzema l'estat de sessió
        sessionStorage.setItem("loggedIn", "true");

        // Redirigeix a la pàgina principal
        window.location.href = "index.html";
    });
});
