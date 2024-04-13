const Lab = function(name, backgroundColor, seatColor) {
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.seatColor = seatColor;
}

let labs = [];
let click = 0;
let role = 'S';
//0 if not clicked and it will become 1 when clicked

labs.push(new Lab("Freddy's Frightful Manor", "#a5a4a4", "#b4653a"));
labs.push(new Lab("Chica's Chilling Chamber", "#d0d0d0", "#e7a11c"));
labs.push(new Lab("Puppet's Perilous Palace", "#aba8a8", "#ba2828"));

document.addEventListener("DOMContentLoaded", () => {
    var trueLab = document.getElementById("helper").getAttribute("trueLab");
    let currentLabIndex;

    if (trueLab.includes("Freddy")) {
        currentLabIndex = 0;
    } else if (trueLab.includes("Chica")) {
        currentLabIndex = 1;
    } else if (trueLab.includes("Puppet")) {
        currentLabIndex = 2;
    }

    let seatNum = document.querySelector("#infoSeatNum");
    var tempSeat = document.getElementById("helper").getAttribute("seat").split(" ");
    seatNum.textContent = tempSeat[0] + ": " + tempSeat[1];

    let accessSeatNum = document.getElementById("infoSeatNumHidden")
    accessSeatNum.value = document.getElementById("helper").getAttribute("seat");
    click = 1;

    updateLabDetails(currentLabIndex);

    document.getElementById(tempSeat[0].toLowerCase() + tempSeat[1]).style.backgroundColor = "#49d182";

    var role = document.getElementById("userHolder").textContent; // Get the role value
    var roleInput = document.getElementById("roleInput"); // Get the input box element
    var studentText = document.getElementById("studentNameText");
    var deleteButton = document.getElementById("delete");

    if (role === 'T') {
        roleInput.style.display = 'inline-block';
        studentText.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
        role = "T";
    } else {
        roleInput.style.display = 'none';
        studentText.style.display = 'none';
        deleteButton.style.display = 'none';
        role = "S";
    }
    
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
        var role = document.getElementById("userHolder").textContent;
        var roleInput = document.getElementById("roleInput").value;

        if (!selectedDate || isNaN(new Date(selectedDate))) {
            alert("Please select a valid date.");
            e.preventDefault(); 
        }
        else if (selectedDate < currentDate) {
            alert("Selected date must be today or later.");
            e.preventDefault(); 
        }        
        else if (click == 0) {
            alert("Select a seat number");
            e.preventDefault(); 
        }
        else if (role === 'T' && !roleInput.trim()) {
            alert("Please enter a student name.");
            e.preventDefault();
            return;
        }
    });    

    document.querySelector("#seat1").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 1"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 1";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat1").style.backgroundColor = "#49d182";

        click = 1;
    });
    document.querySelector("#seat2").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 2"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 2";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat2").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat3").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 3"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 3";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat3").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat4").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 4"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 4";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat4").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat5").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 5"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 5";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat5").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat6").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 6"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 6";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat6").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat7").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 7"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 7"
        updateLabDetails(currentLabIndex);
        document.getElementById("seat7").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat8").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 8"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 8";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat8").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat9").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 9"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 9";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat9").style.backgroundColor = "#49d182";
        click = 1;
    });
    document.querySelector("#seat10").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        seatNum.textContent = "Seat: 10"

        let accessSeatNum = document.getElementById("infoSeatNumHidden")
        accessSeatNum.value = "Seat 10";
        updateLabDetails(currentLabIndex);
        document.getElementById("seat10").style.backgroundColor = "#49d182";
        click = 1;
    });

});