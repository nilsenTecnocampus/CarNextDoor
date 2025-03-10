document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const logo = document.getElementById("logo");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const locationBtn = document.getElementById("locationBtn");
    const pickupBtn = document.getElementById("pickupBtn");
    const returnBtn = document.getElementById("returnBtn");
    const mapModal = document.getElementById("mapModal");
    const pickupModal = document.getElementById("pickupModal");
    const returnModal = document.getElementById("returnModal");
    const closeModal = document.querySelectorAll(".close");
    const locationInput = document.getElementById("locationInput");
    const pickupDate = document.getElementById("pickupDate");
    const returnDate = document.getElementById("returnDate");
    const navIcons = document.getElementById("navIcons");
    const homeIcon = document.getElementById("homeIcon");
    const paymentIcon = document.getElementById("paymentIcon");
    const userIcon = document.getElementById("userIcon");
    const carItems = document.querySelectorAll(".car-item");
    let map;
    let marker;

    // Comprova si l'usuari està loguejat
    if (sessionStorage.getItem("loggedIn") === "true") {
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        navIcons.style.display = "flex";
    }

    menuToggle.addEventListener("click", function (event) {
        sidebar.classList.toggle("open");
        event.stopPropagation(); // Evita que l'event es propagui al document
    });

    logo.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    loginBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });

    registerBtn.addEventListener("click", function () {
        sessionStorage.setItem("loggedIn", "true");
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        navIcons.style.display = "flex";
    });

    homeIcon.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    paymentIcon.addEventListener("click", function () {
        window.location.href = "cards.html";
    });

    userIcon.addEventListener("click", function () {
        window.location.href = "user.html";
    });

    document.addEventListener("click", function (event) {
        if (sidebar.classList.contains("open") && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove("open");
        }
    });

    locationBtn.addEventListener("click", function () {
        mapModal.style.display = "block";
        initMap();
    });

    pickupBtn.addEventListener("click", function () {
        pickupModal.style.display = "block";
        flatpickr(pickupDate, {
            enableTime: false,
            dateFormat: "Y-m-d",
        });
    });

    returnBtn.addEventListener("click", function () {
        returnModal.style.display = "block";
        flatpickr(returnDate, {
            enableTime: false,
            dateFormat: "Y-m-d",
        });
    });

    closeModal.forEach(function (element) {
        element.addEventListener("click", function () {
            mapModal.style.display = "none";
            pickupModal.style.display = "none";
            returnModal.style.display = "none";
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target == mapModal) {
            mapModal.style.display = "none";
        }
        if (event.target == pickupModal) {
            pickupModal.style.display = "none";
        }
        if (event.target == returnModal) {
            returnModal.style.display = "none";
        }
    });

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -37.816279, lng: 144.953735 },
            zoom: 14,
        });

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
        });

        const autocomplete = new google.maps.places.Autocomplete(locationInput);
        autocomplete.bindTo("bounds", map);

        autocomplete.addListener("place_changed", function () {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
        });
    }

    // Afegeix esdeveniment de clic als elements de cotxe
    carItems.forEach(function (carItem) {
        carItem.addEventListener("click", function () {
            const carData = carItem.getAttribute("data-car");
            sessionStorage.setItem("selectedCar", carData);
            window.location.href = "car-detail.html";
        });
    });
});
