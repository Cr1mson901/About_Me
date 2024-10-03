window.onload = function() {
    var chestUser = document.getElementById("userName")
    if (window.name){
        chestUser.innerHTML = window.name;
    } else {
        chestUser.innerHTML = "Cr1mson"
    }
}

// Get the draggable element and the container
var container = document.getElementsByClassName("crt")[0];

// Variables to store mouse position and offsets
var offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

// When the user presses the mouse down over the element
document.querySelectorAll('.draggable').forEach((dragElement) => {
    dragElement.parentElement.onmousedown = function() {
        focus(this)
    }
    dragElement.onmousedown = function(e) {
        e.preventDefault(); // Prevent default behavior

        // Get the current mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;

        let dragTable = dragElement.parentElement;

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
});
const logOutBTN = document.getElementById("exit");
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
        if ((containerRect.left + containerRect.width) <= mainRect.left + (subRect.width * 1.28) + mainRect.width){ //Checks if there is enough room to display the submenu without going outside the screen
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

//Buttons
var selected = false
//Grabs all buttons
var icons = document.querySelectorAll("button")
//If there is a mouse down in the document, unhighlight the icons
document.addEventListener("mousedown", function() {
    if (selected){
        unhighlight(selected)
    }
})

//Adds listners for mousedown and dblclick
icons.forEach(icon => {
    icon.addEventListener("mousedown", function(e) {
        // Stops the document from recieving the click
        e.stopPropagation()
        // Resets icons if an icon is selected
        if (selected) {
            unhighlight()
        }
        var figure = this.querySelector("figure")
        figure.style.background = "blue"
        console.log("Clicked")
        selected = true
    })
    icon.addEventListener("dblclick", function(e) {
        // Stops the document from recieving the click
        e.stopPropagation()
        //TODO Implement window opening
        this.querySelector("figure").style.background = "none"
        console.log("Open")
        openWindow(this)
    })
})

//Unhighlights all of the icons
function unhighlight() {
    icons.forEach(icon => {
        var figure = icon.querySelector("figure")
        figure.style.background = "none"
    })
    selected = false
}

//focuss out the items
function focus(top) {
    let draggables = document.querySelectorAll('.draggable');
    if (top.style.zIndex != draggables.length){
        draggables.forEach((dragElement) => {
            let currentZIndex = parseInt(getComputedStyle(dragElement.parentElement).zIndex)
            console.log(currentZIndex)
            if (top.style.zIndex < currentZIndex)
            dragElement.parentElement.style.zIndex = currentZIndex - 1;
        })
        top.style.zIndex = draggables.length
    }
}

//A constant of 1 second
const intervalSeconds = 1 * 1000;
//Might be used later for weather getter
const intervalMinutes = 15 * 60 * 1000;
//Grabs the body for the clock window
let time = document.getElementById("clock").getElementsByClassName("body")[0];
setInterval(() =>{
    getTime()
},intervalSeconds)

//Gets the time
function getTime(){
    let d = new Date ();
    let hours = d.getHours(); //Number of hours
    let minutes = d.getMinutes(); //Number of minutes
    if (minutes < 10){minutes = "0" + minutes}; //If 1 digit adds a 0
    if (hours < 10){hours = "0" + hours} //If 1 digit adds a 0
    time.innerText = `${hours}:${minutes}`; //Prints to screen
}
//Pulls the time on start up so text isn't visible
getTime()

//Hides the window when minimize is clicked
var windows = document.querySelectorAll(".window").forEach((window) => {
    window.querySelector(".minus").addEventListener("click", function() {
        window.style.display = 'none'
    })
})

//Opens a window when an icon is double clicked
function openWindow(icon){
    let window = document.getElementById(icon.querySelector("figcaption").innerText)
    if (window.style.display == 'none'){ 
        window.style.display = 'block';
        window.style.top = '50%';
        window.style.left = '50%';
        focus(window)
    }
}