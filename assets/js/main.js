$(document).ready(function(){

    // $('body').addClass('modal-open')
    // $(window).on("load", function () {
    //   $('.loading-page__logo').fadeOut();
    //   $('.loading-page').delay(350).fadeOut('slow');
    //   $('body').removeClass('modal-open')
    // })

    // Stick header
    var stick_header = $('.header.-fix')
    if( stick_header.length ){
        if ( stick_header.offset().top >= 100 ) stick_header.addClass("is-sticky");
        $(window).scroll(function(){
            $(this).scrollTop()>10?stick_header.addClass("is-sticky"):stick_header.removeClass("is-sticky")
        })
    }

    /*----Get Header Height ---*/
    function get_header_height() {
        var header_sticky = $("header").outerHeight()
        $('body').css("--header-height",header_sticky+'px')
    }

    $(window).on('load resize', function () {
        setTimeout(function(){
            get_header_height()
        }, 500);
    });


    new WOW().init();

    //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnmenu = function( options ) {

        let thiz = this
        let menu = $(this).attr('data-id')
        let menu_id = '#'+menu

        // Default options
        var settings = $.extend({
            name: 'Menu'
        }, options );

        // get ScrollBar Width
        function getScrollBarWidth () {
            var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
            $outer.remove();
            return 100 - widthWithScroll;
        };
        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        thiz.click(function(e){

            e.preventDefault()

            if($(this).hasClass('active')){
                $(this).removeClass('active')
                $('body').removeClass('modal-open')
                $(menu_id).removeClass('active')
                thiz.removeClass('active')
                $('.header-mb').removeClass('-menu-mb-active')

            } else {
                $(this).addClass('active')
                $('body').addClass('modal-open')
                $(menu_id).addClass('active')
                thiz.addClass('active')
                $('.header-mb').addClass('-menu-mb-active')

            }
        });

        // Custom close
        $('.js-menu__close').click(function(){
            $('body').removeClass('modal-open')
            $(thiz).removeClass('active')
            $(menu_id).removeClass('active')
        })

        // Menu
        var el= $(menu_id).find(".nav__mobile--ul");
        el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

        el.find(".nav__mobile__btn").on("click",function(e){
            e.stopPropagation(),
            $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
            $(this).parent().addClass("sub-active"),
            $(this).parent().find('.sub-menu').first().slideToggle()
        })

        $('.nav__mobile, .header, .header-mb').mousedown(function(e){ e.stopPropagation(); });
        $(document).mousedown(function(e){ $('.nav__mobile').removeClass('active'); $(thiz).removeClass('active'); $("body").removeClass('modal-open') });

        // Apply options
        return;
    };

    $('.menu-mb__btn').dnmenu()

    //Home page
    // $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    //   $('.js-flickity').flickity('resize');
    // })
    //
    //
    // external js: flickity.pkgd.js
    // add this code
    Flickity.prototype._createResizeClass = function() {
      this.element.classList.add('flickity-resize');
    };

    Flickity.createMethods.push('_createResizeClass');

    var resize = Flickity.prototype.resize;
    Flickity.prototype.resize = function() {
      this.element.classList.remove('flickity-resize');
      resize.call( this );
      this.element.classList.add('flickity-resize');
    };

    // Section character
    $('.js-character').on("click",function(e) {
        $(this).closest('.tab-pane').find('.js-character').removeClass('active')
        $(this).addClass('active')
        var link = $(this).find('.js-character-thumb').data('thumb')
        var text = $(this).find('.js-character-content').html()
        $('.js-character-change-thumb').attr('src',link)
        $('.js-character-change-content').html(text)
    })
    // End home page

});


