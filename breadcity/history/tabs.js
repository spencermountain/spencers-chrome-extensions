
      function showtabs(el){

  //get open tabs
	    chrome.windows.getAll({ populate: true }, function(windowlist) {	    
      var tabs=[]
	       for(var i in windowlist){
	         for(var o in windowlist[i].tabs){
    	         if(windowlist[i].tabs.url=="chrome://newtab"){
    	           if(windowlist[i].tabs.selected){
      	           chrome.tabs.remove(windowlist[i].tabs.id, function(){})
      	           }
      	           continue;
    	         }
	             var parsed=parseUri(windowlist[i].tabs[o].url);
	             windowlist[i].tabs[o].favicon='chrome://favicon/http://'+parsed.host;
	             windowlist[i].tabs[o].domain=getdomain(windowlist[i].tabs[o].url);
	             tabs.push(windowlist[i].tabs[o])
	         }
        }
        var count=0;
        counttab(count);        
        function counttab(i){
           chrome.history.getVisits({url: tabs[count].url}, function(visits){
             tabs[count].count=visits.length;
             count++;
             if(count<tabs.length && count<250){counttab(count);}//recurse
             else{
                return render(tabs, el)
             }
           })
        }        
})
}       

function render(tabs, el){

	     var obj={
             tabs:tabs,
             duplicates:null,
             multi:null,
           };
       var html= new EJS({url: './templates/tabs_template.ejs'}).render(obj);

       el.html(html);

}
 
 
 function getdomain(url, title){
   	 var parsed=parseUri(url);
     var domain=parsed.host.replace(/^www\./,'');
     domain=domain.replace(/\.(org|net|com|co\.uk)/,'');
     domain=domain.replace(/.*?\.(.{4}.*?)/,'$1');//regex subdomain
    return domain;
 }
 
 
   /*     

	   //get open tabs
	    chrome.windows.getAll({ populate: true }, function(windowlist) {

 
 
	       //remove current tab
	       var tabs=[];
	       var duplicates=0;
	       var already=[];
	       var domains=[];
	       var multi=[];

	       for(var i in windowlist){
	         for(var o in windowlist[i].tabs){
	         console.log(windowlist[i].tabs[o].title)
	         
	       chrome.history.getVisits({url: windowlist[i].tabs[o].url}, function(tabs){
              console.log(windowlist[i].tabs[o].title +'     '+tabs.length)
              return tabs.length;
              
          });
	         
	           var title=windowlist[i].tabs[o].title;
	           var url=windowlist[i].tabs[o].url;

               //close other hometabs
               if( windowlist[i].tabs[o].selected == false && url== 'chrome://newtab/'){
                 closetab(windowlist[i].tabs[o].id);
               }

	           if(url.match(/^https?:\/\/./)){

                //make title nicer
	               title=parsetitle(title, url);

	             //find duplicates
	               for(var a in already){
	                 if(already[a]==url){
	                   duplicates++;
	                 }
	               }
    	           already.push(url);

  	            //favicon
	               var parsed=parseUri(url);
	               var favicon='chrome://favicon/http://'+parsed.host;


	               //find repeated domains
  	             parsed.host=parsed.host.replace(/^www\./,'');
  	             for(var d in domains){
	                 if(domains[d]==parsed.host){
	                   multi.push(domains[d]);
	                 }
	               }
	               domains.push(parsed.host);



	               tabs.push({ url:url, title:title, favicon:favicon, id:windowlist[i].tabs[o].id});

	             }
	           }
	       }


	       	    //   multi=unique(multi);

	     var obj={
             tabs:tabs,
             duplicates:duplicates,
             multi:multi,
           };
       var html= new EJS({url: './templates/tabs_template.ejs'}).render(obj);

       el.html(html);

	    });

	  }


	         //close duplicate tabs
  function closeduplicates(){
	   chrome.windows.getAll({ populate: true }, function(windowlist) {
	         var already=[];
	         for(var i in windowlist){
	           for(var o in windowlist[i].tabs){
	             var url=windowlist[i].tabs[o].url;
	                 for(var a in already){
	                   if(already[a]==url){
	                     chrome.tabs.remove(windowlist[i].tabs[o].id, function() {});
	                   }
	                 }
	                 already.push(url);
	               }
	            }
	          location.reload();
       });
    }

  //bulk close by domain
  function closebulk(domain){
     console.log('closing all '+domain)
	   chrome.windows.getAll({ populate: true }, function(windowlist) {
	         for(var i in windowlist){
	           for(var o in windowlist[i].tabs){
            	 var parsed=parseUri(windowlist[i].tabs[o].url);
	             parsed.host=parsed.host.replace(/^www\./,'');
	                   if(parsed.host==domain){
	                     chrome.tabs.remove(windowlist[i].tabs[o].id, function() {});
	                   }

	               }
	            }
	          location.reload();
       });
    }


       //get a better title from the title tag
       function parsetitle(title, url){
         //remove junk home page titles with domains
         var parsed=parseUri(url);
         if(parsed.directory == '/'){
           return title=parsed.host;
         }

         var parts=title.split(/\W[\||\-]\W/);
         if(!parts || parts.length<2){return title;}

         if(parts[0].length < parts[parts.length-1].length){
           title=parts[parts.length-1]
         }else{
           title=parts[0];
         }
         if (title.length > 40){
                   var tokens=title.split(' ');
	                  for(var i in tokens){
	                    title+=' '+tokens[i];
	                    if(title.length>40){
	                      title+='...';
	                      break
	                      }
	                  }
	               }
         return $.trim(title);
       }
       

 	 function closetab(tabId) {
        try {
          chrome.tabs.remove(tabId, function() {});
        } catch (e) {
          alert(e);
        }
          location.reload();
      }
      
      

function dopromise(){
    
function asyncEvent(){
    var dfd = new jQuery.Deferred();


	       chrome.history.getVisits({url: "http://en.wikipedia.org/wiki/Voronoi_diagram"}, function(tabs){
              console.log('http://en.wikipedia.org/wiki/Voronoi_diagram     '+tabs.length)
               dfd.resolve("1hurray");
              return tabs.length;              
          });

	       chrome.history.getVisits({url: "http://en.wikipedia.org/wiki/Radiohead"}, function(tabs){
              console.log('rad '+tabs.length)
               dfd.resolve("2");
              return tabs.length;              
          });


    // Resolve after a random interval
    setTimeout(function(){
        dfd.resolve("3hurray");
    }, Math.floor(400+Math.random()*2000));


    // Return the Promise so caller can't change the Deferred
    return dfd.promise();
}

// Attach a done, fail, and progress handler for the asyncEvent
$.when( asyncEvent() ).then(
    function(status){
        console.log( status+', things are going well' );
    },
    function(status){
        alert( status+', you fail this time' );
    },
    function(status){
        console.log('eeee')
    }
);
}*/

       //get a better title from the title tag
       function parsetitle(title, url){
         //remove junk home page titles with domains
         var parsed=parseUri(url);
         if(parsed.directory == '/'){
           return title=parsed.host;
         }

         var parts=title.split(/\W[\||\-]\W/);
         if(!parts || parts.length<2){return title;}

         if(parts[0].length < parts[parts.length-1].length){
           title=parts[parts.length-1]
         }else{
           title=parts[0];
         }
         if (title.length > 40){
                   var tokens=title.split(' ');
	                  for(var i in tokens){
	                    title+=' '+tokens[i];
	                    if(title.length>40){
	                      title+='...';
	                      break
	                      }
	                  }
	               }
         return $.trim(title);
       }
