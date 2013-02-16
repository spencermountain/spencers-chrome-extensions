
alert('hi')
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

	 $.getJSON(request.url, function(result) {
	   console.log(result)
	    sendResponse({result: result});
	 });

    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});


  });
