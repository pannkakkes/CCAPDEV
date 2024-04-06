$(document).ready(function() {
    var form = $("#register_form");
    var isValid = true; 
    //Prevents resetting of form when enter is pressed
    form.on("keypress", function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    // Function to display errors
    function displayError(fieldId, errorMessage) {
        $("#" + fieldId + "_error").text(errorMessage);
    }

    // Function to clear errors
    function clearError(fieldId) {
        $("#" + fieldId + "_error").text("");
    }

    // Real-time validation for email field
    $("#email").on("input", function() {
        var email = $(this).val();
        var emailRegex = /^[a-zA-Z0-9._%+-]+@dlsu\.edu\.ph$/; // Regex for valid email format
    
        if (!emailRegex.test(email)) {
            displayError("email", "Please enter a valid email ending with @dlsu.edu.ph and containing only alphanumeric characters, ., _, %, +, and - before the @ symbol.");
            isValid = false;
        } else {
            clearError("email");
        }
    });
    
    // Real-time validation for username field
    $("#username").on("input", function() {
        var username = $(this).val();
        var usernameRegex = /^[a-zA-Z0-9._-]+$/; // Regex for valid username format
    
        if (!usernameRegex.test(username)) {
            displayError("username", "Please enter a valid username containing only alphanumeric characters, ., _, and -.");
            isValid = false;
        } else {
            clearError("username");
        }
    });

    
    // Real-time validation for password and confirm password fields
    $("#password, #confirmPassword").on("input", function() {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        if (password !== confirmPassword) {
            displayError("password", "Passwords do not match.");
            displayError("confirmPassword", "Passwords do not match.");
            isValid = false;
        } else {
            clearError("password");
            clearError("confirmPassword");
            isValid = true;
        }
    });

    // Real-time validation for birthdate field
    $("#birthdate").on("input", function() {
        var birthdate = $(this).val();
        var birthYear = new Date(birthdate).getFullYear();
    
        if (birthYear > 2010) {
            displayError("birthdate", "Birthdate must be in or before the year 2010.");
            isValid = false;
        } else {
            clearError("birthdate");
            isValid = true;
        }
    });    
    
    // Function to handle file input change
       $("#pfp").on("change", function() {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#preview_image").attr("src", e.target.result); // Set preview image src
            };
            reader.readAsDataURL(file); // Read the file as Data URL
        }
        else {
            isValid = false;
        }
    });

    //Submitting as a Lab Technician
    $("#submitT").on("click", async function(event) {
        if (isValid) {
   
        } else {
            event.preventDefault(); // Prevent the form from submitting if not valid
        }
    });

    //Submitting as a Student
    $("#submitV").on("click", async function(event) {
        if (isValid) {
 
        } else {
            event.preventDefault(); // Prevent the form from submitting if not valid
        }
    });

});
