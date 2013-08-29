---
layout: post
title: javascript格式化时间
category: javascript
tags: [format, date, prototype, javascript]
---

在公共模块添加以下代码引用

<pre class="prettyprint linenums">
Date.prototype.format = function(format) {

    var o = {
        "M+" :this.getMonth() + 1,
        "d+" :this.getDate(),
        "h+" :this.getHours(),
        "m+" :this.getMinutes(),
        "s+" :this.getSeconds(),
        "q+" :Math.floor((this.getMonth() + 3) / 3),
        "S" :this.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
</pre>

调用的方式如下

<pre class="prettyprint linenums">
var now = new Date().format("yyyy-MM-dd hh:mm:ss");
</pre>
