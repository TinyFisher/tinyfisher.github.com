---
layout: post
title: 2013微软暑期实习笔试错题、疑题整理
category: blog
tags: [Linux,C,C++,Math,CS]
keywords: Linux,C,C++,Math,CS 
description: 2013微软暑期实习笔试错题、疑题整理
---

###参加了微软“智在未来”暑期实习笔试，跪了，将错题、疑题整理如下，方便后面复习整理。  

**What's the output of the following code?(3 Points)  ** B  
 
	class A  
	{  
	public:  
	    virtual void f()  
	    {  
	        cout<<"A::f()"<<endl;  
	    }  
	    void f() const  
	    {  
	        cout<<"A::f() const"<<endl;  
	    }  
	};  
	  
	class B: public A  
	{  
	public:  
	    void f()  
	    {  
	        cout<<"B::f()"<<endl;  
	    }  
	    void f() const  
	    {  
	        cout<<"B::f() const"<<endl;  
	    }  
	};  
	  
	void g(const A* a)  
	{  
	    a->f();  
	}  
	  
	int main()  
	{  
	    A* a = new B();  
	    a->f();  
	    g(a);  
	    delete a ;  
	}  

	A. B::f()B::f()const    
	B. B::f()A::f()const  
	C. A::f()B::f()const    
	D. A::f()A::f()const  

解析：类的成员函数后面加 const，**表明这个函数不会对这个类对象的数据成员（准确地说是非静态数据成员）作任何改**变。  

在设计类的时候，一个原则就是对于不改变数据成员的成员函数都要在后面加 const，而对于改变数据成员的成员函数不能加 const。所以 const 关键字对成员函数的行为作了更加明确的限定：**有 const 修饰的成员函数（指 const 放在函数参数表的后面，而不是在函数前面或者参数表内），只能读取数据成员，不能改变数据成员；  **

没有 const 修饰的成员函数，对数据成员则是可读可写的。除此之外，在类的成员函数后面加 const 还有什么好处呢？**那就是常量（即 const）对象可以调用 const 成员函数，而不能调用非const修饰的函数。**  

**What is the difference between a linked list and an array?(3 Points)**  （全选） 

	A. Search complexity when both are sorted  
	
	B. Dynamically add/remove  
	
	C. Random access efficiency  
	
	D. Data storage type  

【此题D选项存在疑问】  

**About the Thread and Process in Windows, which description(s) is(are) correct:(3 Points)**  C  
  
	A. One application in OS must have one Process, but not a necessary to have one Thread  
	
	B. The Process could have its own Stack but the thread only could share the Stack of its parent Process  
	
	C. Thread must belongs to a Process  
	
	D. Thread could change its belonging Process  

解析：A选项，一个程序至少有一个进程，一个进程至少包含一个线程（主线程）  

B选项，线程共享父进程的数据空间，也可以拥有自己的栈空间  

C对，线程不能独立存在，必须属于一个进程  

D明显错误  

**Please choose the right statement about const usage:(3 Points)**  ABC  


	A. const int a; //const integer  
	
	B. int const a; //const integer  
	
	C. int const *a; //a pointer which point to const integer  
	
	D. const int *a; //a const pointer which point to integer  
	
	E. int const *a; // a const pointer which point to integer  

解析：这里注意一下A、B的写法均可，两者意思一样  


**1 of 1000 bottles of water is poisoned which will kill a rat in 1 week if the rat drunk any amout of the water. Given the bottles of water have no visual difference, how many rats are needed at least to find the poisoned one in 1 week?(5 Points)** B  
  

	A. 9  
	
	B. 10  
	
	C. 32  
	
	D. None of the above  

解析：2的10次方=1024，大于1000，用二进制的思维思考问题  

**Which of the following statement(s) equal(s) value 1 in C programming language?(5 Points)  ** BCD  

	A. the return value of main function if program ends normally
	
	B. return (7&1)  
	
	C. char *str="microsoft"; return str=="microsoft"  
	
	D. return "microsoft"=="microsoft"  
	
	E. None of the above  

解析：A选项，C程序正常退出，return 0；  

B选项，计算即可得  

C选项，因为C语言中是没有bool类型的（1个字节，只有0,1），所以返回1  

D选项，同C  


**How many rectangles you can find from 3X4 grid?(5 Points)** D  
 

	A. 18  
	
	B. 20  
	
	C. 40  
	
	D. 60 
	
	E. None of above is correct  

解析：智力题 整不了  

**Which of the following sorting algorithm(s) is(are) stable sorting?(5 Points)**    A  

	A. bubble sort  
	
	B. quick sort  
	
	C. heap sort  
	
	D. merge sort  
	
	E. Selection sort  

解析：不稳定排序：“快选希堆”，原地排序：“快选希堆冒”  


**Model-View-Controller(MVC) is an architectural pattern that frequently used in web applications. Which of the following statement(s) is(are) correct:(5 Points)** AB  

	A. Models often represent data and the business logics needed to manipulate the data in the application  
	
	B. A view is a (visual) representation of its model. It renders the model into a form suitable for interaction, typically a user interface element  
	
	C. A controller is the link between a user and the system. It accepts input from the user and instructs the model and a view to perform actions based on that input  
	
	D. The common practice of MVC in web applications is, the model receives GET or POST input from user and decides what to do with it, handing over to controller and which hand control to views(HTML-generating components)  
	
	E. None of the above  

解析：不是很清楚，关于MVC，请看这篇blog，写得挺直白的[http://www.ruanyifeng.com/blog/2007/11/mvc.html](http://www.ruanyifeng.com/blog/2007/11/mvc.html)  


**Given a set of N balls and one of which is defective (weighs less than others), you are allowed to weigh with a balance 3 times to find the defective. Which of the following are possible N?(13 Points)** ABCD  

	A. 12  
	
	B. 16  
	
	C. 20  
	
	D. 24  
	
	E. 28  

解析：A选项：第一次：4,4,4 第二次：2,2，第三次：1,1,
B选项：第一次：5,5,6，第二次：若在某一个5中，2,2,1；若在6中，2,2,2,；第三次1,1,
C选项：第一次：7,7,6,；第二次：若在某一个7中，2,2,3；若在6中，2,2,2；第三次，1,1
D选项：第一次：8,8,8；第二次：2,3,3；第三次1,1
