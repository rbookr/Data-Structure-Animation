declare var exports:any;
declare var d3:any;


interface frame {
    dot_src:"string"
    log:"string"
}

declare const enum engine_type {
    dot = "dot",
    circo = "circo",
    fdp = "fdp",
    neato = "neato",
    osage = "osage",
    patchwork = "patchwork",
    twopi = "twopi"
}

interface player_config {
    name:string
    duration:number
    delay:number
    engine:engine_type
    log:Boolean | undefined
}

