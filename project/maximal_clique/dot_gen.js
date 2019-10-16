const graphviz = require("graphviz")
const {Player}= require("../../lib/player")
var fs = require('fs')

var player = new Player({ name:"bubble sort",engine:'neato'})
var g

function parse(name){
  return new Promise( (res,rej)=>{
    graphviz.parse(name, (g)=>{
      res(g)
    })
  })
}

/* 树上的一个结点 */
class Node {
  constructor(id,sum){
    this.id = id
    this.sum = sum
    this.l = 0;
    this.r = 0;
    this.x = 0;
    this.y = 0; // 根据深度决定
  }
  to_lable(){
    return `{id:${this.id}|sum:${this.sum}}`
  }
  to_pos(){
    return `${this.x},${this.y}!`
  }
  copy_from(node){
    this.sum = node.sum
    this.l = node.l;
    this.r = node.r;
    this.x = node.x;
    this.y = node.y; // 根据深度决定
  }
}

const margin = 3;

// 初始化0结点
var tree_nodes = [ new Node(0,0)];


//=========== 主席树
var org_array = [0,2,4,2,1,3]
var cnt =0;
var root = [0]
var root_pos = [0,3,5,9.5,12.5,14.5];

function addEdge( node1,node2){
  if( node2 != 0){
    g.addEdge(node1+"",node2+"");
  }
}

/* 建立 */
function insert(l  ,  r,  pre,  now, Fa, dep , val,pos,treeNum){
  //复制
  now = ++cnt;
  tree_nodes.push( new Node(now,0))
  tree_nodes[now].copy_from( tree_nodes[pre]);
  tree_nodes[now].sum++;
  tree_nodes[now].y = -dep;
  tree_nodes[now].x = pos;
  g.addNode(now,{
    pos:tree_nodes[now].to_pos(),
    label:tree_nodes[now].to_lable()
  })

  if( l == r) return

  var m = (l+r)>>1;
  if( val <= m){
    tree_nodes[now].l = cnt+1;
    addEdge(now,tree_nodes[now].l)
    addEdge(now,tree_nodes[now].r)
    pos -= 0.5
    if( dep == 1)
      pos -= 0.5
    insert(l, m, tree_nodes[pre].l, now, 1, dep+1, val, pos, treeNum)
  }
  else{
    tree_nodes[now].r = cnt+1;
    addEdge(now,tree_nodes[now].l)
    addEdge(now,tree_nodes[now].r)
    pos += 0.5
    if( dep == 1)
      pos += 0.5
    insert(m+1, r, tree_nodes[pre].r, now, 1, dep+1, val, pos, treeNum)
  }
}
//=========== 主席树


async function main(){
  g = await parse('base.dot')
  g.setNodeAttribut("shape","record")
  var now
  for( let i = 1;i<=5;i++){
    root.push(cnt+1);
    insert(1, 4, root[i-1], now, 0, 1, org_array[i], root_pos[i], i);
    fs.writeFileSync(`animation_${i}.dot`, g.to_dot(),{encoding:'utf-8'})
  }
  console.log(g.to_dot())
}

main()
