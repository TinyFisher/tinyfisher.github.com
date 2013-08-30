---
layout: post
title: 冒泡排序C语言实现
category: algorithm
tags: [C,algorithm,sort]
keywords: C,algorithm,sort
description: 冒泡排序C语言实现
---
最近打算将各种常用的算法（排序，查找等）复习一遍，都是用C语言实现，代码均在codeblocks下编译通过。  
第一篇：冒泡排序  

    void swap(int *a,int *b)
    {
        int temp=*a;
        *a=*b;
        *b=temp;
    }

    void bubble_sort(int input[],int length)
    {
        int i,j,flag=1;
        for(i=0;i<length&&flag;i++)
        {
            flag=0;             //若flag为0 表示这一趟没有交换，则已经排序完成，无需再扫描，即使扫描 也不会发生交换
            for(j=length-1;j>i;j--)
            {
                if(input[j]<input[j-1])
                {
                     swap(&input[j],&input[j-1]);
                     flag=1;
                }
            }
        }
    }
