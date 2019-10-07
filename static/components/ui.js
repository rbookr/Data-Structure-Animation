var template = `
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
`
Vue.component('ui',{
  data:function(){
    return {
      name:"default name"
    }
  },
  watch:{
  },
  template
})
