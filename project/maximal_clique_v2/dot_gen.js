/* 极大团 Bron-Kerbosch算法 */
const graphviz = require("graphviz")
const {Player}= require("../../lib/player")
require("../../lib/graphviz_plugin")

var player = new Player()
player.config.delay = 0
player.config.duration= 100

const lib = require("./lib.js")

var fs = require('fs')
var g

var node_idx_cnt = 0;

function parse(name){
  return new Promise( (res,rej)=>{
    graphviz.parse(name, (g)=>{
      res(g)
    })
  })
}


var G = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
]

var _map1=[0,'1','3','4','x','y']
var _map2 = {
  '1':1,
  '3':3,
  '4':4,
  "x":2,
  "y":5
}
var data = [ ['1','x'], ['1','y'], ['x','y'], ['x','3'], ['x','4'], ['y','3'], ['y','4'], ['1','3'], ['1','4'] ]



/* 建立图 */
for( let e of data){
  let i = _map2[e[0]] 
  let j = _map2[e[1]] 
  //console.log(i,j)
  //console.log(e)
  G[i][j] =  G[j][i] = 1;
}

function LabelStringify(now,may,used,u){
  let now_a = Array.isArray(now) ? now.join(',') :""
  let may_a = Array.isArray(may) ? may.join(',') :""
  let used_a = Array.isArray(used) ? used.join(',') :""
  let zhidian = u ? `|支点:${u}` : ""
  return `{now:${now_a}\n|may:${may_a}\n|used:${used_a}${zhidian}}`
}

function clear_node_color(){
  g.eachNode( (node)=>{
    let color = node.attributs.get('fillcolor')
    if(color !== 'red')
      node.attributs.set('fillcolor','white')
  })
}

var dot_file_cnt = 0;

let cnt = 0
function dfs(dep,now,may,used,fa,choose){
  let node_idx = ++node_idx_cnt;
  //g.addNode(node_idx+'')
  //if( fa != 0){
    //g.addEdge(fa+'', node_idx+'')
  //}
  clear_node_color()
  if( fa)
    lib.set_edge(g,fa,node_idx,{style:"filled"})
  lib.set_node(g,node_idx+'',{style:"filled",fillcolor:"lightblue"})
  lib.set_node(g,node_idx+'',{
    label: LabelStringify(now,may,used)
  })
  player.push({
    dot_src: g.to_dot(),
    log:choose ? `选 may中的 ${choose}` :"开始"
  })


  if( may.length == 0 && used.length == 0){
    console.log("=====================")
    console.log(now)
    console.log("=====================")
    cnt++;

    /* 结果 */

    clear_node_color()
    lib.set_node(g,node_idx+'',{
      fillcolor:'red'
    })
    player.push({
      dot_src: g.to_dot(),
      log:'null'
    })

    return
  }

  let now_now = Array.from(now);
  let now_may= Array.from(may);
  let now_used= Array.from(used);

    var u  = may[0]

  lib.set_node(g,node_idx+'',{
    label: LabelStringify(now,may,used,u)
  })
  player.push({
    dot_src:g.to_dot(),
    log:`选中${u}作为支点!`
  })
  
  for( let node of may){ //遍历 may中的点
    //console.log(node)
    if( G[node][u] == 1) {
      player.push({
        dot_src:g.to_dot(),
        log:`点${node} 与支点${u} 相连,忽略`
      })
      continue;
    }
    let new_now = Array.from(now)
    new_now.push(node)

    let new_may = []

    for( let n2 of now_may){
      if( G[n2][node])
        new_may.push(n2);
    }

    let new_used = []
    for( let n3 of now_used){
      if(G[n3][node])
        new_used.push(n3);
    }

    dfs(dep+1,new_now,new_may,new_used,node_idx,node)
    let idx = now_may.indexOf(node);
    now_may.splice(idx,1)
    now_used.push(node);

    clear_node_color()
    lib.set_node(g,node_idx+'',{style:"filled",fillcolor:"lightblue"})
    lib.set_node(g,node_idx+'',{
      label: LabelStringify(now_now,now_may,now_used,u)
    })
    player.push({
      dot_src: g.to_dot(),
      log:`${node} 加入used`
    })

  }

}

async function main(){
  g = await parse('base.dot')
  lib.set_all_edge(g,{style:"invis"})
  lib.set_all_node(g,{style:"invis"})
  dfs(1,0,[1,2,3,4,5],0,0);
  player.dumpFile()

}

main()

