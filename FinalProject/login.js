var userNames = JSON.parse(localStorage.getItem("userNames") || '[]');
var iconSelected = false;
var accountLabel = document.getElementById("account");
var crtState = localStorage.getItem("crtState");

//Adds all locally stored usernames//
window.onload = function() {
    userNames.forEach((name) => addUser(name));
    //Only needs to apply to the root icon
    var figure = document.querySelector("figure")
    console.log(figure)
    figure.addEventListener("click", function() {
        iconSelect(this);
    })
    const params = new URLSearchParams(window.location.search);
    
    if (!params.get('from')) {
        let screen = document.getElementsByClassName("screen")[0]
        let border = document.getElementById("border")
        let container = document.getElementsByClassName("crt")[0]
        powerOn = false
        screen.style.display = "none"
        border.style.background = "radial-gradient(circle at center, #3a3a3a, #000)";
    }
};

// Button implementation for login screen//
const loginBTN = document.getElementById("loginBTN");
// InputField for login grabbed
const inputField = document.getElementById("loginInput");
inputField.addEventListener('input', function() {
    //Checks if there are any icons to reset to not perform unnecesary actions
    if (iconSelected){
        console.log("reset")        
        iconReset(false)
    }
    //Highlights if the text matches an existing username
    if (userNames.includes(inputField.value.toLowerCase())){
        console.log('match')
        //Reduce this code
        var figures = document.querySelectorAll('figure');
        for (let figure of figures) {
            let name = figure.querySelector("figcaption");
            if (name.textContent == inputField.value.toLowerCase()){
                iconSelect(figure);
                break;
            }
        }
        //Might try and get rid of this line of code later on
    } else if (inputField.value.toLowerCase() == "root"){ //Highlight if root since root isn't in the username list
        iconSelect(document.getElementById('root'))
    }
})

//When the button is clicked, checks if there is text in the inputField. If so checks against user records.
loginBTN.addEventListener("click", function(e){
    const name = inputField.value.toLowerCase()
    if (inputField.value == '') {
        console.log('empty')
    } else if (!userNames.includes(name) && inputField.value != 'root') {
        addUser(name);
        userNames.push(name);
        localStorage.setItem('userNames', JSON.stringify(userNames));
        console.log("login");
        login(name)
    } else {
        console.log("login");
        login(name)
    }
    window.name = name;
    //Resets inputField
    inputField.value = ""
});

function addUser(name) {
    // Figure Element
    const newUser = document.createElement("figure");
    newUser.classList.add("userIcon");
    // Image Element 
    const img = document.createElement('img');
    img.src = './ICON/irix/display.png';
    img.alt = 'Display';
    // Caption Element
    const newName = document.createElement('figcaption');
    newName.textContent = name

    //Adds a click listner to the new entity
    newUser.addEventListener("click", function(){
        iconSelect(this);
    });
    // Adds elements into the figure
    newUser.appendChild(img);
    newUser.appendChild(newName);

    // Inserts figure into the html
    const users = document.getElementsByClassName("userIcon");
    const lastUser = users[users.length - 1]
    insertAfter(lastUser, newUser)
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }


function iconSelect(icon){
    iconReset(true);
    let img = icon.querySelector("img");
    img.src = "./ICON/irix/selectedDisplay.png";
    let accountName = icon.querySelector("figcaption").innerHTML;
    inputField.value = accountName;
    if (accountName == 'root') {
        accountLabel.innerHTML = 'Super-User'
    } else {
        accountLabel.innerHTML = accountName + " Account"
    }
}

function iconReset(selected) {
    //Last one of these codes that needs to be combined
    var figures = document.querySelectorAll('figure');
    for (let figure of figures) {
        let img = figure.querySelector("img");
        img.src = "./ICON/irix/display.png"
    }
    iconSelected = selected;
    accountLabel.innerHTML = '';
}

function login(name) {
    window.location.href = 'desktop.html';

    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();

    if (minutes < 10) { minutes = "0" + minutes; } //If 1 digit adds a 0
    if (hours < 10) { hours = "0" + hours; } //If 1 digit adds a 0

    let time = `${hours}:${minutes}`;
    let loginDate = d.toDateString();

    // Retrieve existing login times from localStorage
    let loginTimes = JSON.parse(localStorage.getItem('loginTimes')) || {};

    // Check if the user already exists in the stored login times, and if so, add time. If more then 2 times, remove the oldest time
    if (loginTimes[name]) {
        loginTimes[name].push([time, loginDate]);
        if (loginTimes[name].length > 2){
            loginTimes[name].shift()
        }
    } else {
        loginTimes[name] = [[time, loginDate]];
    }
    // Store the updated login times back into localStorage
    localStorage.setItem('loginTimes', JSON.stringify(loginTimes));
    localStorage.setItem('crtState', crtState);
}

//Power button for login screen
var powerOn = true;
var shuttingOff = false;

function powerSwitch(){
    console.log("flick")
    let screen = document.getElementsByClassName("screen")[0]
    let border = document.getElementById("border")
    let container = document.getElementsByClassName("crt")[0]
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
window.addEventListener("resize", scaleImageMap);

//Help Button implementation
let helpWin = document.getElementById("helpWin")
function openHelpWindow(){
    helpWin.style.display = "flex"
}
function closeHelpWindow(){
    helpWin.style.display = "none"
}

//Toggle CRT state
function toggleCRT(){
    if (crtState){
        crtState = false
    } else {
        crtState = true
    }
}