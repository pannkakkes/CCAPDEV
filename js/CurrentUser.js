function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    var userString = sessionStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
}
