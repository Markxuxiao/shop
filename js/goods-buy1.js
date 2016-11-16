$(function(){
//收货地址
  //接口格式为
  // {
  //     "errNum": 0,//0 为成功 1或其他为失败
  //     "retMsg": "success",//将errNum设置为1 可回复错误信息，比如未选择省份
  //     "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
  //             {id:2,name:"王xx某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:false}
  //     ]
  // }

  // 模拟数据
  var data = {
      "errNum": 0,//0 为成功 1或其他为失败
      "retMsg": "success",
      "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
              {id:2,name:"王xx某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:false}
      ]
  };
  var data1 = {
    "errNum": 0,//0 为成功 1或其他为失败
    "retMsg": "success",
      "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
          ]
  };
  var data2 = {
    "errNum": 0,//0 为成功 1或其他为失败
    "retMsg": "success",
    "retData":''
  };
  var $addr_list = $('#addr_list');


  //修改地址
  $('#edit_reciver').on('click',function(){
    var that = $(this);
    // $.ajax({
    //   type: "POST",
    //   dataType: "json",
    //   url: '',
    //   data: ,
    //   error: function (err) {alert(err.responseText);},
    //   success: function (data){
        if (!data.errNum) {
          $(".edit").hide();
          $("#address-box").addClass('current_box');
          render_temp_address(data);
        }else{
          alert(data.retMsg)
        }
    //   }
    // });
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
    // $.ajax({
    //   type: "POST",
    //   dataType: "json",
    //   url: '',
    //   data: address_id,
    //   error: function (err) {alert(err.responseText);},
    //   success: function (data){
        if (!data1.errNum) {
          alert("删除成功");
          render_temp_address(data1);
        }else{
          alert(data1.retMsg)
        }
    //   }
    // });
  })
  //保存地址
  $("#addr_list_btn").on('click',function(){
    //判断是否选择新添加地址
    if($('#add_addr').attr('checked')){

      // $.ajax({
      //   type: "POST",
      //   dataType: "json",
      //   url: '',
      //   data: address_id,
      //   error: function (err) {alert(err.responseText);},
      //   success: function (data){
          if (!data1.errNum) {
            alert("添加成功");
            render_temp_address_default(data1);
          }else{
            alert(data1.retMsg)
          }
          
      //   }
      // });
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
    if($('#add_addr').attr('checked')){$("#addr_form").show();}
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
      $('#payment_type').next().text("在线支付");
    }else{
      $('#payment_type').next().text("线下支付");
    }
    $(".edit").show();
    $("#payment_type_default").show();
    $("#paymentCon").removeClass('current_box');
    $("#payment_list").hide();
  })
})