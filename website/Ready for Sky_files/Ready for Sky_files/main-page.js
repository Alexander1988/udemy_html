$(document).ready(function () {
    var swiperDevAdvantages = new Swiper('.swiper-container-main-page-advantages', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
            draggable: true
        },
        //navigation: {
        //    nextEl: '.slider-next-control',
        //    prevEl: '.slider-prev-control'
        //},
        breakpoints: {
            1279: {
                slidesPerView: 4
            },
            960: {
                slidesPerView: 3
            },
            575: {
                slidesPerView: 1.5
            }
        }
    });


    var swiperMainPageServices = new Swiper('.swiper-container-main-page-services', {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: false,
        //scrollbar: {
        //    el: '.swiper-scrollbar',
        //    hide: false,
        //    draggable: true
        //},
        //navigation: {
        //    nextEl: '.slider-next-control',
        //    prevEl: '.slider-prev-control'
        //},
        breakpoints: {
            1279: {
                slidesPerView: 3.5
            },
            960: {
                slidesPerView: 2.5
            },
            575: {
                slidesPerView: 1.5
            }
        }
    });





    'use strict';

    (function () {

        'use strict';

        // breakpoint where swiper will be destroyed
        // and switches to a dual-column layout

        var breakpoint = window.matchMedia('(min-width:1280px)');

        // keep track of swiper instances to destroy later
        var swiperMainPageSolution;

        var breakpointChecker = function breakpointChecker() {

            // if larger viewport and multi-row layout needed
            if (breakpoint.matches === true) {

                // clean up old instances and inline styles when available
                if (swiperMainPageSolution !== undefined) swiperMainPageSolution.destroy(true, true);

                // or/and do nothing
                return;

                // else if a small viewport and single column layout needed
            } else if (breakpoint.matches === false) {

                // fire small viewport version of swiper
                return enableSwiper();
            }
        };

        var enableSwiper = function enableSwiper() {

            swiperMainPageSolution = new Swiper('.swiper-container-main-page-solution', {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                //scrollbar: {
                //    el: '.swiper-scrollbar',
                //    hide: false,
                //    draggable: true
                //},
                //navigation: {
                //    nextEl: '.slider-next-control',
                //    prevEl: '.slider-prev-control'
                //},
                breakpoints: {
                    1279: {
                        slidesPerView: 3.2
                    },
                    960: {
                        slidesPerView: 2.3
                    },
                    767: {
                        slidesPerView: 2
                    },
                    575: {
                        slidesPerView: 1.4
                    },
                    480: {
                        slidesPerView: 1.2
                    }
                }
            });
        };

        // keep an eye on viewport size changes
        breakpoint.addListener(breakpointChecker);

        // kickstart
        breakpointChecker();
    })();

    $('.cristal').on('click', function () {
        if (!$(this).hasClass('opened-cristal')) {
            $('.main-page-platform').addClass('opened');
            $('.main-page-platform-content-section').hide();
            $('.cristal').removeClass('opened-cristal');
            $(this).addClass('opened-cristal');
            $('.'+$(this).data('content')).fadeIn(1500);
            $("html, body").animate({
                scrollTop: $('.main-page-section-home').offset().top - 50
            }, 500);
        } else {
            $('.close-cristal').click();
        }
    });

    $('.close-cristal').on('click', function () {
        $('.main-page-platform').removeClass('opened');
        $('.main-page-platform-content-section').hide();
        $('.cristal').removeClass('opened-cristal');
        $('.main-page-platform-content-section-0').fadeIn(1500);
    });

    $(".main-page-blog-item-title").dotdotdot({
        watch: "window"
    });

    $(window).on('load', function () {
        $(window).resize();
    });

    $('.main-page-platform-btn').on('click', function () {
        $('.cristal.cristal-green').click();
        return false;
    });
});