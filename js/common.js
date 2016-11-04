
$(function() {
    //首页导航模块下拉
    $(".site-nav-h").hover(
        function() {
            $(".site-nav-h-item .dd-inner").addClass("hover");
        }, 
        function() {
            $(".site-nav-h-item .dd-inner").removeClass("hover");
            $(".dorpdown-layer").removeClass("hover");
        }
    );
    $(".site-nav-h-item .dd-inner").children(".item").hover(
        function() {
            $(this).addClass("hover").siblings(".item").removeClass("hover");
            var index = $(this).index();
            $(".dorpdown-layer").addClass("hover");
            $(".dorpdown-layer").children(".item-sub").hide();
            $(".dorpdown-layer").children(".item-sub").eq(index).show();
        }
    )

})
        