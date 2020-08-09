学习笔记
## css 选择器优先级规则
https://www.w3.org/TR/selectors-4/#specificity-rules

A selector’s specificity is calculated for a given element as follows:

count the number of ID selectors in the selector (= A)
count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= B)
count the number of type selectors and pseudo-elements in the selector (= C)
ignore the universal selector

If the selector is a selector list, this number is calculated for each selector in the list. For a given matching process against the list, the specificity in effect is that of the most specific selector in the list that matches.

A few pseudo-classes provide “evaluation contexts” for other selectors, and so have their specificity defined specially:

The specificity of an :is(), :not(), or :has() pseudo-class is replaced by the specificity of the most specific complex selector in its selector list argument.
Analogously, the specificity of an :nth-child() or :nth-last-child() selector is the specificity of the pseudo class itself (counting as one pseudo-class selector) plus the specificity of the most specific complex selector in its selector list argument (if any).
The specificity of a :where() pseudo-class is replaced by zero.

计算选择器中ID选择器的数量（= A）

计算选择器中的类选择器，属性选择器和伪类的数量（= B）

计算类型选择器和选择器中的伪元素的数量（= C）

忽略通用选择器

如果选择器是选择器列表，则为列表中的每个选择器计算此数字。 对于针对列表的给定匹配过程，有效的特异性是列表中最匹配的选择器的特异性。

一些伪类为其他选择器提供“评估上下文”，因此专门定义了它们的特异性：

- 伪类：is（），：not（）或：has（）的特异性被其选择器列表参数中最具体的复杂选择器的特异性所取代。

- 类似地，：nth-​​child（）或：nth-​​last-child（）选择器的特异性是伪类本身的特异性（作为一个伪类选择器）加上其最具体的复杂选择器的特异性 选择器列表参数（如果有）。

- ：where（）伪类的特异性被替换为零。

> 通过下面的例子去一一阐述分析
eq.

1.  :is(em, #foo) 
这里应证了 “伪类：is（），：not（）或：has（）的特异性被其选择器列表参数中最具体的复杂选择器的特异性所取代。”
如果存在这种 选择器列表(解析时会是这样的selectors: ['em', '#foo']) 时，会取优先级最大的那个匹配 #foo A = 1，且伪类选择器 :is 会被 #foo 取代, 而不会相加

<em>, <p id=foo>, or <em id=foo>

2.  .qux:where(em, #foo#bar#baz) 
这里的where 里面的会被替换为0， 所以 specificity 是 （0，1，0）

3. :nth-child(even of li, .item)
a class selector (.item) plus a pseudo-class


它是由伪类选择器 :nth-child B = 1  加 类选择器 .item B = 1 ，
所以 specificity（A, B, c） = (0,2,0) 
（注：:nth-child 伪类选择器 不会被复杂选择器的特异性所取代）

4. :not(em, strong#foo)
(1, 0, 1)
根 例子一一样， :not 会被更具有特异性（strong#foo）的取代 

## 思考题
完成第 9 节思考题作业：为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？（提交至 GitHub）

```html
<P>Some text that ends up on two lines</P>
Assuming that a line break will occur before the word "ends", the fictional tag sequence for this fragment might be:

<P>
<P::first-line>
<P::first-letter>
S
</P::first-letter>ome text that
</P::first-line>
ends up on two lines
</P>
Note that the ::first-letter element is inside the ::first-line element. Properties set on ::first-line are inherited by ::first-letter, but are overridden if the same property is set on ::first-letter.

```
我只是猜测 ::first-line 是基于 ::first-letter 生成的（根执行顺序有关），样式也是要继承于 first-letter, 而且first-line 如果也能设置 float 盒模型，这样样式也很难控制了