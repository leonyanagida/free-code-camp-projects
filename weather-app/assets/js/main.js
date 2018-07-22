var searchBtn = document.getElementById("searchbtn");
var weather = document.getElementById("weather");
var currentWeather = document.getElementById("currentweather");
var currentWeatherDesc = document.getElementById("currentweatherdesc");
var weatherIcon = document.getElementById("weathericon");
var cityName = document.getElementById("usercity");
var countryName = document.getElementById("usercountry");
var temperature = document.getElementById("temperature");
var humidity = document.getElementById("humidity");
var windSpeed = document.getElementById("windspeed");
var pressure = document.getElementById("pressure");

document.addEventListener("keydown", enterKey, false);
searchBtn.addEventListener("click", function() {
  searchWeather();
});
function enterKey(event) {
  if (event.keyCode == "13") {
    event.preventDefault();
    searchWeather();
  }
}

function searchWeather() {
  var userInput = document.getElementById("userinput").value;
  var ourRequest = new XMLHttpRequest();
  ourRequest.open(
    "GET",
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      userInput +
      "&units=metric&appid=" /* INSERT APP ID */
  );
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      convertHTML(ourData);
    } else {
      return alert("Please put in a valid city!");
    }
  };
  ourRequest.send();
}
var temps;
function celToFah(temp) {
  temps = 0;
  temps = temp * 1.8 + 32;
  temps = Math.ceil(temps);
}

var convertBtn = document.getElementById("convert");
wholeTemp = 23;
convertBtn.addEventListener("click", function() {
  if (!temperature.classList.contains("f")) {
    temperature.classList.add("f");
    celToFah(wholeTemp);
    temperature.innerHTML = temps + "\xB0" + "F";
  } else {
    temperature.classList.remove("f");
    temperature.innerHTML = wholeTemp + "\xB0" + "C";
  }
});

var upperCaseWord = [];
function newString(strings) {
  var splitWord = strings.split(" ");
  for (var i = 0; i < splitWord.length; i++) {
    upperCaseWord[i] =
      splitWord[i].charAt(0).toUpperCase() +
      splitWord[i].slice(1).toLowerCase();
  }
  return upperCaseWord.join(" ");
}

function convertHTML(data) {
  cityName.innerHTML = data.name;
  countryName.innerHTML = "";
  countryName.innerHTML = data.sys["country"];
  wholeTemp = Math.ceil(data.main["temp"]);
  temperature.innerHTML = wholeTemp + "\xB0" + "C";
  currentWeather.innerHTML = data.weather[0]["main"];
  currentWeatherDesc.innerHTML = data.weather[0]["description"];
  weatherIcon.src = "assets/images/" + data.weather[0]["icon"] + ".png";
  humidity.innerHTML = data.main["humidity"] + "%";
  windSpeed.innerHTML = data.wind["speed"] + " km/h";
  pressure.innerHTML = data.main["pressure"];
}
