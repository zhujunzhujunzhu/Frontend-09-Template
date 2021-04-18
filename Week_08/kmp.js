/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-04-18 11:12:19
 * @LastEditors 朱俊
 * @LastEditTime 2021-04-18 12:03:17
 */

function kmp(pattern){
   let table = new Array(pattern.length).fill(0)
   let i = 1 ,j =0
   while(i<pattern.length){
   if(pattern[i] === pattern[j]){
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

 return table
}



function match(string){
   let pattern = 'abababc'
   let stateArr = createStateArr(pattern)
   let state = stateArr[0]
   for(let c of string){
     state = state(c)
     if(state === 'end'){
       return true
     }
   }

   return false
}


function createStateArr(pattern){
   let table = kmp(pattern)
   let arr = []
   table.forEach((it,index)=>{
     arr.push((c)=>{
       if(c === pattern[index]){
         if(index+1 === pattern.length) return 'end'
         return arr[index+1]
       }else{
         return arr[table[it]](c)
       }
     })
   })
   return  arr
}

console.log(match('abaababccccc'))