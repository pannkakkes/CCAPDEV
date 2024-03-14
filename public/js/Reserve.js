const Lab = function(name, backgroundColor, seatColor) {
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.seatColor = seatColor;
}

let labs = [];
let click = 0;
//0 if not clicked and it will become 1 when clicked

labs.push(new Lab("Freddy's Frightful Manor", "#a5a4a4", "#b4653a"));
labs.push(new Lab("Chica's Chilling Chamber", "#d0d0d0", "#e7a11c"));
labs.push(new Lab("Puppet's Perilous Palace", "#aba8a8", "#ba2828"));

document.addEventListener("DOMContentLoaded", () => {
    let currentLabIndex = 0;
    updateLabDetails(currentLabIndex);
    
    // Right arrow event listener
    document.querySelector("#rightArrow").addEventListener("click", function(e) {
        currentLabIndex = (currentLabIndex + 1) % labs.length;
        updateLabDetails(currentLabIndex);
    }); 

    // Left arrow event listener
    document.querySelector("#leftArrow").addEventListener("click", function(e) {
        currentLabIndex = (currentLabIndex - 1 + labs.length) % labs.length;
        updateLabDetails(currentLabIndex);
    });

    // Function to update lab details based on the current index
    function updateLabDetails(index) {
        let currentLab = labs[index];

        let labTitle = document.querySelector("#labTitle h1");
        let infoLabTitle = document.querySelector("#infoLabTitle");
        labTitle.textContent = currentLab.name;
        infoLabTitle.textContent = currentLab.name;
        labTitle.style.fontSize = "13px";

        document.querySelector("#selectLab").style.backgroundColor = currentLab.backgroundColor;

        let seats = document.querySelectorAll(".seats");
        seats.forEach(seat => {
            seat.style.backgroundColor = currentLab.seatColor;
        });
    }

    document.querySelector("#rightArrow").addEventListener("click", function(e) {
        currentLabIndex = (currentLabIndex + 1) % labs.length;
        updateLabDetails(currentLabIndex);
    }); 
    
    //errors in time and date
    document.getElementById("reserve").addEventListener("click", function(e) { 
        var selectedDate = new Date(document.getElementById("reservationDate").value);
        var currentDate = new Date();

        var startTime = document.getElementById("startTime").value;
        var endTime = document.getElementById("endTime").value;

        if (!selectedDate || isNaN(new Date(selectedDate))) {
            alert("Please select a valid date.");
            e.preventDefault(); 
        }
        else if (selectedDate < currentDate) {
            alert("Selected date must be today or later.");
            e.preventDefault(); 
        }        
        else if (startTime >= endTime) {
            alert("End time must be after start time.");
            e.preventDefault(); 
        }
        else if (click == 0) {
            alert("Select a seat number");
            e.preventDefault(); 
        }
        else{
            alert("Reservation Success");
        }
        
    });    

    document.querySelector("#seat1").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 1"
        click = 1;
    });
    document.querySelector("#seat2").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 2"
        click = 1;
    });
    document.querySelector("#seat3").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 3"
        click = 1;
    });
    document.querySelector("#seat4").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 4"
        click = 1;
    });
    document.querySelector("#seat5").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 5"
        click = 1;
    });
    document.querySelector("#seat6").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 6"
        click = 1;
    });
    document.querySelector("#seat7").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 7"
        click = 1;
    });
    document.querySelector("#seat8").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 8"
        click = 1;
    });
    document.querySelector("#seat9").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 9"
        click = 1;
    });
    document.querySelector("#seat10").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 10"
        click = 1;
    });

});


