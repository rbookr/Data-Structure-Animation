$(window).bind('hashchange',function(){
  alert('hashchange')
})

//alert(get_url_hash())
//
class APP {
  constructor(){
    /* 初始化 */
    this.address = window.location.pathname

    this.http = new HTTP(this.address,'project/'+this.get_url_hash()+'/')
  }

  get_url_hash(){
    return (window.location.hash.length > 0) ?
      window.location.hash.substring(1):""
  }

  
}

var app = new APP()

app.http.get('dump.json').then( (res)=>{
  var player = new Player()
  player.load(res)
  console.log(player)
  console.log(player.get(0))
  player.init( function(){
    player.auto_player()
  })
})
