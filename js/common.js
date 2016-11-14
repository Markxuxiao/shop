//加载购物车信息
// function load_cart_information(){
//     $.getJSON(SITEURL+'/index.php?act=cart&op=ajax_load&callback=?', function(result){
//         var obj = $('.head-user-menu .my-cart');
//         if(result){
//             var html = '';
//             if(result.cart_goods_num >0){
//                 for (var i = 0; i < result['list'].length; i++){
//                     var goods = result['list'][i];
//                     html+='<dl id="cart_item_'+goods['goods_id']+'"><dt class="goods-name"><a href="'+goods['goods_url']+'">'+goods['goods_name']+'</a></dt>';
//                     html+='<dd class="goods-thumb"><a href="'+goods['goods_url']+'" title="'+goods['goods_name']+'"><img src="'+goods['goods_image']+'"></a></dd>';
//                     html+='<dd class="goods-sales"></dd>';
//                     html+='<dd class="goods-price"><em>&yen;'+goods['goods_price']+'×'+goods['goods_num']+'</dd>';
//                     html+='<dd class="handle"><a href="javascript:void(0);" onClick="drop_topcart_item('+goods['cart_id']+','+goods['goods_id']+');">删除</a></dd>';
//                     html+="</dl>";
//                 }
//                 obj.find('.incart-goods').html(html);
//                 obj.find('.incart-goods-box').perfectScrollbar('destroy');
//                 obj.find('.incart-goods-box').perfectScrollbar();
//                 html = "共<i>"+result.cart_goods_num+"</i>种商品&nbsp;&nbsp;总计金额：<em>&yen;"+result.cart_all_price+"</em>";
//                 obj.find('.total-price').html(html);
//                 if (obj.find('.addcart-goods-num').size()==0) {
//                     obj.append('<div class="addcart-goods-num">0</div>');
//                 }
//                 obj.find('.addcart-goods-num').html(result.cart_goods_num);
//           } else {
//             html="<div class='no-order'><span>您的购物车中暂无商品，赶快选择心爱的商品吧！</span></div>";
//             obj.find('.incart-goods').html(html);
//             obj.find('.total-price').html('');
//           }
//        }
//     });
// }
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
        if(true){
           return true; 
       }else{
        alert("请登录");
        return false;
       }
        
    }
    //goods_id:商品id
    //quantity:商品数量
    ,addcart:function(goods_id, quantity){
        if (!quantity) return false;

        var url = 'index.php?act=cart&op=add';
        console.log("已添加到购物车"+ goods_id + quantity);
        // $.getJSON(url, {'goods_id':goods_id, 'quantity':quantity}, function(data){
        //     if(data != null){
        //         if (data.state){
                    //更新购物车
        //             this.load_cart_information();
        //         }else{
        //             alert(data.msg);
        //         }
        //     }
        // });
    }
    // 头部加载购物车信息
    ,load_cart_information:function(){
        alert("load_cart_information")
    }
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
    )

})
        