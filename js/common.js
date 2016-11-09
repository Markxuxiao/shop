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
        