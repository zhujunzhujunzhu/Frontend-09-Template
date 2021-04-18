/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-04-16 10:16:40
 * @LastEditors 朱俊
 * @LastEditTime 2021-04-18 10:34:15
 */
// abcabx

function match(string){
  let state = start;
  for(let c of string){
    state = state(c)
  }
  return state === end 
}

function start(c){
  if(c ==='a'){
    return foundA
  }else{
    return start
  }
}

function foundA(c){
  if(c==='b'){
     return foundB
  }else{
    return start(c)
  }
}

function foundB(c){
  if( c==='c'){
     return foundC
  }else{
    return start(c)
  }
}

function foundC(c){
  if(c==='a'){
     return foundA1
  }else{
    return start(c)
  }
}

function foundA1(c){
  if(c==='b'){
    return foundB1
 }else{
   return start(c)
 }
}

function foundB1(c){
  if(c==='x'){
    return  end
 }else if(c === 'c'){
   return foundB(c)
 }else{
   return start(c)
 }
}

function end(c){
  return end
}

// abcabx
console.log(match('abcabcabx'))