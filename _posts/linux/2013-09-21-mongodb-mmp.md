---
layout: post
title: Mongodb学习整理之内存映射机制
category: linux
tags: [Linux,MongoDB]
keywords: Linux,MongoDB
description: Mongodb学习整理之内存映射机制
---

sql数据库在数据量达到百万级的时候性能直线下降，在建立索引的表上做一个条件查询甚至达到分钟级别查询时间，这是无法忍受的，瓶颈在于大量的磁盘i/o操作，而这些i/o操作无疑使很耗费时间的。mongodb之所以对海量数据的查询如此高效，是因为他使用了内存映射机制，避免了大量的磁盘i/o，从而大大提高了查询效率，但相应的对内存要求也比较高。ok，下面我们来看看什么是内存映射机制  

#### 官网的说法：  
**What are memory mapped files?**  

A memory-mapped file is a file with data that the operating system places in memory by way of the mmap() system call. mmap() thus maps the file to a region of virtual memory. Memory-mapped files are the critical piece of the storage engine in MongoDB. By using memory mapped files MongoDB can treat the contents of its data files as if they were in memory. This provides MongoDB with an extremely fast and simple method for accessing and manipulating data.   
 

**How do memory mapped files work?**

Memory mapping assigns files to a block of virtual memory with a direct byte-for-byte correlation. Once mapped, the relationship between file and memory allows MongoDB to interact with the data in the file as if it were memory.  


**How does MongoDB work with memory mapped files?**  

MongoDB uses memory mapped files for managing and interacting with all data. MongoDB memory maps data files to memory as it accesses documents. Data that isn’t accessed is not mapped to memory.  


**What are page faults?**  

Page faults will occur if you’re attempting to access part of a memory-mapped file that isn’t in memory.  


If there is free memory, then the operating system can find the page on disk and load it to memory directly. However, if there is no free memory, the operating system must:  


find a page in memory that is stale or no longer needed, and write the page to disk.  

read the requested page from disk and load it into memory.  

This process, particularly on an active system can take a long time, particularly in comparison to reading a page that is already in memory.  


#### 我的理解：  
首先，“映射”这个词，就和数学课上说的“一一映射”是一个意思，就是建立一种一一对应关系，在这里主要是只*硬盘上文件*的位置与进程*逻辑地址空间*中一块大小相同的区域之间的一一对应（按字节对应），如过程1所示。这种对应关系纯属是逻辑上的概念，物理上是不存在的，原因是进程的逻辑地址空间本身就是不存在的。在内存映射的过程中，**并没有实际的数据拷贝，文件没有被载入内存，只是逻辑上被放入了内存**，这个过程由系统调用mmap()实现，所以建立内存映射的效率很高。  

![hello](/assets/themes/images/yxh.gif)  
既然建立内存映射没有进行实际的数据拷贝，那么进程又怎么能最终直接通过内存操作访问到硬盘上的文件呢？那就要看内存映射之后的几个相关的过程了。  

 
mmap()会返回一个指针ptr，它指向进程逻辑地址空间中的一个地址，这样以后，进程无需再调用read或write对文件进行读写，而只需要通过ptr就能够操作文件。但是ptr所指向的是一个逻辑地址，要操作其中的数据，必须通过内存管理单元MMU将逻辑地址转换成物理地址，如图1中过程2所示。这个过程与内存映射无关。  

 
前面讲过，建立内存映射并没有实际拷贝数据，这时，MMU在地址映射表中是无法找到与ptr相对应的物理地址的，也就是MMU失败，将产生一个缺页中断，缺页中断的中断响应函数会在swap中寻找相对应的页面，如果找不到（也就是该文件从来没有被读入内存的情况），则会通过mmap()建立的映射关系，从硬盘上将文件读取到物理内存中，如图1中过程3所示。这个过程与内存映射无关。  

 
如果在拷贝数据时，发现物理内存不够用，则会通过虚拟内存机制（swap）将暂时不用的物理页面交换到硬盘上，如图1中过程4所示。这个过程也与内存映射无关。  

**所以当mongodb读取数据库文件的时候，首先做内存映射，读取文件变成了读取内存操作，所以mongodb的查询效率相当高，当然，如果你的内存不够大，经常发生缺页中断，那么效率会大打折扣了**
