/* parse 解析 */

const node_cnt = 9;

// 1 right_child  0 left_child
const node_child = [ [6,4,0], [4,9,0], [9,1,0], [9,3,1], [3,5,0], [5,7,1], [6,8,1], [8,2,1] ];
const node_val_key = [ [1,1,35], [2,27,53], [3,17,58], [4,19,86], [5,9,52], [6,26,99], [7,13,28], [8,27,78], [9,4,64] ];
var root =6;

var tree_node = [{}]

// 建立tree
function init_tree(){
  let i;
  for(i=1;i<=node_cnt;i++) tree_node.push({l:0,r:0,val:0,cnt:0})
  for( let edge of node_child){
    if( edge[2] )
      tree_node[ edge[0] ].r = edge[1];
    else
      tree_node[ edge[0] ].l = edge[1];
  }
  for( let v_k of node_val_key){
    tree_node[v_k[0]].val = v_k[1]
    tree_node[v_k[0]].key = v_k[2]
  }
}

init_tree()

console.log(tree_node)

/**
 *@method split
 *@param {number} now 当前点
 *@param {number} val 按值分裂
 *@return {Array} [x,y] 分裂后,x,y树的根
 *@desc fhq-heap 分裂操作
 */
function split(now ,  val){
  if( !now ) return [0,0]

  if( tree_node[now].val <= val){
    let xx = now;
    let [xxx,yy] = split(tree_node[now].r, val);
    tree_node[now].r = xxx;
    return [xx,yy]
  }
  else {
    let yy = now;
    let [xx,yyy] = split(tree_node[now].l, val);
    tree_node[now].l = yyy;
    return[xx,yy]
  }
}
var x,y


function gen_tree_2_dot(){
  var frames = []
  var print = function(o){
    frames.push(o)
  }
  var start = `graph g {
    node[shape=plaintext colorscheme=accent8 ];`

  var end = "}"
  print(start)
  function label_name(id,val,key){
    return `${id}[ label=< <TABLE CELLBORDER="1" BORDER="0" CELLSPACING="0" CELLPADDING="2">
        <tr> <td BGCOLOR="1">val</td> <td>${val}</td> </tr>
        <tr> <td BGCOLOR="2">key</td> <td>${key}</td> </tr>
    </TABLE> >
];`
  }


}

[x,y] = split(root, 9);

