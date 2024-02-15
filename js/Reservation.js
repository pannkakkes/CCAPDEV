function Reserve(student, seatNum, labTitle, requestTime, reserveTime, faculty, anonymous){
    this.student = student;
    this.seatNum = seatNum;
    this.labTitle = labTitle;
    this.requestTime = requestTime;
    this.reserveTime = reserveTime;
    this.faculty = faculty;
    this.anonymous = anonymous
}

var reservations = [
    new Reserve("FreddyFazbear", "Seat 1" ,"Freddy's Frightful Manor", "1/1/2024 10:01", "1/1/2024 14:30", null, false),
    new Reserve("FreddyFazbear", "Seat 8", "Puppet's Perilous Palace", "1/1/2024 10:02", "1/8/2024 14:30", null, false),
    new Reserve("FreddyFazbear", "Seat 7", "Puppet's Perilous Palace", "1/1/2024 10:03", "1/7/2024 14:30", null, false),
    new Reserve("BonnieBunny", "Seat 2", "Freddy's Frightful Manor", "1/1/2024 10:00", "1/1/2024 14:30", null, false),
    new Reserve("FoxyThePirate", "Seat 3", "Freddy's Frightful Manor", "1/1/2024 10:00", "1/1/2024 14:30", null, true)
];

function getReservations(student) {
    var studentReservations = [];
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].student === student) {
            studentReservations.push(reservations[i]);
        }
    }
    return studentReservations;
}
