document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var user = getUser(email); 

    if (user !== null && user.password === password) { 
        setCurrentUser(user); 
        window.location.href = "./dashboard.html"; 
    } else {
        alert("Invalid email or password.");
    }
});
