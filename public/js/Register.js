var form = document.getElementById("register_form");

//Prevents resetting of form when enter is pressed
form.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

//Submitting as a Lab Technician
document.getElementById("submitT").addEventListener("click", function(event) {
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var description = document.getElementById("description").value;
    var birthdate = document.getElementById("birthdate").value;
    var profilePicture = document.getElementById("file").value; // File path
    var status = "T";
    var isValid = true;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        isValid = false;
    }

    if (!email || !username || !password || !confirmPassword || !description || !birthdate || !profilePicture) {
        alert("Please fill in all the fields.");
        isValid = false;
    }

    if (!email.endsWith("@dlsu.edu.ph")) {
        alert("Please enter a valid email ending with @dlsu.edu.ph");
        isValid = false;
    }

    if (isValid) {
        var formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("description", description);
        formData.append("birthdate", birthdate);
        formData.append("profilePicture", profilePicture);
        formData.append("status", status);

        // Make AJAX POST request
        fetch('/register', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Account created successfully! Welcome, " + data.username + "!");
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

//Submitting as a Student
document.getElementById("submitV").addEventListener("click", function(event) {
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var description = document.getElementById("description").value;
    var birthdate = document.getElementById("birthdate").value;
    var profilePicture = document.getElementById("file").value; // File path
    var status = "V";
    var isValid = true;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        isValid = false;
    }

    if (!email || !username || !password || !confirmPassword || !description || !birthdate || !profilePicture) {
        alert("Please fill in all the fields.");
        isValid = false;
    }

    if (!email.endsWith("@dlsu.edu.ph")) {
        alert("Please enter a valid email ending with @dlsu.edu.ph");
        isValid = false;
    }
    
    if (isValid) {
        var formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("description", description);
        formData.append("birthdate", birthdate);
        formData.append("profilePicture", profilePicture);
        formData.append("status", status);

        // Make AJAX POST request
        fetch('/register', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Account created successfully! Welcome, " + data.username + "!");
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
