$(function(){

       $(".jqzoom").imagezoom();
       $("#thumblist li a").click(function() {
          $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
          $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
          $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
       });

    // 规格选择
    $('dl[nctype="nc-spec"]').find('a').each(function(){
        $(this).click(function(){
            if ($(this).hasClass('hovered')) {
                return false;
            }
            $(this).parents('ul:first').find('a').removeClass('hovered');
            $(this).addClass('hovered');
            checkSpec();
        });
    });

    // function checkSpec() {
    //     var spec_param = [{"sign":"239","url":"http:\/\/localhost\/shopnc\/shop\/index.php?act=goods&op=index&goods_id=46"},
    //     {"sign":"240","url":"http:\/\/localhost\/shopnc\/shop\/index.php?act=goods&op=index&goods_id=47"},
    //     {"sign":"241","url":"http:\/\/localhost\/shopnc\/shop\/index.php?act=goods&op=index&goods_id=48"},
    //     {"sign":"242","url":"http:\/\/localhost\/shopnc\/shop\/index.php?act=goods&op=index&goods_id=49"},
    //     {"sign":"243","url":"http:\/\/localhost\/shopnc\/shop\/index.php?act=goods&op=index&goods_id=50"},
    //     {"sign":"228","url":"http:\/\/localhost\/shopnc\/shop\/index.php?act=goods&op=index&goods_id=51"}];
    //     var spec = new Array();
    //     $('ul[nctyle="ul_sign"]').find('.hovered').each(function(){
    //         var data_str = ''; eval('data_str =' + $(this).attr('data-param'));
    //         spec.push(data_str.valid);
    //     });
    //     spec1 = spec.sort(function(a,b){
    //         return a-b;
    //     });
    //     var spec_sign = spec1.join('|');
    //     $.each(spec_param, function(i, n){
    //         if (n.sign == spec_sign) {
    //             window.location.href = n.url;
    //         }
    //     });
    // }

    /* 商品购买数量增减js */
    // 增加
    $('.increase').click(function(){
        num = parseInt($('#quantity').val());
                max = parseInt($('[nctype="goods_stock"]').text());
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

    // // 加入购物车
    // $('a[nctype="addcart_submit"]').click(function(){
    //     addcart(48, checkQuantity());
    // });

    /* add cart */
    function addcart(goods_id, quantity)
    {
        if (!quantity) return false;
        var url = 'index.php?act=cart&op=add';
        $.getJSON(url, {'goods_id':goods_id, 'quantity':quantity}, function(data){
            if(data != null){
                if (data.state)
                {
                    $('#bold_num').html(data.num);
                    $('#bold_mly').html(price_format(data.amount));
                    $('.ncs-cart-popup').fadeIn('fast');
    //                 setTimeout(slideUp_fn, 5000);
                    // 头部加载购物车信息
                    load_cart_information();
                }
                else
                {
                    alert(data.msg);
                }
            }
        });
    };

    // 验证购买数量
    function checkQuantity(){
        var quantity = parseInt($("#quantity").val());
        if (quantity < 1) {
            alert("请填写购买数量");
            $("#quantity").val('1');
            return false;
        }
        max = parseInt($('[nctype="goods_stock"]').text());
        if(quantity > max){
            alert("库存不足");
            return false;
        }
        return quantity;
    }
    // // 立即购买
    // $('a[nctype="buynow_submit"]').click(function(){
    //     buynow(48,checkQuantity());
    // });
    // function buynow(goods_id,quantity){
    // <?php if ($_SESSION['is_login'] !== '1'){?>
    //     login_dialog();
    // <?php }else{?>
    //     if (!quantity) {
    //         return;
    //     }
    //     $("#cart_id").val(goods_id+'|'+quantity);
    //     $("#buynow_form").submit();
    // <?php }?>
    // }

    // //浮动导航  waypoints.js
    // $('#main-nav').waypoint(function(event, direction) {
    //     $(this).parent().parent().parent().toggleClass('sticky', direction === "down");
    //     event.stopPropagation();
    // });

    // // 分享收藏下拉操作
    // $.divselect("#handle-l");
    // $.divselect("#handle-r");

    


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
});
