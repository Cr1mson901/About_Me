window.onload = function() {
    var chestUser = document.getElementById("userName");
    var lastLoginDate = document.getElementById("lastOnlineDate");
    var lastLoginTime = document.getElementById("lastOnlineTime");
    if (window.name){ //Checks if the user accessed this page from the login screen
        chestUser.innerHTML = window.name;
        let lastLogin = JSON.parse(localStorage.getItem('loginTimes'))[window.name][0]
        lastLoginDate.innerHTML = lastLogin[1]
        lastLoginTime.innerHTML = lastLogin[0]
    } else {
        chestUser.innerHTML = "Cr1mson" //Default Name
        lastLoginDate.innerHTML = "October 8th"
        lastLoginTime.innerHTML = "Now"
    }
}
// onmousedown = function(e){
//     console.log(e.clientX)
//     console.log(e.clientY)
// }
// Gets screen container
var container = document.getElementsByClassName("crt")[0];

// Variables to store mouse position and offsets
var offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

document.querySelectorAll('.draggable').forEach((dragElement) => {
    //Focusses on the element that the mouse is on
    dragElement.parentElement.onmousedown = function() {
        focus(this)
    }
    //Dragging TODO update so the actual body doesn't move until mouse release, instead display a red outline in its place
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
//Redirects to the login screen when the logout button is pressed in the toolchest
logOutBTN.addEventListener("click", function(){
    window.location.href='login.html?from=desktop';
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
        figure.style.background = "rgba(200,200,255,0.2)"
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

//Focusses the top item
function focus(top) {
    //List of all draggable objects
    let draggables = document.querySelectorAll('.draggable');
    let topHeader = top.querySelector('.draggable')
    //Checks if the element is already on top
    if (top.style.zIndex != draggables.length){
        draggables.forEach((dragElement) => {
            let currentZIndex = parseInt(getComputedStyle(dragElement.parentElement).zIndex)
            // console.log(currentZIndex) //Debugging
            if (top.style.zIndex < currentZIndex){ //If the element is currently above top element, decrease by 1
                dragElement.parentElement.style.zIndex = currentZIndex - 1;
            }
            if (dragElement != topHeader){
                dragElement.style.background = "#808080"
            }
        })
        //Set our chosen element to the top
        top.style.zIndex = draggables.length
        topHeader.style.background = "#A59F80"
    }
}

//A constant of 1 second
const intervalSeconds = 1 * 1000;

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

//Hides the window when minimize is clicked
//TODO Implement minimized icon
var windows = document.querySelectorAll(".window").forEach((window) => {
    window.querySelector(".minus").addEventListener("click", function() {
        window.style.display = "none"
    })
})

//Opens a window when an icon is double clicked
function openWindow(icon){
    let window = document.getElementById(icon.querySelector("figcaption").innerText)
    if (getComputedStyle(window).display == "none"){ //Checks if the window is hidden
        window.style.display = 'block'; //Reveals window
        window.style.top = "5%";
        window.style.left = "5%";
    }
    focus(window) //Makes the window be on top when opened
}

//Weather
var generator = document.getElementById("weatherGenerator")
generator.addEventListener("click", function(){
    getLocation()
})

function getLocation() {
if (navigator.geolocation) {
    navigator.permissions &&
    navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
    if('granted' === PermissionStatus.state) {
        navigator.geolocation.getCurrentPosition(function(geoposition) {
            console.log(geoposition)
            getWeather(geoposition) // Uses this position if location has been accepted
        })
    } else {
    navigator.geolocation.getCurrentPosition(getWeather);
    }
    })
    } else {
        generator.innerText = "Geolocation is not supported by this browser.";
    }
}
function getWeather(position){
    console.log(position)
    const url = 
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=92cd8cd8f4fb9e75e5bfd3035db58c91&units=imperial`
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Check if data and data.main are present
        if (data && data.main && data.main.temp) {
            document.getElementById('temp').innerText = (`${data.main.temp}°F`);
            document.getElementById('humidity').innerText = (`${data.main.humidity}% Humidity`)
            document.getElementById("wind").innerText = (`${data.wind.speed}Mph Winds`);
            // let iconURL = `./icon/weather/${data.weather[0].icon}.png`
            // document.getElementById("weather").style.backgroundImage = `url(${iconURL})`
        } else {
            console.error('Unexpected data structure:', data);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}  

//Implementation of image gallary
let photos = document.getElementById("picture").querySelectorAll("img");
let gallarySize = photos.length

var currentPhoto = 0;
photos[currentPhoto].style.display = "block"


let rightArrow = document.getElementById("navRight")
let leftArrow = document.getElementById("navLeft")

rightArrow.addEventListener("click", function(){
    photos[currentPhoto].style.display = "none"
    currentPhoto = (currentPhoto + 1) % gallarySize
    photos[currentPhoto].style.display = "block"
})

leftArrow.addEventListener("click", function(){
    photos[currentPhoto].style.display = "none"
    currentPhoto = gallarySize - (((gallarySize - currentPhoto) % gallarySize) + 1) //This is disgusting but works
    photos[currentPhoto].style.display = "block"
})

var powerOn = true;
var shuttingOff = false

function powerSwitch(){
    console.log("flick")
    let screen = document.getElementsByClassName("screen")[0]
    let border = document.getElementById("border")
    if (powerOn){
        shuttingOff = true
        screen.style.display = "none"
        container.classList.add("shutoff")
        container.classList.add("poweroff")
        //Makes the monitor look like glass
        border.style.background = "radial-gradient(circle at center, #3a3a3a, #000)";
        // Allows for the animation to complete
        setTimeout(function(){
            shuttingOff = false;
        }, 750)
        powerOn = false
    //Does not power back on if it is shutting off
    } else if(!shuttingOff) {
        container.classList.remove("shutoff")
        container.classList.remove("poweroff")
        screen.style.display = "unset"
        border.style.background = "radial-gradient(circle at center, #5B87BD, #3D5A7E)"
        powerOn = true
    }
}

//Power Button Scaling
function scaleImageMap() {
    const img = document.getElementById("border");
    const areas = document.querySelectorAll("map[name='workmap'] area");

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    const originalWidth = 1080;
    const originalHeight = 810;

    const scaleX = imgWidth / originalWidth;
    const scaleY = imgHeight / originalHeight;

    areas.forEach(area => {
        const originalCoords = area.dataset.coords.split(',').map(Number);
        const scaledCoords = originalCoords.map((coord, index) =>
            index % 2 === 0 ? Math.round(coord * scaleX) : Math.round(coord * scaleY)
        );
        area.coords = scaledCoords.join(',');
    });
}

window.addEventListener("load", scaleImageMap);
window.addEventListener("resize", boundsCheck);
window.addEventListener("resize", scaleImageMap);

function boundsCheck(){
    Array.from(document.querySelectorAll('.draggable')).filter(s => window.getComputedStyle(s.parentElement).getPropertyValue('display') != 'none').forEach((dragElement) => {
        let dragTable = dragElement.parentElement
        let dragRect = dragTable.getBoundingClientRect();
        let containerRect = container.getBoundingClientRect();

        if (dragRect.right >= containerRect.right - 10 || dragRect.left <= containerRect.left + 10){
            // console.log("Outside")
            dragTable.style.left = "5%"
        }
        if (dragRect.top <= containerRect.top - 10 || dragRect.bottom >= containerRect.bottom + 10){
            // console.log("Outside vertical")
            dragTable.style.top = "5%";
        }
    })
}