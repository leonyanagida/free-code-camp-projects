
  var searchBtn = document.getElementById('searchbtn');
  var weather = document.getElementById('weather');
  var currentWeather = document.getElementById('currentweather');
  var currentWeatherDesc = document.getElementById('currentweatherdesc');
  var weatherIcon = document.getElementById('weathericon');
  var cityName = document.getElementById('usercity');
  var countryName = document.getElementById('usercountry');
  var temperature = document.getElementById('temperature');
  var humidity = document.getElementById('humidity');
  var windSpeed = document.getElementById('windspeed');
  var pressure = document.getElementById('pressure');

  /*
  function checkSubmit(e) {
   if(e && e.keyCode == 13) {
            
   }
  }
  */
    document.addEventListener("keydown", enterKey, false);
    searchBtn.addEventListener('click', function() {
    searchWeather();
  });
  function enterKey(event) {
    if(event.keyCode == '13') {
      event.preventDefault();
      searchWeather();
    }
  }

    function searchWeather() {
    var userInput = document.getElementById('userinput').value;
    //console.log(userInput);
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=metric&appid=6d33d2d4d045a5c858de382413ac0a35');
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var ourData = JSON.parse(ourRequest.responseText);
        convertHTML(ourData);
        //console.log(ourData);
      } else {
        // console.log("ERROR!");
        return alert("Please put in a valid city!");
      }
    };
      ourRequest.send();
  };
    var temps;
    function celToFah(temp) {
      temps = 0;
      temps = (temp * 1.8) + 32;
      temps = Math.ceil(temps);
      //temperature.innerHTML = temps + ' F';
    }
    //celToFah(0);
    //console.log(temps);
    var convertBtn = document.getElementById('convert');
    wholeTemp = 23;
    convertBtn.addEventListener('click', function() {
    if (!temperature.classList.contains('f')) {
        temperature.classList.add('f');
        celToFah(wholeTemp);
        temperature.innerHTML = temps + '\xB0' + 'F';
    } else {
        temperature.classList.remove('f');
        temperature.innerHTML = wholeTemp + '\xB0' + 'C';
    }
  });
    // UPPER CASE A STRING //
    var upperCaseWord = [];
    function newString(strings) {
      var splitWord = strings.split(' ');
      for (var i = 0; i < splitWord.length; i++) {
        upperCaseWord[i] = splitWord[i].charAt(0).toUpperCase() + splitWord[i].slice(1).toLowerCase();
      }
      return upperCaseWord.join(' ');
    }
    //newString("light rain");
    //console.log(newString("light rain"))
    function convertHTML(data) {
    //console.log(data.name);
    //console.log(data.sys['country']);
    //console.log(data.main['temp']);
    //console.log(data.main['humidity']);
    //console.log(data.main['pressure']);
    //console.log(data.weather[0]['icon']); // + '.png'
    //console.log(data.weather[0]['main']);  /* CLOUDS */
    //console.log(data.weather[0]['description']); /* LIGHT RIGHT */
    //console.log(data.wind['speed']);

      cityName.innerHTML = data.name;
      countryName.innerHTML = "";
      countryName.innerHTML = data.sys['country'];
      wholeTemp = Math.ceil(data.main['temp']);
      temperature.innerHTML = wholeTemp + '\xB0' + 'C';
      currentWeather.innerHTML = data.weather[0]['main'];
      //newString(data.weather[0]['description']);
      currentWeatherDesc.innerHTML = data.weather[0]['description'];
      weatherIcon.src = "assets/images/" + data.weather[0]['icon'] + '.png';
      humidity.innerHTML = data.main['humidity'] + '%';
      windSpeed.innerHTML = data.wind['speed'] + ' km/h';
      pressure.innerHTML = data.main['pressure'];
      //weather.innerHTML = data.name;
    }
