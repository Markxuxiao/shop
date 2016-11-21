//UI
$(function(){

  // 地址省市选择
  $("#selectCity").selectCity();

  if(typeof(jQuery.validator.addMethod) == 'function'){//添加自动检测是否是最后一级地区
    jQuery.validator.addMethod("checkarea", function(value, element) {
      return this.optional(element) || (typeof(nc_a[value]) == 'undefined');//当数组不存在时确定选到最后
    }, "请选择所在地区");
  }

  $('#addr_form').validate({
      rules : {
        true_name : {
         required : true
        },
        area_id : {
          required : true,
          min   : 1,
          checkarea:true
        },
        address : {
          required : true
        },
        mob_phone : {
          required : checkPhone,
          minlength : 11,
          maxlength : 11,
          digits : true
        },
        tel_phone : {
          required : checkPhone,
          minlength : 6,
          maxlength : 20
        }
      },
      messages : {
      true_name : {
      required : '<i class="icon-exclamation-sign"></i>请填写收货人姓名'
      },
      area_id : {
      required : '<i class="icon-exclamation-sign"></i>请选择所在地区',
      min  : '<i class="icon-exclamation-sign"></i>请选择所在地区',
      checkarea : '<i class="icon-exclamation-sign"></i>请选择所在地区'
      },
      address : {
      required : '<i class="icon-exclamation-sign"></i>请填写收货人详细地址'
      },
      mob_phone : {
      required : '<i class="icon-exclamation-sign"></i>手机号码或固定电话请至少填写一个',
      minlength: '<i class="icon-exclamation-sign"></i>手机号码只能是11位',
          maxlength: '<i class="icon-exclamation-sign"></i>手机号码只能是11位',
          digits : '<i class="icon-exclamation-sign"></i>手机号码只能是11位'
        },
        tel_phone : {
          required : '<i class="icon-exclamation-sign"></i>手机号码或固定电话请至少填写一个',
          minlength: '<i class="icon-exclamation-sign"></i>',
          maxlength: '<i class="icon-exclamation-sign"></i>'
        }
        },
        groups : {
          phone:'mob_phone tel_phone'
        }
  });

  function checkPhone(){
      return ($('input[name="mob_phone"]').val() == '' && $('input[name="tel_phone"]').val() == '');
  }
});

$(function(){
//收货地址
  var $addr_list = $('#addr_list');

  //修改地址
  $('#edit_reciver').on('click',function(){
    var that = $(this);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: '/retData/data',
      error: function (err) {alert(err.responseText);},
      success: function (data){
        if (!data.errNum) {
          $(".edit").hide();
          $("#address-box").addClass('current_box');
          render_temp_address(data);
        }else{
          alert(data.retMsg)
        }
      }
    });
  });
  //选择地址
  $addr_list.on('click','input:radio',function(){
    var that = $(this);
    if(that.hasClass("add_addr")){
      $("#addr_form").show();
    }else{
      $("#addr_form").hide();
    };
  });
  //删除地址
  $addr_list.on('click',".del",function(){
    var that = $(this);
    var address_id = that.parent().find('input:radio').val();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: '/retData/data1',
      data: address_id,
      error: function (err) {alert(err.responseText);},
      success: function (data){
        if (!data.errNum) {
          layer.msg("删除成功");
          render_temp_address(data);
        }else{
          alert(data.retMsg)
        }
      }
    });
  })
  //保存地址
  $("#addr_list_btn").on('click',function(){
    //判断是否选择新添加地址
    if($('#add_addr').attr('checked')){
      event.preventDefault();
      // 验证表单
      if(!$('#addr_form').valid()) return false;
      var data = $('#addr_form').serialize();
      console.log(data);
      $.ajax({
        type: "POST",
        dataType: "json",
        url: '/retData/data1',
        data: data,
        error: function (err) {alert(err.responseText);},
        success: function (data){
          if (!data.errNum) {
            layer.msg("添加成功");
            render_temp_address_default(data);
            //计算运费
            showShippingPrice($('#city_id').val(),$('#area_id').val());
          }else{
            alert(data.retMsg)
          }
        }
      });
    }else{
      var $item = $addr_list.find(":checked").parent();
      if($item){
        var datatemp={"retData":[{}]};
            datatemp.retData[0].id = $item.find(":checked").val();
            datatemp.retData[0].name = $item.find(".true-name").text();
            datatemp.retData[0].province = $item.find(".address").text();
            datatemp.retData[0].city ="";
            datatemp.retData[0].county ="";
            datatemp.retData[0].phone = $item.find(".phone").text();
            render_temp_address_default(datatemp);
      }
    }
  })

  /** 
  * @description 渲染修改地址界面
  * @param {Object} data 地址json数据
  * @return
  */ 
  function render_temp_address(data){
    var html = template('temp_address', data);
    $addr_list.html(html);
    $('#add_addr_box').show();
    if($('#add_addr').attr('checked')){$("#addr_form").show();};

  }
  /** 
  * @description 渲染默认选好了的地址界面
  * @param {Object} data 地址json数据
  * @return
  */ 
  function render_temp_address_default(data){
    var html = template('temp_address_default', data);
    $addr_list.html(html);
    $('#add_addr_box').hide();
    $("#address-box").removeClass('current_box');
    $('.edit').show();
    //将地址id赋给提交input
    $("#address_id").val($("#addr_check").val());
  }

  //运费计算
    //初始化运费
    showShippingPrice();
    //异步显示每个店铺运费 city_id计算运费area_id计算是否支持货到付款
    function showShippingPrice() {
      $('#buy_city_id').val('');
      var freight_hash = $("#addr_list").attr("freight_hash");
      var city_id = $("#addr_check").attr("city_id");
      var area_id = $("#addr_check").attr("area_id");
        $.post('/index.php?act=buy&op=change_addr', {'freight_hash':freight_hash,city_id:city_id,'area_id':area_id}, function(data){
          if(data.errNum == 0) {
              $('#buy_city_id').val(city_id);
              // $('#allow_offpay').val(data.allow_offpay);
              // $('#offpay_hash').val(data.offpay_hash);
              var content = data.retData;
              var amount = 0;
                for(var i in content){
                  $('#eachStoreFreight_'+i).html(G.number_format(content[i],2));
                  amount = amount + parseFloat(content[i]);
                }
                calcOrder();
          }

        },'json');
    }
    /**
     * 更新商品价格总计
     */
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

})


$(function(){
//支付方式
  //修改支付方式
  $('#edit_payment').on('click',function(){
    $(".edit").hide();
    $("#payment_type_default").hide();
    $("#paymentCon").addClass('current_box');
    $("#payment_list").show();
  });
  //保存支付方式
  $('#payment_type_btn').on("click",function(){
    var payment_type = $('#payment_list').find(':checked').val();
    $('#payment_type').val(payment_type);
    if(payment_type=="online"){
      $("#payment_type").val("online");
      $('#payment_type').next().text("在线支付");
    }else{
      $("#payment_type").val("offline");
      $('#payment_type').next().text("线下支付");
    }
    $(".edit").show();
    $("#payment_type_default").show();
    $("#paymentCon").removeClass('current_box');
    $("#payment_list").hide();

    //将支付方式赋给提交input
    $("#pay_name").val($("#payment_type").val());
  })
})
$(function(){
//提交订单按钮
  function sbmit_handle() {
    if ($('#address-box').hasClass("current_box")){
      $("html,body").animate({scrollTop:$("#address-box").offset().top},1000);
      $("#address-box").fadeOut("normal").fadeIn("slow");
      alert('请先设置收货地址');
      return;
    }
    if ($("#paymentCon").hasClass('current_box')) {
      $("html,body").animate({scrollTop:$("#paymentCon").offset().top},1000);
      $("#paymentCon").fadeOut("normal").fadeIn("slow");
      alert('请设置支付方式');
      return;
    }
    $('#order_form').submit();
  }
  //防止重复提交订单
  var unlock = true;
  $('#submitOrder').on('click',function(){
    if(unlock){
      unlock = false;
      sbmit_handle();
      $('#submitOrder').removeClass("xx-btn-red").addClass("disable");
      setTimeout(function(){
        unlock=true;
        $('#submitOrder').removeClass("disable").addClass("xx-btn-red")
      },5000)
    }
  });
})
