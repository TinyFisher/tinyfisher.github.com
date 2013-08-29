---
layout: post
title: 简洁的Bash编程技巧
category: linux
tags: [linux, bash, shell]
keywords: linux,bash,shell
description: 简洁的Bash编程技巧
---

##1. 检查命令执行是否成功

第一种写法, 比较常见

    echo abcdee | grep -q abcd
     
    if [ $? -eq 0 ]; then
        echo "Found"
    else
        echo "Not found"
    fi

简洁的写法

    if echo abcdee | grep -q abc; then
        echo "Found"
    else
        echo "Not found"
    fi

当然你也可以不要if/else, 不过这样可读性比较差

    [Sun Nov 04 05:58 AM] [kodango@devops] ~/workspace 
    $ echo abcdee | grep -q abc && echo "Found" || echo "Not found"
    Found

##2. 将标准输出与标准错误输出重定向到/dev/null

第一种写法, 比较常见

    grep "abc" test.txt 1>/dev/null 2>&1

常见的错误写法

    grep "abc" test.txt 2>&1 1>/dev/null

简洁的写法

    grep "abc" test.txt &> /dev/null

##3. awk的使用

举一个实际的例子, 获取Xen DomU的id

常见的写法

    sudo xm li | grep vm_name | awk '{print $2}'

简洁的写法

    sudo xm li | awk '/vm_name/{print $2}'

##4. 将一个文本的所有行用逗号连接起来

假设文件内容如下所示

    [Sat Nov 03 10:04 PM] [kodango@devops] ~/workspace 
    $ cat /tmp/test.txt 
    1
    2
    3

使用Sed命令

    [Sat Nov 03 10:14 PM] [kodango@devops] ~/workspace 
    $ sed ':a;$!N;s/\n/,/;ta' /tmp/test.txt 
    1,2,3

简洁的写法

    [Sat Nov 03 10:04 PM] [kodango@devops] ~/workspace 
    $ paste -sd, /tmp/test.txt 
    1,2,3

##5. 过滤重复行

假设文件内容如下所示

    [Sat Nov 03 10:16 PM] [kodango@devops] ~/workspace 
    $ sort /tmp/test.txt 
    1
    1
    2
    3

常用的方法

    [Sat Nov 03 10:16 PM] [kodango@devops] ~/workspace 
    $ sort /tmp/test.txt | uniq
    1
    2
    3

简单的写法

    [Sat Nov 03 10:16 PM] [kodango@devops] ~/workspace 
    $ sort /tmp/test.txt -u
    1
    2
    3

##6. grep查找单词

假设一个文本的每一行是一个ip地址, 例如

    [Sat Nov 03 10:20 PM] [kodango@devops] ~/workspace 
    $ cat /tmp/ip.list 
    10.0.0.1
    10.0.0.12
    10.0.0.123

使用grep查找是否包括10.0.0.1这个ip地址. 常见的写法

    [Sat Nov 03 10:22 PM] [kodango@devops] ~/workspace 
    $ grep '10.0.0.1\>' /tmp/ip.list 
    10.0.0.1

简单的方法(其实这方法不见得简单, 只是为了说明-w这个参数还是很有用的)

    [Sat Nov 03 10:23 PM] [kodango@devops] ~/workspace 
    $ grep -w '10.0.0.1' /tmp/ip.list 
    10.0.0.1

顺便grep的`-n/-H/-v/-f/-c`这几参数都很有用

##7. 临时设置环境变量

常见的写法

    [Sat Nov 03 10:26 PM] [kodango@devops] ~/workspace 
    $ export LC_ALL=zh_CN.UTF-8 
     
    [六 11月 03 10:26 下午] [kodango@devops] ~/workspace 
    $ date
    2012年 11月 03日 星期六 22:26:55 CST

简洁的写法

    [六 11月 03 10:26 下午] [kodango@devops] ~/workspace 
    $ unset LC_ALL
 
    [Sat Nov 03 10:27 PM] [kodango@devops] ~/workspace 
    $ LC_ALL=zh_CN.UTF-8 date 
    2012年 11月 03日 星期六 22:27:43 CST

在命令之前加上环境变更的设置, 只是临时改变当前执行命令的环境. 

##8. $1,$2...等位置参数的使用

假设只想使用$2,$3..这几个参数, 常见的做法是:

    shift
    echo "$@"

为什么不这样写呢? 

    echo "${@:2}"

##9. 退而求其次的写法

相信大家会有这种需求, 当一个参数值没有提供时, 可以使用默认值. 常见的写法是

    arg=$1
     
    if [ -z "$arg" ]; then
       arg=0
    fi

简洁的写法是这样的

    arg=${1:-0}

##10. bash特殊参数--的用法

假设要用grep查找字符串中是否包含-i, 我们会这样尝试

    [Sat Nov 03 10:45 PM] [kodango@devops] ~/workspace 
    $ echo 'abc-i' | grep "-i"
    Usage: grep [OPTION]... PATTERN [FILE]...
    Try 'grep --help' for more information.
     
    [Sat Nov 03 10:45 PM] [kodango@devops] ~/workspace 
    $ echo 'abc-i' | grep "\-i"
    abc-i

简洁的方法是

    [Sat Nov 03 10:45 PM] [kodango@devops] ~/workspace 
    $ echo 'abc-i' | grep -- -i
    abc-i

bash中--后面的参数不会被当作选项解析. 

##11. 函数的返回值默认是最后一行语句的返回值

    # Check whether an item is a function
    # $1: the function name
    # Return: 0(yes) or 1(no)
    function is_function()
    {
        local func_name=$1
        test "`type -t $1 2>/dev/null`" = "function"
    }

不要画蛇添足再在后面加一行`return $?`了. 

##12. 将printf格式化的结果赋值给变量

例如将数字转换成其十六进制形式, 常见的写法是

    [Sat Nov 03 10:55 PM] [kodango@devops] ~/workspace 
    $ var=$(printf '%%%02x' 111)

简单的写法是

    [Sat Nov 03 10:54 PM] [kodango@devops] ~/workspace 
    $ printf -v var '%%%02x' 111

看看printf的help

    [Sat Nov 03 10:53 PM] [kodango@devops] ~/workspace 
    $ help printf | grep -A 1 -B 1 -- -v
    printf: printf [-v var] format [arguments]
        Formats and prints ARGUMENTS under control of the FORMAT.
    --
        Options:
          -v var    assign the output to shell variable VAR rather than
                display it on the standard output

##13. 打印文件行

打印文件的第一行

    head -1 test.txt

打印文件的第2行

    sed -n '2p' test.txt

打印文件的第2到5行

    sed -n '2,5p' test.txt

打印文件的第2行始(包括第2行在内) 5行的内容

    sed -n '2,+4p' test.txt

打印倒数第二行

    $ tail -2 test.txt | head -1
    $ tac test.txt | sed -n '2p'

##14. 善用let或者(())命令做算术运算

如何对一个数字做++运算, 可能你会这样用

    a=1
    a=`expr a + 1`

为何不用你熟悉的

    a=1
    let a++
    let a+=2

##15. 获取软连接指定的真实文件名

如果你不知道, 你可能会这样获取

    [Sat Nov 03 11:12 PM] [kodango@devops] ~/workspace 
    $ ls -l /usr/bin/python | awk -F'->' '{print $2}' | tr -d ' '
    /usr/bin/python2

如果你知道有一个叫readlink的命令, 那么

    [Sat Nov 03 11:13 PM] [kodango@devops] ~/workspace 
    $ readlink /usr/bin/python
    /usr/bin/python2

##16. 获取一个字符的ASCII码

    [Sat Nov 03 11:14 PM] [kodango@devops] ~/workspace 
    $ printf '%02x' "'+"
    2b
    [Sat Nov 03 11:30 PM] [kodango@devops] ~/workspace 
    $ echo -n '+' | od -tx1 -An | tr -d ' '
    2b

##17. 清空一个文件

常见的用法

    echo "" > test.txt

简单的写法

    > test.txt

##18. 不要忘记有here document

下面一段代码

    grep -v 1 /tmp/test.txt | while read line; do
        let a++
        echo --$line--
    done
     
    echo a:$a

执行后有什么问题吗? 

    [Sun Nov 04 05:35 AM] [kodango@devops] ~/workspace 
    $ sh test.sh 
    --2--
    --3--
    a:

发现a这个变量没有被赋值, 为什么呢? 因为管道后面的代码是在在一个子shell中执行的, 所做的任何更改都不会对当前shell有影响, 自然a这个变量就不会有赋值了. 

换一种思路, 可以这样做

    grep -v 1 /tmp/test.txt > /tmp/test.tmp
     
    while read line; do
        let a++
        echo --$line--
    done < /tmp/test.tmp
     
    echo a:$a
    rm -f /tmp/test.tmp

不过多了一个临时文件, 最后还要删除. 这里其实可以用到here document

    while read line2; do
        let b++
        echo ??$line2??
    done << EOF
    `grep -v 1 /tmp/test.txt`
    EOF
     
    echo b: $b

`here document`往往用于需要输出一大段文本的地方, 例如脚本的help函数. 

##19. 删除字符串中的第一个或者最后一个字符

假设字符串为

    [Sun Nov 04 10:21 AM] [kodango@devops] ~/workspace 
    $ str="aremoveb"

可能你第一个想法是通过sed或者其它命令来完成这个功能, 但是其实有很简单的方法

    [Sun Nov 04 10:24 AM] [kodango@devops] ~/workspace 
    $ echo "${str#?}"
    removeb
     
    [Sun Nov 04 10:24 AM] [kodango@devops] ~/workspace 
    $ echo "${str%?}"
    aremove

类似地, 你也可以删除2个、3个、4个...

有没有一次性删除第一个和最后一个字符的方法呢? 答案当然是肯定的

    [Sun Nov 04 10:26 AM] [kodango@devops] ~/workspace 
    $ echo "${str:1:-1}"
    remove

关于这些变量替换的内容在bash的man手册中都有说明. 

##20. 使用逗号join数组元素

假设数组元素没有空格, 可以用这种方法

    [Sun Nov 04 10:14 AM] [kodango@devops] ~/workspace 
    $ a=(1 2 3) 
    $ b="${a[*]}"
     
    [Sun Nov 04 10:15 AM] [kodango@devops] ~/workspace 
    $ echo ${b// /,}
    1,2,3

注意当该数组的长度非常长时, 使用这种替换的时间开销很高, 性能很差, 推荐用sed. 

假设数组元素包含有空格, 可以借用printf命令来达到

    [Sun Nov 04 10:15 AM] [kodango@devops] ~/workspace 
    $ a=(1 "2 3" 4)
    
    [Sun Nov 04 10:15 AM] [kodango@devops] ~/workspace 
    $ printf ",%s" "${a[@]}" | cut -c2-   
    1,2 3,4

##21. Shell中的多进程

在命令行下, 我们会在命令行后面加上&符号来让该命令在后台执行, 在shell脚本中, 使用"(cmd)"可以让fork一个子shell来执行该命令. 利用这两点, 可以实现shell的多线程

    job_num=10
     
    function do_work()
    {
        echo "Do work.."
    }
     
    for ((i=0; i < job_num ;i++)); do
        echo "Fork job $i"
        (do_work) &
    done
     
    wait   # wait for all job done
    echo "All job have been done!"

注意最后的wait命令, 作用是等待所有子进程结束. 

附几则小技巧

    1) sudo iptables -L -n | vim -
    2) grep -v xxx | vim -
    3) echo $'\''
    4) set -- 1 2 3; echo "$@"
    5) 搜索stackoverflow/superuser等站点
    6) VIM编辑远程文件 vim scp://xxx//etc/vimrc
    7) 远程执行脚本 ssh xxx bash < xxx.sh
