

  var quoteBox = document.getElementById('quote');
  var quoteBtn = document.getElementById('quotebtn');
  var tweetBtn = document.getElementById('tweetbtn');


  quoteBtn.addEventListener('click', function() {
    var ourRequest = new XMLHttpRequest();

    ourRequest.open('GET', 'http://quotes.stormconsultancy.co.uk/random.json');
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var ourData = JSON.parse(ourRequest.responseText);
        convertHTML(ourData);
        //console.log(ourData);
      } else {
        console.log("TOOK TOO LONG");
      }
    };
      ourRequest.onerror = function() {
        console.log("Our Request Error!");
      };

      ourRequest.send();
    });

      var ajaxText = '"Let the code be with you." -You';
      function convertHTML(data) {
        ajaxText = '"' + data.quote + '" -' + data.author;
        quoteBox.innerHTML = '"' + data.quote + '"' + '<br><br> - ' + data.author;
      }





      tweetBtn.addEventListener('click', tweetTweet);
      // TWEETING
      function tweetTweet() {
        var url = "https://twitter.com/intent/tweet";
        var text = ajaxText;
        var hashtags = "code";
        var via = "userName";
        window.open(url + "?text="+text+"; via="+via,"", "width=500, height=300");
      }
