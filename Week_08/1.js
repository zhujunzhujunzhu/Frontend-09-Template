/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-04-15 13:13:00
 * @LastEditors 朱俊
 * @LastEditTime 2021-04-16 09:03:32
 */

/**
 使用状态机处理指在字符串中找到ab
 */
function state(str){
  let foundA = false
  for(let c of str){
    if(c==='a'){
      foundA = true
    } else if(foundA && c== 'b'){
      return true
    }else {
      foundA = false
    }
  }
  return false
 }

//  console.log(state('acbsab'))

 /**
  可以将上面的弄的复杂些  比较查找 aba 这个
 */
function state_aba(str){
  let foundA1 = false
  let foundB = false
  // let foundA2 = false
  
  for(let c of str){
    if(foundA1 && foundB && c=='a'){
      return true
    } // 将已经达成的状态先处理的
    if(c==='a'){
      foundA1 = true
    }else if(foundA1 && c==='b'){
      foundB = true
    }
  }
  return false
}

// console.log(state_aba('ccbacabbabaab'))

/**
   state_ababbac
   如果这个是我的重要的目标的话  我应该去做些什么的
   这种的我 我从状态机的角度来分析
   a  状态为foundA
   如果在状态为 a的情况下 下一个字母为b  那么foundAB 不是的话 直接foundA =false
   如果 foundAB 下一个字母为a则foundABA 如果不是的话 直接foundA = false
   如果 foundABA 下一个字母为b 则foundABAB   如果不为b呢  此时我需要确定它是什么 a的话

   kmp算法还是比较难理解的

   str:"abcbababaabcbab"
   pattern:"ababaca"

   1 aa 遇到第一个a 进入状态1   遇到第二个a虽然也是不符合预期 还是到状态1 而不是0
   2 abaa  这种的话 aba状态已经为3 了  此时回到的还是状态1
   3 ababab  这种的话 b是没有命中的 此时应该进入的是状态 3  差不多明白了一点的  最长子串的  
   如何判断进入的状态的呢？  

   直接先来分析  ababaca 
   ababa 这种的话 最长的是aba

   


 */
function state_ababbac(str){
  let foundA1 = false
  let foundB = false
  // let foundA2 = false
  
  for(let c of str){
    if(foundA1 && foundB && c=='a'){
      return true
    } // 将已经达成的状态先处理的
    if(c==='a'){
      foundA1 = true
    }else if(foundA1 && c==='b'){
      foundB = true
    }
  }
  return false
}

console.log(state_aba('ccbacabbabaab'))

// 如果需要判断的字符串是不确定的  kml的状态机的表示方式  