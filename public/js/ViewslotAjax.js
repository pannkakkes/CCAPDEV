function fetchAvailabilityData() {
    $.ajax({
      url: '/updateview', 
      method: 'GET',
      success: function(response) {
        console.log(response.initialDtr);
        updateTable(response.sortedAndFilledReservationsData);
      },
      error: function(xhr, status, error) {
        console.error('Error fetching Lab Reservation:', error);
      }
    });
  }
  
  function updateTable(newData) {
    $("#reservation-data").empty();
  
    $.each(newData, function(index, reservation) {
      const tableRow = `
        <tr>
          <td>${reservation.laboratory}</td> <td>${reservation.seat}</td> <td class="availability">${reservation.isAvailable ? 'Available' : 'Unavailable'}</td> </tr>
      `;
      
      $("#reservation-data").append(tableRow);
    });
  }