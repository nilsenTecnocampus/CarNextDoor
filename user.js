document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const usernameInput = document.getElementById("username");
    const navIcons = document.getElementById("navIcons");

    // Comprova si l'usuari està loguejat
    if (sessionStorage.getItem("loggedIn") === "true") {
        navIcons.style.display = "flex";
    }

    // Carrega el nom d'usuari des de la memòria
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }

    userForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita l'enviament del formulari per defecte

        // Guarda el nom d'usuari a la memòria
        const username = usernameInput.value;
        localStorage.setItem("username", username);

        alert("Canvis guardats!");
    });

    // Navegació de les icones
    const homeIcon = document.getElementById("homeIcon");
    const paymentIcon = document.getElementById("paymentIcon");
    const userIcon = document.getElementById("userIcon");

    homeIcon.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    paymentIcon.addEventListener("click", function () {
        window.location.href = "cards.html";
    });

    userIcon.addEventListener("click", function () {
        window.location.href = "user.html";
    });
});
