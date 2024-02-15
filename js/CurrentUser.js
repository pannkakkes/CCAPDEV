function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    var userString = sessionStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
}

/*
function setCurrentUser(user, isRemembered) {
    var expirationDate = new Date();
    if (isRemembered) {
        expirationDate.setDate(expirationDate.getDate() + 21);
    } else {
        expirationDate.setTime(expirationDate.getTime() + (30 * 60 * 1000));
    }

    document.cookie = 'currentUser=' + JSON.stringify(user) + '; expires=' + (expirationDate ? expirationDate.toUTCString() : '') + '; path=/';
}

function getCurrentUser() {
    var username = 'currentUser=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(username) === 0) {
            return JSON.parse(cookie.substring(username.length, cookie.length));
        }
    }

    return null;
}
*/