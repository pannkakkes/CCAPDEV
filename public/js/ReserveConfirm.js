function name(user){
    var reservationByElement = document.getElementById("reservationBy");
    reservationByElement.textContent = 'Reservation by: ' + user.username;
}

document.getElementById('labTitle').textContent = getLab();
document.getElementById('selectedDay').textContent = "Day: " + getDay();

document.addEventListener("DOMContentLoaded", function () {
    var currentUser = getCurrentUser();

    if (currentUser) {
        name(currentUser);
    }
});



document.getElementById("final-reserve").addEventListener("click", function(event) {
    alert("Reservation successful!");
});

//Reading submissions
$(document).ready(function() {
    var form = $("#confirmReservation");

    //Prevents resetting of form when enter is pressed
    form.on("keypress", function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    //Submitting the reservation
    $("#final-reserve").on("click", function(event) {
        var currentUser = getCurrentUser(); 
        var reserveID = 1;
        var userName = currentUser.username;
        var labTitle = $("#labTitle").val();
        var roomNumber = $("#roomNumber").val();
        var selectedTime = $("#selectedTime").val();
        var selectedSeatNumber = $("#selectedSeatNumber").val();
        var isAnonymous = $("#anonymous input[type=checkbox]").is(":checked");
        var submissionDateTime = new Date().toISOString();

        var isValid = true;
        if (isValid) {
            alert("Reservation successful!");
        } else {
            event.preventDefault(); // Prevent the form from submitting if not valid
        }
    });
});
