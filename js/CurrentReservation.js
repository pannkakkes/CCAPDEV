function TempReserve(day, lab){
    this.day = day;
    this.lab = lab;
}

function setLab(labName) {
    sessionStorage.setItem('selectedLab', labName);
}

function setDay(day) {
    sessionStorage.setItem('selectedDay', day);
}

function getLab() {
    var labName = sessionStorage.getItem('selectedLab');
    return labName;
}

function getDay() {
    var dayName = sessionStorage.getItem('selectedDay');
    return dayName;
}