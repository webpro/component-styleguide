(function() {

    var navHeight = $('.sg-header')[0].offsetHeight,
        screenWidth = window.innerWidth;

    $('.sg-main')[0].style.top = navHeight + 'px';
    $('.sg-main iframe')[0].style.width = screenWidth + 'px';

    $('.sg-header ul:first-child a').on('click', function(event) {
        event.preventDefault();
        var $el = $(event.target).closest('a'),
            href = $el.attr('href');
        $('.sg-main iframe').attr('src', href);
    });

    var sizeMapping = {
        XS: 320,
        S: 375,
        M: 768,
        L: 1024,
        MAX: screenWidth
    };

    $('[data-action-resize]').on('click', function(event) {
        event.preventDefault();
        sizeMapping.F = window.innerWidth;
        var $el = $(this),
            size = $el.attr('data-action-resize');
        $('iframe')[0].style.width = sizeMapping[size] + 'px';
        $('.sg-current-width').html('' + sizeMapping[size]);
        $('[data-action-resize]').removeClass('active');
        $el.addClass('active');
    });

    $('[data-action-source]').on('click', function(event) {
        var iframe = $('iframe')[0];
        if(iframe && iframe.contentDocument) {
            $('.sg-tpl', iframe.contentDocument).toggleClass('hide');
            $(event.target).toggleClass('active');
        }
    });

    $('.sg-current-width').html('' + sizeMapping.MAX);

})();
