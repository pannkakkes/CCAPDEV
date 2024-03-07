function validate(event) {
    event.preventDefault();
    var curDate = document.getElementById("selected_date").value;
    var curTime = document.getElementById("time_slot").value;
    var curLab = document.getElementById("selected_lab").value;

    if (!curDate) {
        alert("Please select a date.");
        return false;
    }

    if (curTime === "choose-slot") {
        alert("Please select a time slot.");
        return false;
    }

    if (curLab === "choose-lab") {
        alert("Please select a lab.");
        return false;
    }

    if (curDate == "2024-01-01" && curTime === "slot12" && curLab === "lab1") {
        document.getElementById("search-results").innerHTML = "Seats 4, 5, 6, 7, 8, 9, and 10 are available.";
    }
    else if (curDate == "2024-01-09" && curTime === "slot12" && curLab === "lab2") {
        document.getElementById("search-results").innerHTML = "Seats 1, 2, 3, 4, 5, 6, 7, 8, and 10 are available.";
    }
    else if (curDate == "2024-01-08" && curTime === "slot12" && curLab === "lab3") {
        document.getElementById("search-results").innerHTML = "Seats 1, 2, 3, 4, 5, 6, 7, 9, and 10 are available.";
    }
    else if (curDate == "2024-01-07" && curTime === "slot12" && curLab === "lab3") {
        document.getElementById("search-results").innerHTML = "Seats 1, 2, 3, 4, 5, 6, 8, 9, and 10 are available.";
    }
    else {
        document.getElementById("search-results").innerHTML = "All seats are available!";
    }

    document.getElementById("search-results").style.display = "block";
    return false;
}