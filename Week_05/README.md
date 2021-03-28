# 第一课 Proxy与双向绑定
强大且危险   预期性会变差  为底层库设计的

Proxy的基本用法 
```
let object= {
  a:1,
  b:2
}

let po = new  Proxy(object,{
  set(obj,prop,val){
    console.log(obj,prop,val)
  }
})

```
一个普通的对象设置值的时候是没有办法实现监听的
当设置po时会触发set方法

设置一个po上没有的属性  它也会默认触发  因此比setter getter还要强大 
不仅仅对 get set进行处理  还拦截了很多内置的操作 可以改变它的行为

# 第二课 proxy与双向绑定|模仿reactive实现原理（一）
尝试将对象进行一个包装  在vue3中将reative拆解成了一个包  它也是使用proxy来实现



```
function reactive(object){
  return new Proxy(object,{
    set(obj,prop,val){
       console.log(obj,prop,val) 
       obj[prop] = val
       return obj[prop]
    },
    get(obj,prop){
      console.log(obj,prop)
    }
  })
}
```
一般都是会使用函数包装一层的
进行了set拦截的时候需要注意的  此时obj相应的属性并不会自动被改变 需要手动的去改变的
然后return出现 

关于文档  https://developer/mozilla.org/en-Us/Web/Javascript/Reference/Global_Objects/Proxy



# 第三课 proxy与双向绑定|模仿reactive实现原理（二）
如何去监听 
vue中的有意思的api  使用effect来会传入函数  
```
 effect(()=>{
   console.log(po.a)
 })
 
 let callbacks = []

 function effect(callback){
   callbacks.push(callbacks)
 }

 function reactive(object){
  return new Proxy(object,{
    set(obj,prop,val){
       obj[prop] = val
       for(let callback of callbacks){
         callback()
       }
       return obj[prop]
    },
    get(obj,prop){
      console.log(obj,prop)
    }
  })
}
```
这个目前来说的话 是比较耗用性能的  每次set都是执行所有的callback



# 第四课 proxy与双向绑定|模仿reactive实现原理（三）
给reactive与effect进行一个基本的连接  需要知道是使用了哪些变量的
vue中使用的技术 在get中进行依赖的收集
```
 effect(()=>{
   console.log(po.a)
 })
 
 let callbacks = new Map()
 let useReactivties = []
 function effect(callback){
   usedReactivies = [] ;// 先进行清空 
   callback() // 进行一次调用 
   for(let reactivity of usedReactivties){
      if(!callbacks.has(reactivity[0])){
        callbacks.set(reactivity[0],new Map())
      }
      if(!callbacks.get(reactivity[0]).has[reactivity[1]]){
        callbacks.get(reactivity[0]).set(reactivity[1],[])
      }

      callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
   }
 }

 function reactive(object){
  return new Proxy(object,{
    set(obj,prop,val){
       obj[prop] = val
       if(callbacks.get(obj) &&callbacks.get(obj).get(prop)){
           for(let callback of callbacks.get(obj).get(prop)){
               callback()
            }
       }
      
       return obj[prop]
    },
    get(obj,prop){
      usedReactivies.push([obj,prop])
      return obj[prop]
    }
  })
}
```
因为可能会发生多次注册  需要写一些防御性的代码 


# 第五课 proxy与双向绑定|优化reactive
并不能解决的 比如 po.a.b 这种的


```
 effect(()=>{
   console.log(po.a)
 })
 
 let callbacks = new Map()

 let reactivties = new Map()
 let useReactivties = []
 function effect(callback){
   usedReactivies = [] ;// 先进行清空 
   callback() // 进行一次调用 
   for(let reactivity of usedReactivties){
      if(!callbacks.has(reactivity[0])){
        callbacks.set(reactivity[0],new Map())
      }
      if(!callbacks.get(reactivity[0]).has[reactivity[1]]){
        callbacks.get(reactivity[0]).set(reactivity[1],[])
      }

      callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
   }
 }

 function reactive(object){
  if(reacivties.has(object)) // 进行缓存 
      return reactivies.get(object)
      

  let proxy = new Proxy(object,{
    set(obj,prop,val){
       obj[prop] = val
       if(callbacks.get(obj) &&callbacks.get(obj).get(prop)){
           for(let callback of callbacks.get(obj).get(prop)){
               callback()
            }
       }
      
       return obj[prop]
    },
    get(obj,prop){
      usedReactivies.push([obj,prop])
      if(typeof obj[prop] === 'object')
        return  reactive(obj[prop])
      return obj[prop]
    }
  })

  reactivties.set(object,proxy)
  return proxy
}
```


# 第六课 proxy 与双向绑定 | reactivity 响应式对象
## 半成本的双向绑定

```
<input id="r" />

// 双向绑定的实现
effect(()=>{
  document.getElementById("r").value = po.r
})

document.getElementById("r").addEventListener("input",(event)=>{
  po.r = event.target.value
})

```

## 实现一个 rgb的调色器
```
<input id="r" type="range" min=0 max=255 />
<input id="g" type="range" min=0 max=255 />
<input id="b" type="range" min=0 max=255 />
<div id="color" style="width:100px;height:100px">

let object = {
  r:1,g:1,b:1
}
let po = reactive(object)
effect(()=>{
  document.getElementById("r").value = po.r
})
effect(()=>{
  document.getElementById("g").value = po.g
})
effect(()=>{
  document.getElementById("b").value = po.b
})
effect(()=>{
   document.getElementById("color").style.backgroundColor=`rgb(${po.r},${po.g},${po.b})`
})

document.getElementById("r").addEventListener("input",(event)=>{
  po.r = event.target.value
})
document.getElementById("g").addEventListener("input",(event)=>{
  po.g = event.target.value
})
document.getElementById("b").addEventListener("input",(event)=>{
  po.b = event.target.value
})
```
双向绑定的强大之处 我们仅仅是对变量与值进行了一个简单的绑定的关系  如果配置一个语法糖的话  就可以实现0代码实现交互  通过绑定关系的声明来实现一个交互  而这一切的基础都是基于这个reactive响应式对象 

# 第七课  使用Range实现DOM精确操作 | 基本拖拽

## 基本的拖拽的实现的方式：
利用mousedown mouseup 与mousemove 三者结合，其中重要的一个技巧：mousedown是对拖拽元素进行监听，而mouseup与mousemove是对document上进行监听
```
  dragable.addEventListener("mousedown", function (event) {
    const up = (event) => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    const move = (event) => {
      console.log(event);
    };
    document.addEventListener("mouseup", up);
    document.addEventListener("mousemove", move);
  });
```
## 解决首次点击问题与二次拖拽问题
traslate是相对于目前已经在的位置的一个偏移 因此需要减去起始点击点的位置  同时进行二次拖动的时候 之前的位置也是需要保存的
``` 
  let dragable = document.getElementById("dragable");
  let baseX = 0,
    baseY = 0;
  dragable.addEventListener("mousedown", function (event) {
    let startX = event.clientX,
      startY = event.clientY;
    const up = (event) => {
      baseX = baseX + event.clientX - startX;
      baseY = baseY + event.clientY - startY;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    const move = (event) => {
      dragable.style.transform = `translate(${
        baseX + event.clientX - startX
      }px,${baseY + event.clientY - startY}px)`;
    };
    document.addEventListener("mouseup", up);
    document.addEventListener("mousemove", move);
  });
```

# 第八课 使用Range实现DOM精确操作 | 正常流拖拽

## 利用range将空隙找出 并找出离当前点最近的range
```
  let ranges = [];
  let container = document.getElementById("container");
  for (
    let index = 0;
    index < container.childNodes[0].textContent.length;
    index++
  ) {
    let range = document.createRange();
    range.setStart(container.childNodes[0], index);
    range.setEnd(container.childNodes[0], index);

    console.log(range.getBoundingClientRect());
    ranges.push(range);
  }

  // 找到最近的range
  function getNearest(x, y) {
    let min = Infinity;
    let nearest = null;
    for (let range of ranges) {
      let rect = range.getBoundingClientRect();
      let distance = (rect.x - x) ** 2 + (rect.y - y) ** 2; 
      if (distance < min) {
        nearest = range;
        min = distance;
      }
    }

```

### 原有的拖拽的修改
主要是对move方法进行修改   这里插入 如果dom元素中已经是存在的 会插入之后 自动移除
``` 
    const move = (event) => {
      let range = getNearest(
        baseX + event.clientX - startX,
        baseY + event.clientY - startY
      );
      range.insertNode(dragable); 
    };
```