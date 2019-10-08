/*
 *$(window).bind('hashchange',function(){
 *  alert('hashchange')
 *})
 */

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

let template = `
<div class="app">
  <div class="playground">
    <div id="graph" style="text-align: center;"></div>
  </div>

<div class="ui">
  <div class="ui-panel">
  <div class="contorl">
    <ul>
      <li><button class="ui-button auto-play">自动播放</button></li>
      <li><button class="ui-button pre-frame">上一帧</button></li>
      <li><button class="ui-button next-frame">下一帧</button></li>
      <li><button class="ui-button next-frame">停止</button></li>
    </ul>
  </div>
    <div class="process">
      <div class="process-info">
      </div>
    </div>
  </div>
</div>
</div>
`
/* 渲染组件 */
new Vue({
  el:'#app',
  template,
	data:function(){
	  return {
	    app:{},
	    player:{},
	    name:"Data Structure Animation App by Rainboy",
	  }
	},
	async mounted(){
	  console.log('hello ap')
	  var self = this
    self.app = new APP()

    this.player =  await self.app.http.get('dump.json').then( (res)=>{
      var player = new Player()
      player.load(res)
      return player
    })

    this.player.init( function(){
      self.player.auto_player()
    })
	}
})

