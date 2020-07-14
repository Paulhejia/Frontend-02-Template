# 学习笔记

## BNF产生式 
BNF基本要点（部分）：

BNF的基本语法： <符号> ::= <使用符号的表达式>
双引号（" "）中的字符串（"word"）代表这些字符本身，而double_quote代表双引号。
双引号外的字符串（有可能带下划线）代表语法部分。
尖括号（< >）中的内容为必选项。
方括号（[ ]）中的内容为可选项。
大括号（{ }）中的内容为可重复0至无限次的项。
竖线（|）表示其左右两侧任选一项，相当于 OR 的意思。
::= 符号表示 “被定义为”的意思。
...

例如老师的
- <ME>:: = <Number> | <ME> "*" <ME> | <ME> "/" <ME> 
- <AE>:: = <ME> | <AE> + <ME> | <AE> - <ME> 

值得注意的是 bnf 还可以递归自己

## 对Number 深入认识，精度产生的问题原因
doubleFloat

IEEE 754 DoubleFloat
- sign(1) 
- Exponent (11) // 指数位
- Fraction (52) // 精度位

0.1 + 0.2 == 0.3 false // 0.30000000000000004

## 对自己认识或者接触的语言分类
命令式编程：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。
js, java, php , python, ruby, go, 易语言, shell, 


声明式编程：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)。
yml (我觉得应该是声明式)，html, xml, json, sql, css

## 对 string 的utf8 有了新的认知
 http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
utf8, utf16, GB2312 等等都是 unicode 编码方式，全世界最后统一用utf8
utf8 是可以根据不同字符编码规则可以用 1-4个bit 存储空间来表示
UTF-8 的编码规则很简单，只有二条：

1）对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。

2）对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。

https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder

js charCodeAt TextEncoder 有用来转 utf8

charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元 (在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 codePointAt()

encodeURIComponent 也是把字符串转成 utf16

## 对Number 双精度浮点数有了重新的认识

### IEEE 754 的双精度 （64位）
IEEE 754 的双精度 https://www.boatsky.com/blog/26 

进制转换工具 http://www.binaryconvert.com/result_double.html?decimal=048046049

1位数符  +   11位阶码   +   52位尾数

数符S(sign)：标记正负，0为正，1为负
阶码E(exponent bias)：阶码  =  阶码真值  +  偏移量 1023。偏移量 = 2^(k-1)-1,k表示阶码位数

    - 偏移量 2^(11 -1) -1 = 1023
    - 

尾数M(Mantissa)：数字的小数部分 （可以认为是53, 开头有一个隐藏位 1 ）

V =  (-1)^Sｘ2^(E-1023)*1.M

其中1023是偏移量

举个例子 
v = 1
第一步，正数S为 0 ，转成二进制 000000001
第二步，科学计算法 1 * 2 ^ 0  ，所以阶码真值为 0
第三步，计算阶码  000 0000 0000 （阶码真值 0 ）+ 011 1111 1111(偏移量 1023) = 011 1111 1111
第四步，得到最终存储值： 0 + 011 1111 1111 + 0 

有时间再继续验证自己的想法是不是正确的 

那么 log2(1) = 0 // 所以解码真值为0 所以阶码 E = 1023 = 01111111111

## js 进制转换

parseInt(num, type)

- num: origin
- type: 现在是x进制 转成10

> 如果非10进制，要先转成10进制，再转其他

parseInt(num,8);   //八进制转十进制
parseInt(num,16);   //十六进制转十进制
parseInt(num).toString(8)  //十进制转八进制
parseInt(num).toString(16)   //十进制转十六进制
parseInt(num,2).toString(8)   //二进制转八进制
parseInt(num,2).toString(16)  //二进制转十六进制
parseInt(num,8).toString(2)   //八进制转二进制
parseInt(num,8).toString(16)  //八进制转十六进制
parseInt(num,16).toString(2)  //十六进制转二进制
parseInt(num,16).toString(8)  //十六进制转八进制