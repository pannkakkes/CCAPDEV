$(document).ready(function() {
    const reservationTableBody = $('#reservationTableBody');
    const reservationsData = JSON.parse('<%= JSON.stringify(reservationsData) %>');
  
    if (reservationsData.length === 0) {
      // Handle no reservations case (optional)
      reservationTableBody.append($('<p>')
        .text('No reservations found.')
        .addClass('reservation-none'));
    } else {
      // Create and append table rows using jQuery methods
      $.each(reservationsData, function(index, reservation) {
        const tableRow = $('<tr>');
  
        const seatCell = $('<td>').text(reservation.seat);
        const laboratoryCell = $('<td>').text(reservation.laboratory);
        const dateTimeRequestCell = $('<td>').text(reservation.dateTimeRequest);
        const dateTimeReservationCell = $('<td>').text(reservation.dateTimeReservation);
  
        tableRow.append(seatCell, laboratoryCell, dateTimeRequestCell, dateTimeReservationCell);
        reservationTableBody.append(tableRow);
      });
    }
  });
