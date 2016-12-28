
// ajaxbutton插件
// 依赖： layer.js 做返回信息提示
// 描述：使<a>标签按钮具备ajax同步提交post请求功能，比如取消订单，删除某信息 处理成功后刷新页面
// data-active="oredr_id|delete" 会被转化为 post提交的data 数组[oredr_id,delete] 给php处理 返回数据格式请参考 
//   {
//     "errNum": 0,//0 为成功 1为失败
//     "retMsg": "操作成功！"
//   }
// 使用：data api <a href="url" data-active="oredr_id|delete" data-plugin="ajaxbutton">取消订单</a>
//       javascript api $('a').ajaxbutton.('toggle')  <a href="url" data-active="oredr_id|delete" >取消订单</a>
+function ($) {
  'use strict';

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)

  }
  Button.DEFAULTS = {
  }

  Button.prototype.toggle = function () {
    var $this = this.$element

    if ($this.length) {
      var url = $this.attr('href')
      var data = $this.attr('data-active').split('|')
      $.ajax({
        type: "POST",
        data:data,
        dataType: "json",
        async:false, 
        url: url,
        error: function (err) {alert(err.responseText);},
        success: function (data){
          if (!data.errNum) {
            layer.msg(data.retMsg)
            setTimeout(function(){window.location.reload()},2000)
          }else{
            layer.msg(data.retMsg)
          }
        }
      })
    }
  }


  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.ajax_button')
      var options = typeof option == 'object' && option
      //防止重复实例化
      if (!data) $this.data('bs.ajax_button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
    })
  }

  var old = $.fn.ajaxbutton
  $.fn.ajaxbutton             = Plugin
  $.fn.ajaxbutton.Constructor = Button
  $.fn.ajaxbutton.noConflict = function () {
    $.fn.ajaxbutton = old
    return this
  }


  // ajaxbutton DATA-API
  // ===============

  $(document)
    .on('click.bs.ajaxbutton.data-api', '[data-plugin^="ajaxbutton"]', function (e) {
      var $btn = $(e.target)
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    

}(jQuery);


// selectGoUrl插件
//
// 描述：使<select>标签选择后立即跳转相应页面
// data-url="" 响应页面地址 data-plugin="selectGoUrl" 使用此插件
// 使用：data api <select data-url="" data-plugin="selectGoUrl"></select>
//       javascript api $('a').selectGoUrl.('int')  <select data-url=""></select>
+function ($) {
  'use strict';

  var selectGoUrl = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, selectGoUrl.DEFAULTS, options)

  }
  selectGoUrl.DEFAULTS = {
  }

  selectGoUrl.prototype.int = function () {
    var url = this.$element.data('url')+this.$element.val()
    location.href = url
  }


  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.selectGoUrl')
      var options = typeof option == 'object' && option
      if (!data) $this.data('bs.selectGoUrl', (data = new selectGoUrl(this, options)))

      if (option == 'int') data.int()
    })
  }

  var old = $.fn.selectGoUrl
  $.fn.selectGoUrl             = Plugin
  $.fn.selectGoUrl.Constructor = selectGoUrl
  $.fn.selectGoUrl.noConflict = function () {
    $.fn.selectGoUrl = old
    return this
  }


  // selectGoUrl DATA-API
  // ===============

  $(document)
    .on('change.bs.selectGoUrl.data-api', '[data-plugin^="selectGoUrl"]', function (e) {
      var $btn = $(e.target)
      Plugin.call($btn, 'int')
    })
    

}(jQuery);

$(function(){

  // 取消订单
  $('.order').find(".remove").click(function(e){
    e.preventDefault();
    var $this = $(this);
    layer.confirm('确定取消此订单吗?', {icon: 3, title:'提示'}, function(index){
      var url = $this.attr('href')
      var data = $this.attr('data-active').split('|')
      $.ajax({
        type: "POST",
        data:data,
        dataType: "json",
        async:false, 
        url: url,
        error: function (err) {err.responseText},
        success: function (data){
          if (!data.errNum) {
            layer.msg(data.retMsg)
            setTimeout(function(){window.location.reload()},2000)
          }else{
            layer.msg(data.retMsg)
          }
        }
      });

      layer.close(index);
    });
    




  })

});




$(function(){
      var MAX= parseInt($('em.max').html());
      /**
       * 减少数量
       */
      function decrease_quantity(){
          var item = $(this).next();
          item.attr('data-changed',item.val());
          var orig = Number(item.val());
          if(orig > 1){
              item.val(orig - 1);
              item.keyup();
          }
      }
      $('.quantity-form').on('click','.decrement',decrease_quantity);

      /**
       * 增加数量
       */
      function add_quantity(){
          var item = $(this).prev();
          item.attr('data-changed',item.val());
          var orig = Number(item.val());
          if(orig<MAX){
            item.val(orig + 1);
            item.keyup();
          }

      }
      $('.quantity-form').on('click','.increment',add_quantity);

      /**
       * 修改数量
       */
      function change_quantity(){
          if(this.value>MAX){ this.value = MAX};
          // 更新-号样式
          if(this.value>1){$(this).prev().removeClass('disabled')}else{$(this).prev().addClass('disabled')};
      }
      $('.quantity-form').on('keyup','.itxt',change_quantity);


})