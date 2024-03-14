document.getElementById('labTitle').textContent = getLab();
document.getElementById('selectedDay').textContent = "Day: " + getDay();

document.addEventListener("DOMContentLoaded", function () {
    var currentUser = getCurrentUser();

    if (currentUser) {
        name(currentUser);
    }
});

function name(user){
    var reservationByElement = document.getElementById("reservationBy");
    reservationByElement.textContent = 'Reservation by: ' + user.username;
}

document.getElementById("final-reserve").addEventListener("click", function(event) {
    alert("Reservation successful!");
});