window.app.player = new Player()


/* fhq tree 的生成 */
var gen_data = function(){
  var frames = []
  const print = function(x) { frames.push(x)}
  var log = console.log
  const random = new Random.Random( Random.MersenneTwister19937.autoSeed())

  function randint(minNum,maxNum){ 
    return random.integer(minNum,maxNum)
  } 

  let randarr = [1,2,3,4,5,6,7,8,9,10]

  function oth(x){
    return x % 2 == 0 ? x-1 : x+1;
  }

  let a =[ ]
  let m = randint(2, 5)
  log("数据如下:")
  log(5,m)
  for(let i = 0;i<=m;i++){
    while(1){
      let u = randint(1, 10);
      let v = randint(1, 10);
      if( u == v ||  u == oth(v)) continue;
      a.push([u,v])
      log(u,v)
      break;
    }
  }


  let temp_start = `
digraph g {
    node[shape=circle fixedsize=true style=filled fillcolor=white colorscheme=accent8 ];
    1-> 3-> 5-> 7-> 9[style=invis];
    2-> 4-> 6-> 8-> 10[style=invis];
    1->2[constraint=false minlen=3 style=invis];
`
  print(temp_start)
  for( let l of a ){
    if( l[0] === oth(l[1])) continue;
    if( l[0] === l[1]) continue;
    print( `${l[0]}->${oth(l[1])}[constraint=false];`)
    print( `${l[1]}->${oth(l[0])}[constraint=false];`)
  }
  print('}')




  return {
    frames:[
      {
        dot_src: frames.join("\n"),
        log:'随机生成数据,用于理解,具体数据见[控制台]'
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
      $('div.logbar p').text(window.app.player.frames[0].log)
    })
  })
  $("#gen_data").trigger("click")
})
