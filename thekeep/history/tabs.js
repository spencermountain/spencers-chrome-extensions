
$(document).ready(function(){
       
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
       var template_html = new EJS({url: './templates/tabs_template.ejs'}).render(obj);
       $('#tabs_template').html(template_html);   
	     console.log(obj)
	     
	    });
	     
});
	       
	       
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
