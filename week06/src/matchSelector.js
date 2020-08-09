// 匹配css
const parser = require('postcss-selector-parser');
// const normalized = parser().processSync('h1, h2, h3', {lossless: false});
const spaceReg = /^[\t\f\n ]$/;
const tagNameReg = /^[a-zA-Z]$/;

var selectNodes = []
var currentSelector = {};

window.onload = function() {
    
    function match(selector, element) {
        
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

         // 先找出所有的父节点，再找出所有符合的字节点，
    let filterParents = [];
    let currentChildrens = [];
    let currentDom = element
    function mainProcess() {        
        for(let i in selectNodes) {
            const cSelector = selectNodes[i]
            const {type, value} = cSelector      
            if(i == 0) {
                findParent(cSelector, element)
            }
            debugger  ;
            filterParents
            // else if(type == 'combinator') { 
            //     const childrens = currentTargetDom = currentTargetDom.childNodes;
            // }
        }
    }
    mainProcess();
    
    function findParent(selector, element) {
        const {type, value} = selector
        if(type == 'tag' ) {            
            if(element.parentElement.tagName.toLowerCase() === value) {
                filterParents.push(element.parentElement)    
                return findParent(selector, element.parentElement)
            }
            else {
                if(filterParents.length) {
                    return true;
                }else {
                    return false;
                }                
            }
        }
        else if(type == 'class') {
            if(element.parentElement.classList.contains(value)) {
                filterParents.push(filterParents)    
                return findParent(selector, element)
            }
            else {
                if(filterParents.length) {
                    return true;
                }else {
                    return false;
                }                
            }
        }
        else if(type == 'id') {
            if(element.parentElement.id === value) {
                filterParents.push(filterParents)    
                return findParent(selector, element)
            }
            else {
                if(filterParents.length) {
                    return true;
                }else {
                    return false;
                }                
            }
        }
        else if(type == 'combinator') { 
            // const childrens = currentTargetDom = currentTargetDom.childNodes;
        }
    }
    function findChildrens(selector) {
        if(type == 'tag') {

        }
        else if(type == 'class') {

        }
        else if(type == 'id') {

        }
        else if(type == 'combinator') { 
            const childrens = currentTargetDom = currentTargetDom.childNodes;
        }
        return true;
    }



    }
    
    match("div #id.class", document.getElementById("id"));
    console.log('selectNodes:', selectNodes);
   
}


