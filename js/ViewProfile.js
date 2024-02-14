
document.addEventListener("DOMContentLoaded", function () {
    var currentUser = getCurrentUser();

    if (currentUser) {
        updateProfile(currentUser);
    }
});

function updateProfile(user){
    var profilePictureElement = document.getElementById("profile-picture");
    profilePictureElement.src = "sample_files/sampleusersprofilepictures/" + user.profilePicture;

    var profileNameElement = document.getElementById("profile-name");
    profileNameElement.textContent = user.username;

    var profileDescriptionElement = document.getElementById("profile-description");
    profileDescriptionElement.textContent = user.description;

    var profileBirthdateElement = document.getElementById("profile-birthdate");
    profileBirthdateElement.textContent = "Birthdate: " + user.birthDate;
}