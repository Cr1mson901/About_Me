var userNames = JSON.parse(localStorage.getItem("userNames") || '[]');
var iconSelected = false;
//Adds all locally stored usernames//
window.onload = function() {
    userNames.forEach((name) => addUser(name));
    //Same code repeated throughout the file
    var figures = document.querySelectorAll('figure')
    for (let figure of figures) {
        figure.addEventListener("click", function() {
            iconSelect(this);
        })
}
};


// Button implementation for login screen//
const loginBTN = document.getElementById("loginBTN");
// InputField for login grabbed
const inputField = document.getElementById("loginInput");
inputField.addEventListener('input', function() {
    if (iconSelected){
        console.log("reset")        
        iconReset(false)
    }
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
    } else if (inputField.value.toLowerCase() == "root"){
        iconSelect(document.getElementById('root'))
    }
})

loginBTN.addEventListener("click", function(e){
    const name = inputField.value.toLowerCase()
    if (inputField.value == '') {
        console.log('empty')
    } else if (!userNames.includes(name) && inputField.value != 'root') {
        addUser(name);
        userNames.push(name);
        localStorage.setItem('userNames', JSON.stringify(userNames));
    } else {
        console.log("login");
    }
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

    newUser.addEventListener("click", function(){
        iconSelect(this);
    });
    // Adds elements into the figure
    newUser.appendChild(img)
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
    img.src = "./ICON/irix/selectedDisplay.png"
    inputField.value = icon.querySelector("figcaption").innerHTML;
}

function iconReset(selected) {
    //Last one of these codes that needs to be combined
    var figures = document.querySelectorAll('figure');
    for (let figure of figures) {
        let img = figure.querySelector("img");
        img.src = "./ICON/irix/display.png"
    }
    iconSelected = selected
}