---
layout: post
title: 获取二叉树叶子数、高度及左右子树交换
category: btree
tags: [C,algorithm,data_struct,btree]
keywords: C,algorithm,data_struct,btree
description: 获取二叉树叶子数、高度及左右子树交换
---
二叉树的一些操作具有天然的递归性，本文实现了获取二叉树的叶子总数、获取二叉树高度以及交换二叉树的左右子树，代码均已编译通过。  

1.获取二叉树叶子总数：左子树叶子总数+右子树叶子总数  

	typedef struct BNode
	{
	    char value;  //类型假设为char
	    struct BNode *left;
	    struct BNode *right;
	
	} Node,*pNode,**ppNode;
	int GetLeafeNum(pNode root)
	{
	    if(root==NULL)  //空节点叶子数为0
	    {
	        return 0;
	    }
	    else if(root->left==NULL&&root->right==NULL)
	    {
	       return 1;
	    }
	    return GetLeafeNum(root->left)+GetLeafeNum(root->right);
	}

  



2.交换左右子树  

	void swap_tree(pNode root)
	{
	    if(root==NULL)
	        return;
	    else
	    {
	        pNode temp=root->left;
	        root->left=root->right;
	        root->right=temp;
	        swap_tree(root->left);
	        swap_tree(root->right);
	    }
	}


获取二叉树高度：左右子树高度较大的+1  
 

	int GetHeight(pNode root)
    {
        if(root==NULL)
        {
            return 0;
        }
        //max(left,right)+1; 左右子树最高高度+1
        return (GetHeight(root->left)>=GetHeight(root->right)?(GetHeight(root->left)+1):(GetHeight(root->right)+1));
    }



    