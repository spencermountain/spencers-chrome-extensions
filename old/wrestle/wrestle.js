
    	$(document).ready(function() {
//console.log(js_beautify('{fun:3, lkj:"sfsf"}'))

	  //	var stats={type:null, length:0, fields:[]}
	  var timeoutID = window.setTimeout(null, 80);
	  setlistners()

	  //event listener
	  $("#click").click(function() {
	    window.clearTimeout(timeoutID); //for fast typing
	    timeoutID = window.setTimeout(function() {
	      var selector = $("#selector").val()
	      var obj = $("#json").html();
	      console.log(obj)
	      //try{
	      obj = loose_json(obj);
	      stats(obj);
	      //}catch(e){status('couldnt parse'); return;}
	      var matches = JSONSelect.match(selector, obj);
	      $("#data").html(matches.join('\n'))
	      console.log(matches)

	    })
	  })




	  function setlistners() {

	    $("#json").focusout(function() {
	      refresh();
	    })


	    $("#json").keyup(function() {}) //analyze()


	    $("#tsv").click(function() {
	    	var stats = analyze();
	    	if (stats.obj && stats.obj.length) {
	    		var tsv='';
	    		for(var i in stats.obj){
	    			for(var o in stats.obj[i]){
	    				tsv+=stats.obj[i][o]+'\t'
	    			}
	    			tsv+='\n'
	    		}
	    		$("#json").val(tsv);
	    	}
	    });


	    $("#reverse").click(function() {
	      var stats = analyze();
	      if (stats.obj && stats.obj.length) {
	        stats.obj = stats.obj.reverse();
	        $("#json").val(JSON.stringify(stats.obj, null, 2));
	        refresh();
	      } else {
	        alert('couldn\'t parse the data')
	      }
	    });

	   $("#parse_tsv").click(function() {
	   		var tsv=$("#json").val()||'';
	   		tsv=tsv.split('\n').map(function(v){return v.split('\t')})
	   		$("#json").val(JSON.stringify(tsv, null, 2));
	      var stats = analyze();
	      if (stats.obj && stats.obj.length) {
	        stats.obj = stats.obj.reverse();
	        $("#json").val(JSON.stringify(stats.obj, null, 2));
	        refresh();
	      } else {
	        alert('couldn\'t parse the data')
	      }
	    });

	   $("#by_line").click(function() {
	   		var tsv=$("#json").val()||'';
	   		tsv=tsv.split('\n')
	   		$("#json").val(JSON.stringify(tsv, null, 2));
	      var stats = analyze();
	      if (stats.obj && stats.obj.length) {
	        stats.obj = stats.obj.reverse();
	        $("#json").val(JSON.stringify(stats.obj, null, 2));
	        refresh();
	      } else {
	        alert('couldn\'t parse the data')
	      }
	    });


	   $("#stringify").click(function() {
	      var stats = analyze();
	      if (stats.obj && stats.obj.length) {
	        $("#json").val(JSON.stringify(stats.obj));
	        //refresh();
	      } else {
	        alert('couldn\'t parse the data')
	      }
	    });

	   	$("#toarr").click(function() {
	      var stats = analyze();
	      if (stats.obj && stats.obj.length) {
	      	var arr=stats.obj.map(function(v){
	      		return Object.keys(v).map(function(a){return v[a]})
	      	})
	        $("#json").val(JSON.stringify(arr),null,2);
	        refresh();
	      } else {
	        alert('couldn\'t parse the data')
	      }
	    });

	    $("#uniquearr").click(function() {
	      var stats = analyze();
	      if (stats.obj && stats.obj.length) {
	        stats.obj = uniqueobj(stats.obj);
	        stats.obj = _.uniq(stats.obj);
	        $("#json").val(JSON.stringify(stats.obj, null, 2));
	        refresh();
	      } else {
	        alert('couldn\'t parse the data')
	      }
	    });

	    $("#compact").click(function() {
	      var stats = analyze();
	      if (stats.obj && stats.obj.length) {
	        //remove empty and falsy objects
	        stats.obj = stats.obj.filter(function(v) {
	          if ((v === 0 || v) && !(_.isEqual(v, {}) || _.isEqual(v, []))) {
	            return true
	          }
	          return false
	        })
	        $("#json").val(JSON.stringify(stats.obj, null, 2));
	        refresh();
	      } else {
	        alert('couldn\'t parse the data')
	      }
	    });


	    $("#analyse").click(function() {
	      refresh();
	    })


	  $("#demo").click(function() {
	    var json = [{
	      "name": "magnolia",
	      "headstead": true
	    }, {
	      "name": "katie holmes",
	      "headstand": false
	    }, {
	      "name": "top gun",
	      "headstand": false
	    }, {
	      "name": "oprah",
	      "headstand": true,
	      "jump_couch": 1
	    }]
	    $("#json").val(JSON.stringify(json, null, 2));
	  })

	  }


var randy= {
      "alias": [
        "The Macho King",
        "Randall Mario Poffo",
        "Mr. Madness",
        "Macho Man Randy Savage",
        "Randy Savage",
        "Savage, Randy",
        "Randy Poffo",
        "Macho King Randy Savage",
        "'The Machoman' Randy Savage",
        "The Macho Man",
        "Randy 'The Macho Man' Savage",
        "The Spider",
        "Randall Mario \"Randy\" Poffo",
        "Randy 'Macho Man' Savage",
        "\"Macho Man\" Randy Savage"
      ],
      "description": "Randall Mario \"Randy\" Poffo (November 15, 1952 \u2013 May 20, 2011), better known by his ring name \"Macho Man\" Randy Savage, was an American professional wrestler, best known for his time with the World Wrestling Federation (WWF) and World Championship Wrestling (WCW).\nSavage held twenty championships during his professional wrestling career. He held six world heavyweight championships between the WWF and WCW, having won the WWF Championship twice and the WCW World Heavyweight Championship four times. In addition, he won the ICW World Heavyweight Championship three times and the USWA Unified World Heavyweight Championship once. Also a one-time WWF Intercontinental Champion, WWE (formerly the WWF) has named Savage the greatest champion of all time and credited him for bringing \"a higher level of credibility to the title through his amazing in-ring performances.\" Aside from championships, Savage was the 1987 WWF King of the Ring and the 1995 WCW World War 3 winner. For much of his tenures in...",
      "id": "/en/randy_savage",
      "text": "Randy Savage",
      "thumbnail": "http://api.freebase.com/api/trans/image_thumb/en/randy_savage",
      "type": [
        {
          "id": "/people/person",
          "text": "Person"
        },
        {
          "id": "/film/actor",
          "text": "Film actor"
        },
        {
          "id": "/music/artist",
          "text": "Musical Artist"
        },
        {
          "id": "/tv/tv_personality",
          "text": "TV Personality"
        },
        {
          "id": "/tv/tv_actor",
          "text": "TV Actor"
        },
        {
          "id": "/music/group_member",
          "text": "Musician"
        },
        {
          "id": "/people/deceased_person",
          "text": "Deceased Person"
        },
        {
          "id": "/film/person_or_entity_appearing_in_film",
          "text": "Person or entity appearing in film"
        }
      ],
      "url": "http://www.freebase.com/view/en/randy_savage"
    }


$("#json").val(JSON.stringify(randy, null, 2))


	  //show appropriate navigation


	  function showtype(type) {
	    var html = '';
	    if (type == "array") {
	      html = '<input id="uniquearr" type="button" value="unique" title="remove identical values"/>'
	      + '<input id="reverse" type="button" value="reverse" title="pull a louie"/>'
	      + '<input id="compact" type="button" value="compact" title="remove nulls empty objects"/>'
	      + '<input id="flatten" type="button" value="flatten" title="squish to one level of depth"/>'
	      + '<input id="stringify" type="button" value="stringify" title="squish it into uglified json"/>'
	      + '<input id="toarr" type="button" value="to array" title="loose the key names in an object"/>'
	      + '<input id="tsv" type="button" value="output to tsv"/>'
	    } else if (type == "object") {
	      html+='<input id="compact" type="button" value="compact" title="remove nulls empty objects"/>'
	    } else {
	      html = '<input id="demo" type="button" value="demo"/>'
	      + '<input id="by_line" type="button" value="by line"/>'
	      + '<input id="parse_tsv" type="button" value="tsv"/>'
	      + '<input id="sentence" type="button" value="sentences"/>'
	    }
	    $("#navigation").html(html)
	    setlistners()
	  }




	  function addfieldlogic(stats) {
	    var html = '';
	    for (var i in stats.fields) {
	      html += '<div class="property">'
	      + '<form class="fieldform">'
	      + '<input class="field" style="color:grey;" id="' + stats.fields[i] + '" value="' + stats.fields[i] + '"/>'
	      + '</form>'
	      + '<a href="#" class="cfield" data-fun="'+stats.fields[i]+'">'
	      + '<img style="width:20px; height:20px;" src="close.jpg"/></a>'
	      + '<br/> 5 values'
	      + '<a href="#" class="sort">sort</a> '
	      + '<a href="#" class="filter">filter</a>'
	      + '<a href="#" class="pluck">pluck</a>'
	      + '</div>'
	    }

	    $("#fields").html(html);

			$(".cfield").click(function(){
					var id=$(this).attr('data-fun')
					clearfield(id)
			})
	    //event behaviour
	    //$(".field").keyup(function() {	    });

			$(".fieldform").submit(function(){
				var el=$(this).children(".field :first");
				var real = $(el).attr("id");
	      var newlabel = $(el).val();
	      var obj = $("#json").val();
	      obj = loose_json(obj);
	      for (var i in obj) {
	        for (var o in obj[i]) {
	          if (o == real) {
	            obj[i][newlabel] = obj[i][o];
	            delete obj[i][o];
	          }
	        }
	      }
	      $("#json").val(JSON.stringify(obj, null, 2));
	      analyze();
	      return false
			})


	  }


	  function refresh() {
	    var stats = analyze();
	    if (stats.obj && stats.obj.length) {
	      $("#json").val(JSON.stringify(stats.obj, null, 2));
	    }
	  }



	  function analyze() {
	    var data = $("#json").val() || '';
	    var chars = data.length || 0
	    var stats = {
	      type: "empty",
	      length: 0,
	      fields: [],
	      obj: null,
	      chars: chars
	    }
	    if(!chars){return stats}
	    //first, see if its js-nice, or raw data
	    try {
	      obj = loose_json(data);
	      stats.obj = obj;
	      $("#json").addClass('valid');
	      //see if its an array or an object
	      if (obj.length) {
	        //its an array
	        stats.length = obj.length;
	        stats.type = "array";
	        //see if its an array of objects
	        if (obj[0] && typeof obj[0] == "object") {
	          stats.fields = Object.keys(obj[0]);
	        }
	      } else {
	        //its an object
	        stats.length = _.size(obj);
	        stats.type = "object"
	        stats.fields = Object.keys(obj);
	      }
	      $("#error").html('');
	    } catch (e) {
	      $("#json").removeClass('valid');
	      $("#error").html('error' + JSON.stringify(e));

	      //interpret it as raw data
	      //	status('couldnt parse'+data);
	      var tsv = data.split('\n');
	      stats.length = tsv.length;
	      if (!tsv[0]) {
	        return stats;
	      }
	      if (tsv[0].split('\t').length > 1) {
	        stats.type = "tsv";
	        stats.fields = [];
	        stats.obj = tsv_to_json(data);
	      } else if (tsv[0].split(',').length > 1) {
	        stats.type = "csv";
	        stats.fields = [];
	      } else {
	        stats.type = "list"
	        stats.fields = [];
	      }
	    }
	    //set navigation menu
	    showtype(stats.type);

	    //respond to the stats
	    $("#stats").html('length: ' + stats.length + ', type: ' + stats.type + ', chars: ' + stats.chars)
	    addfieldlogic(stats);


	    return stats;
	  }



	  function status(msg) {
	    $("#status").html(msg)
	  }

	function loose_json(str){
	var obj=readJson(str,[])
	return obj;
}


	function clearfield() {
	  var obj = $("#json").html();
	  obj = loose_json(obj);
	  for (var i in obj) {
	    for (var o in obj[i]) {
	      if (o == real) {
	        obj[i][newlabel] = obj[i][o];
	        delete obj[i][o];
	      }
	    }
	  }
	}

	});


