const graphviz = require("graphviz")
const {Player}= require("../../lib/player")
var fs = require('fs')

var player = new Player({ name:"bubble sort",engine:'neato'})
graphviz.parse('base.dot',(g)=>{
  var str = g.to_dot()

  /* get all Node */
  var nodes = g.nodes
  //console.log(nodes)
  var arr = new Array(nodes.items.length+1)

  let cnt = 0;
  for (let n of nodes.items){
    if( !n ) continue;
    let val = parseInt(  n.id)
    let pos = g.getNode(val+'').get('pos')
    pos = parseInt(pos.split(',')[0])
    arr[pos] = val;
    cnt++;
  }
  //console.log(arr)
  //
  function set_nodes_to_g(){
    let i;
    for(i=1;i<=cnt;i++){
      g.getNode( arr[i]+'').set('pos',`${i},0!`);
    }
  }

  function set_cmp_node_color(x,y,finish){
    let i;
    for(i=1;i<=cnt;i++){
      g.getNode( arr[i]+'').set('fillcolor',`gray`);
    }
    if( finish) return
    g.getNode( arr[x]+'').set('fillcolor',`red`);
    g.getNode( arr[y]+'').set('fillcolor',`red`);
  }
  
  /* 进行 bubble_sort */
  let i,j;
  let frame_id = 0;
  for ( i= 1;i<cnt;i++){
    for( j=1;j<=cnt-i;j++){
      set_cmp_node_color(j,j+1);

      player.push({
        dot_src:g.to_dot(),
        log:`比较 a[${j}] 和 a[${j+1}] 两个元素`
      })
      let swapFlag = 0
      if( arr[j] > arr[j+1]){
        let t = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = t;
        swapFlag = 1;
      }
      set_nodes_to_g()
      let dot_src= g.to_dot()
      //fs.writeFileSync(`b_${++frame_id}.dot`, dot_str,{encoding:'utf-8'});
      player.push({
        dot_src,
        log: swapFlag ? `发生了交换` : `没有交换`
      })
    }

    set_cmp_node_color(0,0,1);
    player.push({
      dot_src:g.to_dot()
    })
  }
  console.log(player.dump())
  player.dumpFile()
  console.log(arr)
})
