const Lab = function(name, backgroundColor, seatColor) {
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.seatColor = seatColor;
}

let labs = [];
let click = 0;

labs.push(new Lab("Freddy's Frightful Manor", "#a5a4a4", "#b4653a"));
labs.push(new Lab("Chica's Chilling Chamber", "#d0d0d0", "#e7a11c"));
labs.push(new Lab("Puppet's Perilous Palace", "#aba8a8", "#ba2828"));

document.addEventListener("DOMContentLoaded", () => {

    let currentLabIndex = 0;
    updateLabDetails(currentLabIndex);
    
    // Right arrow event listener
    document.querySelector("#rightArrow").addEventListener("click", function(e) {
        currentLabIndex = (currentLabIndex + 1) % labs.length;
        updateLabDetails(currentLabIndex);
    }); 

    // Left arrow event listener
    document.querySelector("#leftArrow").addEventListener("click", function(e) {
        currentLabIndex = (currentLabIndex - 1 + labs.length) % labs.length;
        updateLabDetails(currentLabIndex);
    });

    // Function to update lab details based on the current index
    function updateLabDetails(index) {
        let currentLab = labs[index];

        let labTitle = document.querySelector("#labTitle h1");
        let infoLabTitle = document.querySelector("#infoLabTitle");
        labTitle.textContent = currentLab.name;
        labTitle.style.fontSize = "10px";

        document.querySelector("#selectLab").style.backgroundColor = currentLab.backgroundColor;

        let seats = document.querySelectorAll(".seats");
        seats.forEach(seat => {
            seat.style.backgroundColor = currentLab.seatColor;
        });
    }

    document.querySelector("#rightArrow").addEventListener("click", function(e) {
        currentLabIndex = (currentLabIndex + 1) % labs.length;
        updateLabDetails(currentLabIndex);
    }); 

});