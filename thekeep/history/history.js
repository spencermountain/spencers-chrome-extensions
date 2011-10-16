
$(document).ready(function(){

parse_history(7);

$(".dodate").click(function(){
  var length=$(this).html();
  if(length=='this week'){ parse_history(15); }
})

function parse_history(days){

  if(!days){days=7;}
  d = new Date();
  today=d.getTime(); 
  d.setDate(d.getDate()-days);           
  var hours=d.getHours();
  if(hours<5){      //make the day start at 5am  
      d.setDate(d.getDate()-1);    
  }
  d.setHours(5);
  var from=d.getTime();      
  console.log('from = '+from);

          
          chrome.history.search({text:'', startTime:from, endTime:today, maxResults:400}, function(tabs){
              console.log(tabs.length +' history results')
              get_domains(tabs);
              
              get_maps(tabs)
              
              get_search(tabs);
              
              get_groups(tabs);
                            
              //events                     
             $(".domain").click(function(){
                  $(this).siblings(".sites").toggle();
             });
              

          });
          
      }
 });
       
