/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-04-03 19:02:42
 * @LastEditors 朱俊
 * @LastEditTime 2021-04-03 19:05:57
 */
var str2utf8 =  function(str) {
  return eval('\''+encodeURI(str).replace(/%/gm, '\\x')+'\'');
}


console.log(str2utf8("你好，世界"))