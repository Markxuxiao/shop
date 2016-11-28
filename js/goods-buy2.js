//UI
$(function(){
  //选择预付款支付
  $('.yufu input[type="checkbox"]').change(function(){
    if($(this).prop("checked")){
      $('.yufu-dorpdown-layer').removeClass('hidden');
    }else{
      $('.yufu-dorpdown-layer').addClass('hidden');
    }
  })

  //预付款支付按钮
  $('#yufu_btn').click(function(){
    var $password = $('.yufu-dorpdown-layer input[type="password"]');
    if($password.val()=="") return $password.focus();
    var yufu_data = {};
    // 还需要什么值直接获取 格式如下
    yufu_data.password = $password.val();
    $.ajax({
      type: "POST", 
      dataType: "json", 
      url: 'yufu', 
      data: yufu_data,
      beforeSend:function(){
        layer.load();
      },
      success: function (data){
        layer.closeAll('loading');
        if(!data.errNum){
          //预付款支付全额则直接跳转相应页面，请设置URL，可以修改模拟数据看效果
          var URL = "index.html";
          if(data.retData.yinfu == 0) {return window.location.href= URL};

          $('#yinfu').text('￥'+G.number_format(data.retData.yinfu,2));
          $('.yufu input[type="checkbox"]').prop("disabled", true);
          $('.yufu').find('span').text('可用余额：'+ G.number_format(data.retData.yue,2));
          $('.yufu').append('<span>已使用预付款支付：'+ G.number_format(data.retData.yufu,2) +' （剩余未支付完成的，请选用以下在线支付方式完成支付！）</span>')
          $('.yufu-dorpdown-layer').addClass('hidden');
          layer.msg(data.retMsg);
        }else{
          layer.msg(data.retMsg);
        }
      }
     });
  });

  //其他在线支付
  $('.goods-cart-payment-list').on('click','li',function(){
    var payment_code = $(this).attr('payment_code');
    $('#payment_code').val(payment_code);
    $('#pay').submit();
  })
});

