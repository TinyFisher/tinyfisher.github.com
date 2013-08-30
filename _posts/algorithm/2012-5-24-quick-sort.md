---
layout: post
title: 快速排序C语言实现
category: algorithm
tags: [C,algorithm,sort]
keywords: C,algorithm,sort
description: 快速排序C语言实现
---
快速排序，经典必须掌握  

	void swap(int *a,int *b)
	{
	    int temp=*a;
	    *a=*b;
	    *b=temp;
	}
	int partition (int input[],int low,int high)
	{
	    int position=low-1;
	    int key=input[high];
	    while(low<high)
	    {
	        if(input[low]<key)
	        {
	            position++;
	            swap(&input[position],&input[low]);
	        }
	        low++;
	    }
	    position++;
	    swap(&input[position],&input[high]);
	    return position;
	
	}
	void q_sort(int a[],int low,int high)
	{
	    if(low < high)               //不是while，因为是递归调用
	    {
	        int p;
	        p=partition(a,low,high);
	        q_sort(a,low,p-1);
	        q_sort(a,p+1,high);
	     }
	}
