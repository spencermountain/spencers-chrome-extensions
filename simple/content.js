
function graph(){
	return "<div id='d3graph' style='position:fixed; right:30px; bottom:50px; opacity:0.8; background:white; border:1px solid grey; border-radius:5px; width:300px; height:150px; background:white; x-index:12;'> hiii there</div>"
}




chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "graph"){
      text=$('body').text()
      matches=switches.filter(function(f){
        return text.match(f[0])
      })
      console.log(matches)
      matches.forEach(function(m){
        console.log("replacing "+m[0]+" with "+m[1])
        var decorate = function($textNode, matchedText, match) {
          console.log($textNode)
            $textNode.wrap(function(){
              return '<span style="display:inline; background:mediumpurple; color:white; border-radius:2px;">'+m[1]+'</span>'
            });
        };
    	  $('body').safeReplace(' '+m[0]+' ', decorate)
      })
    	$("body").append(graph())
    }
 });