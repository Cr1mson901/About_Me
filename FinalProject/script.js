let time = document.getElementById("currentTime");
setInterval(() =>{
    let d = new Date ();
    time.innerHTML = d.toLocaleTimeString();
},1000)

let pos = document.getElementById("currentLocation");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    pos.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position){
    pos.innerHTML = position.coords.latitude + "<br>" + position.coords.longitude
}

function getWeather(position){
    var url = 
        "https://api.openweathermap.org/data/2.5/weather?lat="+ position.coords.latitude +"&lon="+ position.coords.longitude + "&appid=92cd8cd8f4fb9e75e5bfd3035db58c91"
    fetch(url)
    .then((response) => response.json())
    .then((date) => console.log(data));
}

function showWeather(weather){
    let test = document.getElementById("temp")
    test.innerHTML = weather.main.temp
}
