document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("reserve-button").addEventListener("click", function(e) { 
        var selectedDate = new Date(document.getElementById("date").value);
        var currentDate = new Date();
        var role = document.getElementById("role").textContent.trim(); // Get the role from the hidden div
        var roleInput = document.getElementById("name").textContent.trim(); // Get the username from the div with id "name"
        var seatValue = document.getElementById("seat").value;

        if (!selectedDate || isNaN(selectedDate)) {
            alert("Please select a valid date.");
            e.preventDefault(); 
        }
        else if (selectedDate < currentDate) {
            alert("Selected date must be today or later.");
            e.preventDefault(); 
        }        
        else if (seatValue === "choose-seat") {
            alert("Please select a seat number.");
            e.preventDefault(); 
        }
        else if (role === 'T' && !roleInput) {
            alert("Please enter a student name.");
            e.preventDefault();
        }
        else {
            alert("Reservation Success");
        }
    }); 
});
