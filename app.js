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
  <div class="logbar">
    <p>{{log}}</p>
  </div>

<div class="ui">
  <div class="ui-panel">
    <div class="contorl">
      <ul>
        <li><button class="ui-button auto-play"  data-tooltip="播放"><span class="iconfont icon-bofang"></span></button></li>
        <li><button class="ui-button pre-frame"  data-tooltip="上一帧"><span class="iconfont icon-houtuiyizhencopy"></span></button></li>
        <li><button class="ui-button next-frame" data-tooltip="下一帧"><span class="iconfont icon-qianjinyizhen"></span></button></li>
        <li><button class="ui-button next-frame" data-tooltip="停止"><span class="iconfont icon-stop2"></span></button></li>
      </ul>
    </div>
    <div class="process">
      <div class="process-info">
      </div>
    </div>
    <div class="contorl">
      <ul>
        <li><button class="ui-button auto-play"  data-tooltip="关于作者"><span class="iconfont icon-gerenziliao"></span></button></li>
      </ul>
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
    log:function(){
      if( this.player && this.player.frames){
          let at =  this.player.at
          return this.player.frames[at].log || "no log"
      }
      return "log Bar"
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

