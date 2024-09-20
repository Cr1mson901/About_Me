var userNames = JSON.parse(localStorage.getItem("userNames") || '[]');
var iconSelected = false;
var accountLabel = document.getElementById("account");
//Adds all locally stored usernames//
window.onload = function() {
    userNames.forEach((name) => addUser(name));
    //Only needs to apply to the root icon
    var figure = document.querySelector("figure")
    console.log(figure)
    figure.addEventListener("click", function() {
        iconSelect(this);
    })
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
    } else {
        //TO:DO Implement login feature here
        console.log("login");
    }
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
    iconSelected = selected
    accountLabel.innerHTML = ''
}