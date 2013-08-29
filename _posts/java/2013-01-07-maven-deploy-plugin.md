---
layout: post
title: maven 上传 插件
category: java
tags: [java, maven, upload, deploy, plugin]
keywords: java, maven, upload, deploy-maven-plugin
description: maven上传插件
---

由于最近开发一个项目是运行在linux上的, 需要频繁的上传编译后的文件到服务器上

于是自己写了一个基于maven的上传插件

[项目地址](https://github.com/heroin/deploy-maven-plugin)

该插件是先编译项目然后将编译的结果上传至指定服务器, 指定目录

目前是只支持单ip, 并且密码是明文方式配置

未来考虑可以上传多个文件, 或者通过密钥的方式验证

目前这个项目还没传到maven中央服务器上, 

要用的可以先把源码下下来安装到自己本地仓库, 或者提交到内部私服

## 配置方式

<pre class="prettyprint linenums">
&lt;plugin&gt;
    &lt;groupId&gt;so.heroin.maven.plugins&lt;/groupId&gt;
    &lt;artifactId&gt;deploy-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;1.0.0.0&lt;/version&gt;
    &lt;configuration&gt;
        &lt;hostname&gt;192.168.1.12&lt;/hostname&gt;
        &lt;username&gt;root&lt;/username&gt;
        &lt;password&gt;root&lt;/password&gt;
        &lt;port&gt;22&lt;/port&gt;
        &lt;remotePath&gt;/root/code&lt;/remotePath&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</pre>

### 配置描述

<table class="table table-bordered table-striped">
  <thead>
    <tr><th>配置项</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr><td>hostname</td><td>服务器ip</td></tr>
    <tr><td>username</td><td>服务器帐号</td></tr>
    <tr><td>password</td><td>服务器密码</td></tr>
    <tr><td>port</td><td>服务器ssh端口, 默认22</td></tr>
    <tr><td>remotePath</td><td>上传服务器地址, 默认/tmp</td></tr>
  </tbody>
</table>

其中`port`和`remotePath`是有默认值的, 可以不填写

