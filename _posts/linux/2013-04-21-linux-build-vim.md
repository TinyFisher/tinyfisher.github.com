---
layout: post
title: 编译 vim 
category: linux
tags: [build, vim, linux]
keywords: linux, vim, make, build
description: linux下编译vim
---

##下载vim

下载地址: [ftp://ftp.vim.org/pub/vim/unix/](ftp://ftp.vim.org/pub/vim/unix/)

随便选择一个版本

##解压

tar jxvf vim--.tar.bz2

##编译vim

首先需要安装`ncurses`支持

###debian

    apt-get install libncurses5-dev

###redhat

    yum install ncurses-devel

进入vim解压后的目录, 执行`configure`

    ./configure --enable-multibyte --with-features=huge --prefix=/usr/local/vim

执行完毕后, 然后`make`

    make VIMRCLOC=/usr/local/vim VIMRUNTIMEDIR=/usr/local/vim/runtime MAKE="make -e"
    make install

`make`完毕后将`runtime`文件拷贝到编译后的目录

    cp -R runtime /usr/local/vim/runtime

##配置vim

新增一个全局配置文件

    touch /usr/local/vim/vimrc

可以将自己常用的一些配置拷贝进去

最后做一个软链, 将编译后的链接到path中去

    ln -s /usr/local/vim/bin/vim /usr/local/bin/vim
