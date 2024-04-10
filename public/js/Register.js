$(document).ready(function() {
    var form = $("#register_form");
    var emailValid = false; 
    var usernameValid = false; 
    var passwordValid = false; 
    var birthdateValid = false; 
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
            emailValid = false;
        } else {
            clearError("email");
            emailValid = true;
        }
    });
    
    // Real-time validation for username field
    $("#username").on("input", function() {
        var username = $(this).val();
        var usernameRegex = /^[a-zA-Z0-9._-]+$/; // Regex for valid username format
    
        if (!usernameRegex.test(username)) {
            displayError("username", "Please enter a valid username containing only alphanumeric characters, ., _, and -.");
            usernameValid = false;
        } else {
            clearError("username");
            usernameValid = true;
        }
    });

    
    // Real-time validation for password and confirm password fields
    $("#password, #confirmPassword").on("input", function() {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        if (password !== confirmPassword) {
            displayError("password", "Passwords do not match.");
            displayError("confirmPassword", "Passwords do not match.");
            passwordValid = false;
        } else {
            clearError("password");
            clearError("confirmPassword");
            passwordValid = false;
        }
    });

    // Real-time validation for birthdate field
    $("#birthdate").on("input", function() {
        var birthdate = $(this).val();
        var birthYear = new Date(birthdate).getFullYear();
    
        if (birthYear > 2010) {
            displayError("birthdate", "Birthdate must be in or before the year 2010.");
            birthdateValid = false;
        } else {
            clearError("birthdate");
            birthdateValid = true;
        }
    });    
    
    //Submitting as a Lab Technician
    $("#submitT").on("click", async function(event) {
        if (emailValid && usernameValid && passwordValid && birthdateValid) {
   
        } else {
            event.preventDefault(); // Prevent the form from submitting if not valid
        }
    });

    //Submitting as a Student
    $("#submitV").on("click", async function(event) {
        if (emailValid && usernameValid && passwordValid && birthdateValid) {
 
        } else {
            event.preventDefault(); // Prevent the form from submitting if not valid
        }
    });

});
