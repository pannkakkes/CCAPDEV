const Lab = function(name, backgroundColor, seatColor) {
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.seatColor = seatColor;
}

let labs = [];
let click = 0;
let role = 'S';
let clicked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//0 if not clicked and it will become 1 when clicked

labs.push(new Lab("Freddy's Frightful Manor", "#a5a4a4", "#b4653a"));
labs.push(new Lab("Chica's Chilling Chamber", "#d0d0d0", "#e7a11c"));
labs.push(new Lab("Puppet's Perilous Palace", "#aba8a8", "#ba2828"));

document.addEventListener("DOMContentLoaded", () => {
    let accessSeatNum = document.getElementById("infoSeatNumHidden")
    accessSeatNum.value = "";

    let currentLabIndex = 0;
    updateLabDetails(currentLabIndex);

    var role = document.getElementById("userHolder").textContent; // Get the role value
    var roleInput = document.getElementById("roleInput"); // Get the input box element
    var studentText = document.getElementById("studentNameText");

    if (role === 'T') {
        roleInput.style.display = 'inline-block';
        studentText.style.display = 'inline-block';
        role = "T";
    } else {
        roleInput.style.display = 'none';
        studentText.style.display = 'none';
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

        let accessSeatNum = document.getElementById("infoLabTitleHidden");
        accessSeatNum.value = currentLab.name;

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
        else{
            console.log("passed the jvs");
        }
        
    });    

    document.querySelector("#seat1").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[0] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 1"
            accessSeatNum.value = "Seat 1";
        }
        else {
            seatNum.textContent += ", 1"
            accessSeatNum.value += "+Seat 1";
        }
        clicked[0] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat2").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[1] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 2"
            accessSeatNum.value = "Seat 2";
        }
        else {
            seatNum.textContent += ", 2"
            accessSeatNum.value += "+Seat 2";
        }
        clicked[1] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat3").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[2] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 3"
            accessSeatNum.value = "Seat 3";
        }
        else {
            seatNum.textContent += ", 3"
            accessSeatNum.value += "+Seat 3";
        }
        clicked[2] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat4").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[3] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 4"
            accessSeatNum.value = "Seat 4";
        }
        else {
            seatNum.textContent += ", 4"
            accessSeatNum.value += "+Seat 4";
        }
        clicked[3] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat5").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[4] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 5"
            accessSeatNum.value = "Seat 5";
        }
        else {
            seatNum.textContent += ", 5"
            accessSeatNum.value += "+Seat 5";
        }
        clicked[4] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat6").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[5] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 6"
            accessSeatNum.value = "Seat 6";
        }
        else {
            seatNum.textContent += ", 6"
            accessSeatNum.value += "+Seat 6";
        }
        clicked[5] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat7").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[6] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 7"
            accessSeatNum.value = "Seat 7";
        }
        else {
            seatNum.textContent += ", 7"
            accessSeatNum.value += "+Seat 7";
        }
        clicked[6] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat8").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[7] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 8"
            accessSeatNum.value = "Seat 8";
        }
        else {
            seatNum.textContent += ", 8"
            accessSeatNum.value += "+Seat 8";
        }
        clicked[7] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat9").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[8] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 9"
            accessSeatNum.value = "Seat 9";
        }
        else {
            seatNum.textContent += ", 9"
            accessSeatNum.value += "+Seat 9";
        }
        clicked[8] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });
    document.querySelector("#seat10").addEventListener("click", function(e) {
        let seatNum = document.querySelector("#infoSeatNum");
        let accessSeatNum = document.getElementById("infoSeatNumHidden")

        if (clicked[9] == 0) {
        if (seatNum.textContent.length < 7) {
            seatNum.textContent += " 10"
            accessSeatNum.value = "Seat 10";
        }
        else {
            seatNum.textContent += ", 10"
            accessSeatNum.value += "+Seat 10";
        }
        clicked[9] = 1;
        }

        console.log(accessSeatNum.value)
        click = 1;
    });

});