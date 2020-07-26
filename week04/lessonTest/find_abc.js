function match(str) {
    let findA = false
    let findB = false
    let findC = false
    let findD = false
    let findE = false

    for(let i of str) {
        if(i === 'a') {
            findA = true;
        }
        else if(findA && i === 'b')
            findB = true
        else if(findB && i === 'c')
            findC = true
        else if(findC && i === 'd')
            findD = true        
        else if(findD && i === 'e')
            findE = true         
        else if(findE && i === 'f')
            return true;
        else {
            findA = false
            findB = false
            findC = false
            findD = false
            findE = false
        }

    }
}