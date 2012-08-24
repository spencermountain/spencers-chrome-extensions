//alert('content script!')
$(function() {

var html='<table id="wholething" style="position:fixed; opacity:0.7; z-index:19;  background:white; right:0px; top:0px; color:white; border:1px solid grey; width:200px; height:100%; min-height:400px;">'
+'<tr><td><textarea id="topiclist" style="font-size:10px; color:grey; height:100%;"></textarea></td></tr>'
+'<tr style="height: 150px; background:steelblue; vertical-align:top;">'
+'<td>'
+'<input type="text" id="suggest" style="border-radius:5px; width:150px; color:grey; font-size:15px; height:30px; text-align:left; " />'
+'<input type="submit" value="submit"  style="border-radius:5px; color:steelblue;"/>'
+'<input type="text" id="ids" value=""/>'
+'</td>'
+'</tr>'
+'</table>'

$("#content").append(html)


//suggest
  $("#suggest").suggest({filter:'(all type:/type/type)', key:"AIzaSyAZTu7DGvKIoM7xEFcIXJ0EGJ-48Mt2Tw4", zIndex:22});
    $("#suggest")
     .suggest()
     .bind("fb-select", function(e, data) {
       alert(data.name + ", " + data.id);
    });



$("#bodyContent a").click(function(){
    var href=$(this).attr('href');
    var title=$(this).text();
    console.log(href)
    var id='/wikipedia/en/'+mqlkey_quote(href.replace(/\/wiki\//,''))
    $("#topiclist").val($("#topiclist").val()+'\n'+id)
    //$("#topiclist").append('<a style="color:steelblue;" href="http://freebase.com/view'+id+'">'+id+'</a><br/>')
    $(this).css('color','grey')
    return false
})

 $('body').keypress(function(e){
    console.log(e.which)
            if(e.which == 27){
                $("#wholething").remove()
            }
        });


    if (window.location.href.match(/\/wiki\/Category:.*/i)) {
        docategory()
    } else {
        doarticle()
    }

    function docategory() {



    }

    function doarticle() {

        }

    });


/**
 *  quote a unicode string to turn it into a valid mql /type/key/value
 *
 */
var mqlkey_quote = function(s) {
    var mqlkey_start = 'A-Za-z0-9';
    var mqlkey_char = 'A-Za-z0-9_-';
    var MQLKEY_VALID = new RegExp('^[' + mqlkey_start + '][' + mqlkey_char + ']*$');
    var MQLKEY_CHAR_MUSTQUOTE = new RegExp('([^' + mqlkey_char + '])', 'g');
    if (MQLKEY_VALID.exec(s)) // fastpath
    return s;
    var convert = function(a, b) {
            var hex = b.charCodeAt(0).toString(16).toUpperCase();
            if (hex.length == 2) hex = '00' + hex;
            if (hex.length == 3) hex = '0' + hex;
            return '$' + hex;
        };
    x = s.replace(MQLKEY_CHAR_MUSTQUOTE, convert);
    if (x.charAt(0) == '-' || x.charAt(0) == '_') {
        x = convert(x, x.charAt(0)) + x.substr(1);
    }
    return x;
}

    //console.log('/wikipedia/en/'+mqlkey_quote('Ádám_Pintér'))
