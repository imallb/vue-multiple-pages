### pages
单页面中必须创建的几个文件：  
  
index.js        单页面出口文件  
index.html      单页面显示加载的html文件  
index.scss      单页面的css样式文件  

### main.js
main.js全局配置出口文件，作用在各个单页面中，以下为项目常见全局配置输出：  

window.$vue     创建的全局vue对象，其他单页面出口文件中（index.js）使用  
vplus           vue自定义方法和过滤全局文件夹  
components      全局组件存放文件夹，index.js为输出文件  
request.js      全局ajax接口请求配置文件  
style/index.scss网页默认样式  
