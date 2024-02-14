
class seats{
    constructor(){
       this.seat = {};
       this.studentEmail = {}; 
       this.anonymous = {};

       for (let i = 1; i <= 10; i++) {
        this.seat[`slot${i}`] = 'available';
        this.studentEmail[`slot${i}`] = 'none';
        this.anonymous[`slot${i}`] = false;
        }
    }

    getAvailability(slotNumber){
        return this.seat['slot${slotNumber}']
    }

    setAvailability(slotNumber, strAvailable){
        if (strAvailable === 'available' || strAvailable === 'Unavailable'){
            this.seat['slot${slotNumber}'] = strAvailable;
        }
    }

    getStudentEmail(slotNumber){
        return studentEmail['slot${slotNumber}'];
    }

    setStudentName(slotNumber,Email){
        this.studentEmail['slot${slotNumber}'] = Email;
    }

    getAnonymous(slotNumber) {
        return this.anonymous[`slot${slotNumber}`];
    }

    setAnonymous(slotNumber, isAnonymous) {
        this.anonymous[`slot${slotNumber}`] = isAnonymous;
    }
}

class days{
    constructor(){
        this.dayMap = {
            monday: new Seat(),
            tuesday: new Seat(),
            wednesday: new Seat(),
            thursday: new Seat(),
            friday: new Seat(),
            saturday: new Seat(),
            sunday: new Seat()
        }
    }

    getDay(day){
        const lowercasDay = day.tolowerCase();
        if(this.dayMap.hasOwnProperty(lowercasDay)){
            return this.dayMap[lowercaseDay];
        }
    }
}

class labs{
    constructor(labName,labdays){
        this.labName = labName;
        this.labSeats = labdays;
    }
}

class dates{
    constructor(day, month, year, lab1, lab2, lab3){
        this.day = day;
        this.month = month;
        this.year = year;
        this.lab1 = lab1;
        this.lab2 = lab2;
        this.lab3 = lab3;
    }
}

var date = {};





