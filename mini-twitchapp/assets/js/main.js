
  (function() {

    // BUTTONS
    var searchBtn = document.getElementById('searchbtn');
    var liveBtn = document.getElementById('livebtn');
    var offlineBtn = document.getElementById('offlinebtn');
    var navSearchBtn = document.getElementById('navsearch');
    //BUTTONS END

    var userInput = document.getElementById('userinput');
    var results = document.getElementById('results');
    // THE FIRST URL IS USED IF THE USER IS LIVE/ ONLINE //
    var url = 'https://wind-bow.gomix.me/twitch-api/streams/';
    // THE SECOND URL IS USED IF THE USER IS OFFLINE //
    var url2 = 'https://wind-bow.glitch.me/twitch-api/channels/';

    var name, followers, game, logo, status, url;
    var channels = ["freecodecamp", "cretetion", "storbeck", "habathcx", "RobotCaleb", "OgamingSC2", "ESL_SC2", "noobs2ninjas", "medrybw"];

    // XMLHTTPREQUEST //
    var twitchRequest = new XMLHttpRequest();
    // INCREASES TO PREVENT INFINTIE LOOPS //
    var theCount = 0;
    var htmlTxt;
    // CHECKS IF USER IS OFFLINE AND RERUNS THE FUNTION TWITCHREADY //
    var isOffine = false;   // KEEP FALSE //
    var isOnline = false;   // KEEP FALSE //
    var removed = false;    // KEEP FALSE //
    var executed = false;   // KEEP FALSE //
    // PREVENTS THE TWITCHREADY FUNCTION FROM LOOPING //

    var myObj = function(name, url, logo, desc) {
      this.name = name;
      this.url = url;
      this.logo = logo;
      this.desc = desc;

      this.showOnline = function() {
        streamDesc = '<p class="desc">' + desc + '</p>';
        streamStatus = "Check";
        if (!logo) {
          logo = "assets/images/noimg.png";
        }
        if (this.name.length > 30) {
          name = this.name.split('').splice(0,30).join('') + "...";
        }
        if (this.desc.length > 120) {
          desc = this.desc.split('').splice(0,120).join('') + "...";
        }
        htmlTxt = '<a href="' + url + '"' +
        ' target="_blank" id="txthover"><li class="online"><i class="fa fa-circle fa-2x" aria-hidden="true"></i><div class="username"><h2>' + name +
        '</h2></div><img src="' + logo + '"' +
        ' class="channelimg"><p class="description">' + streamDesc + '<p class="currentstatus">Currently Live <i class="fa fa-external-link" aria-hidden="true"></i></p>';
        //console.log(htmlTxt);
        //results.innerHTML += htmlTxt;
        // PALCES TEXT INSIDE THE ELEMENT AT THE TOP //
        results.insertAdjacentHTML('afterbegin', htmlTxt);
      }

      this.showOffline = function() {
        if (this.name.length > 30) {
          name = this.name.split('').splice(0,30).join('') + "...";
        }
        streamDesc = '<p class="descoffline">Currently Offline</p>';
        streamStatus = "times";
        if (!logo) {
          logo = "assets/images/noimg.png";
        }
        htmlTxt = '<a href="' + url + '"' +
        ' target="_blank" id="txthover"><li class="offline"><i class="fa fa-circle fa-2x redcircle" aria-hidden="true"></i><div class="username"><h2>' + name +
        '</h2></div><img src="' + logo + '"' +
        ' class="channelimgoffline"><p class="offlinestatus">Currently Offline <i class="fa fa-external-link" aria-hidden="true"></i></p>';
        //console.log(htmlTxt);
        //results.innerHTML += htmlTxt;
        // PALCES TEXT INSIDE THE ELEMENT BEFORE //
        results.insertAdjacentHTML('beforeend', htmlTxt);
      }
    };

    // THE LIVE BUTTON FUNCTION LOOPS THROUGH THE ARRAY //
    liveBtn.addEventListener('click', listChecker);
    function listChecker() {
      // IF USERNAME IS INVALID PREVENTS INFINITE LOOP //
      if (theCount === channels.length) {
        return theCount = 0;
      }
      twitchRequest.open('GET', url + channels[theCount], true);
      //console.log("URL ONE");
      twitchReadyList();
    }
    // FUNCTION FOR SEARCHING CHANNELS //
    function twitchReadyList() {
      twitchRequest.onreadystatechange = function() {
      if (twitchRequest.readyState == 4 && twitchRequest.status == 200) {
        var twitchData = JSON.parse(twitchRequest.responseText);
        //console.log(twitchData);
        convertHTMLList(twitchData); // SENDS DATA TO FUNCTION//
      } else {
        //console.log("Loading...");
      }
    };
      twitchRequest.onerror = function() {
        return notification.innerHTML = '<p class="errortxt">Server Error!</p>'; //console.log("twitch request error!");
      }
      twitchRequest.send();
    }
    function convertHTMLList(data) {
      liveBtn.disabled = true;
      //console.log(data);
      if (theCount < channels.length) {
        if (data.stream) {
          theCount++; // INCREASES THE COUNT TO PREVENT INFINITE LOOP //
          streamer = new myObj(
            data.stream.channel.display_name,
            data.stream.channel.url,
            data.stream.channel.logo,
            data.stream.channel.status
          );
          //console.log("DATA STREAM");
          streamer.showOnline();
          listChecker();
        } else if (data.stream === null) {
          //console.log("DATA ELSE0");
          offlineFunc(data);
        }
      }
    }

  // THESE SET OF FUNCTIONS ARE ONLY CALLED IF THE STREAM IS NOT LIVE //
  function offlineFunc() {
    twitchRequest.open('GET', url2 + channels[theCount], true);
    twitchOfflineList();
  }
  function twitchOfflineList() {
    twitchRequest.onreadystatechange = function() {
    if (twitchRequest.readyState == 4 && twitchRequest.status == 200) {
      var twitchData = JSON.parse(twitchRequest.responseText);
      //console.log(twitchData);
      convertHTMLOffline(twitchData);
    } else {
      //console.log("Loading...");
    }
  };
    twitchRequest.onerror = function() {
      return notification.innerHTML = '<p class="errortxt">Server Error!</p>'//console.log("twitch request error!");
    }
    twitchRequest.send();
  }
  function convertHTMLOffline(data) {
    theCount++;  // INCREASES THE COUNT TO PREVENT INFINITE LOOP //
    //console.log(theCount + "<<---- THE COUNT");
    streamer = new myObj(
      data.display_name,
      data.url,
      data.logo,
      data.status
    );
    streamer.showOffline();
    listChecker(); // LOOPING THE FUNCTION //
  }

  // FUNCTION FOR SEARCHING CHANNELS //
      // SEARHCING CHANNELS //
    searchBtn.addEventListener('click', searchFunc, false);
    function searchFunc(event) {
      document.getElementById("livebtn").disabled = false;
      event.preventDefault();

      // CHECKS FOR INVALID INPUTS //
      var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
      if (pattern.test(userInput.value)) {
        return notification.innerHTML = '<p class="errortxt">Invalid Username!</p>';
      }

      if (userInput.value == "") {
        return alert("Please input a username");
      }
      // REMOVES ALL CHILDNODES FROM RESULTS EACH SEARCH //
      removed = false;
      while (results.hasChildNodes()) {
        results.removeChild(results.firstChild);
        removed = true;
      }
      //console.log('click');
      // RESETTING THE VARIABLES FOR EVERY CALL //
      isOffine = false;
      executed = false;
      // RESET VARIABLES END //
      searchIf();
    }
    function searchIf() {
      if (!isOffine) {
        twitchRequest.open('GET', url  + userInput.value, true);
      }
      twitchReady();
    }
    function twitchReady() {
      twitchRequest.onreadystatechange = function() {
      if (twitchRequest.readyState == 4 && twitchRequest.status == 200) {
        var twitchData = JSON.parse(twitchRequest.responseText);
        //console.log(twitchData);
        if (twitchData.status == 422) {
          return notification.innerHTML = '<p class="errortxt">Invalid Username!</p>';
        }
        convertHTML(twitchData);
        }
      };
      twitchRequest.onerror = function() {
        return notification.innerHTML = '<p class="errortxt">Server Error!</p>' //console.log("twitch request error!");
      }
      twitchRequest.send();
    }
    function convertHTML(data) {
      for (var key in data) {
        notification.innerHTML = '<p>Find your favorite streamers!</p>';
        // PRINTS ERROR IF USER INPUTS INVALID USERNAME. PREVENTS INFINITE LOOP //
        if (data.status === 404) {
          return notification.innerHTML = '<p class="centered errortxt">User does not exist!</p>';
        }
        // LOOPING THROUGH DATA TO MAKE ERROR HANDLING EASIER //
        if (data.hasOwnProperty(key)) {
          //console.log(key + " --> " + data[key]);
        }
      }
      //console.log(data.name);
      //console.log(data.stream);
      if (data.name == null && data.stream == null) {
        twitchRequest.open('GET', url2  + userInput.value, true);
        return twitchReady(); // IF OFFLINE GOES BACK AND USES THE 2ND URL INSTEAD //
      }
      if (data.stream) {
        streamer = new myObj(
          data.stream.channel.display_name,
          data.stream.channel.url,
          data.stream.channel.logo,
          data.stream.channel.status
        );
        return streamer.showOnline();
      } else {
        streamer = new myObj(
          data.display_name,
          data.url,
          data.logo,
          data.status
        );
        return streamer.showOffline();
      }
      getStatus(data);
    }
    // SEARCH FUNCTION. CHECKS IF CHANNEL IS ONLINE OF OFFLINE AND RUNS THE FUNCTION //
    function getStatus(channelStatus) {
      if (!executed) { //PREVENTS THE INFINITE LOOP //
        if (channelStatus.stream == null || channelStatus.stream.channel["status"] == null) {
          //console.log("OFFLINE");
          executed = true;
          searchIf();
        } else {
          //console.log("ONLINE");
        }
      }
    }
  })();
