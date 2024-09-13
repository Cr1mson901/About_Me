// script.js
const button = document.getElementById('sun');

button.addEventListener('mousedown', (e) => {
    e.preventDefault();

    // Calculate the offset between the mouse position and the button position
    const offsetX = e.clientX - button.getBoundingClientRect().left;
    const offsetY = e.clientY - button.getBoundingClientRect().top;

    function onMouseMove(e) {
        // Calculate the new position
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // Set the new position
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    }

    function onMouseUp() {
        // Remove event listeners when mouse is released
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Add event listeners for mouse movement and release
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});