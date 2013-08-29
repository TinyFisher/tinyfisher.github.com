---
layout: post
title: 通过 httptunnel 穿透防火墙
category: other
tags: [httptunnel, firewall]
keywords: httptunnel,防火墙,firewall,穿透
description: 通过httptunnel穿透防火墙通信
---

由于公司网络封了很多出口协议, 对外只能采用`http`协议

平时日常在公司要登录下vps管理管理都很难, 直接就断开

通过`httptunnel`的方式可以将目标协议以`http`的方式发布出去

本地通过这个地址转换可以实现到连接

###下载httptunnel

官方地址: [http://www.nocrew.org/software/httptunnel.html](http://www.nocrew.org/software/httptunnel.html)

###安装httptunnel

直接使用默认的安装方式

    ./configure
    make
    make install

这样会安装到`/usr/local/bin/`下

主要是用到`htc`和`hts`2个文件

<table class="table table-bordered table-striped">
  <tr><td>hts</td><td>将本地任意端口以http的协议映射到任意端口上</td></tr>
  <tr><td>htc</td><td>将服务器httptunnel的端口转换到本地端口上</td></tr>
</table>

###hts使用方式

在服务器上直接执行

    hts --forward-port ip:22 8080

这将把ssh的`22`端口以`http协议`的方式映射到服务器的`8080`端口上

###htc使用方式

在客户端上直接执行(如果是windows系统的话可以拿到源码通过cygwin进行编译)

    htc -F 8888 ip:8080

这将把目标ip的`httptunnel`端口在本地上的`8888`进行绑定

然后通过ssh客户端连接

    ssh -p 8888 username@127.0.0.1

###结束

通过httptunnel的方式可以穿透防火墙, 不仅仅限于ssh端口, 同样适用于其他的协议

