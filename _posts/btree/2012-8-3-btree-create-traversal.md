---
layout: post
title: 二叉树创建和遍历
category: btree
tags: [C,algorithm,data_struct,btree]
keywords: C,algorithm,data_struct,btree
description: 二叉树创建和遍历
---
二叉树的概念、性质等就不多介绍了，这里用C语言实现了二叉树的建立（1.用户输入，2.给数组参数），前中后序遍历和按层遍历。  

1.二叉树的建立  

	typedef struct BNode
	{
	    char value;  //类型假设为char
	    struct BNode *left;
	    struct BNode *right;
	
	} Node,*pNode,**ppNode;
	
	pNode CreateBTree()  //通过输入建立二叉树，'@'表示空节点，先序顺序，空节点必须输入
	{
	    char ch;
	    pNode q;
	    scanf(" %c",&ch);  //%c前面的空格 用来清空缓冲区
	   // fflush(stdin);  //或者这样清空缓冲区
	    if(ch=='@')
	    {
	        return NULL;
	    }
	    else
	    {
	        q=(pNode)malloc(sizeof(Node));
	        if(q==NULL)
	        {
	            printf("malloc error\n");
	            return NULL;
	        }
	        q->value=ch;
	        q->left=CreateBTree();
	        q->right=CreateBTree();
	        return q;
	    }
	
	}
	
	pNode CreateBTree_from_array(char a[],int index,int len) //根据数组创建二叉树双链表
	{
		if(index>=len) //叶子节点
			return NULL;
		else
		{
		pNode root=(pNode)malloc(sizeof(Node));
		if(root==NULL)
		{
			printf("malloc error\n");
			return NULL;
		}
		root->value=a[index];
		root->left=CreateBTree_from_array(a,2*index+1,len);
		root->right=CreateBTree_from_array(a,2*index+2,len);
		return root;
		}
	}

2.二叉树的前中后序遍历：  

	void preorder(pNode root)  //先序遍历
	{
	    if(root==NULL)
	        return;
	    else
	    {
	        printf("%c",root->value);
	        preorder(root->left);
	        preorder(root->right);
	    }
	}
	
	void midorder(pNode root)  //中序遍历
	{
	    if(root==NULL)
	        return;
	    else
	    {
	        midorder(root->left);
	        printf("%c",root->value);
	        midorder(root->right);
	    }
	}
	
	void postorder(pNode root)//后序遍历
	{
	    if(root==NULL)
	        return;
	    else
	    {
	        postorder(root->left);
	        postorder(root->right);
	        printf("%c",root->value);
	    }
	}

 3.二叉树按层遍历  

	/*
	    二叉树按层遍历，借助队列，构建一个队列专门用来储存二叉树节点指针，先把根节点入队，假设是A，对A元素进行访问，
	    然后对A的左右孩子依次入队，假设B,C。A出队列，再是对B进行访问，同样将B的左右孩子入队列，B出对列······
	    重复以上，直到队列为空。
	*/
	#define LEN 10
	typedef struct queue  //队列，包含pNode数组，首尾index
	{
	    pNode data[LEN];
	    int front;
	    int rear;
	}BTreeQueue,*pBTreeQueue;
	
	void TransLevel(pNode root)
	{
	    pBTreeQueue pqueue=(pBTreeQueue)malloc(sizeof(BTreeQueue));
	    pNode proot=root;
	    pqueue->front=0;
	    pqueue->rear=0;
	    if(proot==NULL)
	    {
	        printf("tree is null");
	        return;
	    }
	    else
	    {
	        printf("%c",proot->value);
	        pqueue->data[pqueue->front]=proot;  //根节点入队；
	        (pqueue->rear)++;
	        while((pqueue->front)<(pqueue->rear))
	        {
	            proot=pqueue->data[pqueue->front];
	            (pqueue->front)++;  //队列首元素出列，保存为proot
	            if(proot->left!=NULL)
	            {
	                printf("%c",proot->left->value);
	                pqueue->data[pqueue->rear]=proot->left; //左子节点入队
	                (pqueue->rear)++;
	            }
	            if(proot->right!=NULL)
	            {
	                printf("%c",proot->right->value);
	                pqueue->data[pqueue->rear]=proot->right; //右子节点入队
	                (pqueue->rear)++;
	            }
	        }
	    }
	}