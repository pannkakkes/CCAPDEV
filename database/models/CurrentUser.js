function setCurrentUser(user, isRemembered) {
    var expiryDate = new Date();

    if (isRemembered) {
        expiryDate.setDate(expiryDate.getDate() + 22);
    } else {
        expiryDate.setDate(expiryDate.getDate() + 1);
    }

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