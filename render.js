var fs = require("fs")
var pathFn = require("path")
var { exec,spawn} = require("child_process")

var debug = console.log



spawn('browser-sync',['start','--server',`--files`,`index.html,static/css/app.css`,'--no-open'],{
    //cwd:`${__dirname}/output`,
    stdio:['inherit','inherit','inherit']
})

const scss = [
`${__dirname}/static/scss/app.scss`,
]
spawn('node-sass',[`-w`,scss[0],`-o`,`${__dirname}/static/css`],{
    stdio:['inherit','inherit','inherit']
})
