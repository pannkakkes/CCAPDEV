document.addEventListener("DOMContentLoaded", function () {
    var currentUser = getCurrentUser();

    if (currentUser) {
        updateProfile(currentUser);
    }
});

function updateProfile(user){
    var profilePictureElement = document.getElementById("profile-image");
    profilePictureElement.src = "sample_files/sampleusersprofilepictures/" + user.profilePicture;

    var profileNameElement = document.getElementById("name");
    profileNameElement.value = user.username;

    var profileDescriptionElement = document.getElementById("description");
    profileDescriptionElement.value = user.description;

    var profileBirthdateElement = document.getElementById("birthdate");
    profileBirthdateElement.value = user.birthDate;

    var saveChangesButton = document.getElementById("save-changes");
    saveChangesButton.addEventListener("click", function () {
        saveChanges(user);
    });
}

function saveChanges(user){
    var newName = document.getElementById("name").value;
    var newDescription = document.getElementById("description").value;
    var newBirthdate = document.getElementById("birthdate").value;

    var fileInput = document.getElementById("file");
    if (fileInput.files.length > 0) {
        var newProfilePicture = fileInput.files[0].name;
    } else {
        var newProfilePicture = user.profilePicture;
    }

    var updatedUser = {
        username: newName,
        description: newDescription,
        birthDate: newBirthdate,
        profilePicture: newProfilePicture
    };

    setCurrentUser(updatedUser);

    window.location.href = "userviewprofile.html";
}

function loadFile(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
}
