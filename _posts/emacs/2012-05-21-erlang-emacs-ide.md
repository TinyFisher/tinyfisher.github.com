---
layout: post
title: erlang配置emacs开发
category: emacs
tags: [erlang, emacs, ide]
codes: [lisp]
keywords: erlang,erlang ide, emacs erlang, emacs 配置 erlang ide
description: emacs配置成erlang开发工具
---

打开emacs配置文件, 输入配置文件

<pre class="prettyprint linenums lang-lisp">
(setq load-path (cons "*erlang安装目录*/lib/tools-*version*/emacs" load-path))
(setq erlang-root-dir "*erlang安装目录*")
(setq exec-path (cons "*erlang安装目录*/bin" exec-path))
(require 'erlang-start)
</pre>

用emacs打开任意一个`*.erl`源文件, 在菜单栏将会看到`Erlang`菜单选项.

打开erlang终端`C-c C-z`

编译文件`C-c C-k`
