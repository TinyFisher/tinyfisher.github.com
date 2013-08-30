---
layout: post
title: 使用ip route命令实现多链路负载均衡
category: linux
tags: [Linux，负载均衡，iproute]
keywords: Linux，负载均衡，iproute
description: 使用ip route命令实现多链路负载均衡
---
其实在linux下实现多链路负载均衡很简单，只需借助ip route命令即可。  


环境：`ubuntu 10.04` ，两个3G网卡，分别为`CDMA2000` 和 `WCDMA`  


1.分别将两个网卡拨号上网，方法不再具体描述，拨号成功后会多出两条链路`ppp0`和`ppp1`，注意拨号脚本里不要添加默认网关，（具体请参见[《pppd拨号与默认网关》](http://tinyfisher.github.io/linux/2013/01/29/ppp/)），而是手动添加两条默认路由。  


2.利用`iptables`进行`nat`转换，不再赘述。  


3.此时路由表里会有两条默认路由，其实只有第一个起作用，所有的流量都会从这条链路出去，没有实现负载均衡的效果，只需使用如下命令：  

	ip route replace default equalize nexthop dev ppp0 weight 1 nexthop dev ppp1 weight 1   

其中weight表示权重，根据链路的实际情况设置相应数值。  


4.测试：内网机器进行网络活动，在网关利用命令  
  
	tc -s qdisc ls dev ppp0,tc -s qdisc ls dev ppp1  

分别查看两条链路的流量，发现基本流量是按照1:1的比率的。  


**问题**：内网的机器通过多链路网关访问外网速度比单链路得到提升，但是网关本身访问外网的速度比单链路要慢得多，甚至不能访问网站，原因不详，猜想是http数据包从不同的链路进出，不能很好的拼凑给网关。总之现在这个项目不需要网关访问外网，留待以后再讨论。