---
layout: post
title: debian 下 bind9 dns服务器
category: linux
tags: [linux, debian, bind9, dns]
keywords: linux, debian, bind9, dns
description: debian下安装bind9实现内网dns
---

## 安装 bind9

比较懒, 直接通过 `apt-get` 方式安装

    apt-get install bind9

安装完毕后主要的配置文件都在 `/etc/bind/` 目录下

## 配置bind9

添加一个 `正向解析`

    cd /etc/bind
    touch db.open-ns.org

添加一个 `反向解析`

    cd /etc/bind
    touch db.12.168.192

### 配置正向解析

编辑 `db.open-ns.org`

    $TTL    604800
    @ IN SOA ns.open-ns.org. root.open-ns.org. (
                      2     ; Serial
                 604800     ; Refresh
                  86400     ; Retry
                2419200     ; Expire
                 604800 )   ; Negative Cache TTL
    ;
    @                       IN  NS      ns.open-ns.org.
    open-ns.org.            IN  NS      ns.open-ns.org.

    ns.open-ns.org.         IN  A       192.168.12.5
    dns.open-ns.org.        IN  A       192.168.12.5
    version.open-ns.org.    IN  A       192.168.12.10
    ci.open-ns.org.         IN  A       192.168.12.15
    maven.open-ns.org.      IN  A       192.168.12.20
    debian.open-ns.org.     IN  A       192.168.12.25
    store.open-ns.org.      IN  A       192.168.12.30
    zk-001.open-ns.org.     IN  A       192.168.12.121
    zk-002.open-ns.org.     IN  A       192.168.12.122
    zk-003.open-ns.org.     IN  A       192.168.12.123

以上我都是做的`A`记录, 可以根据需要做其他的解析`MX` `CNAME` 等

### 配置反向解析

编辑 `db.12.168.192`

    $TTL    604800
    @ IN SOA ns.open-ns.org. root.open-ns.org. (
                      2     ; Serial
                 604800     ; Refresh
                  86400     ; Retry
                2419200     ; Expire
                 604800 )   ; Negative Cache TTL
    ;
    @       IN  NS      ns.open-ns.org.
    5       IN  PTR     ns.open-ns.org.
    10      IN  PTR     version.open-ns.org.
    15      IN  PTR     ci.open-ns.org.
    20      IN  PTR     maven.open-ns.org.
    25      IN  PTR     debian.open-ns.org.
    30      IN  PTR     store.open-ns.org.

### 全局配置

编辑 `/etc/bind/named.conf` 将 正向解析 和 反向解析 的配置文件加入

    zone "open-ns.org" {
        type master;
        file "/etc/bind/db.open-ns.org";
    };

    zone "12.168.192.in-addr.arpa" {
        type master;
        file "/etc/bind/db.12.168.192";
    };

编辑 `/etc/bind/named.conf.options`

    forwarders {
        114.114.114.114;
        8.8.8.8;
    };

最后在客户端上将dns服务器设置到当前服务器即可

编辑 `/etc/resolv.conf`

    nameserver 192.168.12.5
