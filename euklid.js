function isInt(n) {
    return typeof n === 'number' && n % 1 == 0;
}

function emptyArray(length) {
    result = [];
    for(var i = 0; i < length; i++)
        result.push("");
    return result;
}

function range(x, y) {
    if(!y) {
        y = x;
        x = 0;
    }
    for(result = []; x < y; x++)
        result.push(x);
    return result;
}

function euklid(nx, ny) {
    if(!nx ||
       !ny ||
       ny > nx || 
       (!isInt(nx) && !isInt(ny))
      
      ) {
        return defaultEuklid();
    }
    
    var i  = [];
    var ai = [1, 0];
    var bi = [0, 1];
    var qi = ['-', '-']
    var ri = [nx, ny];
    
    
    /******* Ri *******/ 
    while(ri[ri.length - 2] % ri[ri.length - 1] >= 0) {
        ri.push(ri[ri.length - 2] % ri[ri.length - 1]);
    }
    /******* Qi *******/ 
    for(var x = 2; x < ri.length; x++) {
        qi.push(Math.floor(ri[x-2] / ri[x-1]));
    }
    /******* Bi *******/ 
    for(var x = 2; x < ri.length; x++) {
        bi.push(bi[x-2] - (bi[x-1] * qi[x]));
    }
    /******* Ai *******/ 
    for(var x = 2; x < ri.length; x++) {
        ai.push(ai[x-2] - (ai[x-1] * qi[x]));
    }
    /******* i *******/ 
    i = range(-1, ri.length-1);
    
    return {"i" : i,
            "ai": ai,
            "bi": bi,
            "qi": qi,
            "ri": ri }
}

function defaultEuklid() {
    return { "i": range(-1, 4),
            "ai": emptyArray(5),
            "bi": emptyArray(5),
            "qi": emptyArray(5),
            "ri": emptyArray(5)}
}