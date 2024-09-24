window.onload = function() {
    document.getElementById("user").innerHTML = window.name;
}

// Get the element to be dragged
var dragElement = document.getElementById("toolchest");

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

        // Set the new position of the element
        dragElement.style.top = (dragElement.offsetTop - offsetY) + "px";
        dragElement.style.left = (dragElement.offsetLeft - offsetX) + "px";
    };

    // Stop moving when mouse button is released
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
    };
};
