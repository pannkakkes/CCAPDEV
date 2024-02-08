function Account(username, emailaddress, password, description, birthDate, profilePicture, status){
    this.username = username;
    this.emailaddress = emailaddress;
    this.password = password;
    this.description = description;
    this.birthDate = birthDate;
    this.profilePicture = profilePicture;
    this.status = status;
}

var users = [
    new Account("FreddyFazbear", "freddyfazbear@dlsu.edu.ph" ,"fazbear00", "I am five bears.", "01/01/1987", "freddyfazbear.png", "V"),
    new Account("BonnieBunny", "bonnythebonnybon@dlsu.edu.ph", "bonny3", "I like baking cupcakes.", "02/21/1983","bonniebunny.png" ,"V"),
    new Account("FoxyThePirate", "foxythepirate@dlsu.edu.ph", "foxie12", "I hunt for treasure!", "06/04/1985", "foxythepirate.jpeg", "V"),
    new Account("WilliamAfton", "williamaftersun@dlsu.edu.ph", "willom2", "I'm the bad guy.", "07/29/1954", "williamafton.jpg", "T"),
    new Account("SpringTrap", "springtrap@dlsu.edu.ph", "Summer!", "I trap you.", "07/29/1954", "springtrap.jpg", "T")
];

function getUser(emailaddress){
    for(var i = 0; i < users.length; i++){
        if(users[i].emailaddress === emailaddress){
            return users[i];
        }
    }
    return null;
}






