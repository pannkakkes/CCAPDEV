function reserveLab(labName) {
    var currentUser = getCurrentUser(); 
    var userStatus = currentUser.status;

    console.log(userStatus);
    setLab(labName);

    console.log("yaaaaas");

    if (userStatus === 'T') { 
        window.location.href('reserveforstudent.html');
    } else {
        window.location.href('reserveconfirm.html');
    }
}

document.querySelectorAll('.search-button').forEach(button => {
    console.log("meow");
    button.addEventListener('click', () => {
        console.log("slayy");
        document.querySelectorAll('.search-button').forEach(btn => {
            btn.classList.remove('red');
        });
        button.classList.add('red');

        // Show the subcontainer when a button is clicked
        document.getElementById('subContainer').style.display = 'block';
        
        // Call setDay function with the day name
        setDay(button.textContent);
    });
});
