---
layout: post
title: 在github上搭建博客
category: javascript
tags: [github, bootstrap, jekyll, javascript]
---

##注册github帐号
在github上注册帐号, 如果你的帐号为`heroin`
创建`heroin.github.com`这个项目.


##安装jekyll
安装`jekyll`到github上, 这里我用的是
[Jekyll-Bootstrap](http://jekyllbootstrap.com/)

执行以下命令

    # git clone https://github.com/plusjade/jekyll-bootstrap.git heroin.github.com
    # cd heroin.github.com
    # git remote set-url origin git@github.com:heroin/heroin.github.com.git
    # git push origin master

然后直接访问[http://heroin.github.com](http://heroin.github.com), 就能访问到你搭建的博客了.


##配置jekyll

修改`_config.yml`文件

将一些基础信息配置成想要的内容

####配置首页
jekyllbootstrap默认的首页是`index.md`

但是如果需要分页效果的话需要使用的是`index.html`, 并且修改`_config.yml`, 添加一个配置项`paginate: 5`

详细的配置可以clone我的博客进行看[https://github.com/heroin/heroin.github.com](https://github.com/heroin/heroin.github.com)

##添加文章
在`_posts`目录下新建一个`markdown`(`*.md`)文件,
文件命名规范是`yyyy-mm-dd-url`, 例如该文章的文件为`2012-05-18-github-blog-jekyll-bootstrap.md`

得到的访问路径却是
[/javascript/2012/05/18/github-blog-jekyll-bootstrap/](/javascript/2012/05/18/github-blog-jekyll-bootstrap/)  
其中`/javascript`是在markdown文件中配置的.

markdown文件头需要几个配置, 以下是该文章的头配置

<pre class="prettyprint linenums">
---
layout: post
title: 在github上搭建博客
category: javascript
tags: [github, bootstrap, jekyll, javascript]
---
</pre>

每个markdown必须在头部加上这段. 然后下面直接写markdown代码就行了.

##配置域名
> 新建一个`CNAME`文件, 里面直接写上所配置的域名, 例如`heroin.so`

然后上域名提供商上配置域名解析, `A`记录到`207.97.227.245`

等待域名解析完毕即可, 直接访问`http://heroin.github.com` 会跳转至 `http://heroin.so`
