s= function(){}
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    s=suggest;
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    // alert('You just typed "' + text + '"');
    s([
      {content: "awwwoyah", description: "ya homie"}
    ]);
    return false;
  });
