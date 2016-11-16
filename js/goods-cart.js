
$(function(){
    calc_cart_price();

    /**
     * 减少购物车商品数量
     */
    function decrease_quantity(){
        var item = $(this).next();
        var orig = Number(item.val());
        if(orig > 1){
            item.val(orig - 1);
            item.keyup();
        }
    }
    $('table[Jsmark="table_cart"]').on('click','.decrement',decrease_quantity);

    /**
     * 增加购物车商品数量
     */
    function add_quantity(){
        var item = $(this).prev();
        var orig = Number(item.val());
        item.val(orig + 1);
        item.keyup();
    }
    $('table[Jsmark="table_cart"]').on('click','.increment',add_quantity);

    /**
     * 修改购物车数量
     */
    function change_quantity(){
        var cart_id = $(this).parent().parent().parent().attr('data-cart_id');
        // 更新-号样式
        if(this.value>1){$(this).prev().removeClass('disabled')}else{$(this).prev().addClass('disabled')};
        // 单个商品总价
        var subtotal = $(this).parent().parent().parent().find('em[Jsmark="eachGoodsTotal"]');

        //暂存为局部变量，否则如果用户输入过快有可能造成前后值不一致的问题
        var _value = this.value;
        var data = {"cart_id":cart_id,"quantity":_value};
        
        //验证购物车商品更改数量是否有库存并更新购物车视图
        $.getJSON('index.php?act=cart&op=update&cart_id=' + cart_id + '&quantity=' + _value,data, function(result){
            $(this).attr('data-changed', _value);
            if(result.state == 'true' ){
                $('#item' + cart_id + '_price').html(G.number_format(result.goods_price,2));
                subtotal.html(G.number_format(result.subtotal,2));
                $('#cart_id'+cart_id).val(cart_id+'|'+_value);
            }
               //无效的
            if(result.state == 'invalid'){
              subtotal.html(0.00);
              $('#cart_id'+cart_id).remove();
              $('tr[nc_group="'+cart_id+'"]').addClass('item_disabled');
              $(this).parent().next().html('');
              $(this).parent().html('已下架');
              alert(result.msg);
              return;
            }
              //库存短缺
            if(result.state == 'shortage'){
              $('#item' + cart_id + '_price').html(G.number_format(result.goods_price,2));
              $('#cart_id'+cart_id).val(cart_id+'|'+result.goods_num);
              $(this).val(result.goods_num);
              alert(result.msg);
              return;
            }
             //更新失败
            if(result.state == 'error') {
                alert(result.msg);
                $(this).val($(this).attr('data-changed'));
            }
            calc_cart_price();
        });
        
    }
    $('table[Jsmark="table_cart"]').on('keyup','.itxt',change_quantity);

    //商品全选
    $('#selectAll').on('click',function(){
        if ($(this).attr('checked')) {
            $('input[type="checkbox"]').attr('checked',true);
            $('input[type="checkbox"]:disabled').attr('checked',false);
            $('.shop-list').removeClass('active');
            $('.shop-list').addClass('active');
        } else {
            $('input[type="checkbox"]').attr('checked',false);
            $('.shop-list').removeClass('active');
        }
        calc_cart_price();
    });
    //商品单选
    $('input[Jsmark="eachGoodsCheckBox"]').on('click',function(){
        if (!$(this).attr('checked')) {
            $('#selectAll').attr('checked',false);
            $(this).parent().parent().removeClass('active');
        }else{$(this).parent().parent().addClass('active');}
        calc_cart_price();
    });

    // 提交订单
    $('#next_submit').on('click',function(){
        if ($('table').find('input[Jsmark="eachGoodsCheckBox"]:checked').size() == 0) {
            alert("请选中您要购买的商品！");
            return false;
        }else {
            $('#form_buy').submit();
        }
    });

    //收藏商品
    $("a[Jsmark='fav']").on('click',function(){
        var that = this;
        var goods_id= $(this).parent().parent().data("goods_id");
        console.log(goods_id);
        if(goods_id){
            G.collect_goods(goods_id,function(){
                $(that).unbind('click')
                        .html('已收藏')
                        .css({ color: "#777777", cursor:"default" });
            })
        };
    });



    /**
     * 删除购物车
     * @param cart_id
     */
    function drop_cart_item(){
        var cart_id = $(this).parent().parent().attr('data-cart_id');
        var parent_tr = $('#cart_item_' + cart_id).parent();

        $.getJSON('index.php?act=cart&op=del&cart_id=' + cart_id, function(result){
            if(result.state){
                //删除成功
                if(result.quantity == 0){//判断购物车是否为空
                    window.location.reload();    //刷新
                } else {
                    $('tr[nc_group="'+cart_id+'"]').remove();//移除本商品或本套装
                    if (parent_tr.children('tr').length == 2) {//只剩下店铺名头和店铺合计尾，则全部移除
                        parent_tr.remove();
                    }
                    calc_cart_price();
                }
            }else{
                alert(result.msg);
            }
        });
    }
    $('table[Jsmark="table_cart"]').on('click','.goods-cart-dropitem',drop_cart_item);

    /**
     * 购物车商品统计
     */
    function calc_cart_price() {
        //每个店铺商品价格小计
        obj = $('table[Jsmark="table_cart"]');
        if(obj.children('tbody').length==0) return;
        //购物车已选择商品的总价格
        var allTotal = 0;
        obj.children('tbody').each(function(){
            //购物车每个店铺已选择商品的总价格
            var eachTotal = 0;
            $(this).find('em[Jsmark="eachGoodsTotal"]').each(function(){
                if ($(this).parent().parent().find('input[type="checkbox"]').eq(0).attr('checked') != 'checked') return;
                eachTotal = eachTotal + parseFloat($(this).html());  
            });
            allTotal += eachTotal;
            $(this).children('tr').last().find('em[Jsmark="eachStoreTotal"]').eq(0).html(G.number_format(eachTotal,2));
        });
        $('#cartTotal').html(G.number_format(allTotal,2));
    }

});