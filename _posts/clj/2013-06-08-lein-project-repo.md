---
layout: post
title: lein 设置 repo 地址
category: clojure
codes: [clj]
tags: [clojure, lein]
keywords: clojure, lein, repositories
description: lein 设置 repo 地址
---

### 全局设置

如果配置了`$LEIN_HOME` 那存在 `$LEIN_HOME/profiles.clj`

没有配置的话, 那就是存在 `$HOME/.lein/profiles.clj`

编辑 `profiles.clj`

<pre class="prettyprint linenums lang-clj">
{:user {:repositories {"snapshots" "http://maven.open-ns.org/libs-snapshot/"
                       "central" {:url "http://maven.open-ns.org/libs-release/"
                                  :snapshots false}
                       "clojars" "http://maven.open-ns.org/clojars/"}}}
</pre>

其中地址可以设置成最近的一个地址

设置了`repositories` lein执行的时候会出现一个提示. 不过不碍事

配置了全局配置后, 所有的库都将从该配置的地址里面去获取

### 普通配置

进入项目目录, 编辑 `projuect.clj`

<pre class="prettyprint linenums lang-clj">
(defproject xxxx "1.0.0-SNAPSHOT"
  :repositories {"snapshots" "http://maven.open-ns.org/libs-snapshot/"
                 "central" {:url "http://maven.open-ns.org/libs-release/"
                            :snapshots false}
                 "clojars" "http://maven.open-ns.org/clojars/"})
</pre>

添加 `repositories` 节点即可

