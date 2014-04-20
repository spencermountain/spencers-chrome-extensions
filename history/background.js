var morning = new Date()
morning.setHours(morning.getHours() - 4)
morning = morning.getTime()


  function searchit(text, cb) {
    text = text || '';
    var obj = {
      text: text,
      startTime: morning,
      endTime: new Date().getTime(),
      maxResults: 8
    }
    chrome.history.search(obj, function(tabs) {
      var arr = tabs.map(function(tab, i) {
        var url = " <dim>" + (tab.url || '').replace(/^https?:\/\/(www\.)?/i, '') + "</dim>"
        return {
          content: tab.url,
          description: tab.title + url
        }
      })
      cb(arr)
    })
  }

  function chooseit(url) {
    if (!url) {
      url = "chrome://history"
    }
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.update(tabs[0].id, {
        url: url
      });
    });
  }


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  searchit(text, function(arr) {
    suggest(arr)
  })
})

chrome.omnibox.onInputStarted.addListener(function() {
  morning = new Date()
  morning.setHours(morning.getHours() - 3)
  morning = morning.getTime()
})

chrome.omnibox.onInputEntered.addListener(function(url) {
  chooseit(url);
});

chrome.omnibox.setDefaultSuggestion({
  description: "<dim>searching recent pages..</dim>"
})