$(function(){

////////// 初始化
  //同步加载
  $.ajaxSetup({async : false});
  //更新商品总价
  calcOrder();
  // 异步显示每个店铺运费
  // if (ADDRESS_ID){
  //   showShippingPrice(ADDRESS_CITY_ID,ADDRESS_AREA_ID);
  // }else{
  //   $('#edit_reciver').click();
  // }

//////////信息填写完成 状态
  //修改收货地址 按钮
  $('#edit_reciver').on('click',function(){
    $(this).hide();
    disableOtherEdit('如需修改，请先保存收货人信息 ');
    $(this).parent().parent().addClass('current_box');
    //$('#addr_list').load(SITEURL+'/index.php?act=buy&op=load_addr');
  });
  //修改支付方式 按钮
  $('#edit_payment').on('click',function(){
    $('#edit_payment').parent().next().remove();
    $(this).hide();
    $('#paymentCon').addClass('current_box');
    $('#payment_list').show();
    disableOtherEdit('如需要修改，请先保存支付方式');
  });
  //修改发票 按钮
  $('#edit_invoice').on('click',function(){
    $(this).hide();
    disableOtherEdit('如需修改，请先保存发票信息');
    $(this).parent().parent().addClass('current_box');
    $('#invoice_list').load(SITEURL+'/index.php?act=buy&op=load_inv&vat_hash=ByKGt81uycvGzKiyz0MGUPrH3KduFTG4Bry');
  });
  //提交订单按钮
    $('#submitOrder').on('click',function(){submitNext()});

//////////修改收货地址 状态
  // 使用新地址单选控件
  $('input[nc_type="addr"]').on('click',function(){
      if ($(this).val() == '0') {
          $('.address_item').removeClass('ncc-selected-item');
          $('#add_addr_box').load(SITEURL+'/index.php?act=buy&op=add_addr');
      } else {
          $('.address_item').removeClass('ncc-selected-item');
          $(this).parent().addClass('ncc-selected-item');
          $('#add_addr_box').html('');
      }
  });

  //保存收货人信息按钮
  $('#hide_addr_list').on('click',function(){
      if ($('input[nc_type="addr"]:checked').val() == '0'){
          submitAddAddr();
      } else {
          var city_id = $('input[name="addr"]:checked').attr('city_id');
          var area_id = $('input[name="addr"]:checked').attr('area_id');
          var addr_id = $('input[name="addr"]:checked').val();
          var true_name = $('input[name="addr"]:checked').attr('true_name');
          var address = $('input[name="addr"]:checked').attr('address');
          var phone = $('input[name="addr"]:checked').attr('phone');
          showShippingPrice(city_id,area_id);
          hideAddrList(addr_id,true_name,address,phone);
      }
  });
  //如果无地址则刷新使用添加新地址页面
  if ($('input[nc_type="addr"]').size() == 1){
      $('#add_addr').attr('checked',true);
      addAddr();
  }

//////////修改支付方式 状态

  //保存支付方式
  $('#hide_payment_list').on('click',function(){
     var payment_type = $('input[name="payment_type"]:checked').val();
     if ($('input[name="payment_type"]:checked').size() == 0) return;
     //判断该地区(县ID)是否能货到付款
     if (payment_type == 'offline' && $('#allow_offpay').val() == '0') {
         showDialog('您目前选择的收货地区不支持货到付款', 'error','','','','','','','','',2);return;
     }
     $('#payment_list').hide();
     $('#edit_payment').show();
   $('.current_box').removeClass('current_box');
     var content = (payment_type == 'online' ? '在线支付' : '货到付款');
     $('#pay_name').val(payment_type);
     if (payment_type == 'offline'){
         //如果混合支付（在线+货到付款）
                         $('#edit_payment').parent().after('<div class="ncc-candidate-items"><ul><li>'+content+'</li></ul></div>');
                 }else{
         $('#edit_payment').parent().after('<div class="ncc-candidate-items"><ul><li>'+content+'</li></ul></div>');
     }
     ableOtherEdit();
  });

//////////修改发票 状态

    //使用新的发票信息
    $('input[nc_type="inv"]').on('click',function(){
        regionInit("region");
        if ($(this).val() == '0') {
            $('.inv_item').removeClass('ncc-selected-item');
            $('#add_inv_box').show();
        } else {
            $('.inv_item').removeClass('ncc-selected-item');
            $(this).parent().addClass('ncc-selected-item');
            $('#add_inv_box').hide();
        }
    });

    //不需要发票
    $('#cancel_invoice').on('click',function(){
        $('#invoice_id').val('');
        hideInvList('不需要发票');
    });
    ///////////// 使用新发票 状态

    //保存发票信息
    $('#hide_invoice_list').on('click',function(){
        var content = '';
        if ($('input[name="inv"]:checked').size() == 0){
          $('#cancel_invoice').click();
          return false;
        }
        if ($('input[name="inv"]:checked').val() != '0'){
            //如果选择已保存过的发票信息
            content = $('input[name="inv"]:checked').attr('content');
            $('#invoice_id').val($('input[name="inv"]:checked').val());
            hideInvList(content);
            return false;
        }
        //如果是新增发票信息
        if ($('input[name="invoice_type"]:checked').val() == 1){
            //如果选择普通发票
            if ($('select[name="inv_title_select"]').val() == 'person'){
                content = '普通发票 个人 ' + $('select[name="inv_content"]').val();
            }else if($.trim($('#inv_title').val()) == '' || $.trim($('#inv_title').val()) == '单位名称'){
                showDialog('请填写单位名称', 'error','','','','','','','','',2);return false;
            }else{
                content = '普通发票 ' + $.trim($('#inv_title').val())+ ' ' + $('#inv_content').val();
            }
        }else{
            content = '增值税发票 ' + $.trim($('input[name="inv_company"]').val()) + ' ' + $.trim($('input[name="inv_code"]').val()) + ' ' + $.trim($('input[name="inv_reg_addr"]').val());
            //验证增值税发票表单
            if (!$('#inv_form').valid()){
                return false;
            }
        }
        var datas=$('#inv_form').serialize();
        
        $.post('index.php',datas,function(data){
            if (data.state=='success'){
                $('#invoice_id').val(data.id);
                postResult = true;
            }else{
                showDialog(data.msg, 'error','','','','','','','','',2);
                postResult = false;
            }
        },'json');
        if (postResult){
            hideInvList(content);
        }
    });

    $('input[name="invoice_type"]').on('click',function(){
      if ($(this).val() == 1) {
        $('#invoice_panel').show();
        $('#vat_invoice_panel').hide();
      } else {
        $('#invoice_panel').hide();
        $('#vat_invoice_panel').show();
      }
    });
    $('select[name="inv_title_select"]').on('change',function(){
        if ($(this).val()=='company') {
            $('#inv_title').show();
        } else {
            $('#inv_title').hide();
        }
    });

    $('#inv_form').validate({
      rules: {
        inv_company: {
          required: true
        },
        inv_code: {
          required: true
        },
        inv_reg_addr: {
          required: true
        },
        inv_reg_phone: {
          required: true
        },
        inv_reg_bname: {
          required: true
        },
        inv_reg_baccount: {
          required: true
        },
        inv_rec_name: {
          required: true
        },
        inv_rec_mobphone: {
          required: true
        },
        area_id: {
          required: true,
          min: 1,
          checkarea: true
        },
        inv_goto_addr: {
          required: true
        }
      },
      messages: {
        inv_company: {
          required: '<i class="icon-exclamation-sign"></i>单位名称不能为空'
        },
        inv_code: {
          required: '<i class="icon-exclamation-sign"></i>纳税人识别号不能为空'
        },
        inv_reg_addr: {
          required: '<i class="icon-exclamation-sign"></i>注册地址不能为空'
        },
        inv_reg_phone: {
          required: '<i class="icon-exclamation-sign"></i>注册电话不能为空'
        },
        inv_reg_bname: {
          required: '<i class="icon-exclamation-sign"></i>开户银行不能为空'
        },
        inv_reg_baccount: {
          required: '<i class="icon-exclamation-sign"></i>银行帐户不能为空'
        },
        inv_rec_name: {
          required: '<i class="icon-exclamation-sign"></i>收票人姓名不能为空'
        },
        inv_rec_mobphone: {
          required: '<i class="icon-exclamation-sign"></i>收票人手机号不能为空'
        },
        area_id: {
          required: '<i class="icon-exclamation-sign"></i>请选择地区',
          min: '<i class="icon-exclamation-sign"></i>请选择地区',
          checkarea: '<i class="icon-exclamation-sign"></i>请选择地区'
        },
        inv_goto_addr: {
          required: '<i class="icon-exclamation-sign"></i>送票地址不能为空'
        }
      }
    });
    
//////////辅助函数
  //计算部运费和每个店铺小计
  function calcOrder() {
      var allTotal = 0;
      $('em[nc_type="eachStoreTotal"]').each(function(){
          store_id = $(this).attr('store_id');
          var eachTotal = 0;
          if ($('#eachStoreFreight_'+store_id).length > 0) {
            eachTotal += parseFloat($('#eachStoreFreight_'+store_id).html());
        }
          if ($('#eachStoreGoodsTotal_'+store_id).length > 0) {
            eachTotal += parseFloat($('#eachStoreGoodsTotal_'+store_id).html());
        }
          if ($('#eachStoreManSong_'+store_id).length > 0) {
            eachTotal += parseFloat($('#eachStoreManSong_'+store_id).html());
        }
          if ($('#eachStoreVoucher_'+store_id).length > 0) {
            eachTotal += parseFloat($('#eachStoreVoucher_'+store_id).html());
          }
          $(this).html(G.number_format(eachTotal,2));
          allTotal += eachTotal;
      });
      $('#orderTotal').html(G.number_format(allTotal,2));
  }

  function addAddr() {
      $('#add_addr_box').load(SITEURL+'/index.php?act=buy&op=add_addr');
  }

  //隐藏收货地址列表
  function hideAddrList(addr_id,true_name,address,phone) {
    $('#edit_reciver').show();
    $("#address_id").val(addr_id);
    $("#addr_list").html('<ul><li><span class="true-name">'+true_name+'</span><span class="address">'+address+'</span><span class="phone"><i class="icon-mobile-phone"></i>'+phone+'</span></li></ul>');
    $('.current_box').removeClass('current_box');
    ableOtherEdit();
    $('#edit_payment').click();
  }
  //异步显示每个店铺运费 city_id计算运费area_id计算是否支持货到付款
  function showShippingPrice(city_id,area_id) {
     $('#buy_city_id').val('');
      $.post(SITEURL + '/index.php?act=buy&op=change_addr', {'freight_hash': FREIGHT_HASH ,city_id:city_id,'area_id':area_id}, function(data){
        if(data.state == 'success') {
            $('#buy_city_id').val(city_id);
            $('#allow_offpay').val(data.allow_offpay);
            $('#offpay_hash').val(data.offpay_hash);
            var content = data.content;
            var amount = 0;
              for(var i in content){
                 $('#eachStoreFreight_'+i).html(G.number_format(content[i],2));
                 amount = amount + parseFloat(content[i]);
              }
              calcOrder();
        }
      },'json');
  }

  function ableOtherEdit(){
    $('a[nc_type="buy_edit"]').show().next('font').remove();
    ableSubmitOrder();
    
  }
  function ableSubmitOrder(){
    $('#submitOrder').on('click',function(){submitNext()}).css('cursor','').addClass('ncc-btn-acidblue');
  }

  function submitNext(){
      if ($('#address_id').val() == ''){
        alert('请先设置收货地址');
        return;
     }
     if ($('#buy_city_id').val() == '') {
        alert('正在计算运费,请稍后');
        return;
     }
     if ($('input[name="pd_pay"]').attr('checked') && $('#password_callback').val() != '1') {
        alert('使用预存款支付，需输入登录密码并使用');
        return;
     }
     $('#order_form').submit();
  }

  function disableOtherEdit(showText){
    $('a[nc_type="buy_edit"]').each(function(){
      if ($(this).css('display') != 'none'){
        $(this).after('<font color="#B0B0B0">' + showText + '</font>');
        $(this).hide();       
      }
    });
  }

  // 删除地址
  function delAddr(id){
      $('#addr_list').load(SITEURL+'/index.php?act=buy&op=load_addr&id='+id);
  }

  var postResult = false;
  function delInv(id){
      $('#invoice_list').load(SITEURL+'/index.php?act=buy&op=load_inv&vat_hashdioZFYeJN2HoSD_bz6kiEiDjgl2H0gkjhxK&del_id='+id);
  }

  //隐藏发票列表
  function hideInvList(content) {
      $('#edit_invoice').show();
     $("#invoice_list").html('<ul><li>'+content+'</li></ul>');
     $('.current_box').removeClass('current_box');
     ableOtherEdit();
     //重新定位到顶部
     $("html, body").animate({ scrollTop: 0 }, 0);
  }

});


$(function(){

    $('#show_goods_list').hover(function(){showPayGoodsList(this)},function(){$('#ncc-payment-showgoods-list').fadeOut()});
    function showPayGoodsList(item){
      var pos = $(item).position();
      var pos_x = pos.left+0;
      var pos_y = pos.top+25;
      $("#ncc-payment-showgoods-list").css({'left' : pos_x, 'top' : pos_y,'position' : 'absolute','display' : 'block'});        
        $('#ncc-payment-showgoods-list').addClass('ncc-payment-showgoods-list').fadeIn();
    }
    $('input[name="payment_type"]').on('change',function(){
        if ($(this).val() == 'online'){
            $('#show_goods_list').hide();
        } else {
            //判断该地区(县ID)是否能货到付款
            if ($('#allow_offpay').val() == '0') {
                $('#payment_type_online').attr('checked',true);
                showDialog('您目前选择的收货地区不支持货到付款', 'error','','','','','','','','',2);return;
            }
         html_form('confirm_pay_type', '请确认支付方式', $('#confirm_offpay_goods_list').html(), 500,1);
            $('#show_goods_list').show();
        }
    });

})

