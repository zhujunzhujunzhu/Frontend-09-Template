第一课 词法分析

字符串进行初步分析  使用LL语法构件AST
首先进行编程语言进行分词

构件AST的过词也叫作语法分析   LL算法 


安全：四则运算分析
有意义的输入 Token  
词法定义：TokenNumber OPerrateor Whitespace LineTerminator
语法定义：
<Expression>::= 
   <AdditiveExpression><EOF>
<AdditiveExpression>::=
   <MultiplicativeExpression>
   |<AdditiveExpression><+><MulticativeExpression>
   |<AdditiveExpression><-><MulticativeExpression>
<MultiplicativeExpression>:: = 
   <Number>
   |<MultiplicativeExpression><*><Number>
   |<MultiplicativeExpression></><Number>



第二课 词法分析代码 

regExp.exec 
w3c:如果exec()找到了匹配的文本，则返回一个结果数组。否则返回null。
    但是，当RegExpObject是一个全局表达式时，exec()的行为就稍微复杂一些。它会有RegExpObject的lastIndex属性指定字符处开始检索字符串。当exec()找到了与表达时相匹配的文本时，在匹配后，它将把RegExpObject的lastIndex属性设置为匹配文本的最一个字符的下一个位置。这就是说，您可以通过反复调用exec()方法来遍历字符串中的所有匹配文本。当exec再也找不到匹配的文本时，它将返回为null，并将lastIndex属性重置为0.

从运行的结果来看，对于分组exec每次的返回结果也是很有意思的 
数组长度为正则中分组的个数的长度+1 其中第0位 存储的是当前匹配到的结果  后面的分组依次对应后面的索引  如果有值的话 在索引处填充内容 

第三课 词法分析代码