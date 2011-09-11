
$(document).ready(function(){
       

       //history
          d = new Date();
          today=d.getTime();
          day=d.getDate();
          yesterday=d.setDate(day-1);
          chrome.history.search({text:'', startTime:yesterday, endTime:today}, function(tabs){
          var tablist={};
            for(var i in tabs){
               if(tabs[i].url.match(/^chrome/)){continue;}
               var title=parsetitle(tabs[i].title, tabs[i].url);
            	 var parsed=parseUri(tabs[i].url);
	             var favicon=null;
	             if(parsed.host){
	               favicon='chrome://favicon/http://'+parsed.host;
	             }
	             domain=parsed.host.replace(/^www\./,'');
	             domain=domain.replace(/\.(org|net|com|co\.uk)/,'')
	             if(!title){title=domain;}
	             if(tablist[parsed.host] == null){tablist[parsed.host]={favicon:favicon, sites:[], domain:domain };}	             
	             tablist[parsed.host].sites.push({ url : tabs[i].url, title : title})	      
            }   
            //pivot into an array
            var tabarr=[];
            for(var i in tablist){
              tablist[i].font=tablist[i].sites.length+15;
              tabarr.push(tablist[i]);          
            }
          //  tabarr.sort(function(a,b){return b.font-a.font;});
            
            $('#historylist').html('');
            $('#historytemplate').mustache({tabs:tabarr}).appendTo('#historylist');
                   
                   $(".domain").click(function(){
                        $(this).siblings(".sites").toggle();
                   });
          });
          
          
     });
       
