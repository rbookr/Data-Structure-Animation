window.app.player = new Player()




/* fhq tree 的生成 */
var gen_data = function(){
  var random = new Random.Random( Random.MersenneTwister19937.autoSeed())

  function randomNum(minNum,maxNum){ 
    return random.integer(minNum,maxNum)
  } 

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

  /* 0-100内的随机数字 */
  const rnd = function (){
    return randomNum(1, 100)
  }

  var Node = []
  var root,cnt=0;
  for( let i = 0;i<=1123;i++){
    Node.push({ l:0,r:0,val:0,key:0,size:0 })
  }


  function newnode(val){
    Node[++cnt].val = val;
    Node[cnt].key = rnd();
    Node[cnt].size= 1;
    return cnt;
  }

  function update(node){
    node.size = Node[node.l].size + Node[node.r].size +1;
  }

  function split(now,val){
    if( !now ) return [0,0];
    let x,y;
    if( Node[now].val < val){
      x = now;
      let [xx,yy] = split(Node[now].r, val);
      Node[now].r = xx;
      y = yy;
    }
    else {
      y = now;
      let [xx,yy] = split(Node[now].l, val);
      Node[now].l = yy ;
      x = xx;
    }
    update(Node[now])
    return [x,y]
  }

  function merger(x,y){
    if( !x || !y ) return x+y;

    if(Node[x].key > Node[y].key){
      Node[x].r = merger(Node[x].r, y);
      update(Node[x]);
      return x;
    }
    else {
      Node[y].l = merger(x, Node[y].l);
      update(Node[y]);
      return y;
    }
  }

  function ins(val){
    //print(val)
    let [x,y] = split(root, val);
    root = merger(merger(x, newnode(val)), y);
  }

  /*  */
  var node_size = randomNum(5, 10)
  var node_arr = [0]

  for(let i = 1;i<=node_size;i++)
    node_arr.push(randomNum(1, 100)  % 35 );

  //print(node_arr)

  for(let i = 1;i<=node_size;i++){
    ins(node_arr[i]);
  }

  var x_cnt = 0;
  function dfs(u){


    if(Node[u].l ){
      print(`${u} --${Node[u].l}[label="l"];`)
      if( !Node[u].r){
        print(`${u} --x${++x_cnt}[style=invis];`)
        print(`x${x_cnt}[style=invis]`)
      }
      dfs(Node[u].l)
    }
    if(Node[u].r  ){
      if( !Node[u].l){
        print(`${u} --x${++x_cnt}[style=invis];`)
        print(`x${x_cnt}[style=invis]`)
      }
      print(`${u} --${Node[u].r}[label="r"];`)
      dfs(Node[u].r)
    }
  }
  dfs(root)
  for(let i = 1;i <= node_size;i++){
    print(label_name(i, Node[i].val, Node[i].key))
  }
  print(end)

  return {
    frames:[
      {
        dot_src: frames.join("\n")
      }
    ]
  }
}

$.getScript(`static/js-ext/random-js.min.js`,function(){ 
  console.log(`get random-js.min.js done!`)
  $(".app .ui").hide()
  $(".app").append(`<button id="gen_data">生成</button>`)
  $("#gen_data").click( function(){
    var dump = gen_data()
    window.app.player.load(dump)
    window.app.player.init(function(){
      window.app.player.play_frame_at(0)
    })
  })
  $("#gen_data").trigger("click")
})
