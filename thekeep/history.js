
$(document).ready(function(){

//thisweek date
d = new Date();
today=d.getTime(); 
d.setDate(d.getDate()-7);           
var hours=d.getHours();
if(hours<5){      //make the day start at 5am  
    d.setDate(d.getDate()-1);    
}
d.setHours(5);
var lastweek=d.getTime();      
console.log('last week = '+lastweek);

          
          chrome.history.search({text:'', startTime:lastweek, endTime:today}, function(tabs){
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
              
              //display history view
              $('#historylist').html('');
              $('#historytemplate').mustache({tabs:tabarr}).appendTo('#historylist');
                     
             $(".domain").click(function(){
                  $(this).siblings(".sites").toggle();
             });
              
              
              //get the google maps visits
              var maplist=[];
              for(var i in tabs){
               if(tabs[i].url.match(/^https?:\/\/maps\.google\./)){
                   var parsed=parseUri(tabs[i].url);
                   console.log(parsed.queryKey.q)
                   var q=parsed.queryKey.q;
                   var image='http://maps.googleapis.com/maps/api/staticmap?center='+q+'&zoom=14&size=250x250&maptype=roadmap&sensor=false'
                   maplist.push({url:tabs[i].url, image:image, q:q});
               }
              }
               //display map view
              $('#maplist').html('');
              $('#maptemplate').mustache({maps:maplist}).appendTo('#maplist');
                     
             $(".domain").click(function(){
                  $(this).siblings(".sites").toggle();
             });
              

          });
          
          
     });
       
