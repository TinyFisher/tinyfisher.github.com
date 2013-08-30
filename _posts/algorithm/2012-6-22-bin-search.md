---
layout: post
title: 二分查找C语言实现
category: algorithm
tags: [C,algorithm,search]
keywords: C,algorithm,search
description: 二分查找C语言实现
---
据说90%的程序员都无法正确的写出二分搜索，试了下果然如此，需要注意的地方挺多（边界条件），所以讲递归与非递归的写法记录下来，以便于复习  

	int binary_search(int array[],int n,int key)  //非递归
	{
	    int low=0;
	    int high=n-1;
	    while(low<=high)    //请注意=
	    {
	        if(array[low+(high-low)/2]==key)
	        {
	            return low+(high-low)/2;   //请注意 low+
	        }
	        else if(array[low+(high-low)/2]>key)
	        {
	            high=low+(high-low)/2 -1;    //请注意-1
	        }
	        else
	        {
	            low=low+(high-low)/2 +1 ;  //请注意+1
	        }
	    }
	    return -1;
	}
	int binary_search(int array[],int low,int high,int key)  //递归 ,需要参数 low high
	{
	    if(low<=high)
	    {
	        if(key==array[low+(high-low)/2])
	            return (low+(high-low)/2);
	        else if(key>array[low+(high-low)/2])
	            return binary_search(array,low+(high-low)/2+1,high,key);
	        else
	            return binary_search(array,low,low+(high-low)/2-1,key);
	    }
	    else
	    {
	        return -1;
	    }
	}