/*
 *$(window).bind('hashchange',function(){
 *  alert('hashchange')
 *})
 */

class APP {
  constructor(){
    /* 初始化 */
    this.address = window.location.pathname
    let url_hash = this.get_url_hash()
    let url = url_hash.length ? 'project/'+url_hash+'/' : '/'
    this.http = new HTTP(this.address, url)
  }

  get_url_hash(){
    return (window.location.hash.length > 0) ?
      window.location.hash.substring(1):""
  }
}

let template = `
<div class="app">
  <div v-if="ui.allShow">
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
            <li><button class="ui-button pre-frame" :disabled="isPlaying"  data-tooltip="上一帧" @click="PlayPre"><span class="iconfont icon-houtuiyizhencopy"></span></button></li>
            <li><button class="ui-button next-frame" :disabled="isPlaying" data-tooltip="下一帧" @click="PlayNext"><span class="iconfont icon-qianjinyizhen"></span></button></li>
          </ul>
        </div>
        <div class="process">
          <div class="process-text-info">
            <span><input type="number" :value="info.at+1" ref="input" @keyup.enter="changeInput"> / </span>
            <span>{{info.frames_length}}</span>
          </div>
          <div class="process-info" :style="{width: process+'%'}">
          </div>
        </div>
        <div class="contorl">
          <ul>
            <li><button class="ui-button auto-play"  data-tooltip="关于作者"><span class="iconfont icon-gerenziliao"></span></button></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="infoPanel fixed" :style='{display: !ui.infoShow ? "none" :""}'>
      <h3>Info</h3>
      <pre>{{ JSON.stringify(info,null,4)}}</pre>
    </div>
  </div>
  <div v-else class="container">

<div class="grid">
					<div class="box">
						<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
							<line class="top" x1="0" y1="0" x2="666" y2="0"/>
							<line class="left" x1="0" y1="200" x2="0" y2="-200"/>
							<line class="bottom" x1="0" y1="200" x2="666" y2="200"/>
							<line class="right" x1="666" y1="0" x2="666" y2="200"/>
						</svg>
						<h3>Data Structure Animation</h3>
						<span>By Rainboy</span>
						<span></span>
					</div>
  </div>
  <div class="menu-list">
    <ul>
      <li v-for=" item in menu">
        <a target="_blank" :href="'#/'+item.link">{{item.name}}</a>
      </li>
    </ul>
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
      menu:[],
      ui:{
        infoShow:false,
        allShow:true
      },
      name:"Data Structure Animation App by Rainboy",
    }
  },
  async mounted(){
    var self = this
    window.toggleInfoShow  = function(){ self.toggleInfoShow() }
    self.app = new APP()

    if( self.app.get_url_hash() == ""){
      self.ui.allShow= false
      await self.app.http.get('list.json').then( (res)=>{
        self.menu = res
      })
      return
    }

    this.player =  await self.app.http.get('dump.json').then( (res)=>{
      var player = new Player()
      player.load(res)
      return player
    })

    this.player.init( function(){
      //self.player.auto_player()
      self.player.play_frame_at(0)
    })

  },
  methods:{
    changeInput(){
      console.log(this.$refs.input.value)
      let val = parseInt(this.$refs.input.value)
      if( val <1)
        val=1;
      else if (val >this.info.frames_length )
        val =this.info.frames_length 
      val--;
      this.player.play_frame_at(val)
    },
    PlayNext(){
      let next = this.info.at +1
      console.log(next)
      if( next < this.info.frames_length ){
        this.player.play_frame_at(next)
      }
    },
    PlayPre(){
      let pre = this.info.at -1
      console.log(pre)
      if( pre >=0)
        this.player.play_frame_at(pre)
    },
    toggleInfoShow(){
      this.ui.infoShow = !this.ui.infoShow;
    }
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
        return {
          playing:this.player.playing,
          at:this.player.at,
          frames_length:this.player.frames.length,
          config:this.player.config,
        }
      }
      return {}
    },
    process:function(){
      if( this.player && this.player.frames){
        return (this.player.at +1)/(this.player.frames.length) * 100
      }
      return 0;
    },
    isPlaying:function(){
      if( this.player && this.player.playing)
        return true;
      return false;
    }
  }
})

