document.addEventListener("DOMContentLoaded", function () {
    const carImage = document.getElementById("carImage");
    const carName = document.getElementById("carName");
    const carInfo = document.getElementById("carInfo");
    const carPriceValue = document.getElementById("carPriceValue");
    const carWeeklyPriceValue = document.getElementById("carWeeklyPriceValue");
    const selectDaysBtn = document.getElementById("selectDaysBtn");
    const calendarModal = document.getElementById("calendarModal");
    const closeModal = document.querySelector(".close");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const cardSelect = document.getElementById("cardSelect");
    const makePaymentBtn = document.getElementById("makePaymentBtn");

    // Carrega la informació del cotxe des de la memòria
    const carDetails = JSON.parse(sessionStorage.getItem("selectedCar"));
    if (carDetails) {
        carImage.src = carDetails.image;
        carName.textContent = carDetails.name;
        carInfo.textContent = carDetails.info;
        carPriceValue.textContent = carDetails.price;
        carWeeklyPriceValue.textContent = carDetails.weeklyPrice;
    }

    // Carrega les targetes de crèdit des de la memòria
    const savedCards = JSON.parse(localStorage.getItem("creditCards")) || [];
    savedCards.forEach(card => {
        const option = document.createElement("option");
        option.value = card.cardNumber;
        option.textContent = `**** **** **** ${card.cardNumber.slice(-4)}`;
        cardSelect.appendChild(option);
    });

    selectDaysBtn.addEventListener("click", function () {
        calendarModal.style.display = "block";
        flatpickr(startDate, {
            enableTime: false,
            dateFormat: "Y-m-d",
        });
        flatpickr(endDate, {
            enableTime: false,
            dateFormat: "Y-m-d",
        });
    });

    closeModal.addEventListener("click", function () {
        calendarModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == calendarModal) {
            calendarModal.style.display = "none";
        }
    });

    makePaymentBtn.addEventListener("click", function () {
        alert("Pagament realitzat amb èxit!");
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

    // Comprova si l'usuari està loguejat
    if (sessionStorage.getItem("loggedIn") === "true") {
        document.getElementById("navIcons").style.display = "flex";
    }
    document.getElementById("navIcons").style.display = "flex";
});
