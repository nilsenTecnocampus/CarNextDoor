document.addEventListener("DOMContentLoaded", function () {
    const addCardForm = document.getElementById("addCardForm");
    const cardsContainer = document.getElementById("cardsContainer");

    // Carrega les targetes de crèdit des de la memòria
    const savedCards = JSON.parse(localStorage.getItem("creditCards")) || [];
    savedCards.forEach(card => addCardToDOM(card));

    addCardForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita l'enviament del formulari per defecte

        // Obté les dades de la nova targeta
        const cardNumber = document.getElementById("cardNumber").value;
        const cardHolder = document.getElementById("cardHolder").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

        const newCard = { cardNumber, cardHolder, expiryDate, cvv };

        // Afegeix la nova targeta a la memòria
        savedCards.push(newCard);
        localStorage.setItem("creditCards", JSON.stringify(savedCards));

        // Afegeix la nova targeta al DOM
        addCardToDOM(newCard);

        // Neteja el formulari
        addCardForm.reset();
    });

    function addCardToDOM(card) {
        const cardItem = document.createElement("div");
        cardItem.classList.add("card-item");

        const cardImage = document.createElement("img");
        cardImage.src = "./imatges/Card 2.png"; // Ruta de la imatge dins de la carpeta imatges

        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");

        // Mostra només els últims quatre dígits del número de la targeta
        const maskedCardNumber = `**** **** **** ${card.cardNumber.slice(-4)}`;

        cardInfo.innerHTML = `
            <p>Número: ${maskedCardNumber}</p>
            <p>Titular: ${card.cardHolder}</p>
            <p>Caducitat: ${card.expiryDate}</p>
        `;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Eliminar Targeta";
        deleteBtn.addEventListener("click", function () {
            // Elimina la targeta de la memòria
            const index = savedCards.indexOf(card);
            if (index > -1) {
                savedCards.splice(index, 1);
                localStorage.setItem("creditCards", JSON.stringify(savedCards));
            }

            // Elimina la targeta del DOM
            cardsContainer.removeChild(cardItem);
        });

        cardItem.appendChild(cardImage);
        cardItem.appendChild(cardInfo);
        cardItem.appendChild(deleteBtn);

        cardsContainer.appendChild(cardItem);
    }

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
});
