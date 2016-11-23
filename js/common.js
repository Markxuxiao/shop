
// 全局函数
var G = {
    // 格式化为带小数点的形式
    // param num 原始数据
    // param ext 小数位位数
    // return 格式化后的数据
    number_format:function(num, ext){
        if(ext < 0){
            return num;
        }
        num = Number(num);
        if(isNaN(num)){
            num = 0;
        }
        var _str = num.toString();
        var _arr = _str.split('.');
        var _int = _arr[0];
        var _flt = _arr[1];
        if(_str.indexOf('.') == -1){
            /* 找不到小数点，则添加 */
            if(ext == 0){
                return _str;
            }
            var _tmp = '';
            for(var i = 0; i < ext; i++){
                _tmp += '0';
            }
            _str = _str + '.' + _tmp;
        }else{
            if(_flt.length == ext){
                return _str;
            }
            /* 找得到小数点，则截取 */
            if(_flt.length > ext){
                _str = _str.substr(0, _str.length - (_flt.length - ext));
                if(ext == 0){
                    _str = _int;
                }
            }else{
                for(var i = 0; i < ext - _flt.length; i++){
                    _str += '0';
                }
            }
        }

        return _str;
    }
    ,is_login:function(){
        var data = $('#ttbar-login').find(".link-regist").length;
        if(data){
            return false; 
        }else{
            return true;
        }
    }
    /** 
    * @description 加入购物车
    * @param {Number} goods_id 必须 商品id
    * @param {Number} quantity 必须 商品数量
    * @return
    */ 
    ,addcart:function(goods_id, quantity){
        if (!quantity) return false;
        var url = 'index.php?act=cart&op=add';
        $.getJSON(url, {'goods_id':goods_id, 'quantity':quantity}, function(data){
            if(data != null){
                if (data.state){
                    //更新购物车
                    this.load_cart_information();
                }else{
                    layer.alert(data.msg);
                }
            }
        });
    }
    /** 
    * @description 头部删除购物车信息
    * @param {Number} goods_id 登录前使用goods_id
    * @param {Number} cart_id 登录后使用cart_id
    * @return
    */ 
    ,drop_topcart_item:function(cart_id,goods_id){
        // var url = 'index.php?act=cart&op=del&cart_id='+cart_id+'&goods_id='+goods_id+'&callback=?';
        var url = 'index.php?act=cart&op=del'
        $.getJSON(url, function(result){
            if(result.state){
                var obj = $('#settleup').find(".dorpdown-layer");
                var html = '';
                //删除成功
                if(result.quantity == 0){
                    html='<div class="nogoods">购物车中还没有商品，赶紧选购吧！</div>';
                    $('#shopping-amount').html("0");
                    obj.html(html);
                }else{
                    $('#shopping-amount').html(result.quantity);
                    $('#cart_item_' + goods_id).remove();
                    html='<div class="p-total">共<b>'+result.quantity+'</b>件商品　共计<strong>￥ '+result.amount+'</strong></div><a href="./goods-cart.html" title="去购物车" id="btn-payforgoods">去购物车</a>';
                    obj.find('.smb').html(html);
                }
            }else{
                layer.alert(result.msg);
            }
        });
    }
    // 头部加载购物车信息
    ,load_cart_information:function(){
        $.getJSON('/index.php?act=cart&op=ajax_load', function(result){
            var obj = $('#settleup').find(".dorpdown-layer");
            var html = '';
            if(result){
                if(result.cart_goods_num >0){
                    $('#shopping-amount').html(result.cart_goods_num);
                    html+='<div id="settleup-content"><div class="smt"><h4 class="fl">最新加入的商品</h4></div><div class="smc"><ul>';
                    for (var i = 0; i < result['list'].length; i++){
                        var goods = result['list'][i];
                        html+='<li id="cart_item_'+goods['goods_id']+'" >'
                        html+='<div class="p-img fl">'
                        html+='<a href="'+goods['goods_url']+'" target="_blank"><img src="'+goods['goods_image']+'" width="50" height="50" alt=""></a>'
                        html+='</div>'
                        html+='<div class="p-name fl">'
                        html+='<a href="'+goods['goods_url']+'" title="'+goods['goods_name']+'" target="_blank">'+goods['goods_name']+'</a>'
                        html+='</div>'
                        html+='<div class="p-detail fr ar">'
                        html+='<span class="p-price"><strong>￥'+goods['goods_price']+'</strong>×'+goods['goods_num']+'</span><br>'
                        html+='<a class="delete" data-goods_id="'+goods['goods_id']+'" data-cart_id="'+goods['cart_id']+'" data-type="RemoveProduct" href="javascript:void(0)">删除</a>'
                        html+='</div>'
                        html+='</li>';
                    }
                    html+='</ul></div><div class="smb ar"><div class="p-total">共<b>'+result.cart_goods_num+'</b>件商品　共计<strong>￥ '+result.cart_all_price+'</strong></div><a href="./goods-cart.html" title="去购物车" id="btn-payforgoods">去购物车</a></div></div>';
                    obj.html(html);
                    $('#shopping-amount').html(result.cart_goods_num);
              } else {
                html='<div class="nogoods">购物车中还没有商品，赶紧选购吧！</div>';
                $('#shopping-amount').html("0");
                obj.html(html);
              }
           }
        });
    }
    /** 
    * @description 收藏商品
    * @param {Number} fav_id 必须 商品id
    * @param {Function} callback 可选 收藏成功的回调
    * @return {Boolean} 
    */ 
    ,collect_goods:function (fav_id,callback){
        if(G.is_login()){
            var url = 'index.php?act=member_favorites&op=favoritesgoods';
            $.getJSON(url, {'fid':fav_id}, function(data){
                if (data.done){
                   callback();
                }else{
                    layer.alert(data.msg);
                }
            });
        }
    }

};

// 序列化表单值为json
$.fn.serializeJson=function(){
    var serializeObj={};
    var array=this.serializeArray();
    var str=this.serialize();
    $(array).each(function(){
        if(serializeObj[this.name]){
            if($.isArray(serializeObj[this.name])){
                serializeObj[this.name].push(this.value);
            }else{
                serializeObj[this.name]=[serializeObj[this.name],this.value];
            }
        }else{
            serializeObj[this.name]=this.value;    
        }
    });
    return serializeObj;
};

$(function() {
    //首页导航模块下拉
    $(".site-nav-h").hover(
        function() {
            $(".site-nav-h-item .dd-inner").addClass("hover");
        }, 
        function() {
            $(".site-nav-h-item .dd-inner").removeClass("hover");
            $(".dorpdown-layer").removeClass("hover");
        }
    );
    $(".site-nav-h-item .dd-inner").children(".item").hover(
        function() {
            $(this).addClass("hover").siblings(".item").removeClass("hover");
            var index = $(this).index();
            $(".dorpdown-layer").addClass("hover");
            $(".dorpdown-layer").children(".item-sub").hide();
            $(".dorpdown-layer").children(".item-sub").eq(index).show();
        }
    );
    //初始化加载购物车
    G.load_cart_information();

    $( "#settleup" )
      .mouseenter(function() {
         $("#settleup").addClass("hover");
         console.log('in');
      })
      .mouseleave(function() {
         $("#settleup").removeClass("hover");
         console.log('out');
      });


    //购物车删除按钮
     $(".site-header").on('click','[data-type="RemoveProduct"]',function(){
        var goods_id = $(this).data("goods_id");
        G.drop_topcart_item("",goods_id);
     });

    //如果layer弹窗插件存在则显示ajax加载动画
    // if(typeof layer !== "undefined"){
    //     $.ajaxSetup({
    //         timeout : 5000, //超时时间设置，单位毫秒
    //         beforeSend:function(){
    //             layer.load();
    //         },
    //         complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
    //                 layer.closeAll('loading');
    //                 if(status=='timeout'){//超时,status还有success,error等值的情况
    //                     layer.msg('网络超时！');
    //                 };
    //                 if(status=='error'){
    //                     layer.msg('请求失败！');
    //                 }     
    //         }
    //     });
    // };
});
        