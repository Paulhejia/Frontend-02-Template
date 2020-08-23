# Vertical-Align: All You Need To Know (CSS)
## Doc address
https://christopheraue.net/design/vertical-align

We need  to talk  about this!

我们必须去探讨一下它

Yep, let’s talk about the CSS property vertical-align. It’s intended use is to align text and elements next to each other. Like **centering an icon** next to a bit of text.

让我们讨论一下CSS属性垂直对齐。它的目的是使文本和元素相邻对齐。比如把一个图标放在文本旁边。

But, it can be a real scumbag sometimes with all its seemingly mysterious rules at work. For example, it might happen, that the element you changed vertical-align for doesn t change its alignment at all, but other elements next to it do! What a joy

但是，它的工作规则真的很令人不解甚至让人觉得有点无耻， 例如，可能会发生以下情况：您更改了vertical-align的元素根本不会改变其对齐方式，但是其旁边的其他元素却会改变！ 开玩笑吧

So, to minimize future pain, I waded through W3C’s CSS specifications to clarify the behavior of vertical-align once and for all.

因此，为了减轻对将来的痛苦，我费力地阅读了 w3c 的css规范，阐明了 vertical-align 的工作原理， 一劳永逸

Let’s tackle the rules of the game!

让我们开始吧

What you will learn in this article:
Vertical-Align Acts On Inline-level Elements In a Line Box. ⬀
Inline-level Elements and Line Boxes Have Baselines, Tops and Bottoms. ⬀
Vertical-Align Aligns Baselines, Tops and Bottoms. ⬀
Example: How to center an icon next to a bit of text. ⬀
Example: How the baseline might move. ⬀
Example: How to vertically center elements without a gap at the bottom. ⬀
Example: How to remove the gap between two aligned elements

我们将会学到什么：
    - Vertical-Align 作用在 排成一行的盒子里的行级元素，（TODO 就不包含 匿名行元素 ）
    - 行级元素和 行内盒子 都有【基线】【顶线】【底线】
    - Vertical-Align 是怎么排列在 baselines , top, bottom 的，
    - 例子： baseline 是怎么移动
    - 例子： 如何使元素垂直居中居中而底部没有间隙
    - 例子： 如何消除两个对齐元素之间的间隙

Vertical-Align Acts On Inline-Level Elements In a Line Box
vertical-align is used to align inline-level elements. These are elements, whose display property evaluates to

Vertical-Align 作用在 行级元素, 表现为拥有这三个属性之一：
inline,
inline-block or
inline-table (not considered in this article)

Inline elements are basically tags wrapping text.
行级元素一般作用包裹文本的标签

Inline-block elements are what their name suggests: block elements living inline. They can have a width and height (possibly defined by its own content) as well as padding, a border and margin.
display: inline-block 的元素可以设置宽width, 高height, padding, border margin 等属性

Inline-level elements are laid out next to each other in lines. Once there are more elements than fit into the current line, a new line is created beneath it. All these lines have a so-called line box, which encloses all the content of its line. Differently sized content means line boxes of different height. In the following illustration the top and bottom of line boxes are indicated by red lines.

内联级元素是按行相邻地排列的，一旦有很多行元素多于一行时，会自动在下方新开一行。所以所有的这些线都是有一个所谓的线盒，它包含它所占行的所有内容， 内容大小不同意味着线盒的高度不同， 
在下图中，线框的顶部和底部用红线表示

<image />

The line boxes trace out the field we are playing on. Inside these line boxes the property vertical-align is responsible for aligning the individual elements. So, in respect to what are elements aligned?

线盒显示了我们上面所写的领域。 在这些线盒内，vertical-align属性负责对齐各个元素；
所以，什么是元素对齐呢？

About Baselines, Tops and Bottoms

关于基线，顶线，底线的描述

The most important reference point to align vertically is the baseline of the involved elements. In some cases the top and bottom edge of the elements’ enclosing box becomes important, too. Let’s have a look where the baseline and outer edges live for each involved type of element:

垂直对齐的最重要参考点是所涉及元素的基线。 在某些情况下，元素封闭框的顶部和底部边缘也很重要。 让我们看一下每种涉及的元素类型的基线和外边缘的位置：

<image />
在这里，您会看到三行文字彼此相邻。 
行高的上下边缘用红线表示，字体的高度用绿线表示，基线用蓝线表示。
 左侧元素，文本的行高设置为与字体大小相同的高度。 绿线和红线折叠成每边的一条线。 
 
 中间元素，行高是字体大小的两倍。 
 
 最右边元素，行高是字体大小的一半。

The inline element’s outer edges align themselves with the top and bottom edge of its line height. It does not matter, if the line height is smaller than the height of the font. So, the outer edges are the red lines in the figure above

其实这整段可以理解为，元素的高是由 顶线与底线决定的

内联元素的外缘将自己与其行高的顶部和底部边缘对齐，
如果行高比字体本身高度小也没关系，一样的计算
所以，外缘其实就是指上方图片 的红线

The inline element’s baseline is the line, the characters are sitting on. This is the blue line in the figure. Roughly speaking, the baseline is somewhere below the middle of the font’s height. Have look at the W3C Specs for a detailed definition.

<image />

内联元素的基线就是，字符坐在上面的线，就是那条蓝色的线
通俗来讲就是，基线在字体高度的中间以下

The Inline-block element’s baseline depends on whether the element has in-flow content:

In case of in-flow content the baseline of the inline-block element is the baseline of the last content element in normal flow (example on the left). For this last element its baseline is found according to its own rules.
In case of in-flow content but an overflow property evaluating to something other than visible, the baseline is the bottom edge of the margin-box (example in the middle). So, it is the same as the inline-block element’s bottom edge.
In case of no in-flow content the baseline is, again, the bottom edge of the margin-box (example on the right).

这段是最难翻译的
inline-block 元素的基线由是否由 流入内容 决定:
- 对于流内内容，内联块元素的基线是正常流中最后一个内容元素的基线(如左侧所示)。
对于最后一个元素，根据它自己的规则找到它的基线
- 对于流内内容但overflow的值为visible的情况，基线是页边框的底边缘(如中间)。它和内联块元素的底边是一样的。在没有流内内容的情况下，基线同样是（计算margin的距离）margin-box 边距框的底边缘(右边的例子)。
- 如果没有流入内容，则基线将再次是边距框 （计算margin的距离）margin-box的底部边缘（右侧示例）

<image />



