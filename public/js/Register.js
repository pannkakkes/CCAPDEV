$(document).ready(function() {
    var form = $("#register_form");

    //Prevents resetting of form when enter is pressed
    form.on("keypress", function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    //Submitting as a Lab Technician
    $("#submitT").on("click", async function(event) {
        var email = $("#email").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        var description = $("#description").val();
        var birthdate = $("#birthdate").val();
        var profilePicture = $("#pfp").prop('files'); // Get the file object
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

        var birthYear = new Date(birthdate).getFullYear();
        if (birthYear > 2010) {
            alert("Birthdate must be in or before the year 2010.");
            isValid = false;
        }

        if (isValid) {
   
        } else {
            event.preventDefault(); // Prevent the form from submitting if not valid
        }
    });

    //Submitting as a Student
    $("#submitV").on("click", async function(event) {
        var email = $("#email").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        var description = $("#description").val();
        var birthdate = $("#birthdate").val();
        var profilePicture = $("#pfp").prop('files'); // Get the file object
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

        if (birthYear > 2010) {
            alert("Birthdate must be in or before the year 2010.");
            isValid = false;
        }

        if (isValid) {
 
        } else {
            event.preventDefault(); // Prevent the form from submitting if not valid
        }
    });

});
