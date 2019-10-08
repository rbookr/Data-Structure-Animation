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

  <div class="infoPanel fixed">
    <h3>Info</h3>
    <pre>{{ info }}</pre>
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
  },
  computed:{
    frames_length:function (){
      if( this.player && this.player.frames)
          return this.player.frames.length
      return 0
    },
    at:function(){
      if( this.player && this.player.at)
        return this.player.at
      return 0
    },
    info:function(){
      if( this.player && this.player.frames){
        return JSON.stringify({
          at:this.player.at,
          frames_length:this.player.frames.length,
          config:this.player.config,
        },null,4);
      }
      return {}
    }
  }
})

