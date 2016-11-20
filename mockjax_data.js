// 前端开发接口模拟数据
// php开发时不需要加载此文件

//commen.js使用以下数据

//添加商品到购物车
$.mockjax({
  url: "index.php?act=cart&op=add"
  ,responseText : {
          state: true,
          msg:"操作成功"
  }
});


//收藏商品
$.mockjax({
  url: "index.php?act=member_favorites&op=favoritesgoods"
  ,responseText : {
          done: true,
          msg:"操作成功"
  }
});




//goods-cart.js使用以下数据
//删除购物车商品
$.mockjax({
  url: "index.php?act=cart&op=del&*"
  ,response: function (settings) {
      this.responseText = {
          state: true,
          // quantity: 0,购物车删光了必须要返回此值
          msg:"操作成功"
      }
  }
});
//修改购物车商品数量
$.mockjax({
  url: "index.php?act=cart&op=update&*"
  ,response: function (settings) {
      this.responseText = {
          state : 'true',// 'true' 'invalid' | 'shortage' | 'error'
          goods_price : 100,//商品单价
          goods_num : 1,// 最大可售库存
          subtotal : settings.data.quantity*100,//实际值为 购买个数*单价 php实时计算
          msg:'操作成功'
      }
  }
});


//goods-buy1.js使用以下数据
  $.mockjax({
    url: "/retData/data",
    responseText: {
      "errNum": 0,//0 为成功 1为失败
      "retMsg": "success",
      "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
              {id:2,name:"王xx某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:false}
      ]
    }
  });
  $.mockjax({
    url: "/retData/data1",
    responseText: {
      "errNum": 0,//0 为成功 1为失败
      "retMsg": "success",
      "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
      ]
    }
  });
  $.mockjax({
    url: "/retData/data2",
    responseText: {
      "errNum": 0,//0 为成功 1为失败
      "retMsg": "success",
      "retData": ""//如果用户把保存的地址删光了，请返回空
    }
  });

