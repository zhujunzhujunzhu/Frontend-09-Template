# JS表达式 | 运算符和表达式
## Grammar  
Tree vs Priority
+ \+ \-
+ \* \/
+ ()

## Expressions
+ Member
  a.b   a[b]  foo`string` super.b super['b']  new.target new Foo()

+ New 
  new Foo

## Reference 标准中的类型而不是语言中的类型
+ Object
+ delete  删除需要找到引用
+ Key
+ assign  也是需要找到引用的

## Call 它的优先级低于new  也低于其它 
+ foo()
+ super()
+ foo()['b']
+ foo().b

发现仅仅使用运算符来描述优先级并不精确，需要结合表达式 语法进行分析

## Left Handside & Right Handside
这个根据仅仅是放在等号的左边还是右边

Update


## Unary (单目运算符)
delete a.b
void foo()
typeof a
+a
-a
~a
!a
await a 

## Exponental 唯一一个右结合的运算符
**

example:
3\*\*2\*\*3
3\*\*(2\*\*3)


## Multiplicative

## Additive 
\+ \- 加号其实是两种情况

## Shift
<<  >> >>>
## Relationship
< > <= >= instanceof in 

## Equality
 ==  != === !==

## Bitwise
& ^ |


## Logical 注意其中的短路原则
&&   ||

## Conditional 
? : 三目运算符  也是有短路逻辑 也是可以代替if/else



# JS表达式 | 类型转换
a+b  一旦类型出现了不一致的话就会出现类型转换
"false" == false  这个并不相等 "false"这个被转换为 true的
a[o] = 1 object key为String


unboxing
ToPremitive
toString vs valueOf
Symbol.toPrimitive

var o= {
  toString(){ return "2"}
  valueOf(){ return 1}
  [ Symbol.toPrimitive ](){ return 3}
}

Boxing
Number new Number(1)  1
String new String("a") "a"
Boolean new Boolean(true) true

Exercise
StringToNumber
NumberToString



# JS语句 | 运行时相关概念
利用语句创建控制流程
语句：
Grammar 
   简单语句   组合语句   声明
Runtime


# Compoletion Record  
```
if(x==1)  return 10
```
return 这个可能执行也可能不能执行
需要有东西去存储运行的结果 

组成 ：[[type]] 类型  normal break continue  return or throw
       [[value]]  基本类型
       [[target]]  label(很少见 比如 break continue 可以后面跟上label)


# JS语句 | 简单语句和复合语句 

## 简单语句
1. ExpressionStatement  表达式语句 核心 驱动计算机运算
2. EmptyStatement   空语句   没有什么用  但是从语言的完备性上来说 可以有这样的存在的
3. DebuggerStatement   触发一个debugger断点
4. ThrowStatement   （后面四种都是控制语句）
5. ContinueStatement 
6. BreakStatement  结束整个循环
7. ReturnStatement

## 复合语句
1. BlockStatement
```
{}
```
2. IfStatement

3. SwitchStatement  老师不推荐使用
4. IterationStatement
 + while
 + do{}while
 + for(;;)
 + for(in)
 + for(of)
 + for await(of)

5. WithStatement 不推荐使用
6. LabelledStatement
7. TryStatement  三段结构 
```
try{}catche(e){}finally{}

try的花括号一定是需要有的
finally不论如何都是会被执行  不论是return也会执行
```

# JS语句 | 声明

1. FunctionDeclaration
2. GeneratorDeclaration
3. AsyncFunctionDeclaration
5. VariableStatement
6. ClassDeclaration
7. LexicalDeclaration  


function 
function *
async function 
async function *

上面的调用写在前面  声明在后面没有关系 

var  可以放在后面 但是是没有并赋值的

class 
const let   确保了在声明之前使用就会报错

## 预处理

```
var a = 2
void function(){
  a = 1
  return 
  var a
}()
console.log(a)   // 此时a= 2
```



```
var a = 2
void function(){
  a = 1;
  return 
  const a 
}()
console.log(a)
```
这里强调的是所有的声明都是有预处理机制  但是const let是能确保在声明前使用的话 就会报错

## 作用域
写大函数将会是常见  可以尝试使用 花括号进行分隔


# JS结构化 | 宏任务与微任务
## JS执行的粒度（运行时）
+ 宏任务
+ 微任务
+ 函数调用 
+ 语句

## 宏任务与微任务


## 事件循环
获取代码  --》 执行代码 --》 等待 --》 再次循环整个过程


# JS结构化 | JS 函数调用 

但是同一个任务中函数调用也是会让执行跳来跳去的

```
import {foo} from 'foo.js'
var i = 0
console.log(i)
foo()
console.log(i)
i++


foo.js

function foo(){
  console.log(i)
}
export {foo}
```

提出问题：js是如何做到 foo 函数里面的i是访问不到在它之前定义的i的呢 

形成了栈式的调用的关系 

Execution Contextx组成
+ code evaluation state
+ Function
+ Script or Module
+ Generator

+ Realm   保存所有的内置的对象
+ LexicalEnvironment
this   new.target super 变量

+ VariableEnvironment  处理var声明变量的  是一个历史的遗留的包袱


## Function -- Closure
每个函数都是会产生一个闭包

## Realm

在js中，函数表达式和对象直接量均会创建对象

使用 .做隐式转换也会创建对象

这些对象也是有原型的，如果我们没有Realm 就不知道它们的原型是什么

作业：找出Realm 有多少对象 ？
G6 

```
1.全局对象
 属性:
         Infinity     指定一个正负无穷大的数值
         NaN       指定一个 “非数字” 值
         undefined    指定一个未被赋值的变
  方法:
      decodeURI()       为加密的URI进行解码
       decodeURIComponent() 为加密的URI组件解码
       encodeURI()       将字符串加密为URI
       encodeURIComponent() 将字符串加密为URI组件
       escape(string)      加密一个字符串
       使用escape()对一个字符串进行解码
       eval_r(string)       判断一个字符串并将其以脚本代码的形式执行
       isFinite(number)     检测一个值是否为一个有限数字,返回True或False
       isNaN(string)      检测一个值是否不是一个有限数字
       Number()         将一个对象的值转换为一个数字
       parseFloat(string)    将一个字符串解析为一个浮点数字
       parseInt(string)     将一个字符串解析为一个整数,不是四舍五入操作,而是切尾
       String(object)      将一个对象值转换为一个字符串
       number(object)

2. Number
 属性:
      MAX_VALUE       The largest possible value a number in JavaScript can have 1.7976931348623157E+308
      MIN_VALUE       The smallest possible value a number in JavaScript can have 5E-324
      NaN          Equal to a value that is not a number.
      NEGATIVE_INFINITY A value that is less than MIN_VALUE.
      POSOTIVE_INFINITY A value that is greater than MAX_VALUE.
      prototype       A static property of the Number object
   方法:
      toString       Returns a string representing the specified object
      valueOf()      返回数学对象的原始值

3. Boolean
   属性:
      constructor 所建立对象的函数参考
      prototype    能够为对象加入的属性和方法
  方法:
      toSource()    显示对象的源代码
      toString()    将布尔值转换为字符串,并且返回结果
      valueOf()    返回布尔对象的原始值

4. String
  属性:
      constructor 所建立对象的函数参考
      prototype    能够为对象加入的属性和方法
      length      返回字符串的字符长度
  方法 :
      anchor("name")用来把字符串转换为HTML锚点标记内(<A NAME=>)
      big()      把字符串中的文本变成大字体(<BIG>)
      blink()     把字符串中的文本变成闪烁字体(<BLINK>)
      bold()      把字符串中的文本变成黑字体(<B>)
      fixed()     把字符串中的文本变成固定间距字体,即电报形式(<TT>)
      fontcolor(color)设置字符串中文本的颜色(<FONT COLOR=>)
      Fontsize(size) 把字符串中的文本变成指定大小(<FONTSIZE=>)
      italics()    把字符串中的文本变成斜字体(<I>)
      Link(url)用来把字符串转换-HTML链接标记中(<A HREF=>)
      small()     把字符串中的文本变成小字体(<SMALL>)
      strike()     把字符串中的文本变成划掉字体(<STRIKE>)
      sub()      把字符串中的文本变成下标(subscript)字体((SUB>)
      sup()      把字符串中的文本变成上标(superscript)字体(<SUP>)
      charAt(index) 返回指定索引处的字符
      charCodeAt(index)返回一个整数,该整数表示String对象中指定位置处的字符的Unicode编码
      concat(string2)连接两条或多条字符串
      fromCharCode(num1, num2, …, numN)获取指定的Unicode值并返回字符串
      indexOf(searchString, startIndex) 返回字符串中第一个出现指定字符串的位置
      lastlndexOf(searchString, startIndex) 返回字符串中最后一个出现指定字符串的位置
      match(regex) 在字符串中查找指定值
      replace(regex, newString)将字符串中的某些字符替换成其它字符
      search(regex) 针对某执行值对字符串进行查找
      slice(startIndex, endIndex)将部分字符抽出并在新的字符串中返回剩余部分
      split(delimiter)将字符串分配为数组
      substr(startIndex, length) 从startIndex取,取length个字符
      substring(startIndex, endIndex) 从startIndex和endIndex之间的字符,不包括endIndex
      toLowerCase() 把字符串中的文本变成小写
      toUpperCase() 把字符串中的文本变成大写
      toSource()    显示对象的源代码
      valueOf()    返回字符串对象的原始值

5. Array 
 属性:
      constructor 所建立对象的函数参考
      prototype    能够为对象加入的属性和方法
      index      For an array created by a regular expression match, the zero-based index of the match in the string.
　　input      For an array created by a regular expression match, reflects the original string against which the regular expression was matched.
　　length      获取数组元素的个数,即最大下标加1
   方法(13):
　　concat(array1,arrayn)将两个或两个以上的数组值连接起来,合并后返回结果
　　join(string) 将数组中元素合并为字符串,string为分隔符.如省略参数则直接合并,不再分隔
　　pop()      移除数组中的最后一个元素并返回该元素
　　push(value) 在数组的末尾加上一个或多个元素,并且返回新的数组长度值
　　reverse()    颠倒数组中元素的顺序,反向排列
　　shift()     移除数组中的第一个元素并返回该元素
　　slice(start, deleteCount, [item1[, item2[,...[,itemN]]]]) 返从一个数组中移除一个或多个元素,如果必要,在所移除元素的位置上插入新元素,返回所移除的元素
　　sort(compare Function) 在未指定排序号的情况下,按照元素的字母顺序排列,如果不是字符串类型则转换成字符串再排序,返回排序后的数组
　　splice()     为数组删除并添加新的元素
　　toSource()    显示对象的源代码
　　toString()    将数组所有元素返回一个字符串,其间用逗号分隔
　　unshift(value)为数组的开始部分加上一个或多个元素,并且返回该数组的新长度
　　valueOf()    返回数组对象的原始值
6. Object
   属性:
　　constructor Specifies the function that creates an object's prototype.
　　prototype    Allows the addition of properties to all objects.
 
7. Function
   属性:
　　arguments    An array corresponding to the arguments passed to a function.
　　arity      Indicates the number of arguments expected by the function.
　　caller      Specifies which function called the current function.
　　prototype    Allows the addition of properties to a Function object.
   方法:
　　toString     Returns a string representing the specified object.
 
9. Date
   属性(1):
　　constructor      所建立对象的函数参考
　　prototype       能够为对象加入的属性和方法
   方法(43):
　　getDay()        返回一周中的第几天(0-6)
　　getYear()       返回年份.2000年以前为2位,2000(包含)以后为4位
　　getFullYear()     返回完整的4位年份数
　　getMonth()      返回月份数(0-11)
　　getDate()       返回日(1-31)
　　getHours()       返回小时数(0-23)
　　getMinutes()      返回分钟(0-59)
　　getSeconds()      返回秒数(0-59)
　　getMilliseconds() 返回毫秒(0-999)
　　getUTCDay()      依据国际时间来得到现在是星期几(0-6)
　　getUTCFullYear()    依据国际时间来得到完整的年份
　　getUTCMonth()     依据国际时间来得到月份(0-11)
　　getUTCDate()      依据国际时间来得到日(1-31)
　　getUTCHours()     依据国际时间来得到小时(0-23)
　　getUTCMinutes()    依据国际时间来返回分钟(0-59)
　　getUTCSeconds()    依据国际时间来返回秒(0-59)
　　getUTCMilliseconds()依据国际时间来返回毫秒(0-999)
　　getTime()       返回从1970年1月1号0:0:0到现在一共花去的毫秒数
　　getTimezoneoffset() 返回时区偏差值,即格林威治平均时间(GMT)与运行脚本的计算机所处时区设置之间相差的分钟数)
　　parse(dateString)   返回在Date字符串中自从1970年1月1日00:00:00以来的毫秒数
　　setYear(yearInt)    设置年份.2位数或4位数
　　setFullYear(yearInt)设置年份.4位数
　　setMonth(monthInt) 设置月份(0-11)
　　setDate(dateInt)    设置日(1-31)
　　setHours(hourInt) 设置小时数(0-23)
　　setMinutes(minInt) 设置分钟数(0-59)
　　setSeconds(secInt) 设置秒数(0-59)
　　setMilliseconds(milliInt) 设置毫秒(0-999)
　　setUTCFullYear(yearInt) 依据国际时间来设置年份
　　setUTCMonth(monthInt) 依据国际时间来设置月(0-11)
　　setUTCDate(dateInt)     依据国际时间来设置日(1-31)
　　setUTCHours(hourInt)    依据国际时间来设置小时
　　setUTCMinutes(minInt) 依据国际时间来设置分钟
　　setUTCSeconds(secInt)    依据国际时间来设置秒
　　setUTCMilliseconds(milliInt)依据国际时间来设置毫秒
　　setTime(timeInt)    设置从1970年1月1日开始的时间.毫秒数
　　toGMTString()     根据格林威治时间将Date对象的日期(一个数值)转变成一个GMT时间字符串,如:Weds,15 June l997 14:02:02 GMT
　　toUTCString()     根据通用时间将一个Date对象的日期转换为一个字符串
　　toLocaleString()    把Date对象的日期(一个数值)转变成一个字符串,使用所在计算机上配置使用的特定日期格式
　　toSource()       显示对象的源代码
　　toString()       将日期对象转换为字符串
　　UTC(yyyy, mm, dd, hh, mm, ss, msec)返回从格林威治标准时间到指定时间的差距,单位为毫秒
　　valueOf()       返回日期对象的原始值
 
10. Math
   属性:
　　constructor      所建立对象的函数参考
　　prototype       能够为对象加入的属性和方法
　　E           欧拉常量,自然对数的底(约等于2.718)
　　LN2          2的自然对数(约等于0.693)
　　LN10          10的自然对数(约等于2.302)
　　LOG2E         以2为底的e的对数.(约等于1.442)
　　LOG10E         以10为底的e的对数(约等于0.434)
　　PI           ∏的值(约等于3.14159)
　　SQRT1_2        1/2(0.5)的平方根(即l除以2的平方根,约等于o.707)
　　SQRT2         2的平方根(约等于1.414)
    方法:
　　abs(x)     返回数字的绝对值
　　acos(x)    返回数字的反余弦值
　　asin(x)    返回数字的反正弦值
　　atan(x)    返回位于-PI/2 和 PI/2 的反正切值
　　atan2(y,x) 返回（x,y）位于 -PI 到 PI 之间的角度
　　ceil(x)    返回 x 四舍五入后的最大整数
　　cos(x)     返回一个数字的余弦值
　　exp(x)     返回 E^x 值
　　floor(x)    返回 x 四舍五入后的最小整数
　　log(x)     返回底数为E的自然对数
　　max(x,y)    返回 x 和 y 之间较大的数
　　min(x,y)    返回 x 和 y 之间较小的数
　　pow(x,y)    返回 y^x 的值
　　random()    返回位于 0 到 1 之间的随机函数
　　round(x)    四舍五入后取整
　　sin(x)     返回数字的正弦值
　　sqrt(x)    返回数字的平方根
　　tan(x)     返回一个角度的正切值
　　toSource() 显示对象的源代码
　　valueOf() 返回数学对象的原始值
```