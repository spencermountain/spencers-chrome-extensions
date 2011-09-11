/*
//freebase search logic 
       var found={};
       $(document).ready(function(){
       var timeoutID = window.setTimeout(null, 800);
           var el=$("#query");
             $(el).focus();
             el.keyup(function () {
             var found={};
              window.clearTimeout(timeoutID);//for fast typing
              timeoutID = window.setTimeout(function(){
                            
              var text = $(el).val(); 
              var url="http://keep.spencermountain.user.dev.freebaseapps.com/namesearch?callback=?&q="+text;
                 $.getJSON(url, function(data) {
                    var html='<a href="#" class="addlearn">'+data.name
                    +'<img src="http://www.freebase.com/api/trans/image_thumb'+data.id
                    +'?errorid=/m/0djw4wd&maxwidth=200&maxheight=200" / ></a>';
                    
                   $("#result").html('<span>'+html+'</span>');                   
                   found=data;
                   $(".addlearn").click(function(){
                       addnew(found);
                   });
                   
                 });
           
              }, 800);
          });
       });*/
