$(document).ready(function () {
    /*
     * POPUP JS
     * */
    //VARIABLES
    var openPopupClass = '.open-popup';
    var bgPopupClass = '.popup-bg';
    var popupClass = '.popup';
    var htmlClass = 'popup-open';
    var closeLinkClass = '.close-popup-link';
    
    
    //OPEN POPUP
    $(document).on('click',openPopupClass, function () {

        var element = $(this);

        if (element.hasClass('need-auth')) {
            window.location = '/ru/cabinet/personal/?backurl=' + element.attr('data-back-url');
            return false;
        }

        if (element.attr('data-popup') == 'popup-choose-list') {

            var src = element.attr('data-img-src');
            var name = element.attr('data-name');
            var id = element.attr('data-id');

            $('#popup-choose-list-selected-recipe-img').attr('src', src);
            $('#popup-choose-list-selected-recipe-name').html(name);
            $('#popup-choose-list-selected-recipe-id').val(id);

            $.ajax({
                url: '/local/tools/bookmark.list.php',
                type: 'GET',
                success: function (result){
                    $('#popup-choose-list-available-group-list').html(result);
                }
            });
        } else if (element.attr('data-popup') == 'popup-create-list') {

            $('#create-new-list-form-id').val(element.attr('data-id'));

            if (element.attr('data-back-url')) {
                $('#create-new-list-form-back-url').val(element.attr('data-back-url'));
            }


        }

        $('.popup:visible').fadeOut(200);
        var popupName = $(this).data("popup");
        var popup = $("." + popupName);
        popup.parent(bgPopupClass).fadeIn(200);
        popup.addClass('opened');
        $('html').addClass(htmlClass).css('padding-right', getScrollBarWidth());
        return false;
    });
    
    //HIDE POPUP
    $(document).on('click', bgPopupClass, function(event){
        if ($(event.target).closest('.popup').parent().length) return;
        $(popupClass+':visible').removeClass('opened');
        $(this).fadeOut(200);
        $('html').removeClass(htmlClass).css('padding-right', 0);
        event.stopPropagation();
    });
    $(document).on('click','.popup-close', function () {
        $(this).parents(bgPopupClass).fadeOut(200);
        $(popupClass+':visible').removeClass('opened');
        $('html').removeClass(htmlClass).css('padding-right', 0);
        return false;
    });
    
    $(closeLinkClass).on('click', function () {
        $(bgPopupClass).click();
    });
    
    
    //FUNCTIONS
    function getScrollBarWidth () {
        if ($(window).height() < $(document).height()) {

            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild (inner);

            document.body.appendChild (outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;
            document.body.removeChild (outer);
        } else {
            w1 = 0;
            w2 = 0;
        }

        return (w1 - w2);
    }
    /*END POPUP JS*/
});


/*
 * NOTIFICATION JS
 * */
var timeNotification = 3000; // 3sec
var timeAnimation = 1000;
function createNotification (options) {
    var defaultOptions = {
        'text': 'Operation completed',
        'position': 'bottom',
        'parentElement': 'body',
        'status': '',
        'time': timeNotification
    };
    if (typeof(options)==='undefined') options = defaultOptions;
    var text = options.text,
        position = options.position,
        parentElement = options.parentElement,
        status = options.status,
        time = options.time;

    if (typeof(text)==='undefined') text = defaultOptions.text;
    if (typeof(position)==='undefined') position = defaultOptions.position;
    if (typeof(parentElement)==='undefined') parentElement = defaultOptions.parentElement;
    if (typeof(status)==='undefined') status = defaultOptions.status;
    if (typeof(time)==='undefined') time = defaultOptions.time;
    var contentPopup = '';
    if ($.isArray(text)) {
        text.forEach(function (elem) {
            contentPopup+='<p>'+elem+'</p>';
        });
    } else {
        contentPopup = '<p>'+text+'</p>';
    }
    var $notification = $('<div class="notification ' + position + ' ' + status + '"><div class="d-inline-block">' + contentPopup + '</div></div>').appendTo(parentElement);

    var animationProperties = {};
    animationProperties[position] = 0;

    $notification.css(position,-$notification.outerHeight());
    $notification.animate(animationProperties, timeAnimation);


    setTimeout(function () {
        animationProperties[position] = -$notification.outerHeight();
        $notification.animate(animationProperties, timeAnimation);
    }, time);


    setTimeout(function () {
        $notification.remove();
    }, 2*time);
}
/*
 * END NOTIFICATION JS
 * */