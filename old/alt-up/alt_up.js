
Mousetrap.bind(['alt+up'], function(e) {
    var p=parseUri(window.location.href)
    if(p.path && p.path!="/"){
    	p.path=p.path.split('/')
    	p.path=compact(p.path)
    	p.path.pop();
    	p.path=p.path.join('/');
    	var port='';
    	if(p.port){
    		port=':'+p.port
    	}
    	var url=encodeURI(p.protocol+'://'+p.host + port+'/'+ p.path);
    	window.location=url;
    }
    return false;
});

function compact(arr){
	return arr.filter(function(v){return v===0||v})
}

function parseUri (str) {
	var	o   = {
			strictMode: false,
			key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
			q:   {
				name:   "queryKey",
				parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
			parser: {
				strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
				loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		},
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;
	while (i--) uri[o.key[i]] = m[i] || "";
	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});
	return uri;
};