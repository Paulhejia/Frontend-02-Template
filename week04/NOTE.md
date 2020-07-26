学习笔记

# http层
require('http')
# tcp ip 层
require(‘net')


流
端口 网卡根据端口分发给各个应用
包
ip地址
require('net')
libnet 负责ip包构造与发送
libpcap 负责抓流进网卡所有的ip包

http
- request
- response

htmlParser 在 /ToyBrowser/htmlParser.js

这周内容好多啊，学会了根据 url生成http报文，  http 的解析与 bodyParser ，对状态机的理解更加深刻了
html 的解析与dom 树构成原理
每一步一个脚印吧，感觉自己对学习的时间分配还不够，必须得自己沉淀一下