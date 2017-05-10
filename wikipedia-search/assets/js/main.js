

(function() {

  var xhr = new XMLHttpRequest();
  var searchBtn = document.getElementById('searchbtn');
  var results = document.getElementById('results');
  var userInput = document.getElementById('userinput');
  var errorTxt = document.getElementById('errortxt');
  var loadBtn = document.getElementById('loadbtn');
  var myQuotes = document.getElementById('myquotes');
  var wordArray = ['Five page essay due tomorrow? Wikipedia it!', 'With great power, comes great responsibility.', 'Wikipedia, still more credible than the media.', 'Have you ever "Wiki Searched" yourself?', 'Breaking News: Wikipedia has found Waldo.', 'Can Wikipedia teach me how to cook?'];
  var arraySelector = Math.floor(Math.random() * 6);

  function headerQuote() {
    myQuotes.innerHTML = wordArray[arraySelector];
    //console.log(arraySelector);
  }
  headerQuote();

  document.addEventListener("keydown", enterKey, false);
  searchBtn.addEventListener('click', function() {
    wikiSearch();
  })
  function enterKey(event) {
    if(event.keyCode == '13') {
      event.preventDefault();
      wikiSearch();
    }
  }

  function wikiSearch() {
    if(userInput.value == "") {
      return errorTxt.innerHTML = "Please type something in the search bar.";
    }
    results.classList.add('showresults');
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=15&utf8=1&srsearch=" + userInput.value + "&srprop=snippet&origin=*";
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var wikiResponse = JSON.parse(xhr.responseText);
        //console.log(wikiResponse);
        convertHTML(wikiResponse);
      } else {
        results.innerHTML = "Searching...";
      }
    }
    //console.log(url);
    errorTxt.innerHTML = "";
    xhr.open('GET', url, true);
    xhr.send();
  }

  function convertHTML(data) {
    results.innerHTML = " ";
    for (var i = 0; i < data.query.search.length; i++) {
      var listItem = document.createElement('li');
      var aHref = "https://en.wikipedia.org/wiki/" + escape(data.query.search[i].title);
        results.appendChild(listItem).innerHTML = "<a target='_blank' href='" + aHref + "'>" + data.query.search[i].title + "<br><br>" + data.query.search[i].snippet + "... " + ' <i class="fa fa-external-link" aria-hidden="true"></i>' + "</a>";
      }
    }

})();
