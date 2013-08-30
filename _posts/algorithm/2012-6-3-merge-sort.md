---
layout: post
title: 归并排序C语言实现
category: algorithm
tags: [C,algorithm,sort]
keywords: C,algorithm,sort
description: 归并排序C语言实现
---
话不多说，直接上代码  

	void swap(int *a,int *b)
	{
	    int temp=*a;
	    *a=*b;
	    *b=temp;
	}
	void merge_array(int a[],int low,int mid,int high,int result[])
	{
	    int i,j,k;
	    i=low;
	    j=mid+1;
	    k=0;
	    while(i<=mid&&j<=high)
	    {
	        if(a[i]<a[j])
	        {
	            result[k]=a[i];
	            i++;
	            k++;
	        }
	        else
	        {
	            result[k]=a[j];
	            k++;
	            j++;
	        }
	    }
	    while(i<=mid)
	    {
	        result[k]=a[i];
	        i++;
	        k++;
	    }
	    while(j<=high)
	    {
	        result[k]=a[j];
	        j++;
	        k++;
	    }
	    for(i=0;i<k;i++)    //注意 需要这一步
	    {
	        a[low+i]=result[i];  //low+i
	    }
	}
