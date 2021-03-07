第一课：
迷宫编辑器 
学到的知识：
数组填充技巧：Array(10000).fill(0)
左键按下绘制迷宫：
let mousedown  = false
cell.addEventListener('mouseover',()=>{if(mousedown){dosth()}})
document.addEventListener('mousedown',()=>{mousedown = true})
document.addEventListener('mouseup',()=>{mousedown = false})

第二课：
广度优先算法 
从起点能走到哪里？从起点第一步能走到哪里？
已经能够走过来的点不添加，不断去找。
遇到边或者障碍物便停止去找

为什么不太适合使用递归？利用递归是一个深度优先搜索

queue  队列  先进先出
javasscript中的数组是天然的队列（shift unshift）与栈（pop unpop）


广度优先搜索基本的算法：
```
function path(start,end){
   var queue = [start]

   function insert(x,y){
      // 边界判断 障碍物判断 
      // 入队
      queue.push([x,y])
   }
   while(queue.length){
      let [x,y] = queue.shift() // 出队
      // 插入一定条件的点 在寻路中 上下左右
      insert(...)
      if(x === end[0] && y===end[1]){
        return true // 出口点
      } 
   }
   return true
}
```


第三课：
可视化广度优先搜索过程


第四课：
绘制最短路径

第五课：
启发式搜索
