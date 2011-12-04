function showslideshow(el){

  get_topics(20, function(topics){
     
     if(topics.length<4){return}
      var i=0;
        var refreshId = setInterval(function() {
          if(!topics[i]){i=0;}
          $(el).html(topics[i].name);
           gettopic(topics[i].id, console.log)
           console.log(topics[i].name)
           i++;
        }, 5000); //60000ms equals 1 minute

  })
}


function gettopic(id, callback){
   query = [{'id': id, 'name': null}];
   query_envelope = {'query' : query, 'extended':true};
   service_url = 'http://api.freebase.com/api/service/mqlread';
   url = service_url  + '?callback=?&query=' + encodeURIComponent(JSON.stringify(query_envelope));
   $.getJSON(url, function(response) {
      console.log(response);
      return  callback(response.result);
   });
 
 }
