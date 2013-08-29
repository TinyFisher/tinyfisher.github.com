---
layout: post
title: windows 注册表 修改系统环境变量
category: windows
tags: [windows, regedit, path, system]
keywords: windows,regedit,注册表,环境变量,注册表修改环境变量
description: windows下注册表修改系统环境变量
---

公司电脑加了域之后, 无法直接修改`系统环境变量`, 只能添加`用户环境变量`的形式.

通过在注册表中苦苦寻找, 终于找到了.

`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`

打开里面看到的是和系统环境变量一模一样的, 修改后发现能直接生效.

在`HKEY_LOCAL_MACHINE\SYSTEM\`下, 除了发现有`CurrentControlSet`这个键以外, 还发现另外2个键, `ControlSet001`, `ControlSet002`.

这3个键下面的内容都一样, 当初我是修改`ControlSet001`里面的配置, 当我若干天打开看的时候, 发现`CurrentControlSet`和`ControlSet002`下的系统环境变量都一样了.
