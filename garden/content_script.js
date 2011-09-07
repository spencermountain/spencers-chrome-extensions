//send the selected text

function getSel(){return window.getSelection().toString().replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/g," ")}chrome.extension.onRequest.addListener(function(c,b,d){switch(c.task){case "getSelectedText":if(c.frame!=frameId)break;return d({text:sel})}});

//chrome.extension.sendRequest(window.getSelection().toString()); 
