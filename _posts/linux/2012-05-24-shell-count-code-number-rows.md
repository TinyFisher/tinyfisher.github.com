---
layout: post
title: 统计代码行数脚本
category: linux
tags: [shell, linux, script, sed]
keywords: linux,shell,script,sed,代码,行数,代码量
description: linux统计代码行数
---

执行以下代码

<pre class="prettyprint linenums">
find . -name '*.java' -type f -exec cat {} \; | sed '/^$/d;/^[ ]*$/d;/.*#$/d' | wc -l
</pre>

其中`'*.java'`可以换成其他语言的扩展名
