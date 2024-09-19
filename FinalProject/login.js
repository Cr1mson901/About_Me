var userNames = JSON.parse(localStorage.getItem("userNames") || '[]');
//Adds all locally stored usernames//
window.onload = function() {
    userNames.forEach((name) => addUser(name));

};

// Button implementation for login screen//
const loginBTN = document.getElementById("loginBTN");

loginBTN.addEventListener("click", function(e){
    const inputField = document.getElementById("loginInput");
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