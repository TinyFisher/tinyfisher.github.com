---
layout: post
title: 使用bottle搭建web
category: python
tags: [python, bottle, web]
keywords: web框架,python,bottle,easy_install,github
description: bottle搭建web
---

##安装bottle
访问bottle官网, [http://bottlepy.org](http://bottlepy.org/)  
github主页: [https://github.com/defnull/bottle](https://github.com/defnull/bottle)  
先在github上clone源码到本地进行安装

    # git clone https://github.com/defnull/bottle.git
    # cd bottle
    # python setup.py install

安装完后打开python终端测试是否安装成功

    >>> import bottle
    >>> bottle.__version__
    '0.10.9'

能显示出版本号, 说明安装成功

##使用bottle进行开发

新建一个`demo.py`文件

<pre class="prettyprint linenums">
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from bottle import Bottle, run

app = Bottle()

@app.get("/")
def get_index():
    return "get index"

@app.post("/")
def post_index():
    return "post index"

run(app, host="localhost", port=9090)
</pre>

终端执行`demo.py`文件后,
命令行测试运行效果如下

    # curl http://localhost:9090/
    get index

    # curl -d "" http://localhost:9090/
    post index
