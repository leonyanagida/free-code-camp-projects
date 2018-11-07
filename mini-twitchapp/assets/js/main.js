var channels = [
  "medrybw",
  "ESL_SC2",
  "freecodecamp",
  "cretetion",
  "brunofin",
  "habathcx",
  "RobotCaleb",
  "OgamingSC2",
  "noobs2ninjas"
];
var def = document.getElementsByClassName("def"); // DO NOT DELETE USED AS DEFAULT FOR NAVBAR
var results = document.getElementById("results");
var notification = document.getElementById("notification"); // SHOWS ERRORS
var searchBtn = document.getElementById("searchbtn");
var userInput = document.getElementById("userinput");
var urlStart = "https://wind-bow.glitch.me/twitch-api/";
var request;
var secondRequest;
var searchRequest;
var newData;
var data;
var secondData;
var twitchData;
var line;
var name, followers, game, url, logo, desc, status;

// CHECKS IF USER IS OFFLINE AND RERUNS THE FUNTION TWITCHREADY //
var isOffine = false; // KEEP FALSE //
var isOnline = false; // KEEP FALSE //
var removed = false; // KEEP FALSE //
var executed = false; // KEEP FALSE //
// PREVENTS THE TWITCHREADY FUNCTION FROM LOOPING //
var myObj = function(name, url, logo, desc) {
  this.name = name;
  this.url = url;
  this.logo = logo;
  this.desc = desc;
  this.game = game;

  this.showOnline = function() {
    streamDesc = '<p class="desc">' + desc + "</p>";
    streamStatus = "Check";
    if (!logo) {
      logo = "assets/images/noimg.png";
    }
    /*
          if (this.name.length > 30) {
            name = this.name.split('').splice(0,30).join('') + "...";
          }
          if (this.desc.length > 120) {
            desc = this.desc.split('').splice(0,120).join('') + "...";
          }
          */
    htmlTxt =
      '<a href="' +
      url +
      '"' +
      ' target="_blank" id="txthover"><li class="online def"><i class="fa fa-circle fa-2x" aria-hidden="true"></i><div class="username"><h2>' +
      name +
      '</h2></div><img src="' +
      logo +
      '"' +
      ' class="channelimg"><p class="description">' +
      streamDesc +
      '<p class="currentstatus">Currently Live <i class="fa fa-external-link" aria-hidden="true"></i></p>';
    //console.log(htmlTxt);
    //results.innerHTML += htmlTxt;
    // PALCES TEXT INSIDE THE ELEMENT AT THE TOP //
    results.insertAdjacentHTML("afterbegin", htmlTxt);
  };

  this.showOffline = function() {
    /*
          if (this.name.length > 30) {
            name = this.name.split('').splice(0,30).join('') + "...";
          }
          */
    streamDesc = '<p class="descoffline">Currently Offline</p>';
    streamStatus = "times";
    if (!logo) {
      logo = "assets/images/noimg.png";
    }
    htmlTxt =
      '<a href="' +
      url +
      '"' +
      ' target="_blank" id="txthover"><li class="offline def"><i class="fa fa-circle fa-2x redcircle" aria-hidden="true"></i><div class="username"><h2>' +
      name +
      '</h2></div><img src="' +
      logo +
      '"' +
      ' class="channelimgoffline"><p class="offlinestatus">Currently Offline <i class="fa fa-external-link" aria-hidden="true"></i></p>';
    //console.log(htmlTxt);
    //results.innerHTML += htmlTxt;
    // PALCES TEXT INSIDE THE ELEMENT BEFORE //
    results.insertAdjacentHTML("beforeend", htmlTxt);
  };
};

function onStart() {
  for (var i = 0; i < channels.length; i++) {
    request = new XMLHttpRequest();
    request.open("GET", urlStart + "streams/" + channels[i], false);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(request.responseText);
        //console.log(data);
        // PUT ALL ERROR HANDLING HERE //
        if (data.status == 422) {
          return (notification.innerHTML =
            '<p class="errortxt">Server Error!</p>'); //console.log("twitch request error!");
        }
        if (data.status == 404) {
          return (notification.innerHTML =
            '<p class="errortxt">Server Error!</p>'); //console.log("twitch request error!");
        }
        // OUT ALL ERROR HANDLING HERE //
        if (data.stream) {
          streamer = new myObj(
            data.stream.channel.display_name,
            data.stream.channel.url,
            data.stream.channel.logo,
            data.stream.channel.status
          );
          return streamer.showOnline();
        } else {
          checkStatus(data);
        }
      }
    };
    request.onerror = function() {
      return (notification.innerHTML = '<p class="errortxt">Server Error!</p>'); //console.log("twitch request error!");
    };
    request.send();
  }
  function checkStatus(secondData) {
    secondRequest = new XMLHttpRequest();
    secondRequest.open("GET", urlStart + "channels/" + channels[i], false);
    secondRequest.onload = function() {
      if (secondRequest.status >= 200 && secondRequest.status < 400) {
        secondData = JSON.parse(secondRequest.responseText);
        //console.log(secondData, "THE SECON DATA");
        streamer = new myObj(
          secondData.display_name,
          secondData.url,
          secondData.logo,
          secondData.status
        );
        streamer.showOffline();
      }
    };
    secondRequest.send();
  }
} // END ON START //
onStart();

// SEARCH FUNCTION IS TOO BUGGY ON MOBILE
//document.getElementById("livebtn").disabled = true;
// FUNCTION FOR SEARCHING CHANNELS //
// SEARHCING CHANNELS //
/*
    searchBtn.addEventListener('click', searchFunc, false);
    function searchFunc(event) {
      notification.innerHTML = 'Loading...';

      notification.innerHTML = '<p>Find your favorite streamers!</p>';
      searchRequest = new XMLHttpRequest();
      searchRequest.open('GET', urlStart + 'streams/' + userInput.value, false);
      event.preventDefault();
      if (userInput.value == "") {
        return alert("Please input a username");
      }
      // REMOVES ALL CHILDNODES FROM RESULTS EACH SEARCH //
      // REMOVES ALL CHILDNODES FROM RESULTS EACH SEARCH //
      removed = false;
      while (results.hasChildNodes()) {
        results.removeChild(results.firstChild);
        removed = true;
      }
      twitchReady();
      //console.log(searchRequest);
    }
    function twitchReady() {
      searchRequest.onload = function() {
      if (searchRequest.status >= 200 && searchRequest.status < 400) {
        twitchData = JSON.parse(searchRequest.responseText);
        //console.log(twitchData);
        if (twitchData.error) {
          return notification.innerHTML = '<p class="errortxt">Invalid username!</p>';
        }
        if (twitchData.status == 422) {
          return notification.innerHTML = '<p class="errortxt">Invalid username!</p>';
        }
        if (twitchData.status == 422) {
          return notification.innerHTML = '<p class="errortxt">Invalid username!</p>';
        }
        if (twitchData.stream) {
          streamer = new myObj(
            twitchData.stream.channel.display_name,
            twitchData.stream.channel.url,
            twitchData.stream.channel.logo,
            twitchData.stream.channel.status
          );
          return streamer.showOnline();
        } else {
          searchOffline(twitchData);
        };
      }
      searchRequest.onerror = function() {
        return notification.innerHTML = '<p class="errortxt">Server Error!</p>'; //console.log("twitch request error!");
        }
      }
      searchRequest.send();
    }
      function searchOffline(newData) {
        searchRequest.open('GET', urlStart + 'channels/' + userInput.value, false);
          searchRequest.onload = function() {
            if (searchRequest.status >= 200 && searchRequest.status < 400) {
              newData = JSON.parse(searchRequest.responseText);
              //console.log(newData, "THE SECON DATA");
              if (!newData.error) {
              streamer = new myObj(
                newData.display_name,
                newData.url,
                newData.logo,
                newData.status
              );
              notification.innerHTML = 'DONE!...';
              return streamer.showOffline();
            } else {
              return notification.innerHTML = '<p class="errortxt">Username is unavailable!</p>';
            }
          }
        }
        searchRequest.send();
      }
      */
function onlineBtn() {
  var offlineArr = document.getElementsByClassName("offline");
  for (var k = 0; k < offlineArr.length; k++) {
    offlineArr[k].className = "defaultclass offline hide def";
  }
  var onlineArr = document.getElementsByClassName("online");
  for (var l = 0; l < onlineArr.length; l++) {
    onlineArr[l].className = "defaultclass channel online def";
  }
}
function offlineBtn() {
  var offlineArr = document.getElementsByClassName("offline");
  for (var m = 0; m < offlineArr.length; m++) {
    offlineArr[m].className = "defaultclass offline def";
  }
  var onlineArr = document.getElementsByClassName("online");
  for (var n = 0; n < onlineArr.length; n++) {
    onlineArr[n].className = "defaultclass online hide def";
  }
}
function myListBtn() {
  var allArr = document.getElementsByClassName("defaultclass");
  for (var k = 0; k < allArr.length; k++) {
    allArr[k].classList.remove("hide");
  }
}
