
$(document).ready(function(){

   var zTreeObj;
   // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
   var setting = {
      view: {
         showIcon: false,
         showLine: false

      },
      callback: {
         onClick: zTreeOnClick
      }
   };

   // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
   var zNodes = [
         {name:"建材厨卫类", open:true, children:[
               {name:"瓷砖品牌",open:true, children:[
                  {name:"普通砖",}, 
                  {name:"微晶石"}
               ]}, 
               {name:"地板品牌",open:true, children:[
                  {name:"实木地板",}, 
                  {name:"复合地板"}
               ]}
         ]},
         {name:"test2", open:false, children:[
            {name:"test2_1"}, 
            {name:"test2_2"}
         ]}
      ];
   // 获取树json数据
   // $.ajax({
   //  　　type: "POST", //用POST方式传输
   //  　　dataType: "json", //数据格式:JSON
   //  　　url: 'Login.ashx', //目标地址
   // 　　 data: "dealType=" + dealType +"&uid=" + uid + "&code=" + code,
   // 　　 error: function (XMLHttpRequest, textStatus, errorThrown) { },
   //  　　success: function (msg){ }
   //  });

   zTreeObj = $.fn.zTree.init($("#goodstree"), setting, zNodes);

   //页面跳转事件绑定
   function zTreeOnClick(event, treeId, treeNode) {
      var URL = "http://www.baidu.com/?" + treeNode.name;
      window.location.href= URL; 
      // alert(treeNode.tId + ", " + treeNode.name);
   };
});