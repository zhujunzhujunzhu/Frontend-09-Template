/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-03-17 08:00:55
 * @LastEditors 朱俊
 * @LastEditTime 2021-03-17 22:07:16
 */
function kmp(source,pattern){
  // 计算table
  let table = new Array(pattern.length).fill(0)
 {
  let i = 1 ,j =0
  while(i<pattern.length){
    if(pattern[i]=== pattern[j]){
      ++i
      ++j
      table[i] = j
    }else{
      if(j>0){
        j = table[j]
      }else{
        ++i
      }     
    }
  }
 }
 console.log(table)
  // 做匹配
  {
    let i =0,j=0
    while(i<source.length){
      if(pattern[j]=== source[i]){
        ++i
        ++j
      }else{
        if(j>0){
          j = table[j]
        }else{
          ++i
        }
      }

      if(j === pattern.length) 
         return true
    }

    return false
  }
}


console.log(kmp("aaxlxlalaallxahelalowxxxxlalaallxlalaall","xxlalaallx"))