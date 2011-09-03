
function loadOptions() {
	var data = localStorage["learn"]||'[]';
	data=JSON.parse(data);
	console.log(data);
	
	document.getElementById("total").innerHTML= data.length;
	
	var html='';
	for(var i in data){
	  html+='<tr><td>'+data[i].name+'</td><td>'+data[i].color+'</td></tr>'	
	}
	document.getElementById("view").innerHTML= '<table>'+html+'</table>';
}

function saveOptions() {
	var old = localStorage["learn"] || '[]';
	old=JSON.parse(old)
	var color = document.getElementById("color").value;
	var thename = document.getElementById("name").value;
	old.unshift({"name":thename, "color":color});
	localStorage["learn"] = JSON.stringify(old);	
	location.reload();
}

function eraseOptions() {
	localStorage.removeItem("learn");	
	localStorage["learn"] = JSON.stringify([]);
	location.reload();
}
