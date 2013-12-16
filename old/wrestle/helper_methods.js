$(".pluck").click(function() {
  var field = $(this).siblings(".field").val()
  if (field) {
    field = '.' + field;
    var obj = $("#json").val();
    try {
      obj = JSON.parse(obj);
      var matches = JSONSelect.match(field, obj);
    } catch (e) {
      var matches = [];
    }
    $("#json").val(JSON.stringify(matches, null, 2));
    refresh();
  }

})




function tsv_to_json(data) {
  var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var tsv = data.split('\n');
  var obj = tsv.map(function(v) {
    var columns = v.split('\t');
    var obj = {};
    for (var o in columns) {
      var field = letters[o] || _.uniqueId();
      obj[field] = columns[o];
    }
    return obj;
  })
  return obj;
}


//remove duplicate objects from an array


function uniqueobj(x) {
  var newArray = new Array();
  label: for (var i = 0; i < x.length; i++) {
    for (var j = 0; j < newArray.length; j++) {
      if (_.isEqual(newArray[j], x[i])) {
        continue label;
      }
    }
    newArray[newArray.length] = x[i];
  }
  return newArray;
}