const fs = require("fs")

let fl_list = fs.readdirSync(__dirname)
let raw_list = []
for( let file of fl_list){
  let reg = /^(\d+)\.dot/
  if( reg.test(file)){
    let id = file.match(reg)[1]
    raw_list.push(parseInt(id))
  }
}

raw_list.sort( function(a,b){return a-b})

let dump = {config:{
  name:"fhq-treap split"
},frames:[]}

  console.log(raw_list)
for( let id of raw_list){
  dump.frames.push({
    dot_src: fs.readFileSync(`${id}.dot`,{encoding:'utf-8'}),
    log: fs.existsSync(`${id}.log`) ?  fs.readFileSync(`${id}.log`,{encoding:'utf-8'}) : ""
  })
}

fs.writeFileSync("dump.json", JSON.stringify(dump))
