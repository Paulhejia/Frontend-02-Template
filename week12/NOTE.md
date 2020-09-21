# 学习笔记

之前写过一部分 ToyReact
所以 framework 的代码还是比较熟悉的，

## 轮播组件
- 基础
自动轮播 
- 手动拖动
container.mouseDown
// 超过可视范围可以监控
document.mouseMove
document.mouseUp
// clientX 位置不会因外部因素影响
e.clientX  

winter 老师在轮播无缝滚动提供了新的思路
所有滚动只有3个容器，通过改变 translateX 
offset [-1, 0 ,1]

总体看
图片下标
0 1 2 3
-3 -2 -1 0 1 2 3
映射成正数
1 2 3 0 1 2 3 

比如 我从第一张开始滑向上一张
-1 0 1 对应操作的img 的下标是
3 0 1

然后设置每个容器的 translateX 值，从而达到无缝滚动的效果

当然，我这次用自己的方式实现了一个简单版的无缝滚动，bug 有时间再修复

## 新学的api
Math.sign 取数字正负符号 return {-1} {1}