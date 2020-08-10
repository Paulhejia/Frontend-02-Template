// 匹配css

const spaceReg = /^[\t\f\n ]$/;
const tagNameReg = /^[a-zA-Z\-*]$/;
let currentDom = null;

// 获取选择器
// type: class id combination 
// value: 值
function getSelectors(selector) {
    var selectNodes = []
    var currentSelector = {};
    function start(s) {
        if(s.match(spaceReg)) {
            emit({
                type: 'combinator',
                value: ' ',
            })
            endSelect()
            return start;
        }
        else if(s === '#'){
            emit({
                type: 'id',
                value: '',
            })
            return startSelect;
        }
        else if(s === '.'){
            emit({
                type: 'class',
                value: '',
            })
            return startSelect;
        }
        else if(s.match(tagNameReg)) {
            emit({
                type: 'tag',
                value: s,
            })
            return selectName;
        }
    }
    function endOfFinal() {
        endSelect();
    }
    function startSelect(s) {
        if(s.match(tagNameReg)) {
            return selectName(s);          
        }
        else{
            throw new Error('错误的selector')
        }            
    }
    function endSelect() {
        selectNodes.push(currentSelector);
        return start;
        // currentSelector = {};
    }
    function selectName(s) {
        // 结束
        if(s.match(tagNameReg)) {
            currentSelector.value = currentSelector.value + s;
            return selectName;
        }            
        else{                
            endSelect();
            return start(s);
        }  
    }
    function emit(token) {
        currentSelector = {
            value: token.value,
            type: token.type
        }
    }
    let state = start        
    for(var s of selector) {
        state = state(s)
    }
    endOfFinal();
    return selectNodes;
}
/*
* @params{selector} Object 选择器描述对象 { type: 'xxx', value: 'xxx' }
* @params{isTarget} Boolean  是否目标元素 document.getElementById("id")
*
**/ 
function matchSelector(selector, isTarget) {
    const { type, value } = selector
    if(type == 'tag' ) {            
        if(currentDom.tagName.toLowerCase() === value) {
            return true;
        }
        else {
            if(currentDom.parentElement && !isTarget) {
                currentDom = currentDom.parentElement                
                return matchSelector(selector);
            }else {
                return false;
            }                
        }
    }
    else if(type == 'class') {
        if(currentDom.classList.contains(value)) {
            return true;
        }
        else {
            if(currentDom.parentElement && !isTarget) {
                currentDom = currentDom.parentElement
                return matchSelector(selector);
            }else {
                return false;
            }                
        }
    }
    else if(type == 'id') {
        if(currentDom.id === value) {
            return true;
        }
        else {
            if(currentDom.parentElement && !isTarget) {
                currentDom = element.parentElement;
                return matchSelector(selector)
            }else {
                return false;
            }                
        }
    }
}

window.onload = function() {
    
    function match(selector, element) {
        let selectNodes = getSelectors(selector);     
        console.log('selectNodes:', selectNodes);   
        let result = true;
        let _arr = selectNodes.reverse();
        let isElTarget = true;
        // 从自生往上面找
        currentDom = element     
        for(let _selector of _arr) {         
            if(_selector.type === 'combinator') {
                isElTarget = false;
                if(currentDom.parentElement) {
                    currentDom = currentDom.parentElement
                    continue;
                }
                else {
                    result = false;
                    break
                }                    
            }
            else {
                result = matchSelector(_selector, isElTarget);
                if(result) {                        
                    continue
                }
                else {
                    break;
                }
            }                               
        }
        console.log('result:', result)         
    }
    
    match("html #id.abc", document.getElementById("id")); // 预期 false
    match("div #id.class", document.getElementById("id")); // 预期 true
    match("body #id .test-letter", document.querySelector('.test-letter')); // 预期 true
}


