chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection")
     { 
      return sendResponse({});
     //sendResponse({data: window.getSelection().toString()});
     }   
    if (request.method == "getSelector" && request.selector)//scraper
     {      

          var metas=document.getElementsByTagName('meta');
          console.log(metas)
           for(var i in metas){ 
            
             if(metas[i].getAttribute('name').match(/date/i)){         
               console.log('date -'+metas[i].getAttribute('content'))
             }
            
             if(metas[i].getAttribute('author').match(/date/i)){         
               console.log('author -'+metas[i].getAttribute('content'))
             }
           }

       return sendResponse({});
     }
     if (request.method == "getBody" )
     {      alert('d')
        var body=document.getElementsByTagName('body')[0].innerHTML;
        console.log(body)
        return  sendResponse({body:body});
     }
      sendResponse({}); // snub them.
});

