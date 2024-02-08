document.addEventListener('DOMContentLoaded', function() {
    var currentUser = getCurrentUser();

    if (currentUser) {
        document.getElementById('email').innerText = 'Email address: ' + currentUser.emailaddress;
        document.getElementById('name').innerText = 'Name: ' + currentUser.username;
        document.getElementById('description').innerText = 'Description: ' + currentUser.description;
        document.getElementById('birthdate').innerText = 'Birthdate: ' + currentUser.birthDate;
        document.getElementById('profileImage').src = 'sample_files/sampleusersprofilepictures/' + currentUser.profilePicture;
    }

    document.getElementById('deleteUserButton').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this user?')) {
            alert('User deleted successfully!');
            window.location.href = 'index.html'; 
        }
    });
});
