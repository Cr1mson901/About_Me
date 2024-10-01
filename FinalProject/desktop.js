window.onload = function() {
    var chestUser = document.getElementById("userName")
    if (window.name){
        chestUser.innerHTML = window.name;
    } else {
        chestUser.innerHTML = "Cr1mson"
    }
}

// Get the draggable element and the container
var dragElement = document.getElementById("header");
var dragTable = document.getElementById("toolchest");
var container = document.getElementsByClassName("crt")[0];

// Variables to store mouse position and offsets
var offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

// When the user presses the mouse down over the element
dragElement.onmousedown = function(e) {
    e.preventDefault(); // Prevent default behavior

    // Get the current mouse position
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Listen for the movement
    document.onmousemove = function(e) {
        e.preventDefault(); // Prevent default behavior

        // Calculate new cursor position
        offsetX = mouseX - e.clientX;
        offsetY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Calculate the new position of the draggable element
        var newTop = dragTable.offsetTop - offsetY;
        var newLeft = dragTable.offsetLeft - offsetX;

        // Get the bounding box of the container
        var containerRect = container.getBoundingClientRect();
        var dragRect = dragTable.getBoundingClientRect();

        // Check if the new position is within the container bounds
        if (newLeft >= 10 && newLeft + dragRect.width <= containerRect.width - 10) {
            dragTable.style.left = newLeft + "px";
        }
        if (newTop >= 10 && newTop + dragRect.height <= containerRect.height - 20) {
            dragTable.style.top = newTop + "px";
        }
    };

    // Stop moving when mouse button is released
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
    };
};

const logOutBTN = document.getElementById("exit")
logOutBTN.addEventListener("click", function(){
    window.location.href='login.html';
})

// Submenu adjuster
var mainMenus = document.querySelectorAll(".mainmenu")
mainMenus.forEach((mainMenu, index) => {
    mainMenu.addEventListener("mouseover", function() {
        var submenu = mainMenu.querySelector(".submenu"); //Grabs the submenus under the mainmenu
        submenu.style.display = "block" //Reveals the main menu
        var subRect = submenu.getBoundingClientRect(); //Grabs the bounds of the submenu
        var mainRect = mainMenu.getBoundingClientRect(); //Grabs the bounds of the mainmenu
        var containerRect = container.getBoundingClientRect(); //Grabs the bounds of the monitor
        if (containerRect.width <= mainRect.left + (subRect.width * 1.28) + mainRect.width){ //Checks if there is enough room to display the submenu without going outside the screen
            submenu.style.left = -(subRect.width * 1.28) + "px" //Sets submenu to the left
        } else {
            submenu.style.left = "100%"; //Sets submenus to the right
        }
        submenu.style.top = mainRect.height * (index + 1) + "px"; //Sets the top to align with the chosen main menu
    });
    mainMenu.addEventListener("mouseleave", function() {
        var submenu = mainMenu.querySelector(".submenu");
        submenu.style.display = "none" //Hides the submenu
    })

});
