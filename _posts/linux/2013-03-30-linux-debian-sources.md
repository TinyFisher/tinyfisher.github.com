---
layout: post
title: 制作 debian 源
category: linux
tags: [linux, debian, sources, apt-get]
keywords: linux, debian, sources, apt-get
description: 通过光盘制作debian源
---

首先下载好debian的全部iso, 我下的是最新的6.0.7, 一共8张

安装环境是虚拟机

给虚拟机再添加7个光驱, 把debian的所有的iso都挂载上去

新建一个目录`/var/sources/`

用于存储debian光盘里面全部的软件包

挂载iso后, 把iso下所有的pool文件全部拷贝到 `/var/sources/`

    cp -R /mnt/cd0/pool /var/sources/
    cp -R /mnt/cd1/pool /var/sources/
    cp -R /mnt/cd2/pool /var/sources/
    cp -R /mnt/cd3/pool /var/sources/
    cp -R /mnt/cd4/pool /var/sources/
    cp -R /mnt/cd5/pool /var/sources/
    cp -R /mnt/cd6/pool /var/sources/
    cp -R /mnt/cd7/pool /var/sources/

安装`dpkg-scanpackages`

    apt-get install dpkg-dev

这个工具就是debian带的源操作的工具

在`/var/sources/`下新建2个目录, 用于存放`Pakcages`

    mkdir -p /var/sources/dists/squeeze/main/binary-amd64
    mkdir -p /var/sources/dists/squeeze/contrib/binary-amd64

由于我是用的`64位`的`squeeze`, 具体目录名字对应版本修改下

最后通过`dpkg-scanpackages`扫描`pool`下的全部软件包, 该操作会用很长时间, 具体我没记

    dpkg-scanpackages pool/main | gzip > dists/squeeze/main/binary-amd64/Packages.gz
    dpkg-scanpackages pool/contrib | gzip > dists/squeeze/contrib/binary-amd64/Packages.gz

将`Packages.gz`备份一份 然后执行

    gunzip Packages.gz

最后再还原成`Packages.gz`

生成`Release`文件

    apt-ftparchive release . \
    -o APT::FTPArchive::Release::Origin="Debian" \
    -o APT::FTPArchive::Release::Label="Debian" \
    -o APT::FTPArchive::Release::Suite="stable" \
    -o APT::FTPArchive::Release::Version="6.0.7" \
    -o APT::FTPArchive::Release::Codename="squeeze" \
    -o APT::FTPArchive::Release::Date="Sat, 23 Feb 2013 10:54:11 UTC" \
    -o APT::FTPArchive::Release::Architectures="amd64" \
    -o APT::FTPArchive::Release::Components="main contrib" \
    -o APT::FTPArchive::Release::Description="Description: Debian 6.0.7 Released 23 February 2013" \
    > Release

生成`Release.gpg`

    gpg -abs -o Release.gpg Release

等待扫描完毕后, 将`/var/sources/`发布到web目录上

我是拿`nginx`直接指向过去的

配置`/etc/apt/sources.list`

    deb http://127.0.0.1/ squeeze main contrib

然后执行`apt-get update`, 接着安装想要的软件. 速度相当快
