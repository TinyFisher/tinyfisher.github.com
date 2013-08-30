---
layout: post
title: 堆排序C语言实现
category: algorithm
tags: [C,algorithm,sort]
keywords: C,algorithm,sort
description: 堆排序C语言实现
---
堆的概念这里不再描述，这里主要实现堆排序，堆排序主要分为两步：  
1.堆化数组（最小堆）；  
2.交换首尾元素，（则最后一个元素为最小），调整前n-1个元素，使前n-1个元素仍为为最小堆，循环，直到还剩一个元素；这样排序下来，数组为倒序。  
代码如下：  

    void swap(int *a,int *b)
    {
        int temp=*a;
        *a=*b;
        *b=temp;
    }
    void FixdownMinHeap(int a[],int index,int len)   //向下调整堆
    {
        int father_index=index;
        int left_child_index=2*father_index+1;
        int right_child_index=2*father_index+2;
        int min=0;
        int min_index=0;
        while(left_child_index<len)   //重要  判断father_index不是叶子节点  
        {

            if(a[left_child_index]>a[right_child_index]&&right_child_index<len) //右节点存在且最小
            {
                min=a[right_child_index];
                min_index=right_child_index;
            }
            else
            {
                min=a[left_child_index];
                min_index=left_child_index;
            }

            if(a[father_index]>min)
            {
                swap(&a[father_index],&a[min_index]);
            }

            father_index=left_child_index;
            left_child_index=2*father_index+1;
            right_child_index=2*father_index+2;
        }
    }
    void createMinHeap(int a[],int n)//堆化数组
    {
        int i=(n-1-1)/2; //因为n是数组长度，（n-1-1）/2表示最大父节点index
        while(i>=0)
        {
            FixdownMinHeap(a,i,n);
            i--;
        }
    }
    void MinHeapSort(int a[],int n)
    {
        createMinHeap(a,n);
        int i=0;
        for(i=n-1;i>0;i--)
        {
            swap(&a[i],&a[0]);  //交换首尾元素
            FixdownMinHeap(a,0,i);  //调整堆
        }
    }