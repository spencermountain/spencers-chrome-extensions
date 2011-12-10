
function showstats(el, d3){

        get_history(1, function(tabs){
              var html = new EJS({url: './templates/stats_template.ejs'}).render({tabs:tabs});
              el.html(html); 
              
              var domains=get_domains(tabs)
              mostgraph(domains.slice(0,5)) 
              showpie(domains)
              //makelinegraph()
              timegraph(tabs)
       })
       
}

function todayshow(){
  get_history(1, function(tabs){
    var html='today <br/><span class="number" style="">'+tabs.length+'</span> <br/> pages'
    $("#todayshow").html(html)
  })
}

function get_domains(tabs){
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
         domain=domain.replace(/\.(org|net|com|co\.uk)/,'');
         domain=domain.replace(/.*?\.(.{4}.*?)/,'$1');//regex subdomain
         if(!title){title=domain;}
         if(tablist[parsed.host] == null){tablist[parsed.host]={favicon:favicon, sites:[], domain:domain, link:'http://'+parsed.host };}	             
         tablist[parsed.host].sites.push({ url : tabs[i].url, title : title})	               
      }   
   
      //pivot into an array
      var tabarr=[];
      for(var i in tablist){
        tablist[i].count=tablist[i].sites.length;
        tabarr.push(tablist[i]);          
      }
       tabarr.sort(function(a,b){return b.count-a.count;});              

  return tabarr;

}


function get_history(days, callback){

      if(!days){days=7;}
      d = new Date();
      var now=d.getTime(); 
      var hours=d.getHours();
      if(hours<5){      //make the day start at 5am  
          d.setDate(d.getDate()-1);    
      }
      d.setHours(5);  
      console.log('from = '+d.getHours()+'    day='+ d.getDate());
      var from=d.getTime();      
          
      chrome.history.search({text:'', startTime:from, endTime:now, maxResults:1000}, function(tabs){
          console.log(tabs.length +' history results');              
          return callback(tabs)
      });
          
 }
 
