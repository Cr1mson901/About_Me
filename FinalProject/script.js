let time = document.getElementById("currentTime");
setInterval(() =>{
    let d = new Date ();
    time.innerHTML = d.toLocaleTimeString();
},1000)

function getLocation() {
  if (navigator.geolocation) {
    navigator.permissions &&
    navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
    if('granted' === PermissionStatus.state) {
        navigator.geolocation.getCurrentPosition(function(geoposition) {
            console.log(geoposition) /* You can use this position without prompting the user if the permission had already been granted */
        })
    } else {
        navigator.geolocation.getCurrentPosition(getWeather);
    }
    })

  } else {
    pos.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getWeather(position){
    const url = 
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=92cd8cd8f4fb9e75e5bfd3035db58c91`
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
            const temperature = Math.round(((data.main.temp - 273.15) * 1.8 + 32) * 10) / 10
            const tempElement = document.getElementById('temp'); // Find the element
            tempElement.innerHTML = `${temperature}°F`; // Set the innerHTML with the temperature
        } else {
            console.error('Unexpected data structure:', data);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

