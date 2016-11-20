//UI
$(function(){

  /////////////////////////////////////////todo
  // 地址省市选择
  // $('#element_id').cxSelect({
  //   url: './js/plugin/cxselect/cityData.min.js',
  //   selects: ['province', 'city', 'area'],
  //   emptyStyle: 'none'
  // });

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
              required : '<i class="icon-exclamation-sign"></i>必填项'
          },
          area_id : {
              required : '<i class="icon-exclamation-sign"></i>必选项',
              min  : '<i class="icon-exclamation-sign"></i>必选项',
              checkarea : '<i class="icon-exclamation-sign"></i>必选项'
          },
          address : {
              required : '<i class="icon-exclamation-sign"></i>必填项'
          },
          mob_phone : {
              required : '<i class="icon-exclamation-sign"></i>必填项',
              minlength: '<i class="icon-exclamation-sign"></i>必须为11位数字',
              maxlength: '<i class="icon-exclamation-sign"></i>必须为11位数字',
              digits : '<i class="icon-exclamation-sign"></i>必须为数字'
          },
          tel_phone : {
              required : '<i class="icon-exclamation-sign"></i>必填项',
              minlength: '<i class="icon-exclamation-sign"></i>最小6位数字',
              maxlength: '<i class="icon-exclamation-sign"></i>最大20位数字'
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
          alert("删除成功");
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
            alert("添加成功");
            render_temp_address_default(data);
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
