!function ($) {
    $(function(){

        window.prettyPrint && prettyPrint();

        var $win = $(window);
        var $nav = $('.subnav');
        var navTop = $('.subnav').length && $('.subnav').offset().top - 40;
        var isFixed = 0;

        $win.scroll(function () {
            var i, scrollTop = $win.scrollTop();
            if (scrollTop >= navTop && !isFixed) {
                isFixed = 1;
                $nav.addClass('subnav-fixed');
            } else if (scrollTop <= navTop && isFixed) {
                isFixed = 0;
                $nav.removeClass('subnav-fixed');
            }
        });

    });
}(window.jQuery);