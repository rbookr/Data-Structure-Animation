class Player {
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
