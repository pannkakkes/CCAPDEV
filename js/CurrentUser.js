// function setCurrentUser(user) {
//     sessionStorage.setItem('currentUser', JSON.stringify(user));
// }

// function getCurrentUser() {
//     var userString = sessionStorage.getItem('currentUser');
//     return userString ? JSON.parse(userString) : null;
// }

function setCurrentUser(user, isRemembered) {
    // Set cookie with expiry time in days (e.g., 1 day)
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); // Expires in 1 day
    document.cookie = `currentUser=${JSON.stringify(user)}; expires=${expiryDate.toUTCString()}; path=/`;
}

function getCurrentUser() {
    var name = "currentUser=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();

        if (cookie.indexOf(name) == 0) {
            return JSON.parse(cookie.substring(name.length, cookie.length));
        }
    }

    return null;
}