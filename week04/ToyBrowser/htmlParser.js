const EOF = Symbol('EOF')
const tagNameReg = /^[a-zA-Z]$/
const blankReg = /^[\t\n\f] $/

let currentToken = null;

function emit(token) {
    console.log(token);
}

function data(c) {
    if(c == '<') {
        return tagOpen;
    } else if( c == EOF ) {
        emit({
            type: "EOF"
        })
        return ;
    } else {
        emit({
            type: "text",
            content : c
        })
        return data;
    }
}

function tagOpen(c) {
    if(c == '/') { // 闭合
        return endTagOpen;
    }
    else if(c.match(tagNameReg)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        return ;
    }
}

function tagName(c) {
    if( c.match(blankReg)) {
        return beforeAttrbuteName
    }
    if(c.match(tagNameReg)) {
        currentToken.tagName += c;
        return tagName;
    }
    else if(c == '/') {
        return selfClosingStartTag;
    }
    else if(c == ">") {
        emit(currentToken)
        return data
    }
    else {
        return tagName;
    }
}

function endTagOpen(c) {
    if(c == '>') {
        return data 
    }
    else if(c.match(tagNameReg)) {
        return tagName(c);
    }
    else if(c == EOF) {
        return '';
    }
    else {
        return data 
    }
}

function selfClosingStartTag(c) {
    if(c === '>') {
        currentToken.isSelfClosing = true;
        return data;
    }
    else if(c === "EOF") {}
    else {}
}

// 两种 有 = 与没有 = 的
function beforeAttrbuteName(c) {
    if(c.match(blankReg)) {
        return beforeAttrbuteName;
    }
    else if(c == '>' || c == "/" || c == EOF) {
        return afterAttributeName(c);
    }
    else if(c == '=') {
        // return beforeAttrbuteName
    }
    else {
        currentAttribute = {
            name: '',
            value: ""
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if(c.match(blankReg) || c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    }
    else if(c == '='){
        return beforeAttrbuteValue;
    }
    else if(c == "\'" || c == "\"" || c == "<" || c== "\u0000") {}
    else {
        currentAttribute.name += c
        return attributeName
    }
}

function afterAttributeName(c) {
    if(c == '/') {        
        return selfClosingStartTag
    }
    else if(c == '='){
        return beforeAttrbuteValue;
    }
    else if(c == '>') {
        currentToken[currentAttribute.name] = currentToken.value
        emit(currentToken);
        return data;
    }else if(c == EOF) {

    }
    else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function beforeAttrbuteValue(c) {
    if(c.match(blankReg) || c == '/' || c == '>' || c == EOF) {
        return beforeAttrbuteValue;
    } else if(c == "\"") {
        return doubleAttributeValue;
    } else if(c == "\'") {
        return singleAttributeValue;
    } else if(c == ">") {

    } else {
        return UnqutoedAttributeValue(c);
    }
}

function doubleAttributeValue(c) {
    if(c == "\"") {
        currentToken[currentToken.name] = currentAttribute.value
        return afterQuotedAttributeValue;
    }
    else if( c == "\u0000") {}
    else if( c == EOF) {}
    else {
        currentAttribute.value += c;
        return doubleAttributeValue
    }
}
function singleAttributeValue(c) {
    if(c == "\'") {
        currentToken[currentToken.name] = currentAttribute.value
        return afterQuotedAttributeValue;
    }
    else if( c == "\u0000") {}
    else if( c == EOF) {}
    else {
        currentAttribute.value += c;
        return doubleAttributeValue
    }
}

function UnqutoedAttributeValue() {
    if(c.match(blankReg)) {
        currentToken[currentToken.name] = currentToken.value
        return beforeAttrbuteName;
    }
    else if(c == '/') {
        currentToken[currentToken.name] = currentToken.value
        return selfClosingStartTag;
    }
    else if(c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data;
    }
    else if(c == "\u000" || c == "\"" || c == "<" || c == "=" || c == "`" || c == EOF) {}
    else {
        currentAttribute.value += c;
        return UnqutoedAttributeValue;
    }
}

function afterQuotedAttributeValue() {
    if(c.match(blankReg)) {
        return beforeAttrbuteName;
    } else if(c == '/') {
        return selfClosingStartTag;
    } else if(c == '>') {
        currentToken[currentAttribute.name] = currentToken.value;
        emit(currentToken)
        return data;
    } else if(c == EOF) {

    }
}

function parseHTML(html) {
    let state = data ;
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF);
}

const originHtml = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>

    <a href="./saveMoney.html" style="display:block;margin-top: 50px">baidu</a>
    
    <script src="./index.js"></script>
</body>
</html>`

console.log(parseHTML(originHtml))