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
mainMenus.forEach(mainMenu => {
    mainMenu.addEventListener("mouseover", function() {
        const submenu = mainMenu.querySelector(".submenu");
        submenu.style.display = "block"
        subRect = submenu.getBoundingClientRect();
        submenu.style.left = -(subRect.width * 1.3) + "px"
        console.log(subRect.width)
        console.log(submenu.paddingRight)
    });
    mainMenu.addEventListener("mouseleave", function() {
        const submenu = mainMenu.querySelector(".submenu");
        submenu.style.display = "none"
    })

});
