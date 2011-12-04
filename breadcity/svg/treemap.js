
function treemap(tabs, el){

$("stage").prepend('    <button id="size" class="first active">      Size     </button ><button id="count" class="last">        Count      </button>')

var w = 960,
    h = 500,
    color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select("#stage")
    .style("position", "relative")
    .style("opacity", "0.6")
    .style("width", w + "px")
    .style("height", h + "px");
console.log('making treemap')
console.log(tabs)
  div.data([tabs]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .call(cell)
      .append("span")
      .style("color", "white")
      .html(function(d) { return d.children ? null : "<span style='position:relative;'><a href='#"+d.id+"' style='position:relative;bottom:0px; font-size:10px;'>close</a>"+d.name+'<br/><img class="image" src="'+ d.image+'"/></span>'; });

  d3.select("#size").on("click", function() {console.log('eeeee')
    div.selectAll("div")
        .data(treemap.value(function(d) { return d.size; }))
      .transition()
        .duration(1500)
        .call(cell);

    d3.select("#size").classed("active", true);
    d3.select("#count").classed("active", false);
  });

var refreshId = setTimeout(function() {
    div.selectAll("div")
        .data(treemap.value(function(d) {  if(d.image){return 100} return 50;       }))
      .transition()
        .duration(1500)
        .call(cell);
        
}, 500);


  d3.select("#count").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return 1; }))
      .transition()
        .duration(1500)
        .call(cell);

    d3.select("#size").classed("active", false);
    d3.select("#count").classed("active", true);
  });


function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
}
}
