document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit-button").addEventListener("click", function(event) {
        event.preventDefault();
        logoutUser();
    });
});

function logoutUser() {
    fetch('/app/main/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/";
        } else {
            console.error('Logout failed');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}
