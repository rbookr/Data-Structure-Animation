var Graph = require("graphviz/lib/deps/graph").Graph

Graph.prototype.eachNode = function(callback){
  for( let node of this.nodes.items){
    if(node)
      callback(node)
  }
}
