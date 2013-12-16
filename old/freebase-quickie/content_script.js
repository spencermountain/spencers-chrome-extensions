//alert('content script!')
$(function() {

    function doit() {
        var html = '<table id="wholething" style="position:fixed; opacity:0.8; z-index:19;  background:white; right:0px; top:0px; color:white; border:1px solid grey; width:200px; height:100%; min-height:400px;">' + '<tr><td><textarea id="topiclist" style="font-size:10px; color:grey; height:100%;"></textarea></td></tr>' + '<tr style="height: 50px; background:steelblue; vertical-align:top;">' + '<td>' + '<input type="text" id="suggest" style="border-radius:5px; font-size:12px; width:150px; color:grey; font-size:15px; height:30px; text-align:left; " value="" />' + '<input type="button" value="submit" id="submit" style="border-radius:5px; color:steelblue;"/>' + '<a href="#" id="addall">add all</a></td>' + '</tr>' + '</table>'

        $("#content").append(html)

        $("#addall").click(function() {
            $('#bodyContent a').each(function(){
                var link=$(this).attr('href')||''
                console.log(link)
                if(goodlink(link)){
                  $(this).trigger('click');
                }
            })
            return false;
        })

        $("#askall").click(function() {
            var all_links=[]
            $('#bodyContent a').each(function(){
                var link=$(this).attr('href') ||''
                if(goodlink(link)){
                  all_links.push(link)
                }
                all_links=group_by(all_links,10)
                console.log(all_links)
            })
            return false;
        })

        $("#submit").click(function() {
            var list = $("#topiclist").val().split(/\n/)
            var type = $("#suggest").val()
            var url = 'http://garden.spencermountain.user.dev.freebaseapps.com/quickie?&ids=' + encodeURIComponent(list.join(',')) + '&type=' + type;
            newwindow = window.open(url, 'write', 'left=200,top=100,height=400,width=450');
            if (window.focus) {
                newwindow.focus()
            }

            $("#wholething").remove()
            $('#bodyContent a').unbind('click', handler);
            return false;
        })


        $('#bodyContent a').bind('click', handler);

    }

    $(document).keyup(function(e) {
        console.log(e.keyCode)
        if (e.keyCode == 107 || e.keyCode == 187) { //plus key
            doit();
        }
        if (e.keyCode == 27) {
            $("#wholething").remove()
            $('#bodyContent a').unbind('click', handler);
        } // esc
    });



        function handler() {
            var href = $(this).attr('href');
            var title = $(this).text();
            console.log(href)
            var id = '/wikipedia/en/' + mqlkey_quote(decodeURIComponent(href.replace(/\/wiki\//, '')))
            $("#topiclist").val($("#topiclist").val() + '\n' + id)
            //$("#topiclist").append('<a style="color:steelblue;" href="http://freebase.com/view'+id+'">'+id+'</a><br/>')
            $(this).css('color', 'grunbindey')
            return false
        }


        function goodlink(link){
            if(link.match(/\/Category:/i)){return false}
            if(link.match(/\/Special:/i)){return false}
            if(link.match(/\/Wikipedia:/i)){return false}
            if(link.match(/\/Wp:/i)){return false}
            if(link.match(/\/Wp:/i)){return false}
            if(link.match(/\/English_language/)){return false}
            if(link.match(/\/Integrated_Taxonomic_Information_System/)){return false}
            if(link && link.match(/\/wiki\//) ){
                return true
            }
            return false
        }

        function group_by(arr, group_length){
            var all=[]
            for(var i in arr){
                if(i%group_length==0){
                    all.push([arr[i]])
                }else{
                    all[all.length-1].push(arr[i])
                }
            }
            return all
          }

});

  function mqlkey_quote(s) {
    if(!s) {
      return ''
    }
    s = s.replace(/  /, ' ');
    s = s.replace(/^\s+|\s+$/, '');
    s = s.replace(/ /g, '_');
    var mqlkey_start = 'A-Za-z0-9';
    var mqlkey_char = 'A-Za-z0-9_-';
    var MQLKEY_VALID = new RegExp('^[' + mqlkey_start + '][' + mqlkey_char + ']*$');
    var MQLKEY_CHAR_MUSTQUOTE = new RegExp('([^' + mqlkey_char + '])', 'g');
    if(MQLKEY_VALID.exec(s)) // fastpath
      return s;
    var convert = function(a, b) {
      var hex = b.charCodeAt(0).toString(16).toUpperCase();
      if(hex.length == 2) hex = '00' + hex;
      if(hex.length == 3) hex = '0' + hex;
      return '$' + hex;
    };
    x = s.replace(MQLKEY_CHAR_MUSTQUOTE, convert);
    if(x.charAt(0) == '-' || x.charAt(0) == '_') {
      x = convert(x, x.charAt(0)) + x.substr(1);
    }
    return x;
  }

    //console.log('/wikipedia/en/'+mqlkey_quote('Ádám_Pintér'))