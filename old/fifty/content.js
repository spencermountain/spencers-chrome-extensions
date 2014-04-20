
function graph(){
	return "<div id='d3graph' style='position:fixed; right:30px; bottom:50px; opacity:0.8; background:white; border:1px solid grey; border-radius:5px; width:300px; height:150px; background:white; x-index:12;'> hiii there</div>"
}



var decorate = function($textNode, matchedText, match) {
    $textNode.wrap('<span style="display:inline; background:yellow; color:black; border-radius:2px;"></span>');
};

var text_it = function($el){
	e=$($el)
	remove=[
		"script",
		"style",
		".header",
		".foot",
		".footer",
		"h1",
		"h2",
		"h3",
		"h4",
		".nav",
		".comments",
		".comment",
		".sponsor",
		".pagination",
		".mw-headline",
	]
  remove.forEach(function(sel){
  	e.remove(sel)
  })
  return e.text()

}

var getdates=function(str){
		var x = new Knwl();
    x.init(text)
    return x.get('dates').map(function(arr){
    	obj= {
    		month:arr[0],
    		day:arr[1],
    		year:arr[2],
    		text:arr[3],
    		o:new Date()
    	}
    	obj.o.setFullYear(obj.year)
    	obj.o.setMonth(obj.month-1)
    	obj.o.setDate(obj.day)
    	return obj
    })
}

var killdates=function(str){
    var dates=getdates(str)
  	dates.forEach(function(d){
  		str=str.replace(d.text, ' -- ')
  	})
  	//very likely a year
  	str=str.replace(/(in|on|during|throughout|of) [21][0-9]{3}\D/,'  ')
  	return str
}

var getnumbers=function(str){
	var arr=str.match(/\s\$?-?\d+(,\d+)*(\.\d+)?([a-z])*?\W/g).map(function(s){
		s=s.replace(/^\s+|\s+$/g, '');//trim whitespace
		return s.substring(0, s.length - 1)
	})
	return arr
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "graph"){
      //regex test -  http://goo.gl/bvX6BC
    	$('body').safeReplace(/\s\$?-?\d+(,\d+)*(\.\d+)?([a-z])*?\W/g, decorate);
    	$("body").append(graph())
    	text=text_it($("body"))
    	console.log(text.length)
    	text=killdates(text)//remove dates from text
    	console.log(text.length)
    	var numbers=getnumbers(text)
    	console.log(numbers)


    }
 });