document.getElementById("submitButton").addEventListener("click", async function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.text();
        
        if (response.ok) {
            alert(data); // Display success message
            window.location.href = "/dashboard"; // Redirect to dashboard
        } else {
            alert(data); // Display error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    }
});
