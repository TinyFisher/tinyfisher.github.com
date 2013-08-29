---
layout: post
title: linux编译nginx
category: linux
tags: [linux, nginx]
keywords: linux,nginx,turnkey
description: linux编译nginx
---

##安装依赖包

    apt-get install libssl-dev openssl

##安装pcre

pcre下载地址

[ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/](ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/)

    ./configure –-prefix=/usr/local/pcre
    make 
    make install

##编译nginx

    ./configure --without-http_rewrite_module --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
    make
    make install

##配置环境变量

    NGX_HOME=/usr/local/nginx
    PATH=$PATH:$NGX_HOME/sbin
    export NGX_HOME PATH

##验证

直接启动`nginx`
使用curl 验证即可

`curl -I http://127.0.0.1`
