document.addEventListener("DOMContentLoaded", function () {

    var currentDate = new Date();
    var minDate = new Date(currentDate);
    var maxDate = new Date(currentDate);

    maxDate.setDate(currentDate.getDate() + 7);

   
    var formattedMinDate = minDate.toISOString().split('T')[0];
    var formattedMaxDate = maxDate.toISOString().split('T')[0];

   
    document.getElementById("date").setAttribute("min", formattedMinDate);
    document.getElementById("date").setAttribute("max", formattedMaxDate);
});