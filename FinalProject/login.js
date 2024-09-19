// Button implementation for login screen//
const loginBTN = document.getElementById("loginBTN");

loginBTN.addEventListener("click", function(e){
    const inputField = document.getElementById("loginInput");
    addUser(inputField.value);
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