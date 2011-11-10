

function showapps(el){
  var apps=[];
  chrome.management.getAll(function(extensions){
      for(var i in extensions){
        if(extensions[i].isApp==true){
          apps.push(extensions[i])  
        }
      }
      console.log(apps)
       var template_html = new EJS({url: './templates/apps_template.ejs'}).render({apps:apps});
       el.html(template_html);  
      
    });
    }

