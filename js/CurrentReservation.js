var currentReservation = {
    labTitle: '',
    day: ''
};

function setCurrentReservation(labTitle, day) {
    currentReservation.labTitle = labTitle;
    currentReservation.day = day;
}

function getCurrentReservation() {
    return currentReservation;
}