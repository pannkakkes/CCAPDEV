$(document).ready(function() {
    $("#date, #time_slot, #lab").change(function() {
      const lab = $("#lab").val();
      const date = $("#date").val();
      const timeSlot = $("#time_slot").val();
  
      $.ajax({
        url: "/updateview", 
        type: "GET",
        data: {
          lab: lab,
          date: date,
          time_slot: timeSlot
        },
        success: function(response) {
          $("#reservation-table").html(response); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error("Error fetching reservations:", textStatus, errorThrown);
        }
      });
    });
  });