//let the color change by sunlight

$(document).ready(function(){
var d = new Date();
var hour=d.getHours();
//var hour=parseInt($(this).val());

//defaults
var hue=217;
var niceness=15;//5 is cloudy, 20 is nice
//darkness
var midnight=15;//the lowest light allowed
var noon=50;//the most light allowed
        
if(hour<=9){//between 6 to 9 go from 20 to 50
 var darkness=(hour-5)*10;
 if(darkness<=midnight){darkness=midnight;}
}         
else if(hour>18){ //between 6pm to 9 go from 50 to 20
 var darkness=(hour-18)*-10;
 darkness+=noon;
 if(darkness<=midnight){darkness=midnight;}         
}
else{darkness=noon;} 

console.log('hour is'+hour+'darkness:'+darkness);
$("body").css("background" , 'hsl('+hue+','+niceness+'%,'+darkness+'%)');

});