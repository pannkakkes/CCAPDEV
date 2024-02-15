document.addEventListener("DOMContentLoaded", function () {
    var currentUser = getCurrentUser();

    if (currentUser) {
        //hardcoded data
        if(currentUser.emailaddress === 'freddyfazbear@dlsu.edu.ph'){
            console.log("lab1");
            var reservation = [
                {seat: 'Seat 1', labNumber: 'Freddy\'s Frightful Manor 201', requestDateTime: '1/1/2024 10:00 AM', reservationDateTime: '1/1/2024 2:30 PM'},
                {seat: 'Seat 9', labNumber: 'Chica\'s Chilling Chamber 406', requestDateTime: '1/1/2024 10:01 AM', reservationDateTime: '1/9/2024 2:30 PM'},
                {seat: 'Seat 8', labNumber: 'Puppet\'s Perilous Palace 1704', requestDateTime: '1/1/2024 10:02 AM', reservationDateTime: '1/8/2024 2:30 PM'},
                {seat: 'Seat 7', labNumber: 'Puppet\'s Perilous Palace 1704', requestDateTime: '1/1/2024 10:03 AM', reservationDateTime: '1/7/2024 2:30 PM'}
            ]
        }
        else if(currentUser.emailaddress === 'bonnythebonnybon@dlsu.edu.ph'){
            console.log("lab2");
            var reservation = [
                {seat: 'Seat 2', labNumber: 'Freddy\'s Frightful Manor 201', requestDateTime: '1/1/2024 10:00 AM', reservationDateTime: '1/1/2024 2:30 PM'},
            ]
        }
        else if(currentUser.emailaddress === 'foxythepirate@dlsu.edu.ph'){
            console.log("lab3");
            var reservation = [
                {seat: 'Seat 3', labNumber: 'Freddy\'s Frightful Manor 201', requestDateTime: '1/1/2024 10:00 AM', reservationDateTime: '1/1/2024 2:30 PM'},
            ]
        }
        else if(currentUser.emailaddress === 'williamaftersun@dlsu.edu.ph' || currentUser.emailaddress === 'foxythepirate@dlsu.edu.ph'){
            var reservation = [];
        }



        addReservation(reservation);
    }
});



function addReservation(reservations) {
    var tbody = document.getElementById("reservationTableBody");
    var noneRes = document.getElementById("reservation-none");
   
    if (reservations.length === 0){
        noneRes.style.display = 'block';
    }
    else{
        noneRes.style.display = 'none';
    
        for (var i = 0; i < reservations.length; i++) {
            var reservation = reservations[i];

            var newRow = tbody.insertRow(tbody.rows.length);

            var cellSeat = newRow.insertCell(0);
            var cellLabNumber = newRow.insertCell(1);
            var cellRequestDateTime = newRow.insertCell(2);
            var cellReservationDateTime = newRow.insertCell(3);

            cellSeat.innerHTML = reservation.seat;
            cellLabNumber.innerHTML = reservation.labNumber;
            cellRequestDateTime.innerHTML = reservation.requestDateTime;
            cellReservationDateTime.innerHTML = reservation.reservationDateTime;
        }
    }
}




