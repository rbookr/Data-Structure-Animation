/* 极大团 Bron-Kerbosch算法 */
const graphviz = require("graphviz")
const {Player}= require("../../lib/player")

const lib = require("./lib.js")

var fs = require('fs')
var g = graphviz.digraph("G")

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
  '3':2,
  '4':3,
  "x":4,
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

let cnt = 0
function dfs(dep,now,may,used,fa){
  let node_idx = ++node_idx_cnt;
  g.addNode(node_idx+'')
  if( fa != 0){
    g.addEdge(fa+'', node_idx+'')
  }

  if( may.length == 0 && used.length == 0){
    console.log("=====================")
    console.log(now)
    console.log("=====================")
    cnt++;
    return
  }

  let now_now = Array.from(now);
  let now_may= Array.from(may);
  let now_used= Array.from(used);

  for( let node of may){ //遍历 may中的点
    debugger;
    //console.log(node)
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

    dfs(dep+1,new_now,new_may,new_used,node_idx)
    let idx = now_may.indexOf(node);
    now_may.splice(idx,1)
    now_used.push(node);

  }

}
dfs(1,0,[1,2,3,4,5],0,0);
//console.log(g.to_dot())

console.log(cnt)


async function main(){
}

