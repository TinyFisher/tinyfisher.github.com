---
layout: post
title: ubuntu设置静态ip
category: linux
tags: [shell, linux, bash, network]
keywords: linux,ubuntu,设置ip,ipaddress
description: ubuntu设置静态ip
---

编辑`/etc/network/interfaces`文件

默认的可能是

    auto lo
    iface lo inet loopback

修改成

    auto lo
    iface lo inet loopback

    auto eth0
    iface eth0 inet static
    address 192.168.1.12
    netmask 255.255.255.0
    gateway 192.168.1.1

配置eth0, 将来需要用自动获取的时候可以直接将`static`改成`dhcp`

其他的用`#`注释

    auto lo
    iface lo inet loopback

    auto eth0
    iface eth0 inet dhcp
    #address 192.168.1.12
    #netmask 255.255.255.0
    #gateway 192.168.1.1

设置完毕后重启网卡即可

    /etc/init.d/networking restart
