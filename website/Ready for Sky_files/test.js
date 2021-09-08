$(document).ready(function () {

    $('.create-list-action').on('click', function (event) {

        event.preventDefault();

        var element = $(this);

        var form = $('#create-new-list-form');

        $.ajax({
            url: '/local/tools/bookmark.php',
            data: form.serialize(),
            type: 'POST',
            dataType: "json",
            success: function (result){
                if (result.error) {
                    $('#create-new-list-form input.one-line').addClass('error-input');
                } else {
                    createNotification({
                        'text': 'Добалена новая подборка : ' + $('#create-new-list-form-name').val(),
                        'position': 'bottom'
                    });

                    if ($('#create-new-list-form-back-url').val()) {
                        window.location = $('#create-new-list-form-back-url').val();
                        return false;
                    }

                    $('#create-new-list-form input.one-line').removeClass('error-input');

                    $('.popup-create-list').removeClass('opened');

                    $.ajax({
                        url: '/local/tools/bookmark.list.php',
                        type: 'GET',
                        success: function (result){
                            $('#popup-choose-list-available-group-list').html(result);
                        }
                    });

                    $('#popup-choose-list-selected-recipe-id').val(parseInt($('#create-new-list-form-id').val()));

                    $('#create-new-list-form input').val('');


                    $(".add-bookmark").removeAttr("data-popup");

                    $(".add-bookmark").attr('data-popup', 'popup-choose-list');

                    $('.popup-choose-list').addClass('opened');

                }
            }
        });

        /*$('.popup-bg').click();
        createNotification({
            'text': '«Салат со шпинатом, курицей и гранатом» успешно добавлен в подборку  «Выпечка»',
            'position': 'bottom'
        });*/
        return false;
    });

    $('.add-group-recipe').on('click', function () {

        $('#create-new-list-form-id').val($('#popup-choose-list-selected-recipe-id').val());

        $(this).parents('.popup').removeClass('opened');
        var popupName = "popup-create-list";
        var popup = $("." + popupName);
        popup.addClass('opened');
        return false;
    });


    $('.default-avatar-item').on('click', function () {
        $('.default-avatar-item.checked').removeClass('checked');
        $('.current-avatar img').attr('src', $(this).children('img').attr('src'));
        $(this).addClass('checked');
        createNotification({
            'text': 'Аватар успешно изменен',
            'position': 'bottom', //'bottom' or 'top'
            'parentElement': '.popup-avatar', //default body
            'status': 'success' //'error', 'success', ''
        });
        return false;
    });
    
    
    $.validator.addMethod("birthday", function(value, elem) {
        return this.optional(elem) || /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value);
    },"Invalid date");
    
    $('.cabinet-personal-info form').validate({
        rules: {
            date: {
                birthday: true
            }
        }
    });
    /* END TEST NEED REMOVE */
});