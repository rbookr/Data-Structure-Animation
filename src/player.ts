class Player {
    config:player_config;
    graphviz:any;
    playing:Boolean;
    at:number;
    frames:frame[];
    initEnd:Boolean = false

    constructor(config:player_config){
        let default_config:player_config = {
            name:"No Name",
            duration:1000,
            engine:engine_type.dot,
        } //@ts-ignore
        this.config = Object.assign(default_config,config)
        this.frames = []
        this.playing = false;
        this.at = 0;
    }

    /** push frame */
    push(frame:frame){
        this.frames.push(frame)
    }

    /** get frame */
    get(idx:number){
        return this.frames[idx]
    }

    /** dump data */
    dump(){
        return JSON.stringify({
            config:this.config,
            frames:this.frames
        })
    }
    dumpFile(name:string="dump.json"){
        if( typeof window == 'undefined'){
            var fs = require("fs")
            fs.writeFileSync(name,this.dump(),{encoding:'utf-8'})
        }
    }

    /** load data */
    load(dump:string|any){
      if( typeof dump == "string")
        dump = JSON.parse(<string>dump)
      Object.assign(this, dump)
    }

    /** 初始化 */
    init( callback : Function | undefined){
      let self=  this
      this.graphviz = d3.select("#graph").graphviz()
        .transition(function () {
          return d3.transition("main")
            .ease(d3.easeLinear)
            .delay(500)
            .duration(1500);
        })
        .logEvents(true)
        .engine(this.config.engine)
        .on("initEnd",function(){
          console.log("initEnd")
          self.initEnd = true
          if( callback)
            callback()
        })
    }

    play_frame_at(idx:number){
      console.log(this.frames[idx].dot_src)
      this.graphviz.renderDot(this.frames[idx].dot_src)
    }

    auto_player(){
      let length = this.frames.length
      let self = this
      let dot = this.frames[self.at].dot_src
      self.graphviz.renderDot(dot)
        .on('end',()=>{
          self.at = (self.at +1 ) % length;
          if( self.at == 0)
            return;
          self.auto_player()
        })
    }
}

function __export(name:any,O:any) {
    if(typeof window != 'undefined'
    ){
        window[name] = O
    }
    else
        exports[name] = O
}


__export('Player', Player)
