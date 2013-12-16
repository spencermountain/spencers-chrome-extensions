$(function() {

	//var image=chrome.extension.getURL('logo.png');

	console.log('it is '+window.location.host)
 if(window.location.host == "www.facebook.com"  ){ //&& !window.location.pathname.match(/\/pages\/./)
		facebook();
	}

	function facebook(){

		var messages=[
		"there's no outside or inside",
		"you should leave your job",
		"your face is slowly changing",
		"your birthday doesn't matter"
		]

		var i=Math.floor(Math.random()*messages.length-1)
		var msg=messages[i];
		var html='<li class="fbTimelineUnit fbTimelineTwoColumn clearfix" data-side="r"	data-fixed="1" data-size="1" id="tl_unit_2409997254_recent">   <div class="topBorder"></div> <div class="timelineReportContainer" id="udccew_92" data-gt="{}">'+msg+'</div><div class="bottomBorder"></div></li>'

		$(".fbTimelineCapsule:first").append(html)

		$(".fbTimelineUnit:eq(3)").append('<li class="fbTimelineUnit>hi</li>')

		}



});


function popitup(url) {
	newwindow=window.open(url,'name','height=300,width=250,left=200,top=100');
//	if (window.focus) {newwindow.focus()}
	return false;
}