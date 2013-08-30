---
layout: post
title: 双链表操作大全
category: link
tags: [C,algorithm,data_struct,double_link]
keywords: C,algorithm,data_struct,double_link
description: 双链表操作大全
---
双向链表的操作和单链表很像，主要包括创建，删除，插入；只要注意下指针的操作即可，废话不多说，直接上代码：  

	typedef struct dnode
	{
	    int num;
	    struct dnode *pre;
	    struct dnode *next;
	}Dnode,*pDnode;
	
	pDnode Create()  //用户输入创建，-1表示结束
	{
	    pDnode head=(pDnode)malloc(sizeof(Dnode));
	    pDnode p=head;
	    int a;
	    printf("please input :\n");
	    scanf("%d",&a);
	    while(a!=-1)
	    {
	        pDnode q=(pDnode)malloc(sizeof(Dnode));
	        q->num=a;
	        p->next=q;
	        q->pre=p;
	        p=q;
	        scanf("%d",&a);
	    }
	    p->next=NULL;
	    head=head->next;
	    head->pre=NULL;
	    return head;
	}
	
	pDnode CreateFromArray(int a[],int len)    //根据数组创建
	{
	    pDnode head=(pDnode)malloc(sizeof(Dnode));
	    pDnode p=head;
	    int i=0;
	    while(i<len)
	    {
	        pDnode q=(pDnode)malloc(sizeof(Dnode));
	        q->num=a[i];
	        p->next=q;
	        q->pre=p;
	        p=q;
	        i++;
	    }
	    p->next=NULL;
	    head=head->next;
	    head->pre=NULL;
	    return head;
	}
	
	pDnode del(pDnode head, int key)   //删除
	{
	    pDnode q1=head;
	    pDnode q2=head;
	    if(head==NULL)
	        return NULL;
	    if(head->num==key)
	    {
	        head=head->next;
	        head->pre=NULL;
	        free(q1);
	        return head;
	    }
	    while(q1->num!=key&&q1->next!=NULL)
	    {
	        q2=q1;
	        q1=q1->next;
	    }
	    if(q1->num==key&&q1->next==NULL)
	    {
	        q2->next=NULL;
	        free(q1);
	    }
	    else if(q1->num==key&&q1->next!=NULL)
	    {
	        q2->next=q1->next;
	        q1->next->pre=q2;
	        free(q1);
	    }
	    else
	    {
	        printf("not found\n");
	    }
	    return head;
	}
	
	pDnode insert(pDnode head,int key)    // 插入
	{
	    pDnode s=(pDnode)malloc(sizeof(Dnode));
	    s->num=key;
	    pDnode p=head;
	    pDnode q=head;
	    while(p->num<key&&p->next!=NULL)
	    {
	        p=p->next;
	    }
	    if(p==head)
	    {
	        s->next=head;
	        head->pre=s;
	        head=s;
	        head->pre=NULL;
	    }
	    else if(p->next==NULL&&p->num<key)
	    {
	        p->next=s;
	        s->pre=p;
	        s->next=NULL;
	    }
	    else
	    {
	        q=p->next;
	        p->next=s;
	        s->next=q;
	        s->pre=p;
	        q->pre=s;
	    }
	    return head;
	}
	
	void print_from_head(pDnode head)  //打印
	{
	    while(head->next!=NULL)
	    {
	        printf("%d",head->num);
	        head=head->next;
	    }
	    printf("%d",head->num);
	    printf("\n");
	}
	
	void print_from_tail(pDnode head)
	{
	    while(head->next!=NULL)
	        head=head->next;
	    while(head->pre!=NULL)
	    {
	        printf("%d",head->num);
	        head=head->pre;
	    }
	    printf("%d",head->num);
	    printf("\n");
	}
	
