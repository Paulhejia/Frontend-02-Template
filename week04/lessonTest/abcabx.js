// abababx
// abcabcabx


// ababababx

function match(string) {
    var state = start;
    for(let c of string) {
        state = state(c);
    }
    console.log(state);
    return state === end;
}

function start(c) {
    if(c === 'a') 
        return foundA
    else 
        return start;
     
}

function foundA(c) {
    if(c === 'b') 
        return foundB
    else
        return start(c);
}

function foundB(c) {
    if(c === 'c')
        return foundC
    else 
        return start(c);    
}

function foundC(c) {
    if(c === 'a')
        return foundA2
    else 
        return start(c);    
}

function foundA2(c) {
    if(c === 'b')
        return foundB2
    else 
        return start(c);    
}

function foundB2(c) {
    if(c === 'x')
        return end
    else 
        return foundB(c);    
}

function end() {
    return end
}

console.log(match("abcabcabx"))
// console.log(match("abcabx"))