var currentUser = getCurrentUser();

if (currentUser) {
    document.getElementById("logoutMessage").textContent = "Goodbye, " + currentUser.username + "!";
}

document.getElementById("submit-button").addEventListener("click", function(event) {
    event.preventDefault();
    document.cookie = 'currentUser=; expires=Mon, 01 Jan 2024 00:00:00 UTC; path=/;';
    window.location.href = "./index.html"; 
});
