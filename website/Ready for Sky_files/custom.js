$(document).ready(function () {

    $(document).on('click', '#popup-choose-list-available-group-list li', function() {

        var element = $(this);
        var groupId = element.attr('data-id');
        var groupName = element.attr('data-name');
        var recipeId = $('#popup-choose-list-selected-recipe-id').val();
        var recipeName = $('#popup-choose-list-selected-recipe-name').html();

        if (groupId > 0 && recipeId > 0) {
            $.ajax({
                url: '/local/tools/bookmark.add.php',
                type: 'POST',
                data: {
                    groupId : groupId,
                    recipeId : recipeId
                },
                success: function (result){

                    console.log(result);

                    $('.popup-bg').click();
                        createNotification({
                        'text': '«' + recipeName + '» успешно добавлен в подборку  «' + groupName + '»',
                        'position': 'bottom'
                    });

                    if ($('#svg-bookmark-' + recipeId).hasClass('active')) {
                        $('#svg-bookmark-' + recipeId).removeClass('active');
                    } else {
                        $('#svg-bookmark-' + recipeId).addClass('active');
                    }

                    //$('#popup-choose-list-available-group-list').html(result);

                }
            });
        }



        return false;
    });




    $(document).on('click', '.add-like', function() {
        var element = $(this);

        if (element.hasClass('need-auth')) {
            window.location = '/ru/cabinet/personal/?backurl=' + element.attr('data-back-url');
            return false;
        }

        $.ajax({
            type: "get",
            url: "/local/tools/recipe_like.php?recipeID=" + element.attr('data-id'),
            success: function(data) {
                //$('.add-like-count-' + element.attr('data-id')).parent().addClass('active');
                var like = $('.add-like-count-' + element.attr('data-id')).parent();

                //var detail = $('.add-like-count-' + element.attr('data-id'));

                if (!element.hasClass('active')) {
                    if (!element.find('.like-icon-animation').length) {
                        element.append('<span class="like-icon-animation"></span>');
                        element.append('<span class="like-icon-animation"></span>');
                        element.append('<span class="like-icon-animation"></span>');
                    }
                    element.addClass('active');
                    $('.add-like-count-' + element.attr('data-id')).html(parseInt(element.attr('data-cnt')) + 1);
                    element.attr('data-cnt', parseInt(element.attr('data-cnt')) + 1);
                } else {
                    element.removeClass('active');
                    $('.add-like-count-' + element.attr('data-id')).html(parseInt(element.attr('data-cnt')) - 1);
                    element.attr('data-cnt', parseInt(element.attr('data-cnt')) - 1);
                }
            },
            //dataType: "json"
        });
        return false;
    });
});