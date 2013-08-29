---
layout: post
title: Adobe Brackets 安装体验
category: ide
tags: [adobe, brackets, ide, javascript, html, css]
---

Brackets 是 Adobe 的开源 `HTML/CSS/JavaScript` 集成开发环境. Brackets 提供 Windows 和 OS X 平台支持.

要想试用先`clone`以下几个项目

[https://github.com/adobe/brackets](https://github.com/adobe/brackets)  
brackets 执行文件(`win/mac`)  
[https://github.com/adobe/brackets-app](https://github.com/adobe/brackets-app)  

brackets 所依赖的js库  
[https://github.com/jblas/path-utils](https://github.com/jblas/path-utils)  
[https://github.com/adobe/CodeMirror2](https://github.com/adobe/CodeMirror2)  
[https://github.com/laktek/jQuery-Smart-Auto-Complete](https://github.com/laktek/jQuery-Smart-Auto-Complete)  
[https://github.com/douglascrockford/JSLint](https://github.com/douglascrockford/JSLinthttps://github.com/laktek/jQuery-Smart-Auto-Complete)

    # git clone git://github.com/adobe/brackets.git
    # git clone git://github.com/adobe/brackets-app.git

    # git clone git://github.com/jblas/path-utils.git
    # git clone git://github.com/adobe/CodeMirror2.git
    # git clone git://github.com/douglascrockford/JSLint.git
    # git clone git://github.com/laktek/jQuery-Smart-Auto-Complete.git

![](/assets/blog/adobe-brackets-install/dir.png)

####安装步骤
> 将`brackets`内全部文件移动到`brackets-app/brackets`  
> 将`CodeMirror2`内全部文件移动到`brackets-app/brackets/src/thirdparty/CodeMirror2`  
> 将`path-utils`内全部文件移动到`brackets-app/brackets/src/thirdparty/path-utils`  
> 将`jQuery-Smart-Auto-Complete`内全部文件移动到`brackets-app/brackets/src/thirdparty/smart-auto-complete`  
> 将`JSLint`内全部文件移动到`brackets-app/brackets/src/thirdparty/jslint`  

    # cp -R brackets/* brackets-app/brackets/
    # cp -R CodeMirror2/* brackets-app/brackets/src/thirdparty/CodeMirror2/
    # cp -R jQuery-Smart-Auto-Complete/* brackets-app/brackets/src/thirdparty/smart-auto-complete/
    # cp -R JSLint/* brackets-app/brackets/src/thirdparty/jslint/
    # cp -R path-utils/* brackets-app/brackets/src/thirdparty/path-utils/

移动完后直接运行`brackets-app/win/bin/Brackets.exe`即可打开, 效果图如下:  
![](/assets/blog/adobe-brackets-install/show.png)

####精简步骤
*windows测试没问题, 应该也兼容于mac*  
在原有安装好的基础下, 将`brackets-app/bin/win`下全部文件, 复制到`brackets-app/brackets/bin`目录下.  
然后将`brackets-app/brackets`目录单独拷贝出来, 直接打开`brackets/bin/Brackets.exe`即可运行.

    # mkdir brackets-app/brackets/bin
    # cp -R brackets-app/bin/win/* brackets-app/brackets/bin/
