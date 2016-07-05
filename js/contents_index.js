
var w = 1000,
    h = 600;



var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05",
      "white" :"#FFF"
  }

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};


var nodes = [

    //Project Names

    {name: "POSSESSIVE", url:"http://www.woznarowycz.com/possessive.html"}, //0
    {name: "SIMULACRUM", url:"http://www.woznarowycz.com/landscapes.html"}, //1
    {name: "VOTEBOX", url:"http://www.woznarowycz.com/vote.html"},//2
    {name: "GREAT EXPECTATIONS", url:"http://www.woznarowycz.com/expectations.html"},//3
    {name: "SCIENCE BOOK", url:"http://www.woznarowycz.com/science.html"},//4
    {name: "UTOPIA", url:"http://www.woznarowycz.com/utopia.html", target: [0,1,2,3,4]},//5

    //Connectors

    {name: "Identity", target: [0,1]},
    {name: "Production", target: [0, 1]},
    {name: "Signification", target: [0, 1]},
    {name: "Democracy", target: [1, 2]},
    {name: "Citizenship", target: [1, 2]},
    {name: "Media", target: [4, 3]},
    {name: "Fatality", target: [0, 3]},
    {name: "Consumption", target: [0, 3]},


    //Possessive

    
    {name: "Language", target: [0]},
    {name: "Permanence", target: [0]},
    {name: "Simulation", target: [0]},
    
    //Simulacrum

    {name: "Urban", target: [1]},
    {name: "Nature", target: [1]},
    {name: "Artificial", target: [1]},
    {name: "Landscape", target: [1]},
    
    //Life of a digital vote

    {name: "Live Event", target: [2]},
    {name: "Platform", target: [2]},
    {name: "Acessibility", target: [2]},
    {name: "Visualization", target: [2]},
    {name: "Information", target: [2]},
    {name: "Transparency", target: [2]},

     //Great Expectations

    {name: "Curation", target: [3]},
    {name: "Obsolescence", target: [3]},
    {name: "Death", target: [3]},

    //Science Book

    {name: "Structure", target: [4]},
    {name: "Materiality", target: [4]},
    {name: "Book", target: [4]},
    {name: "Editorial", target: [4]},
    {name: "Quantum Physics", target: [4]},
    {name: "Space", target: [4]}




];

var links = [];

for (var i = 0; i < nodes.length; i++){

    if(nodes[i].target !== undefined){

        for(var x = 0; x < nodes[i].target.length; x++){

            links.push({

                source:nodes[i],
                target:nodes[nodes[i].target[x]]
            })
        }
    }


}

var myChart = d3.select("#canvas-holder")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .linkStrength(0)
    .gravity(0.5)
    .charge(-1000)
    .size([w,h])
   


var link = myChart.selectAll('line')
     .data(links).enter().append('line')
     .attr("stroke", palette.gray)


var node = myChart.selectAll("text")
    .data(nodes).enter()
    .append("g")
    .call(force.drag);

// node.append("circle")
//     .attr("cx", function (d){return d.x;})
//     .attr("cy", function (d){return d.y})
//     .attr("r", function (d,i){if (i>0, i<5){return "60";} else{return "40"}})
//     .attr("fill", palette.white)

node.append("text")

    // .text(function(d) {return d.name})
    .each(function (d) {
    var arr = d.name.split(" ");
    if (arr != undefined) {
        for (i = 0; i < arr.length; i++) {
            d3.select(this).append("tspan")
                .text(arr[i])
                .attr("dy", i ? "1.2em" : 0)
                .attr("x", 0)
                .attr("text-anchor", "middle")
                .attr("class", "tspan" + i);
            }
        }
    });

    var text= myChart.selectAll("text")
    .attr("font-family", function(d,i) {if (i>0, i<6) {return "NexaHeavy";} else {return "Nexa"}})
    .attr("font-size", function(d,i) {if (i>5, i<13) {return "13px";} else {return "12px"}})
    .attr("fill", function(d,i) {if (i>0, i<6) {return "#CF2900";} else {return "#000"}})
    .attr("font-variant", function(d,i) {if (i>5, i<13) {return "small-caps";} else {return "normal"}})

node.append("svg:a")
  .attr("xlink:href", function (d) {return d.url;})

  .append("svg:rect")
  .attr("x", -50)
  .attr("y", -25)
  .attr("height", 50)
  .attr("width", 100)
  .style("fill", "green")
  .style("opacity", "0")

node.on("mouseover",function(){
  var sel = d3.select(this);
  sel.moveToFront();
});

// Highlighting

// node.on("mouseover",function (){
//   var sel = d3.select(this);


// });

function flatten(d) {
  var nodes = [], i = 0;

  function recurse(nodes) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(d);
  return nodes;
}


force.on("tick", function(e){

    node.attr("transform", function(d,i){

        return "translate("+d.x+","+d.y+")";
    })

    link
        .attr("x1",function(d) {return d.source.x})
        .attr("y1",function(d) {return d.source.y})
        .attr("x2",function(d) {return d.target.x})
        .attr("y2",function(d) {return d.target.y})

    node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
})

force.start();
