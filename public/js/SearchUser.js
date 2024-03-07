document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value.toLowerCase();

    if (username == "freddyfazbear" || username == "bonniebunny" || username == "foxythepirate" || username == "springtrap" || username == "williamafton") { 
        window.location.href = "./" + username + ".html"; 
    } else {
        alert("User not found.");
    }
});
