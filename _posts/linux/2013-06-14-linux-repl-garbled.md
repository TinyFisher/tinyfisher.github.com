---
layout: post
title: linux 下 repl 乱码
category: linux
tags: [linux, repl, garbled, rlwrap, readline]
keywords: linux, repl, garbled, rlwrap, readline
description: linux下repl乱码解决
---

有时候在`repl`下按键会出现`乱码`

例如退格的时候出现的是 `^H`

方向键则出现的是 `^[[A`, `^[[B`, `^[[C`, `^[[D`


### 退格键

如果是退格键的话最简单的解决方式就是 通过 stty

    # stty erase ^H

把这句放到`/etc/profile` 里面即可. 全局有效. 或者放到每个用户下的 `profile` 文件

### 方向键

方向键的话需要通过安装 `rlwrap` 来支持

`rlwrap` 需要通过 `readline` 库支持

可以采用编译 readline 方式

或者直接安装二进制包

    # Debian
    # apt-get install libreadline5-dev

    # ReadHat
    # yum install readline-devel

#### 编译 readline

如果采用了安装二进制包, 请无视

    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2.tar.gz
    tar zxvf readline-6.2.tar.gz
    cd readline-6.2
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-001
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-001.sig
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-002
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-002.sig
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-003
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-003.sig
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-004
    wget ftp://ftp.gnu.org/gnu/readline/readline-6.2-patches/readline62-004.sig
    patch -p0 < readline62-001
    patch -p0 < readline62-002
    patch -p0 < readline62-003
    patch -p0 < readline62-004
    ./configure
    make
    make install

安装了二进制包后直接安装 rlwrap

    wget http://utopia.knoware.nl/~hlub/uck/rlwrap/rlwrap-0.37.tar.gz
    tar zxvf rlwrap-0.37.tar.gz
    cd rlwrap-0.37
    ./configure
    make
    make install

安装完毕后. 直接在需要`repl`前加上`rlwrap`执行就行了

例如:

进入 sbcl repl

    rlwrap sbcl

还可以采用 设置别名的方式注册到 `profile`

    alias sbcl='rlwrap sbcl'
