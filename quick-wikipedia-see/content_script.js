
$(function() {

    $(document).keyup(function(e) {
        if (e.keyCode == 107) { //plus key
            doit();
        }
        if (e.keyCode == 27) {
            $("#wholething").remove()
            $('#bodyContent a').unbind('click', handler);
        } // esc
    });
  $("body").append('<span style="position:fixed; left:50%; bottom:10px;"><input id="type" value="/person/person" style=" width:200px; height:40px; font-size:17px; color:grey; border-radius: 5px;"/><input type="button" id="go"/></span>');

$("#go").click(function(){doit()})

  var type=$("#type").val() || "/people/person";
  // $('body a').click(function(){handle_fb($(this)); return false;})
  // $('body a').each(function(){handle_fb($(this));})

function doit(){
  var arr=$('.mw-content-ltr').find("a").toArray()
  console.log(arr)
  doit_async(arr, handle_fb, 3, function(r){console.log(r)})
}

  function handle_fb(el, callback){
        var link=$(el).attr('href')
        if(!link || !goodlink(link)){return callback(false)}
           console.log(link + goodlink(link))
           link=link.replace(/^\/wiki\//,'')
           link=mqlkey_quote(link)
           if(!link){return callback(false)}
           link='/wikipedia/en/'+link
            askfreebase(link, type, el, function(result, el){
                console.log($(el).text());
                if(result && result.result[0]){
                  $(el).css('color','red')
                }
                return callback("good!")
              })
     }

function askfreebase(id, type, el, callback){
   var query=[{
      id:id,
      type:type
    }]
   query_envelope = {'query' : query};
   service_url = 'http://api.freebase.com/api/service/mqlread';
   url = service_url  + '?jsoncallback=?&query=' + encodeURIComponent(JSON.stringify(query_envelope));

var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    console.log('sent from content script')
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
    console.log(resp)
  }
}
xhr.send();


chrome.extension.sendMessage({url:url}, function(response) {
  console.log(response);
});

}

  function goodlink(link){
      if(link.match(/^\/wiki\/(File|Category|Portal|Special|Wikipedia|WP|Help|Category_talk|Talk):/i)
         || link.match(/\.wikipedia.org\/w\/index\.php\?title=/)){return false}
      if(link.match(/\/Main_page/i)){return false}
      if(link.match(/\/Help:Categories/i)){return false}
      if(link && link.match(/^\/wiki\//) ){
          return true
      }
      return false
  }

//  quote a unicode string to turn it into a valid mql /type/key/value
function mqlkey_quote(s) {
        if(!s){return ''}
        s=s.replace(/  /,' ');
        s=s.replace(/^\s+|\s+$/, '');
        s=s.replace(/ /g,'_');
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




//handle rate-limited asynchronous freebase calls with a ending callback
function doit_async(arr, fn, async_max, done){
    //wrap them all in functions
  var function_list=arr.map(function(r){
      return function(callback){
              fn(r, function(r){
                callback(null, r);
              })
      }
    })
  //groups of async tasks in a synchonous task
  var all=groups_of(function_list, async_max).map(function(f_group){
    return function(callback){async.parallel(f_group, callback  );}
  })
  async.series(all, function(err, result){
      done(flatten(result))
  });
}


function flatten(array){
    var flat = [];
    for (var i = 0, l = array.length; i < l; i++){
        var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
        if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
    }
    return flat;
}

function groups_of(arr, group_length){
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


})