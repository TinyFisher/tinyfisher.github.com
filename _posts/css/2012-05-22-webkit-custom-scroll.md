---
layout: post
title: webkit自定义滚动条
category: css
tags: [css, webkit, html, scroll]
codes: [css]
---

webkit支持自定义滚动条, 用图片或者样式的方式

参考: [http://almaer.com/scrollbar/index.html](http://almaer.com/scrollbar/index.html)

参考地址中没有设置html头,  
由于我设置的是`<!DOCTYPE HTML>`使用示例中的`css`会出现滚动条不饱满的状态.  
于是我将滚动条用样式的方式画的, 而不是图片方式展示的, 以下是我修改后的代码.
<pre class="prettyprint linenums lang-css">
::-webkit-scrollbar {
    width: 16px;
    height: 16px;
}
::-webkit-scrollbar-button:start:decrement, ::-webkit-scrollbar-button:end:increment {
    display: block;
}
::-webkit-scrollbar-button:vertical:start:increment,
::-webkit-scrollbar-button:vertical:end:decrement {
    display: none;
}
::-webkit-scrollbar-button:end:increment {
    background-image: url(/assets/themes/images/scroll_cntrl_dwn.png);
}
::-webkit-scrollbar-button:start:decrement {
    background-image: url(/assets/themes/images/scroll_cntrl_up.png);
}
::-webkit-scrollbar-track-piece:vertical:start {
    background-image: url(/assets/themes/images/scroll_gutter_top.png), url(/assets/themes/images/scroll_gutter_mid.png);
    background-repeat: no-repeat, repeat-y;
}
::-webkit-scrollbar-track-piece:vertical:end {
    background-image: url(/assets/themes/images/scroll_gutter_btm.png), url(/assets/themes/images/scroll_gutter_mid.png);
    background-repeat: no-repeat, repeat-y;
    background-position: bottom left, 0 0;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(160, 160, 160, 0.8); 
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); 
}
</pre>
