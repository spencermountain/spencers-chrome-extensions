//alert('h');

	      
chrome.extension.sendRequest({method: "addwikipedia", url: window.location.href}, function(response) {
  console.log('added '+response.page);
});
