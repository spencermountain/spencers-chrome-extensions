
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

              get_domains(tabs);
              
              get_maps(tabs)
              
              get_search(tabs);
                            
              //events                     
             $(".domain").click(function(){
                  $(this).siblings(".sites").toggle();
             });
              

          });
          
          
     });
       
