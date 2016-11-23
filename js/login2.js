(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {
	/*
	* Translated default messages for the jQuery validation plugin.
	* Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
	 */
	$.extend($.validator.messages, {
		required: "这是必填字段",
		remote: "请修正此字段",
		email: "请输入有效的电子邮件地址",
		url: "请输入有效的网址",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (YYYY-MM-DD)",
		number: "请输入有效的数字",
		digits: "只能输入数字",
		creditcard: "请输入有效的信用卡号码",
		equalTo: "你两次密码输入不相同",
		extension: "请输入有效的后缀",
		maxlength: $.validator.format("最多可以输入 {0} 个字符"),
		minlength: $.validator.format("最少要输入 {0} 个字符"),
		rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
		range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
		max: $.validator.format("请输入不大于 {0} 的数值"),
		min: $.validator.format("请输入不小于 {0} 的数值")
	});

}));
// 序列化表单值为json
$.fn.serializeJson=function(){
    var serializeObj={};
    var array=this.serializeArray();
    var str=this.serialize();
    $(array).each(function(){
        if(serializeObj[this.name]){
            if($.isArray(serializeObj[this.name])){
                serializeObj[this.name].push(this.value);
            }else{
                serializeObj[this.name]=[serializeObj[this.name],this.value];
            }
        }else{
            serializeObj[this.name]=this.value;    
        }
    });
    return serializeObj;
};

$(function() {
	$("#username").focus();
	$("#form_login").validate({
		errorElement: "em",
		rules: {
			username: {
				required: true
			},
			password: {
				required: true
			},
			verification:"required"
		}
	});
	var index = parent.layer.getFrameIndex(window.name);
	// 忘记密码
	$(".login-links").on('click','.fl',function(){
		event.preventDefault();
		var url = $(this).attr("href");
		parent.location.href = url;
		parent.layer.close(index);
		
	});
	// 注册
	$(".login-links").on('click','.fr',function(){
		event.preventDefault();
		var url = $(this).attr("href");
		parent.location.href = url;
		parent.layer.close(index);
	});

	//提交
	$("#login_btn").on('click',function(){
		event.preventDefault();
		if(!$('#form_login').valid()) return false;
		var form_data = $('#form_login').serializeJson();
		$.ajax({
		  type: "POST",
		  dataType: "json",
		  url: '/retData/login2',
		  data: form_data,
		  beforeSend:function(XHR){
		  	layer.load();
		  },
		  complete : function(XMLHttpRequest,status){ 
		  	layer.closeAll('loading');
		  },
		  error: function (err) {
		  	layer.msg(err.responseText);
		  	
		  },
		  success: function (data){
		    if (!data.errNum) {
		      parent.location.reload();
		    }else{
		      layer.msg(data.retMsg)
		    }
		  }
		});

	});

});

