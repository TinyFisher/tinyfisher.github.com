---
layout: post
title: 微型 Python Web 框架 Bottle
category: python
tags: [python, bottle, web]
keywords: web框架,python,bottle
description: Bottle 是一个非常小巧但高效的微型 Python Web 框架, 它被设计为仅仅只有一个文件的Python模块, 并且除Python标准库外, 它不依赖于任何第三方模块.
---

Bottle 是一个非常小巧但高效的微型 Python Web 框架, 它被设计为仅仅只有一个文件的Python模块, 并且除Python标准库外, 它不依赖于任何第三方模块.

- 路由(Routing): 将请求映射到函数, 可以创建十分优雅的 URL
- 模板(Templates): Pythonic 并且快速的 Python 内置模板引擎, 同时还支持 mako, jinja2, cheetah 等第三方模板引擎
- 工具集(Utilites): 快速的读取 form 数据, 上传文件, 访问 cookies, headers 或者其它 HTTP 相关的 metadata
- 服务器(Server): 内置HTTP开发服务器, 并且支持 paste, fapws3, bjoern, Google App Engine, Cherrypy 或者其它任何 WSGI HTTP 服务器

##安装 Bottle

正如上面所说的, Bottle 被设计为仅仅只有一个文件, 我们甚至可以不安装它, 直接将 bottle.py 文件下载并复制到我们的应用中就可以使用了, 这是一个好办法, 但是如果还是想将其安装, 那么我们可以像安装其它的 Python 模块一样: 

    sudo easy_install -U bottle

如果我们直接将 bottle.py 下载到自己的应用中的话, 我们可以建立下面这样的目录结构: 

    + application
    +----bottle.py
    +----app.py

我们可以将下面的创建 Bottle 实例的示例代码复制到 app.py 文件中, 运行该文件即可. 

###示例: Bottle 的 "Hello World" 程序

下面的代码我们创建了一个十分简单但是完整的 Bottle 应用程序(在Python Consle)中

    >>> from bottle import route, run
    >>> @route('/hello/:name')
    ... def index(name = 'World'):
    ...     return '<strong>Hello {}!'.format(name)
    ... 
    >>> run(host='localhost',port=8080)
    Bottle server starting up (using WSGIRefServer())...
    Listening on http://localhost:8080/
    Use Ctrl-C to quit.

在 Python Consle中输入上面的代码, 我们就得到了一个最简单但完整的 Web 应用, 访问: "http://localhost:8080/hello/bottle" 试试. 上面到底发生了什么?

1. 首先, 我们导入了两个 Bottle 的组件,  route() Decorator 和 run() 函数
2. route() 可以将一个函数与一个URL进行绑定, 在上面的示例中, route 将 "/hello/:name" 这个URL地址绑定到了 "index(name = 'World')" 这个函数上
3. 这个是一个关联到 "/hello" 的 handler function 或者 callback , 任何对 "/hello" 这个URL的请求都将被递交到这个函数中
4. 我们获得请求后, index() 函数返回简单的字符串
5. 最后, run() 函数启动服务器, 并且我们设置它在 "localhost" 和 8080 端口上运行

上面这种方法仅仅只是展示一下下 Bottle 的简单, 我们还可以像下面这样, 创建一个 Bottle 对象 app, 然后我们会将所有的函数都映射到 app 的 URL 地址上, 如上示例我们可以用下面这种办法来实现: 

<pre class="prettyprint linenums">
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from bottle import Bottle, run

app = Bottle()

@app.route('/hello')
def hello():
    return "Hello World!"

run(app, host='localhost', port=8080)
</pre>

Bottle 的这种 URL 地址映射方法与我一直使用的 Flask 的地址映射方法很相似, 到现在为止, 我似乎只看到它们只是语法上面有些话不同. 

##路由器(Request Routing)

Bottle 应用会有一个 URL 路由器, 它将 URL 请求地址绑定到回调函数上, 每请求一些 URL, 其对应的 回调函数就会运行一些, 而回调函数返回值将被发送到浏览器, 你可以在你的应用中通过 route() 函数添加不限数目的路由器. 

<pre class="prettyprint linenums">
from bottle import route

@route('/')
@route('/index.html')
def index():
    return '&lt;a href="/hello"&gt;Go to Hello World Page&lt;/a&gt;'

@route('/hello')
def hello():
    return 'Hello World'
</pre>

就像你看到, 你所发出的访问请求(URL), 应用并没有返回服务器上真实的文件, 而是返回与该URL绑定的函数的返回值, 如果其一个URL没有被绑定到任何回调函数上, 那么 Bottle 将返回"404 Page Not Found"的错误页面

###动态路由(Dynamic Routes)

Bottle 有自己特有的 URL 语法, 这让我们可以很轻松的在 URL 地址中加入通配符, 这样, 一个 route 将可以映射到无数的 URL 上, 这些动态的 路由常常被用来创建一些有规律性的内容页面的地址, 比如博客文章地址"/archive/1234.html"或者"/wiki/Page_Title", 这在上面的示例我已经演示过了, 还记得吗?

<pre class="prettyprint linenums">
@route('/hello/:name')
def hello(name = 'World'):
    return 'Hello {}!'.format(name)
</pre>

上面的路由器, 可以让我们通过"/hello/abc"或者"/hello/heroin"等地址来访问, 而 Bottle 返回的内容将是"Hello abc!" 或者 "Hello heroin!", "/hello/"之后的字符串交被返回来, 默认的通配符将匹配所有下一个"/"出现之前的字符. 我们还可以对通配符进行格式化: 

<pre class="prettyprint linenums">
@route('/object/:id#[0-9]+#')
def view_object(id):
    return 'Object ID: {}'.format(id)
</pre>

上面的路由将只允许 id 为由数字"0-9"组成的数字, 而其它的字符串都将返回 404 错误. 

###HTTP 请求方法(Request Methods)

HTTP 协议为不同的需求定义了许多不同的请求方法, 在 Bottle 中, GET方法将是所有未指明请求访问的路由会默认使用的方法, 这些未指明方法的路由都将只接收 GET 请求, 要处理如 POST, PUT 或者 DELETE 等等的其它请求, 你必须主动地在 route() 函数中添加 method 关键字, 或者使用下面这些 decorators:@get(), @post(), @put(), @delete(). 

POST 方法在经常被用来处理 HTML 的表单数据, 下面的示例演示了一个 登陆表单的处理过程:

<pre class="prettyprint linenums">
from bottle import get, post, request

#@route('/login')
@get('/login')
def login_form():
    return '''&lt;form method = "POST"&gt;
                &lt;input name="name" type="text" /&gt;
                &lt;input name="password" type="password" /&gt;
                &lt;input type="submit" value="Login" /&gt;
                &lt;/form&gt;'''

#@route('/login', method = 'POST')
@post('/login')
def login():
    name = request.forms.get('name')
    password = request.forms.get('password')
    if check_login(name, password):
        return '&lt;p&gt;Your login was correct&lt;/p&gt;'
    else:
        return '&lt;p&gt;Login failed&lt;/p&gt;'
</pre>

在上面的示例中, /login 被绑定到两个不同的回调函数上, 一个处理 GET 请求, 另一个处理 POST 请求, 第一个返我们的登陆表单, 第二个接收登陆表单提交的数据, 并进行处理, 得到结果后, 返回结果. 

###自动回退(Automatic Fallbacks)

特殊的 HEAD 方法, 经常被用来处理一些仅仅只需要返回请求元信息而不需要返回整个请求结果的事务, 这些HEAD方法十分有用, 可以让我们仅仅只获得我们需要的数据, 而不必要返回整个文档, Bottle 可以帮助我们很简单的实现这些功能, 它会将这些请求映射到与URL绑定的回调函数中, 然后自动截取请求需要的数据, 这样一来, 你不再需要定义任何特殊的 HEAD 路由了. 

##静态文件路由(Routing Static Files)

对于静态文件,  Bottle 内置的服务器并不会自动的进行处理, 这需要你自己定义一个路由, 告诉服务器在哪些文件是需要服务的, 并且在哪里可以找到它们, 我们可以写如下面这样的一个路由器:

<pre class="prettyprint linenums">
from bottle import static_file

@route('/static/:filename')
def server_static(filename):
    return static_file(filename, root='/path/to/your/static/files')
</pre>

static_file() 函数是一个安全且方便的用来返回静态文件请求的函数, 上面的示例中, 我们只返回"/path/to/your/static/files" 路径下的文件, 因为 :filename 通配符并不接受任何 "/" 的字符, 如果我们想要"/path/to/your/static/files" 目录的子目录下的文件也被处理, 那么我们可以使用一个格式化的通配符: 

<pre class="prettyprint linenums">
@route('/static/:path#.+#')
def server_static(path):
    return static_file(path, root='/path/to/your/static/files')
</pre>

##错误页面(Error Pages)

如果任何请求的URL没有的到匹配的回调函数, 那么 Bottle 都会返回错误页面, 你可以使用 error() decorator 来抓取 HTTP 状态, 并设置自己的相关回调函数, 比如下面我们的处理404错误的函数: 

<pre class="prettyprint linenums">
@error(404)
def error404(error):
    return '404 error, nothing here, sorry!'
</pre>

这个时候, 404 文件未找到错误将被上面的自定义404错误处理方法代替, 传送给错误处理函数的唯一的一个参数是一个 HTTPError 实例, 它非常将普通的 request, 所以, 你也可以有 request 中读取到, 也可以写入 response 中, 并且返回任何 HTTPError 支持的数据类型. 

##生成内容(Generating Content)

在纯粹的 WSGI中, 你的应用能返回的数据类型是十分有限的, 你必须返回可迭代的字符串, 你能返回字符串是因为字符串是可以迭代的, 但是这导致服务器将你的内容按一字符一字符的传送, 这个时候, Unicode 字符将不允许被返回了, 这是肯定不行的. 

Bottle 则支持了更多的数据类型, 它甚至添加了一个 Content-Length 头信息, 并且自动编码 Unicode 数据, 下面列举了 Bottle 应用中, 你可以返回的数据类型, 并且简单的介绍了一下这些数据类型的数据都是怎么被 Bottle 处理的:

<table class="table table-bordered table-striped">
  <thead>
    <tr><th>数据类型</th><th>介绍</th></tr>
  </thead>
  <tbody>
    <tr><td>字典(Dictionaries)</td><td>Python 内置的字典类型数据将自动被转换为 JSON 字符串, 并且添加 Content-Type 为 ’application/json’ 的头信息返回至浏览器, 这让我们可以很方便的建立基于 JSON 的API</td></tr>
    <tr><td>空字符串, False, None或者任何非真的数据</td><td>Bottle 将为这类数据创建 ContentLength 头文件, 被设置为 0 返回至浏览器</td></tr>
    <tr><td>Unicode 字符串</td><td>Unicode 字符串将自动的按 Content-Type 头文件中定义的编码格式进行编码(默认为UTF8), 接着按普通的字符串进行处理</td></tr>
    <tr><td>字节串(Byte strings)</td><td>Bottle 返回整个字符串(而不是按字节一个一个返回), 同时增加 Content-Length 头文件标示字节串长度</td></tr>
    <tr><td>HTTPError 与 HTTPResponse 实例</td><td>返回这些实例就像抛出异常一样, 对于 HTTPError, 错误将被与相关函数处理</td></tr>
    <tr><td>文件对象</td><td>然后具有 .read() 方法的对象都被看作文件或者类似文件的对象进行处理, 并传送给 WSGI 服务器框架定义 wsgi.file_wrapper 回调函数, 某一些WSGI服务器会使用系统优化的请求方式(Sendfile)来发送文件. </td></tr>
    <tr><td>迭代器与生成品</td><td>你可以在你的回调函数使用 yield 或者 返回一个迭代器, 只要yield的对象是字符串, Unicode 字符串, HTTPError 或者 HTTPResponse 对象就行, 但是不允许使用嵌套的迭代器, 需要注意的是, 当 yield 的值第一次为非空是,  HTTP 的状态 和 头文件将被发送到 浏览器</td></tr>
  </tbody>
</table>

如果你返回一个 str 类子类的实例, 并且带有 read() 方法, 那它还是将按 字符串进行处理, 因为字符串有更高一级的优先处理权. 

###改变默认编码

Bottle 依照 Content-Type 头文件中 charset 参数来对字符串进行编码, 该头文件默认为 text/html; charset=UTF8 , 并且可以被 Response.content_type 属性修改, 或者直接被 Response.charset 属性修改: 

<pre class="prettyprint linenums">
from bottle import response

@route('/iso')
def get_iso():
    response.charset = 'ISO-8859-15'
    return u'This will be sent with ISO-8859-15 encoding.'
@route('/latin9')
def get_latin():
    response.content_type = 'text/html; charset=latin9'
    return u'ISO-8859-15 is also known as latin9.'
</pre>

由于某些罕见的原因, Python 编码的名称可能与 HTTP 编码的名称不一致, 这时你需要做两方法的工作首先设置 Response.content_type 头文件, 然后还需要设置 Response.charset. 

###静态文件

你可以直接返回文件, 但是 Bottle 推荐使用 static_file() 方法, 它会自动的猜测文件的 mime-type, 追加 Last-Modified 头文件, 完全的自定义需要服务的文件路径, 并且能处理错误(比如 404), 并且它还支持 If-Modified-Since 头文件并且可以返回 304 Not Modified 响应, 你还可以使用一个自定义的 mime-type 来重写 mime-type 猜测的值. 

<pre class="prettyprint linenums">
from bottle import static_file

@route('/images/:filename#.*\.png#')
def send_image(filename):
    return static_file(filename, root='/path/to/image/files', mimetype = 'image/png')
@route('/static/:filename')
def send_static(filename):
    return static_file(filename, root='/path/to/static/files')
</pre>

如果你真的需要, 你还可以以异常的形式抛出文件. 

强制下载

绝大多数浏览器在知道下载的文件的MIME类型并且该文件类型被绑定到某一个应用程序时(比如PDF文件), 它们都会自动的打开该文件, 如果你不想这样, 你可以强制的要求浏览器进行下载. 

<pre class="prettyprint linenums">
@route('/download/:filename')
def download(filename):
    return static_file(filename, root='/path/to/static/files', download=filename)
</pre>

###HTTP 错误与重定向

abort() 函数是创建 HTTP 错误页面的快捷方式: 

<pre class="prettyprint linenums">
from bottle import route, abort

@route('/restricted')
def restricted():
    abort(401, 'Sorry, access denied.')
</pre>

要将浏览器请求的地址重定向其它的地址, 你可以向浏览器发送一个 303 see other 响应,  redirect() 可以实现这个功能:

<pre class="prettyprint linenums">
from bottle import redirect

@route('/wrong/url')
def wrong():
    redirect('/right/url')
</pre>

除了 HTTPResponse 或者 HTTPError 异常外, 还会有 500 Internal Server Error 响应. 

###Response 实例

响应的无数据如 HTTP 状态码, 响应头文件, 或者 Cookies 都被保存在一个叫做 response 的对象中, 并传送给浏览器, 你可以直接操作这些无数据或者写一些预定义的 helper 方法来处理它们. 

状态码(Status Code)
HTTP 状态码 控制着浏览器处理方式, 默认为"200 OK", 绝大多数情况下, 你并不需要手工的去设置 Response.status , 但是使用 abort() 函数或者返回一个 HTTPResponse 对象的时候, 因为它们允许存在任何数值的状态码, 为了符合 HTTP 规范, 我们应该手动的为其添加规范的 HTTP 状态码. 

响应头文件(Response Header)
响应的头文件如 Cache-Control 或者 Location 等都是通过 @Response.set_header() 函数定义的, 该函数接受两个参数:一个头文件名称和一个值, 名称部分是区分大小写的:

<pre class="prettyprint linenums">
@route('/wiki/page')
def wiki(page):
    response.set_header('Content-Language', 'en')
    ...
</pre>

绝大多数头文件都仅仅只能定义一次, 但是有一些特别的头文件却可以多次定义, 这个时候我们在第一次定义时使用 Response.set_header() , 但是第二次定义时, 就需要使用 Response.add_header() 了:

<pre class="prettyprint linenums">
response.set_header('Set-Cookie','name=value')
response.add_header('Set-Cookie','name1=value1')
</pre>

###Cookies

你可以使用 Request.get_cookie() 访问已经设置了的 Cookie, 可以使用 Response.set_cookie() 设置 Cookie:

<pre class="prettyprint linenums">
@route('/hello')
def hello_again(self):
    if request.get_cookie('visited'):
        return 'Welcome back! Nice to see you again'
    else:
        response.set_cookie('visited','yes')
        return 'Hello there! Nico to meet you!'
</pre>

Response.set_cookie() 方法接受一些特殊的参数, 用来控制 Cookie 的生命周期或者行为, 最常见的一些参数如下:

- max_age : 该 Cookie 最大的生命期(按秒计算, 默认为 None)
- expires : 上个 datetime 对象或者一个 UNIX timestamp(默认为 None)
- domain : 允许访问该 Cookie 的域名(默认为当前应用的域名)
- path : 按照路径限制当前 Cookie(默认为 "/")
- secure : 限制当前Cookie仅仅允许通过 HTTPS 连接访问(默认为 off)
- httponly : 阻止浏览器端 Javascript 读取当前 Cookie(默认为 off, 需要 Python 2.6 以上)

如果 expires 或者 max_age 都没有设置的放在,  Cookie 将在浏览器的会话结束后或者当浏览器关闭时失效, 这里还有一些问题是你在使用 Cookie 时需要考虑到的: 

- 大多数浏览器都限制 Cookie 的大小不能超过 4Kb
- 有一些用户设置了他们的浏览器不接受任何 Cookie, 绝大多数搜索引擎也直接忽略 Cookie, 你应该保证你的应用在没有 Cookie 时也是可用的
- Cookie 保存在客户端, 并且没有任何加密措施, 你存放在 Cookie 中的任何内容, 用户都是可访问的, 如果有必要的话, 攻击者能通过 XSS 漏洞窃取用户的 Cookie, 所以, 尽可能在不要在 Cookie 中保存机密信息
- Cookie 是很容易被伪造的, 所以, 尽可能不要想信 Cookie

就像上面看到的, Cookie 太容易被恶意软件盗取, 所以 Bottle 为 Cookie 提供的加密方法, 你所需要做的仅仅只是提供了一个密钥, 只要能确保该密钥的安全即可, 而其导致的结果是, 对于未加密的 Cookie, `Request.get_cookie()` 将返回 None. 

<pre class="prettyprint linenums">
@route('/login')
def login():
    username = request.forms.get('username')
    password = request.forms.get('password')
    if check_user_credentials(username, password):
        response.set_cookie('account', username, secret='some-sceret-key')
        return 'Welcome {}'.format(username)

@route('/restricted')
def restricted_area(self):
    username = request.get_cookie('account', secret='some-secret-key')
    if username:
        return 'Hello {}'.format(username)
    else:
        return 'You are not logged in.'
</pre>

另外, Bottle 会自动 pickle 与 unpickle 你存储到已签名的 Cookie 上的数据, 这表示你可以向 Cookie 中存储任何可以 pickle 的数据对象, 只要其大小不超过 4Kb即可. 

####访问请求数据(Accessing Request Data)

Bottle 的全局对象 request 提供了对 HTTP相关的无数据如 Cookies, Headers, 或者 POST 表单数据的访问, 该对象在任何时候都保存着当前请求的数据, 只要其在一个路由的回调函数中访问即可, 它甚至还可以在多线程环境中工作. 

###HTTP 头文件

头文件信息都保存在 Request.header 中, 其成员是一个键区分大小写的 HeaderDict 实例: 

<pre class="prettyprint linenums">
from bottle import route, request

@route('js_ajax')
def is_ajax():
    if request.header.get('X-Requested-With') == 'XMLHttpRequest':
        return 'This is an AJAX request'
    else:
        return 'This is a normal request'
</pre>

###Cookies

Cookie 已一个普通的 dictionary 形式保存在 Request.COOKIES 对象中,  Request.get_cookie()@ 方法可以对签名的 Cookie 进行访问, 下面示例展示了一个基于 Cookie 的访问计数器: 

<pre class="prettyprint linenums">
from bottle import route, request, response

@route('/counter')
def counter():
    count = int( request.COOKIES.get('counter', '0'))
    count += 1
    response.set_cookie('counter',str(count))
    return 'You visited this page {} times'.format(count)
</pre>

###查询字符串(Query Strings)

查询字符串常常被用来传递一些小数目的键值对参数到服务器, 你可以使用 Request.GET 字典对其进行访问, 使用 Request.query_string 来获得整个字符串: 

<pre class="prettyprint linenums">
from bottle import route, request, response

@route('/forum')
def display_forum():
    forum_id = request.GET.get('id')
    page = request.GET.get('page','1')
    return 'Forum ID: {} ( Page: {} )'.format(forum_id, page)
</pre>

###POST 表单数据与文件上传

POST 与 PUT 请求中,  request 可以包含各种编码方式的数据, 使用 Request.forms 对象可以访问普通的 POST 表单数据, 文件上传时提交的数据被单独以 cgi.FieldStorage 实例的形式存储在 Request.files 中, 而 Request.body 按原始数据的方式保存有一个文件对象的数据. 

下面是一个文件上传的示例: 

<pre class="prettyprint linenums">
&lt;form action"/upload" method="post" enctype="multipart/form-data"&gt;
  &lt;input type="text" name="name" /&gt;
  &lt;input type="file" name="data" /&gt;
  &lt;input type="submit" value="Upload" /&gt;
&lt;/form&gt;
</pre>

Bottle 代码

<pre class="prettyprint linenums">
from bottle import route, request

@route('/upload', method = 'POST')
def do_upload():
    name = request.forms.get('name')
    data = request.files.get('data')
    if name and data.file:
        raw = data.file.read() #当文件很大时, 这个操作将十分危险
        filename = data.filename
        return "Hello {}! You uploaded {} ({} bytes).".format(name, filename, len(raw))
    return "You missed a field"
</pre>

###WSGI 环境

Request 对象将 WSGI 环境数据都以 dictionary 等式保存在 Request.environ 中, 允许你像访问字典数据一样访问其值: 

<pre class="prettyprint linenums">
route('/my_ip')
def show_ip():
    ip = request.environ.get('REMOTE_ADDR')
    # 或者 ip = request.get('REMOTE_ADDR')
    # 或者 ip = request['REMOTE_ADDR']
    return 'Your IP is : {}'.format(ip)
</pre>

##模板(Templates)

Bottle 内置了一个快速且强大的模板引擎, 叫作: \*SimpleTemplate Engine\* , 你可以使用 template() 函数 或者 view() decorator 来编译一个模板, 你所要作的仅仅只是提供该模板, 以及要传送给模板的数据, 下面是一个模板的简单示例: 

<pre class="prettyprint linenums">
@route('/hello')
@route('/hello/:name'):
def hello(name = 'World')
    return template('hello', name = name)
</pre>

上面的代码将载入 hello.tpl , 然后将 name 传送给该模板, 并编译它, 再将结果返回给浏览器,  Bottle 将在 `./views/` 或者 `bottle.TEMPLATE_PATH` 设置的路径中搜索模板文件.

view() decorator 允许你返回一组需要传送给模板的数据字典即可, 而不需要再重新传送模板名称: 

###模板语法

模板语法是非常精巧的, 其工作原理基本可以说成是: 将模板文件中的代码进行正确的缩进处理, 以至你不再需要担心块缩进问题: 

<pre class="prettyprint linenums">
%if name == 'World':
    &lt;h1&gt; Hello {{name}} &lt;/h1&gt;
    &lt;p&gt; This is a test.&lt;/p&gt;
%else:
    &lt;h1&gt;Hello {{name.title()}}&lt;/h1&gt;
    &lt;p&gt;How are you?&lt;/p&gt;
%end
</pre>

###缓存

模板被编译之后会缓存至内存中, 你可以使用 bottle.TEMPLATES.clear() 去手工清除它们. 

##插件(Plugins)

这是 Bottle 0.9 版本才有的新功能, 插件可以提供 Bottle 核心同有提供的功能集, 在"可用的 Bottle 插件列表": [http://bottlepy.org/docs/dev/plugins/index.html](http://bottlepy.org/docs/dev/plugins/index.html) 中你可以找到现在可用的插件, 你还可以开发自己的 Bottle 插件, 比如 sqlite 插件, 可以让你可以使用 db 来访问一个到SQLite 数据的链接:

<pre class="prettyprint linenums">
from bottle import route, install, template
from bottle_sqlite import SQLitePlugin

install(SQLitePlugin(dbfile='/tmp/test.db'))
</pre>

<pre class="prettyprint linenums">
@route('/show/:post_id')
def show(db, post_id):
    c = db.execute('SELECT title, content FROM posts WHERE id = ?', (int(post_id)))
    row = c.fetchone() 
    return template('show_post', title=row['title'], text=row['content'])

@route('/contact')
def contact_page():
    '''该回调函数不需要任何数据库连接, 因为没有 db 关键字, 所以 SQLite插件将完全忽略该回调函数'''
    return template('contact')
</pre>

###在整个应用中安装插件

插件可以被安装到整个应用中, 或者仅仅只针对某几个路由安装, 绝大多数插件都被安装到整个应用中, 以为所有路由服务. 要安装一个插件, 只需要将插件的名称作为第一个参数传递给 install() 函数即可: 

<pre class="prettyprint linenums">
from bottle_sqlite import SQLitePlugin

install(SQLitePlugin(dbfile='/tmp/test.db'))
</pre>

###卸载已安装的插件

你可以使用名称, 类或者对象来卸载一个已经安装的插件

<pre class="prettyprint linenums">
sqlite_plugin = SQLitePlugin(dbfile='/tmp/test.db')
install(sqlite_plugin)
uninstall(sqlite_plugin) #卸载特定的插件
uninstall(SQLitePlugin) #卸载该类的所的实例
uninstall('sqlite') # 卸载所有具有该名称的插件
uninstall(True) # 一次性卸载所有已安装的插件
</pre>

插件可以在任何时间安装与卸载, 甚至是处理某个请求的回调函数中, 每一次已经安装的插件树更新时, 路由缓存都会跟着更新. 

###与路由绑定的插件安装

route() 的 apply 参数可以指定某个回调函数要安装的插件: 

<pre class="prettyprint linenums">
sqlite_plugin = SQLitePlugin(dbfile='/tmp/test.db')

@route('/create', apply=[sqlite_plugin])
def create(db):
    db.execute('INSERT INTO ….')
</pre>

###插件黑名单

如果可以使用 route() 方法中的 skip 参数指定插件黑名单, 如下: 

<pre class="prettyprint linenums">
sqlite_plugin = SQLitePlugin(dbfile='/tmp/test.db')
install sqlite_plugin)

@route('/open/:db', skip=[sqlite_plugin])
def open_db(db):
    if db in ['test','test2']:
        sqlite_plugin.dbfile = '/tmp/{}.db'.format(db)
        return 'Database File Switched to : /tmp/{}.db'.format(db)
    abort(404, 'No such database')
</pre>

###插件与子应用

大多数插件都被安装到需要它的具体的应用中, 所以, 它们不应该影响注册给Bottle 应用的子应用: 

<pre class="prettyprint linenums">
root = Bottle()
root.mount(apps.blog, '/blog')
@route.route('/contact', template='contact')
def contact():
    return {'email':'contact@example.com')
root.install(plugins.WTForms())
</pre>

上面的示例代码中, 不管我们什么时候 mount 一个子应用到主应用上, 主应用都会为子应用设定一个代理, 所以上面的 WTForms 插件将只会影响到 '/contact' 路径, 但是不会影响到 '/blog' 子应用的所有URL, 但是这处理方式可以使用下面的方法覆盖: 

<pre class="prettyprint linenums">
route.mount(apps.blog, '/blog', skip=None)
</pre>

##开发(Development)

上面已经介绍了一些基本的关于 Bottle 的知识, 如果你现在想使用 Bottle 开发自己的应用, 那么下面这些技巧对于你的项目来说可能很有帮助: 

###默认应用

Bottle 维护着一份 Bottle 实例的栈, 而 route() 其实是对 Bottle.route() 的快捷访问, 以这种方法产生的路由都属于默认应用: 

<pre class="prettyprint linenums">
@route('/')
def hello():
    return 'Hello World'
</pre>

对于小应用来说, 这已经足够了, 但是随着应用的不断增大, 这种方法显然不容易维护, 所以我们可以使用子应用, 将整个项目的功能细分: 

<pre class="prettyprint linenums">
blog = Bottle()
@blog.route('/')
def index():
    return 'This is blog Index page'
</pre>

将应用分离之后, 程序的维护性提高了很多, 而且可重用性也提高很多, 其它的开发人员就可以放心的从你的模块中导入应用程序对象, 并使用 Bottle.mount() 将你的应用与他们的应用整全到一起. 另外一种替代方法, 你可以使用 应用栈 , 这让你可以在所有子应用中都使用默认的 route 方法: 

<pre class="prettyprint linenums">
default_app.push()

@route('/')
def hello():
    return 'Hello World'
app = default_app.pop()
</pre>

app() 与 default_app() 都是 AppStack 的实例, 并且实现的类 Stack的API, 你可以 Push 或者 Pop应用到这个 stack 中. 

###Debug 模式

在开发的前期, Debug 模式将非常有助于你的开发: 

<pre class="prettyprint linenums">
bottle.debug(True)
</pre>

在这种模式下, Bottle 可以提供更多的 debugging 信息, 即使程序出现一个错误, 它同时还关闭了一些优化功能, 添加了一些配置的检测功能, 下面是该模式不完整的功能列表: 

- 默认错误页面将返回一个对该错误的跟踪
- 模板不会被缓存
- 插件将立即被安装

###自动重载

在开发的过程, 你可能需要经常修改你的代码, 又经常需要重启你的服务器以更新这些修改, Bottle 提供了一个自动重载的工具, 这使得你对任何一个应用中的文件的修改都会被及时的更新到运行中的应用中: 

<pre class="prettyprint linenums">
from bottle import run

run(reloader=True)
</pre>

reloader 是这么工作的:  主进程并不会启动服务器, 但是它会按照同样的参数创建一个子进程, 这使得所有模块级的代码都会被运行两次. 子进程的运行环境中会有一个叫作 os.environ['BOTTLE_CHILD'] = True 的参数, 当任何一个已经加载的模块有修改时, 子进程会被停止, 然后由主进程重新开启新的子进程, 对模板的修改将不会引发一次重载. 

重载是基于是否可以关闭子进程的, 如果你运行在 Windows 或者任何其它不支持 signal.SIGINT 的操作系统上时, @signal.SIGTERM@ 被用来终止子进程. 

##部属(Deployment)

Bottle 默认是运行在内置的 wsgiref WSGIServer上的, 该无线程服务器对于开发来说再好不过了, 但是对于日渐壮大的应用或者对于实际部属来说, 并不是最好的选择. 

###多线程服务器

提高效率的最快速的办法, 就是将应用部属到一个多线程的服务器或者类似 Asynchronous WSGI 的服务器上, 比如 paste 或者 cherrypy , 并且告诉 Bottle 以这些服务器启动, 而不是自己内置的服务器. 

<pre class="prettyprint linenums">
bottle.run(server='paste')
</pre>

Bottle 支持很多服务器, 下面列举的并不是所有的: 

<table class="table table-bordered table-striped">
  <thead>
    <tr><th>名称</th><th>主页</th><th>介绍</th></tr>
  </thead>
  <tbody>
    <tr><td>cgi</td><td>&nbsp;</td><td>以CGI脚本运行</td></tr>
    <tr><td>flup</td><td><a href="http://trac.saddi.com/flup" target="_blank">http://trac.saddi.com/flup</a></td><td>以 FastCGI 进程运行</td></tr>
    <tr><td>gae</td><td><a href="http://code.google.com/appengine/docs/python/overview.html" target="_blank">http://code.google.com/appengine/docs/python/overview.html</a></td><td>Google App Engine 部属</td></tr>
    <tr><td>wsgiref</td><td><a href="http://docs.python.org/library/wsgiref.html" target="_blank">http://docs.python.org/library/wsgiref.html</a></td><td>默认为单线程的服务器</td></tr>
    <tr><td>cherrypy</td><td><a href="http://www.cherrypy.org/" target="_blank">http://www.cherrypy.org/</a></td><td>多线程服务器</td></tr>
    <tr><td>paste</td><td><a href="http://pythonpaste.org/" target="_blank">http://pythonpaste.org/</a></td><td>多线程服务器</td></tr>
    <tr><td>rocket</td><td><a href="http://pypi.python.org/pypi/rocket" target="_blank">http://pypi.python.org/pypi/rocket</a></td><td>多线程服务器</td></tr>
    <tr><td>gunicorn</td><td><a href="http://pypi.python.org/pypi/gunicorn" target="_blank">http://pypi.python.org/pypi/gunicorn</a></td><td>部分用 C 编写</td></tr>
    <tr><td>fapws3</td><td><a href="http://www.fapws.org/" target="_blank">http://www.fapws.org/</a></td><td>Asynchronous, 基于C 开发</td></tr>
    <tr><td>tornado</td><td><a href="http://www.tornadoweb.org/" target="_blank">http://www.tornadoweb.org/</a></td><td>Asynchronous, 服务了部分 FaceBook 的服务</td></tr>
    <tr><td>twisted</td><td><a href="http://twistedmatrix.com/" target="_blank">http://twistedmatrix.com/</a></td><td>Asynchronous</td></tr>
    <tr><td>diesel</td><td><a href="http://dieselweb.org/" target="_blank">http://dieselweb.org/</a></td><td>Asynchronous, 基于 Greenlet</td></tr>
    <tr><td>meinheld</td><td><a href="http://pypi.python.org/pypi/meinheld" target="_blank">http://pypi.python.org/pypi/meinheld</a></td><td>Asynchronous, 部分基于 C 开发</td></tr>
    <tr><td>bjoern</td><td><a href="http://pypi.python.org/pypi/bjoern" target="_blank">http://pypi.python.org/pypi/bjoern</a></td><td>Asynchronous, 非常快, 基于C开发</td></tr>
    <tr><td>auto</td><td>&nbsp;</td><td>自动选择一个可用的 服务器</td></tr>
  </tbody>
</table>

完整的服务器名称可使用 server_names 变量获得, 如果 Bottle 还没有提供你最喜欢的服务器, 那你可以手工的使用你的服务器启动它: 

<pre class="prettyprint linenums">
from paste import httpserver

httpserver.serve(bottle.default_app(), host='0.0.0.0', port = 80)
</pre>

###多服务器进程

一个 Python 进程只能使用到一个 CPU, 即时服务器硬件有多个CPU, 你可以在不同的端口中启动多个应用, 每一个应用使用一个 CPU, 然后使用分流服务器对访问进行分流, 比如 Apache mod_wsgi 或者 Nginx 等都可以作为前端分流服务器. 
