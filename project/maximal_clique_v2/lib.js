/**
 *@method set_node
 *@param {Object} g graphviz
 *@param {string} id node的编号
 *@param {Object} attrs node的编号 
 *@return {返回值类型} 返回值说明
 *@desc 根据目标对象获取运营商
 */
exports.set_node  = function(g,id,attr){
  /*
   *for (let i =0;i<g.nodes.length;i++){
   *  let node = g.nodes.items[i]
   *  console.log(node.attributs)
   *}
   */

  //this.attributs.set(name, value);
  let node = g.getNode(id)
    console.log(id)
    console.log(node)
  for( let key in attr){
    node.attributs.set(key,attr[key])
  }
}

exports.set_all_node  = function(g,attr){
    console.log('length: ',g.nodes.length)
  for (let i =0;i<=g.nodes.length;i++){
    let node = g.nodes.items[i]
    if(node){
      for( let key in attr){
        node.set(key,attr[key])
      }
    }
  }
}

exports.set_edge = function(g,nodeOne,nodeTwo,attrs){
  for( let edge of g.edges){
    if( edge.nodeOne.id == nodeOne+'' && nodeTwo+'' == edge.nodeTwo.id){
      for( let key in attrs)
        edge.attributs.set(key, attrs[key])
      break;
    }
  }
}

exports.set_all_edge= function(g,attrs){
  for( let edge of g.edges){
    for( let key in attrs)
      edge.attributs.set(key, attrs[key])
  }
}

