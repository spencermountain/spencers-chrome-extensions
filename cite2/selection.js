/*chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

alert('hit')

    if (request.method == "getSelection")
     { 
       sendResponse({eee:66});
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

      sendResponse({ddd:3});
     }
    else
      sendResponse({lkj:2}); // snub them.
});
*/


chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {  
  var metas=document.getElementsByTagName("meta");
    sendResponse({lk:776, metas: metas })
    console.log(metas);
    }
  );
 
