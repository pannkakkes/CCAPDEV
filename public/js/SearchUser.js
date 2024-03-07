document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value.toLowerCase();
    var formData = new FormData();
    formData.append("username", username);

    fetch('/searchU', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("here");
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // if (username == "freddyfazbear" || username == "bonniebunny" || username == "foxythepirate" || username == "springtrap" || username == "williamafton") { 
    //     window.location.href = "./" + username + ".html"; 
    // } else {
    //     alert("User not found.");
    // }
});
