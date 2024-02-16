var currentUser = getCurrentUser();
var currentProfile = document.getElementById("profile-username").innerHTML;

if (currentUser.username === currentProfile) {
    window.location.href = "./userviewprofile.html"; 
}