# 第一课 字符串分析算法 
1. 字典树   大量高重复字符串存储与分析
2. KMP  在长字符串中找模式
3. Wildcard  带通配符的字符串模式
4. 正则  字符串通用模式匹配
5. 状态机  通用的字符串分析 （正则与有限状态机差不多  但是有限状态机更强大 ）
6. LL LR 字符串多层级结构分析


# 第二课 字典树
## 字典树是什么？  
 字典  字典树 Tire  字典树存储方式
## 字典树的应用场景 
我们平时会查字典 查字典变成一个树形的结构 就是字典树

## 在代码中如何实现字典树？
利用对象来保存字典树  为了干净使用Object.create 
利用 $ 表示截止符  但是由于$本身也会出现  可以采用  Symbol的方式去处理
Symbol不可重复的特点

randomWord 产生随机的单词

most 找出最多的单词  返回每个树上的单词如何处理 还可以找到最小的 还可以找到最大的   还可以处理数据  比较可以对 1 进行补位  00001 这种补位
如何找出字典树中使用最多的次数
most
```
   function most(node) {
     let max = 0
     let maxWord = null

     const visit = (node,word)=>{
       if(node[$] && node[$]>max){
         max = node[$]
         maxWord = word
       }
       for(p in node){
         visit(node[p],word+p)
       }
     }
   }
```


# 第三课 KMP

https://www.cnblogs.com/dusf/p/kmp.html



# 第四课 WildCard
* ?
先考虑只有*的情况
* 到底应该尽可能匹配的多还是少呢？在最后一个 *之前的应该是少匹配的
最后一个*是多匹配的

