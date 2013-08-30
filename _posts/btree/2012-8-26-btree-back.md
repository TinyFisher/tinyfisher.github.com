---
layout: post
title: 根据二叉树的先序和中序遍历还原二叉树
category: btree
tags: [C,algorithm,data_struct,btree]
keywords: C,algorithm,data_struct,btree
description: 根据二叉树的先序和中序遍历还原二叉树
---
	#include<stdio.h>
	#include<stdlib.h>
	typedef struct node
	{
		int value;
		struct node *left;
		struct node *right;
	}Node,*pNode;
	
	/*
	 *根据二叉树的先序遍历和中序遍历，还原二叉树
	 *先序：1,2,4,7,3,5,6,8;中序：4,7,2,1,5,3,8,6
	*/
	
	pNode BuildTree(int pre[],int mid[],int len)
	{
		if(len<=0)
		{
			return NULL;
		}
		pNode root=(pNode)malloc(sizeof(Node));
		root->value=pre[0];                    //先序的第一个节点一定是根节点
		int left_len=0;
		int right_len=0;
		int root_value=pre[0];
		int i=0;
		while(mid[i]!=root_value)              //获取左子树长度
		{
			i++;
			left_len++;
		}
		right_len=len-left_len-1;              //获取右子树长度
		//printf("left_len is %d\n",left_len);
		//printf("right_len is %d\n",right_len);
		root->left=BuildTree(pre+1,mid,left_len);     //递归还原左子树
		root->right=BuildTree(pre+1+left_len,mid+1+left_len,right_len);  //递归还原右子树
		return root;
	}