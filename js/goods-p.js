$(function(){
    //主图片放大
    $(".jqzoom").imagezoom();
    $("#thumblist li a").click(function() {
      $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
      $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
      $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
    });

    // 规格选择
    $('dl[Jsmark="goods-spec"]').find('a').each(function(){
        $(this).click(function(){
            if ($(this).hasClass('hovered')) {
                return false;
            }
            $(this).parents('ul:first').find('a').removeClass('hovered');
            $(this).addClass('hovered');
            var goods_id = $(this).attr('data-goods_id');
            var goods_url = "http://www.baidu.com?" + goods_id;
            window.location.href = goods_url;
        });
    });

    /* 商品购买数量增减js */
    // 增加
    $('.increase').click(function(){
        num = parseInt($('#quantity').val());
                max = parseInt($('[Jsmark="goods_stock"]').text());
        if(num < max){
            $('#quantity').val(num+1);
        }
    });
    //减少
    $('.decrease').click(function(){
        num = parseInt($('#quantity').val());
        if(num > 1){
            $('#quantity').val(num-1);
        }
    });
    // 立即购买
    $('a[Jsmark="buynow_submit"]').click(function(){
        var goods_id = $('dl[Jsmark="goods-spec"]').find('a.hovered').attr('data-goods_id');
        buynow(goods_id,checkQuantity());
    });

    function buynow (goods_id,quantity){
        if(G.is_login()){
            $("#buynow_form").submit();
        }else{
            layer.open({
              type: 2,
              scrollbar: false,
              title: false,
              shadeClose: false,
              shade: 0.8,
              area: [ '410px','360px'],
              content: ['login2.html', 'no'] 
            }); 
        }
    }
    // 加入购物车
    $('a[Jsmark="addcart_submit"]').click(function(){
        var goods_id = $('dl[Jsmark="goods-spec"]').find('a.hovered').attr('data-goods_id');
        G.addcart(goods_id, checkQuantity());
    });

    // 验证购买数量
    function checkQuantity(){
        var quantity = parseInt($("#quantity").val());
        if (quantity < 1) {
            alert("请填写购买数量");
            $("#quantity").val('1');
            return false;
        }
        max = parseInt($('[Jsmark="goods_stock"]').text());
        if(quantity > max){
            alert("库存不足");
            return false;
        }
        return quantity;
    }

});


$(document).ready(function(){
    //热销排行切换
    $('#hot_sales_tab').on('mouseenter', function() {
        $(this).addClass('current');
        $('#hot_collect_tab').removeClass('current');
        $('#hot_sales_list').removeClass('hide');
        $('#hot_collect_list').addClass('hide');
    });
    $('#hot_collect_tab').on('mouseenter', function() {
        $(this).addClass('current');
        $('#hot_sales_tab').removeClass('current');
        $('#hot_sales_list').addClass('hide');
        $('#hot_collect_list').removeClass('hide');
    });

    // 商品内容介绍Tab样式切换控制
    $('#categorymenu').find("li").click(function(){
        $('#categorymenu').find("li").removeClass('current');
        $(this).addClass('current');
    });
    // 商品详情默认情况下显示全部
    $('#tabGoodsIntro').click(function(){
        $('.bd').css('display','');
        $('.hd').css('display',''); 
    });
    // 点击评价隐藏其他以及其标题栏
    $('#tabGoodsRate').click(function(){
        $('.bd').css('display','none');
        $('#id-goods-p-comment .bd').css('display','');
        $('.hd').css('display','none');
    });
    // 点击成交隐藏其他以及其标题
    $('#tabGoodsTraded').click(function(){
        $('.bd').css('display','none');
        $('#id-goods-p-salelog .bd').css('display','');
        $('.hd').css('display','none');
    });


    //评价模块
    $('#comment_tab').on('click', 'li', function() {
        $('#comment_tab li').removeClass('current');
        $(this).addClass('current');
        // load_goodseval($(this).attr('data-type'));
    });

        // load_goodseval('all');

        // function load_goodseval(type) {
        //     var url = 'http://localhost/shopnc/shop/index.php?act=goods&op=comments&goods_id=53';
        //     url += '&type=' + type;
        //     $("#goodseval").load(url, function(){
        //         $(this).find('[nctype="mcard"]').membershipCard({type:'shop'});
        //     });
        // }



});

