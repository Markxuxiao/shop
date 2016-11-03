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

	var Form_register = $("#form_register");
	Form_register.validate({
		errorElement: "em",
		rules: {
			username: {
				required: true,
				minlength: 5,
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			phone: {
				required: true,
				minlength: 11,
				maxlength: 11,
				digits: true
			},
			verification: {
				required: true
			},
			phone_verification: "required"
		}
	});
	(function  () {
		//获取短信验证码
		var validCode=true;
		$("#msgs").click (function  () {
			if(!$("#phone").valid()) return $("#phone").focus();//未验证通过不执行发送短信
			var time=30;
			var code=$(this);
			if (validCode) {
				validCode=false;
				$("#msgs").attr("style","background-color:#ccc");
				code.text("30秒");
				var t=setInterval(function  () {
					time--;
					code.text(time+"秒");
					if (time==0) {
						clearInterval(t);
						$("#msgs").attr("style","");
						code.text("重新获取");
						validCode=true;
					}
				},1000)
				
			// 获取短信请求
			// $.ajax({
			//  　　type: "POST", //用POST方式传输
			//  　　dataType: "text", //数据格式:JSON
			//  　　url: 'Login.ashx', //目标地址
			// 　　 data: "dealType=" + dealType +"&uid=" + uid + "&code=" + code,
			// 　　 error: function (XMLHttpRequest, textStatus, errorThrown) { },
			//  　　success: function (msg){ }
			//  });

			}
		})

	})();

});
