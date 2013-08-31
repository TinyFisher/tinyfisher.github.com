---
layout: post
title: Mongodb 学习整理之安装
category: linux
tags: [Linux,MongoDB]
keywords: Linux,MongoDB
description: Mongodb 学习整理之安装
---

###下载  
下载MongoDB，此处下载的版本是：[mongodb-linux-i686-1.8.1.tgz.tar](http://fastdl.mongodb.org/linux/mongodb-linux-i686-1.8.1.tgz)  

###安装  

**step1：**解压文件到某目录下,然后重命名：
  
	[root@localhost src]# tar -xzvf mongodb-linux-i686-1.8.1.tgz.tar    
	[root@localhost src]# mv mongodb-linux-i686-1.8.1 /usr/local/mongodb/  

**step2：**查看安装后的文件情况：  

	[root@localhost src]# cd /usr/local/mongodb/   
	[root@localhost mongodb]# ls   
	bin  GNU-AGPL-3.0  README  THIRD-PARTY-NOTICES   
	[root@localhost mongodb]# cd bin/   
	[root@localhost bin]# ls   
	bsondump  dbbak  mongo  mongod  mongodump  mongoexport  mongofiles  mongoimport  mongorestore mongos  mongosniff  mongostat    

bin下的mongod就是MongoDB的服务端进程，mongo就是其客户端，其它的命令用于MongoDB的其它用途如MongoDB文件导出等。  

**step3:**启动MongoDB:  

要先建立好MongoDB 存放数据文件和日志文件的目录，需要手动建立： 
 
	mkdir /data/mongodb_data
	mkdir /data/mongodb_log
	touch /data/mongodb_log/mongodb.log
	[root@localhost etc]# cd /data/   
	[root@localhost data]# ls   
	mongodb_data  mongodb_log    

在MongoDB安装目录下的bin下使用mongod启动MongoDB  

	./mongod --dbpath=/data/mongodb_data/ --logpath=/data/mongodb_log/mongodb.log --logappend&  

等待启动成功后，可查看是否启动成功了，默认端口号是27017，当然在启动时也可以指定未使用的其它端口。先通过查看端口号看MongoDB是否启动了。   

	[root@localhost data]# netstat -lanp | grep "27017"  
	tcp        0      0 0.0.0.0:27017               0.0.0.0:*                   LISTEN      1573/mongod            
	unix  2      [ ACC ]     STREAM     LISTENING     5874   1573/mongod         /tmp/mongodb-27017.sock    

可以看到，已启动成功，现在使用mongo客户端访问一下该数据库。  

	[root@localhost bin]# cd /usr/local/mongodb/bin/   
	[root@localhost bin]# ./mongo   
	MongoDB shell version: 1.8.1  
	connecting to: test   


 到这一步说明已经安装成功了。  

###额外工作  

注意，上述我们启动MongoDB都是手动使用mongod来启动，这样关闭计算机后，下次再进来它又没启动了，所以还得手动启动，因此，为避免这种繁琐的工作，可以把mongod放到服务自启动项中，这样计算机一开启mongod服务也就启动了。编辑/etc/rc.local，加入下述代码然后再保存即可。 (也可以写一个脚本，然后开机自动运行)  

	#add mongonDB service   
	/usr/local/mongodb/bin/mongod --dbpath=/data/mongodb_data/ --logpath=/data/mongodb_log/mongodb.log --logappend&    

或者编写开机自启动脚本start_mongodb.sh  

	cd /usr/local/mongodb-linux-i686-2.2.1/bin  //具体版本具体变化
	./mongod --dbpath=/data/mongodb_data/ --logpath=/data/mongodb_log/mongodb.log --logappend&   


路径和你设置mongodb的datapath，logpath一致 
我们重启计算机再看MongoDB是否启动，重启后可以直接使用 mongo命令登录，最终发现是可以成功的。  

另外，我们使用mongo命令登录 MongoDB还要转到mongo命令所在目录再执行./mongo，这样是不是有些麻烦？因此，我们可以简化这点，将该命令文件copy到/usr/bin下，这样就可以在任何目录下使用mongo命令了。  

	[root@localhost bin]# ls   
	bsondump  dbbak  mongo  mongod  mongodump  mongoexport  mongofiles  mongoimport  mongorestore mongos  mongosniff  mongostat   
	[root@localhost bin]# cp mongo /usr/bin/    

转到任一目录试下mongo命令：  

	[root@localhost bin]# cd /   
	[root@localhost /]# mongo   
	MongoDB shell version: 1.8.1  
	connecting to: test   


可以看到登录成功了，说明我们可以像使用ls命令一样使用mongo命令了。  

###安装图形化界面  

mongoDB有许多图形化操作软件，我使用的是UMongo：  

下载[Umongo](https://github.com/agirbal/umongo/downloads),解压文件，在终端运行`launch-umongo.sh`脚本文件即可  

ok,至此我们已经安装好了MongoDB~  

