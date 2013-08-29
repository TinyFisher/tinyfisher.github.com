---
layout: post
title: linux 安装 svn 服务
category: linux
tags: [linux, svn, subversion, server]
keywords: linux,svn,svn服务,subversion
description: linux下安装subversion
---

##安装subversion

linux下直接输入命令安装subversion

debian

    apt-get install subversion

redhat

    yum install subversion

##创建svn库

安装完subversion后使用`svnadmin`创建一个库

例如

    svnadmin create /var/svn/repo

创建完毕后会生成几个目录
- conf
- db
- hooks
- locks

还会创建2个文件
- README.txt
- format

##配置svn

主要是修改`conf`下的几个配置文件
- authz
- passwd
- svnserve.conf

<table class="table table-bordered table-striped">
  <tr><td>authz</td><td>目录访问权限配置</td></tr>
  <tr><td>passwd</td><td>帐号配置</td></tr>
  <tr><td>svnserve.conf</td><td>基础配置, 指向用那些配置文件等</td></tr>
</table>

###修改passwd

passwd中的帐号是`帐号=密码`的方式存储, 直接写入就行

    [users]
    admin = admin

###修改authz

authz下主要是3种节点

- aliases 配置别名, 这个不配置留空就行
- groups 配置组, 也可以不用配置

<pre><code>[aliases]

[groups]
system = admin

[/]
@system = rw

[repos:/]
admin = rw</code></pre>

其中直接写的是代表配置的是帐号的权限, 带`@`代表的是配置组的权限

目录的配置还有更灵活的方式配置, 可以不用写的那么的死

###修改svnserve.conf

直接贴上配置, 具体配置方式注释文档上写的很清楚, 以下是我的配置

    [general]
    anon-access = none
    auth-access = write
    password-db = passwd
    authz-db = authz

    [sasl]


###启动svn服务

配置完毕后直接启动就行了, 通过svn客户端就能直接访问的

     svnserve -d -r /var/svn/repo/

其中`svnserve` 还有挺多个启动参数, 就不一一介绍了

###关闭svn服务

直接kill掉`svnserve`进程就行了

    kill -9 `ps -ef | grep svnserve | grep -v grep | awk '{print $2}'`
