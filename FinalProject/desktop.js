window.onload = function() {
    //Pulls the html elements for the user in the tool box
    var chestUser = document.getElementById("userName");
    var lastLoginDate = document.getElementById("lastOnlineDate");
    var lastLoginTime = document.getElementById("lastOnlineTime");

    //Checks if the user accessed this page from the login screen
    if (window.name){ 
        chestUser.innerHTML = window.name;
        //Checks local storage for that last time this user logged in
        let lastLogin = JSON.parse(localStorage.getItem('loginTimes'))[window.name][0]
        lastLoginDate.innerHTML = lastLogin[1]
        lastLoginTime.innerHTML = lastLogin[0]
    } else {
        //Provides a default set of information if the website is accessed directly
        chestUser.innerHTML = "Cr1mson"
        lastLoginDate.innerHTML = "October 8th"
        lastLoginTime.innerHTML = "Now"
    }
    
    //Checks the stored settings for the crt effect
    if (crtState == "disabled"){
        container.classList.add("poweroff")
    }
    //Builds the current calendar when the website is loaded
    buildCalendar(new Date())
}
//Testing purposes to get the coordinates of objects
// onmousedown = function(e){
//     console.log(e.clientX)
//     console.log(e.clientY)
// }

// Gets the bounding area for the elements of the monitor
var container = document.getElementsByClassName("crt")[0];

//CRT activation status from local memory
var crtState = localStorage.getItem("crtState") || "enabled";

// Variables to store mouse position and offsets
var offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

document.querySelectorAll('.draggable').forEach((dragElement) => {
    //Focusses on the element that the mouse is on
    dragElement.parentElement.onmousedown = function() {
        //On mouse down the window will pop to the top via the focus function
        focus(this)
    }
    //Dragging TODO update so the actual body doesn't move until mouse release, instead display a red outline in its place
    dragElement.onmousedown = function(e) {
        e.preventDefault(); // Prevent default behavior

        // Get the current mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;

        //Drag table is the window 
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

//Moves the user to the login screen
function logOut(){
    window.location.href='login.html?from=desktop';
}

// Changes which side the submenus come out based on how close to the right edge they are
//Grabs all the top menus in the toolbox
var mainMenus = document.querySelectorAll(".mainmenu")

//Enumeration of the menus
mainMenus.forEach((mainMenu, index) => {
    mainMenu.addEventListener("mouseover", function() {
        var submenu = mainMenu.querySelector(".submenu"); //Grabs the submenus under the mainmenu
        submenu.style.display = "block" //Reveals the sub menu
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

//Icons
//Could implement this to store the icon name that is selected so I don't have to query all icons to turn off the highlight
var iconSelected = false

//If there is a mouse down in the document, unhighlight the icons
document.addEventListener("mousedown", function() {
    if (iconSelected){
        unhighlight()
    }
})

//Grabs all the icons
var icons = document.querySelectorAll("button")

//Adds listners for mousedown and dblclicks on icons
icons.forEach(icon => {
    icon.addEventListener("mousedown", function(e) {
        // Stops the document from recieving the click
        e.stopPropagation()
        // Resets icons if an icon is Selected
        if (iconSelected) {
            unhighlight()
        }
        var figure = this.querySelector("figure")
        //Gives a highlight effect to the icon
        figure.style.background = "rgba(200,200,255,0.2)"
        console.log("Clicked")
        //States there is an icon that is currently selected
        iconSelected = true
    })
    icon.addEventListener("dblclick", function(e) {
        // Stops the document from recieving the click
        e.stopPropagation()

        //Unhighlighs the icon
        this.querySelector("figure").style.background = "none"
        console.log("Open")
        //Opens the window with the same name as the figcaption of the icon clicked
        openWindow(this)
    })
})

//Unhighlights all of the icons
function unhighlight() {
    icons.forEach(icon => {
        var figure = icon.querySelector("figure")
        figure.style.background = "none"
    })
    //Declares that no icon is currently Selected
    iconSelected = false
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
                //Grays out window headers that are not in focus
                dragElement.style.background = "#808080"
            }
        })
        //Set our chosen element to the top
        top.style.zIndex = draggables.length
        //Changes the focused header to the blueish color
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
        window.style.display = 'flex'; //Reveals window
        //Top left corner to ensure all windows will open within the bounds of the screen
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
//TODO: Need to revisit this code, can fix/reduce
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
//TODO: Implement keyboard controls
rightArrow.addEventListener("click", function(){
    //Hides the current photo
    photos[currentPhoto].style.display = "none"
    //Math that allows for wrapping around the right side of the list
    currentPhoto = (currentPhoto + 1) % gallarySize
    //Displays the Next photo
    photos[currentPhoto].style.display = "block"
})

leftArrow.addEventListener("click", function(){
    //Hides the current photo
    photos[currentPhoto].style.display = "none"
    //Math that allows for wrapping left of the list
    currentPhoto = gallarySize - (((gallarySize - currentPhoto) % gallarySize) + 1) //This is disgusting but works
    //Displays the next photo
    photos[currentPhoto].style.display = "block"
})

//Power to the monitor is on/ Monitor is not in the shutting off animation
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
        //If the crt is enabled, remove when the monitor turns off
        if (crtState == "enabled"){
            container.classList.add("poweroff")
        }
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
        //If the crt is enabled, add it back
        if (crtState == "enabled"){
            container.classList.remove("poweroff")
        }
        //Unsets because the display type is not specified
        screen.style.display = "unset"
        //Adds back the blue background color
        border.style.background = "radial-gradient(circle at center, #5B87BD, #3D5A7E)"
        powerOn = true
    }
}

//Power Button Scaling
function scaleImageMap() {
    const img = document.getElementById("border");
    //Grabs the areas of the workmap
    const areas = document.querySelectorAll("map[name='workmap'] area");

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    //Numbers that were used while implementing, roughly the size on a 1080 monitor
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

        //Checks if any open windows were moved outside the screen when resized
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

//Original Logic for the creation of the calendar... Might suck a lot
let monthList = {0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June", 6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"}
// d is used to allow for future implementation of choosing a specific month/year with drop down menus
function buildCalendar(d){
    let month = d.getMonth()
    document.getElementById("month").innerText = monthList[month]

    let year = d.getFullYear()
    document.getElementById("year").innerText = year

    let firstDay = new Date((month + 1) + " 1 " + year).getDay()
    // console.log(firstDay)
    let daysInMonth = new Date(year, (month + 1), 0).getDate()
    // console.log(daysInMonth)
    //Iterates through the cells starting with the first day of the month
    for (let i = 0; i < daysInMonth; i++){
        day = document.getElementById("c" + (firstDay + i))
        day.innerText = i + 1
        if (d.getDate() == i + 1){
            day.style.color = "red"
        } else{
            day.style.color = "black"
        }
    }
}