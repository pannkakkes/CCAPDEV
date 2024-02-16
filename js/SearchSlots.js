function validate() {
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
}