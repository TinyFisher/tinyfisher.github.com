---
layout: post
title: 安装Cloud9 IDE
category: ide
tags: [javascript, nodejs, cloud9 ide, nginx]
keywords: javascript,linux,nginx,turnkey,nodejs,cloud9
description: Linux安装cloud9 IDE
---

##安装nodejs

详细步骤请看

[传送门](http://heroin.so/javascript/2012/10/26/make-nodejs/)

###安装sourcemint

在`cloud9 ide` github的readme中说明需要通过sm来安装cloud9 ide

使用`npm` 安装sm

    npm install -g sm

安装完毕后验证下

    root@core ~# sm --version
    0.2.11

##下载cloud9 IDE

[https://github.com/ajaxorg/cloud9](https://github.com/ajaxorg/cloud9)

    git clone https://github.com/ajaxorg/cloud9.git cloud9
    cd cloud9
    sm install

接下来是漫长的等待了, sm安装完毕后给`cloud9.sh`授权下执行权限

    chmod +x cloud9.sh

然后启动

    ./cloud9.sh

启动完毕后会输出监听端口`3131`

##配置cloud9 IDE

安装完毕后, 是使用`localhost`的方式绑定的3131端口

别人无法直接通过ip访问

修改配置, `cloud9/configs/default.js`

其中有一句是

    var host = argv.l || process.env.IP || "localhost";

将`localhost`替换成你的ip即可

###配置nginx

我的nginx配置文件如下

<pre class="prettyprint linenums">
upstream cloud9 {
    server 127.0.0.1:3131;
    server 192.168.12.108:3131;
}

server {
    listen                      80;
    server_name                 cloud9.open-ns.org;

    charset                     utf-8;
    location / {
        proxy_pass              http://cloud9;
        proxy_set_header        Host             $host;
        proxy_set_header        X-Real-IP        $remote_addr;
        proxy_set_header        X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
</pre>

配置完毕后通过域名访问

最后效果如下

![](/assets/blog/make-clou9ide/cloud9.png)
