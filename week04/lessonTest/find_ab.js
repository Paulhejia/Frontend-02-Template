function match(str) {
    let hasAB
    for(let i in str) {
        if(str[i] === 'a' && str[Number(i)+1] === 'b' ) {
            hasAB = true;
            return 
        }
    }
    return hasAB
}

match('123abcccc')
