// Add event listener to the login form submit button
document.getElementById("submitButton").addEventListener("click", async function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var keepLoggedIn = document.getElementById("keepLoggedIn").checked; // Get the state of the "Keep me logged in" checkbox

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, keepLoggedIn }) // Include the state of the checkbox in the request body
        });

        const data = await response.text();
        
        if (response.ok) {
            window.location.href = "/dashboard"; // Redirect to dashboard
        } else {
            alert(data); // Display error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    }
});
