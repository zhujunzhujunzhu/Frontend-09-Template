/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-04-16 10:16:40
 * @LastEditors 朱俊
 * @LastEditTime 2021-04-18 10:46:20
 */
// abababx

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
  if( c==='a'){
     return foundA1
  }else{
    return start(c)
  }
}

function foundA1(c){
  if(c==='b'){
     return foundB1
  }else{
    return foundA(c)
  }
}

function foundB1(c){
  if( c==='a'){
     return foundA2
  }else{
    return foundB(c)
  }
}

function foundA2(c){
  if(c==='b'){
     return foundB2
  }else{
    return foundA1(c)
  }
}

function foundB2(c){
  if( c==='x'){
     return end
  }else{
    return foundB1(c)
  }
}


function end(c){
  return end
}

// // abababx
console.log(match('abacbxabxabababx'))