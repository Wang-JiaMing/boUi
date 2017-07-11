# boUi 
**作者:王嘉明**

简介:根据bootstrap提供的样式二次开发针对该UI的配置化插件,主要提供boTable,boDataGrid,boSelect,boSelectLinkage等插件.

---
### boSelect(下拉控件)

**例子**
$('#xxx').getBootstrapSelect({      
 url:,//后台json请求地址    
hasnull:false,//是否增加一个空选择            
name:,//select name  
cache:true,     
selectValueName:value,//默认GCODE
selectKeyName:key,//默认GNAME   
onLoadSuccess:function(data){//加载成功后触发的方法  },   
onSelected:function(data){//加载成功后触发的方法
   
  }
});

**参数说明**
