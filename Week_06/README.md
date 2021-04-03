# js语言通识|泛用语言分类方法
以js语法为线索，从细到粗，先讲语言的基础知识 

语言按语法进行分类：非形式语言 （中文，英文）  形式语言 （更加严谨严格）


形式化语言
乔姆斯基谱系  
0型 无限制文法
1型 上下文相关文法
2型 上下文无关文法
3型 正则文法



# js语言通识|什么是产生式
利用工具认识乔姆斯基谱系 产生式
产生式会有很多种 -- 这里我们先学BNF
用尖括号括起来的名称来表示语法结构名
语法结构分成基础结构和需要用其它语法结构定义的复合结构  基础结构称终结符  复合结构称为非终结符
引号和中间的字符表示终结符
可以使用括号
*表示重复多次
|表示或
+表示至少一次

BNF
四则运算
1 + 2*3

终结符 Number + - * /
非终结符 MultiplicativeExpression  AddtiveExpression

```
<MultiplicativeExpression>::= <Number>|
            <MultiplicativeExpression> '*' <Number>|
            <MultiplicativeExpression> '/' <Number>

<AddtiveExpression>::=<MultiplicativeExpression>|
            <AddtiveExpression> '+' <MultiplicativeExpression>|
            <AddtiveExpression> '-' <MultiplicativeExpression>
```

练习：编写带括号的四则运算
```
<Number> ::= "0"|"1"|"2"|...|"9"
<DecimalNumber> ::="0"|(("1"|"2"|...|"9")<Number>*)
<PrimaryExpression> ::= <DecialNumber> | "("<AdditionExpression>")"
<MultiplicativeExpression>::= <PrimaryExpression>|
            <MultiplicativeExpression> '*' <PrimaryExpression>|
            <MultiplicativeExpression> '/' <PrimaryExpression>

<AddtiveExpression>::=<MultiplicativeExpression>|
            <AddtiveExpression> '+' <MultiplicativeExpression>|
            <AddtiveExpression> '-' <MultiplicativeExpression>
```
# js语言通识|深入理解产生式
利用产生式理解乔姆斯基谱系


```
0 型 
? ::= ?
1 型  上下文有关文法
?<A>?:: = ?<B>?
2 型  左边只有一个非终结符
<A> ::= ?
3 型 正则文法
<A> ::= <A>?
```

js是什么样的文法？
总体上属于上下无关文法
表达式总体上属性正则文法  
两个特例：
{
  get a{ return 1},
  get:1
}  此处上下文相关

2 ** 1 ** 2  1**2的优先级更高 


# js语言通识|现代语言的分类 
现在语言的特性  很多都并不是形式语言  现在语言中并不是非常严格的贴合乔姆斯基谱系
C++ *
VB <
Python 行首的tab符和空格
Js / 可能是除号 也可能是正则 


语言的其它分类 
用途：数据描述 JSON HTML XAML SQL CSS
      编程   C++ JAVA Python JavaScript
表达方式： 声明式语言  JSON HTML XAML SQL CSS
          命令式语言 C++ JAVA Python JavaScript


作业：尽可能找到计算机语言然后进行分类


# js语言通识|编程语言的性质

## 图灵完备性  经过发展都收缩到几个固定的模式
命令式--图灵机
    goto
    if和while
声明式 --lambda   数学上定义的一个lambda函数 可以通过递归来实现图灵完备
    递归


## 动态与静态
动态: 1. 在用户设备上、在线服务器上运行
      2. 产品实际运行时
      3.  Runtime
静态: 1. 在程序员的设备上运行
      2. 产品开发时
      3. Compliertime  其实今天的Runtime与Compilertime已经不准备了

## 类型系统
* 动态类型系统与静态系统  最简单的是区分在谁的电脑上  java由于有反射机制是半动态与半静态
* 强类型与弱类型   类型转换发生的形式  是否会默认发生
* 复合类型  结构体 函数签名  String += Number  String == Boolean(失败的奇怪的设计)
* 子类型  能用父类型的地方都是可以做子类型
* 泛型 逆变/协变 类型可以作为参数进行传递  泛型与子类型结合便会产生 逆变与协变这样的东西

# js语言通识|一般命令式编程语言的设计方式

## 一般命令式语言的设计方式
总体上分层级：
Atom:  Identifier Literal
Expression: Atom Operater Punctuator
Statement:Expression keyWord Punctuator
Structure:Function Class Process Namespace ....
Program:Program Module Package  Library


## 固定的讲解结构   
语法  --语义--》 运行时


# js类型 | Number

js最小的单元 字面值 类型
Atom  
Grammar                 Runtime
* Literal               * Types 
* Variable              * Execution Context
* Keywords
* Whitesspace
* Line Terminal



Types （七种基本类型  还加上一个BigInt）
* Number   （NaN）
* String
* Boolean
* Object
* Null 在早期设计时出现了偏差  typeof Null === 'object'  确认不会去修复
* Undefined
* Symbol （唯一性）  js特有的一种概念  专门用于object属性名的一种概念

## Number
IEEE 754 Double Float  双精度浮点类型
* Sign (1)
* Exponent (11)
* Fraction (52)

0.1 + 0.2 !== 0.3

## Number Grammar
DecimalLiteral 0 0. .2 1e3   小数点一边有数都是合法的  
BinaryIntergerLiteral 0b111 0b开头
OctalIntegerLiteral  0o   八进制
HexIntegerLiteral   0xFF 十六进制

这里有一个语法冲突
0.toString()  这种会认为 0. 它是一个Number 
改写为 0..toString() 需要添加两个点才是可以的  或者 0 .toString()添加空格


# js类型 | String
* Character  字形
* Code Point 就是一个数值
* Encoding  如何存 编码方式

运行时  
ASCII  只规定了127字符  大小写  数值  控制字符  没有办法表示中文
Unicode  全世界的字符  联合编码集    两个字节来表示
UCS   只有 0000 至 
GB    GB2312 第一个版本   GBK（GB13000）扩充版本  GB18030 补上了所有缺失字符的烦恼 都是与ASCII兼容  
ISO-8859  都是与ASCII兼容  
BIG5 台湾  

Encoding方式
UTF8  UTF16

```
function UTF8_Encoding(string){
  return eval('\''+encodeURI(str).replace(/%/gm, '\\x')+'\'');
}
```
语法  Grammar
"abc" 'abc' `abc` 两种写法完成等效  
\n \t \"   \\


bfnrtv 
2028 2029  换行

`ab${x}abc${y}abc` 产生了四种token  \`  \`  ${   }   


# js类型 | 其它类型
Boolean  true false
Null & Undefined 
* null 
* undefined  但是undefined 不是关键字 可以被赋值
* void 0 利用void 0 产生undefined 



Symbol 后面来讲


# JS对象 | 对象的基础知识
Object Symbol
人大概5岁的时候就会产生对象的概念  从历史的角度来说 面向对象是更加贴合人类思维的
任何一个对象都是唯一的，这与它的本身的状态无关
所以即使两个状态完全一致的对象，也是不相等的。
我们利用状态来描述对象。状态的改变是行为。


Object： identifier state behavior

Class
采用分类的方式认识对象 
类是一种常见的描述对象的方式。
而“归类”与“分类”则是两个主要的流派。
对于“归类”方法而言，多继承是非常自然的事情。比如C++
而采用分类思想的计算机语言，则是单继承结构，并且是会有一个基类Object。 c# java 

Object Prototype
原型是一种更接近人类原始认知的描述对象的方法。
我们并不试图做严谨的分类，而是采用“相似”这样的方式去描述对象。
任何对象仅仅需要描述自己与原型的区别即可。


小练习：设计狗咬人的代码

```
class Dog{
   constructor(damage){
     this.damage = damage
   }
}

class Human{
  consructor(bloodVolume){
    this.bloodVolume = bloodVolume
  }
  hurt(damage){
    this.bloodVolume -= damage
  }
}

let dog = new Dog(1)

let human = new Human(10)
human.hurt(go.damage)
```

我们不应该受到语言描述的干扰  
在设计对象的状态和行为时，需要遵循“行为改变状态”的原则

# JS对象 | JS中的对象
在js中状态和行为都是可以使用属性来表示的
javascript获取属性的行为是一直沿着原型向上找的

## js中的属性
Symbol 只能够通过变量去使用的
String

Data Property数据属性  [[ value ]] writable enumerable configurable
Accessor Property访问器属性 get set enumerable configurable


## 原型链
当我们访问属性时，如果当前对象没有，则会沿着原型去找原型对象是否有此名称 的属性，而原型对象还可能有原型，因此会有原型链这一说。
这一算法保证了，每个对象只需要描述自己与原型的区别即可。

## Api/Gammar
* {} . [] Object.defineProperty
* Object.create / Object.serPrototypeOf/ Object.getPrototypeOf
* new / class/ extends 它是分类的一种描述对象的方式
* new / function / prototype 这个认为是历史包袱 不推荐使用


## Function Object

javaScript中还有一些特殊的对象，比如函数对象。
除了一般对象的属性和原型，函数对象还有一个行为[[ call]]
我们用JavaScript中的function关键字，箭头运算符或者 Function构造器创建的对象 ，会有[[ call]] 这个行为
当我们用到类似 f() 这样的语法把对象当作函数来调用时，就会访问到[[ call]] 这个行为
如果对应的对象没有[[ call]]行为就会报错

利用[[ ]] 定义的方法是内置的方法  没有办法进行直接访问的

[[ length]]

## Host Object 宿主环境对象
比如 window

作业：找出JavaScript标准中所有具有特殊行为的对象 
```
Array：Array 的 length 属性根据最大的下标自动发生变化。
Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
bind 后的 function：跟原来的函数相关联
```