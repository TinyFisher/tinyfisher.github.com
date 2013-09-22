---
layout: post
title: fluentd插件开发
category: linux
tags: [Linux,fluentd,ruby]
keywords: Linux,fluentd,ruby
description: fluentd插件开发
---

fluentd默认支持了一些插件，如apache，但是最近做项目对squid日志进行分析时，发现fluentd没有这个默认插件，需要自己开发，方法如下
自己编写一个ruby脚本，比如:`in_mytail.rb`,将他放到`/etc/td-agent/plugin` 即可  

修改`/etc/td-agent/td-agent.conf`    

	<source>
		type mytail
		path /path/to/myformat_file
		tag myapp.mytail
	<source>  

   
标签里面是日志来源，type表示input插件类型，这里是自己编写的类型，path是源日志文件，tag是标签，用于区分其他插件.  

	<match **>
		type stdout
	</match>  

用于输出，这里输出到stdout，可以是file，mongodb等，看自己需要.
调试模式：
  
	td-agent -vv  
  

ruby脚本如下  

	class MyTailInput < Fluent::TailInput  
	  Fluent::Plugin.register_input('mytail', self)  
	  
	  # Override 'configure_parser(conf)' method.  
	  # You can get config parameters in this method.  
	  def configure_parser(conf)  
	    @time_format = conf['time_format'] || '%Y-%M-%d %H:%M:%S'  
	  end  
	    
	  # Override 'parse_line(line)' method that returns time and record.  
	  # This example method assumes following log format:  
	  #   %Y-%m-%d %H:%M:%S\tkey1\tvalue1\tkey2\tvalue2...  
	  #   %Y-%m-%d %H:%M:%S\tkey1\tvalue1\tkey2\tvalue2...  
	  #   ...  
	  def parse_line(line)  
	    elements = line.split("\t")  
	    time="2012-11-11 11:11:11"  #why unknow  
	    t_time = Time.strptime(time, @time_format).to_i  
	    record = {}  
	    record['logtime']=elements[0]  
	    record['logcontent']=elements[1]  
	    return t_time, record  
	  end  
	end  