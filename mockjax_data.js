// 前端开发接口模拟数据
// php开发时不需要加载此文件

//commen.js使用以下数据
  //获取购物车信息



  //添加商品到购物车
  $.mockjax({
    url: "index.php?act=cart&op=add"
    ,responseText : {
            state: true,
            msg:"操作成功"
    }
  });


  //加载购物车信息
  $.mockjax({
    url: "/index.php?act=cart&op=ajax_load"
    ,responseText : {
            cart_all_price:12312.12,
            cart_goods_num:3, 
            list:[
              {cart_id:1,goods_id:1,goods_url:"./goods-p.html",goods_name:"2014春款打底毛衫拼色毛衣 长袖套头针织衫 莺 绿色",goods_image:"../shop/images/temp/01_mid.jpg",goods_price:111.23,goods_num:14}
              ,{cart_id:2,goods_id:2,goods_url:"./goods-p.html",goods_name:"2014春款打底毛衫拼色毛衣 长袖套头针织衫 莺 绿色",goods_image:"../shop/images/temp/01_mid.jpg",goods_price:111.23,goods_num:14}
              ,{cart_id:3,goods_id:3,goods_url:"./goods-p.html",goods_name:"2014春款打底毛衫拼色毛衣 长袖套头针织衫 莺 绿色",goods_image:"../shop/images/temp/01_mid.jpg",goods_price:111.23,goods_num:14}
            ],
            msg:"操作成功"
    }
  });

  //删除购物车信息
  $.mockjax({
    url: "index.php?act=cart&op=del"
    ,responseText : {
            state:"success",
            amount:112.12,
            quantity:2, 
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
  //修改地址
  $.mockjax({
    url: "/retData/data",
    responseText: {
      "errNum": 0,//0 为成功 1为失败
      "retMsg": "success",
      "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true,city_id:23,area_id:34},
              {id:2,name:"王xx某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:false,city_id:11,area_id:324}
      ]
    }
  });
  $.mockjax({
    url: "/retData/data1",
    responseText: {
      "errNum": 0,//0 为成功 1为失败
      "retMsg": "success",
      "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true,city_id:11,area_id:324},
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
  
  //运费api
  $.mockjax({
    url: "/index.php?act=buy&op=change_addr",
    responseText: {
      "errNum": 0,//0 为成功 1为失败
      "retMsg": "success",
      "retData": {"1":11,"2":12.3}//有几个店铺返回几个运费 店铺:运费
    }
  });
