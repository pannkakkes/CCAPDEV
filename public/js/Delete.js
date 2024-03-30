    document.addEventListener('DOMContentLoaded', function() {
        var theone = document.getElementById('ID').textContent.split(":")[1].trim();

        document.getElementById('deleteUserButton').addEventListener('click', async function() {
            if (confirm('Are you sure you want to delete this user?')) {
                try {
                    const response = await fetch('/app/main/profile/delete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({theone: theone}),
                    });
            
                    const data = await response.text();
                    
                    if (response.ok) {
                        window.location.href = "/"; // Redirect to home page
                    } else {
                        alert(data); // Display error message
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert("An error occurred. Please try again later.");
                }
            }
        });
    });


