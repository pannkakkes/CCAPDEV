function validate(event) {
    event.preventDefault();
    var curDate = document.getElementById("date").value;
    var curTime = document.getElementById("time_slot").value;
    var curLab = document.getElementById("lab").value;

    if (!curDate) {
        alert("Please select a date.");
        return false;
    }

    if (curTime === "choose-slot") {
        alert("Please select a time slot.");
        return false;
    }

    switch (curLab) {
        case "lab1":
            document.getElementById("heading-lab").innerHTML = "Freddy's Frightful Manor";
            break;
        case "lab2":
            document.getElementById("heading-lab").innerHTML = "Chica's Chilling Chamber";
            break;
        case "lab3":
            document.getElementById("heading-lab").innerHTML = "Puppet's Perilous Palace";
            break;
    }

    var dateObject = new Date(curDate);
    var year = dateObject.getFullYear();
    var month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    var day = dateObject.getDate().toString().padStart(2, '0');
    document.getElementById("date-and-time").innerHTML = month + '/' + day + '/' + year + " " + curTime;
    var all_reservedby = document.getElementsByClassName("reserved-by");
    var all_availability = document.getElementsByClassName("availability");

    for (var i = 0; i < all_reservedby.length; i++) {
        all_reservedby[i].innerHTML = "";
        all_availability[i].innerHTML = "Available";
    }
    
    return false;
}