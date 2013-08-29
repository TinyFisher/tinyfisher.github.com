---
layout: post
title: linux编译nodejs
category: javascript
tags: [javascript, nodejs, turnkey]
keywords: linux,javascript,turnkey,nodejs
description: linux编译nodejs
---

##获取nodejs

下载地址

[http://nodejs.org/dist/](http://nodejs.org/dist/)

本次使用的是32位版本的, 看系统什么样选择

[http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz](http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz)

##安装nodejs

我使用的是`turnkey-core-11.3`, 基于ubuntu-10.04, 因为安装快, 并且小

###安装依赖包

    apt-get install g++ curl libssl-dev build-essential

###编译

    ./configure --prefix=/usr/local/nodejs
    make
    make install

###配置环境变量

    NODE_HOME=/usr/local/nodejs
    PATH=$PATH:$NODE_HOME/bin
    export NODE_HOME PATH

`. /etc/profiles`

##验证

    root@core ~# node -v
    v0.8.14
    root@core ~# npm -v
    1.1.65
