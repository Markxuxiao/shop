
$(function() {
    $(".dd-inner").children(".item").hover(
        function() { //一级导航悬浮
            $(this).addClass("hover").siblings(".item").removeClass("hover");
            var index = $(this).index();
            $(".dorpdown-layer").children(".item-sub").hide();
            $(".dorpdown-layer").children(".item-sub").eq(index).show();
        }
    )

    $(".dd-inner").hover(
        function() { //整个导航菜单悬浮，是否显示二级导航到出厂
            $("#index_menus_sub").show();
        }, 
        function() {
            $("#index_menus_sub").hide();
            $('.item').removeClass("hover");
        }
    )

    $("#index_menus_sub").children(".item-sub").hover(
        function() { //二级导航悬浮
            var index = $(this).index();
            $(".dd-inner").children(".item").eq(index).addClass("hover");
            $("#index_menus_sub").show();
        }, 
        function() {
            $("#index_menus_sub").hide();
            $(".dd-inner").children(".item").removeClass("hover");
        }
    )
})
        