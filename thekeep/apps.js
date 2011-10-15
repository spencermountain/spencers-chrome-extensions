

$(document).ready(function(){
  var apps=[];
  chrome.management.getAll(function(extensions){
      for(var i in extensions){
        if(extensions[i].isApp==true){
          apps.push(extensions[i])  
        }
      }

      var html='';
      for(var i in apps){
        html+='  <a href="'+apps[i].appLaunchUrl+'">'+apps[i].name+'</a>, &nbsp; '
      }
      $("#apps").html(html);
    });
});