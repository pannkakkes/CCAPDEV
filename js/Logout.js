var currentUser = getCurrentUser();

if (currentUser) {
    document.getElementById("logoutMessage").textContent = "Goodbye, " + currentUser.username + "!";
}

document.getElementById("submit-button").addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.removeItem("currentUser"); 
    window.location.href = "./index.html"; 
});
