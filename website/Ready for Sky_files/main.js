$(document).ready(function () {
    /*
    * GLOBAL JS
    * */
    var $mobileMenuLink = $('.mobile-menu-icon');
    var $mobileMenu = $('.mobile-menu-bg');
    var $closeMobileMenu = $('.mobile-menu-close');
    var $customScroll = $('.custom-scroll-block');
    var $mobileLangSelect = $('.mobile-menu-country');
    var $mobileLangSelectList = $('.mobile-menu-lang-select-list');
    var $resetGlobalSearch = $('.reset-global-search');
    var $globalSearchBtn = $('.global-search');
    var $globalSearchBtnClose = $('.hide-global-search');
    var $globalSearchForm = $('.global-search-form');
    var $backToTop = $('.back-to-top');
    
    var $uploadFileBtn = $('.upload-file-btn');
    var uploadFileInputClass = '.upload-file-hidden';
    
    var $customSingleSelect = $('.sing-selectize');
    var $customSingleSelectWithoutTexfield = $('.sing-selectize-without-textfield')
    
    
    $mobileMenuLink.on('click', function () {
        $mobileMenu.toggleClass('opened');
    });
    $mobileMenu.on('click', function () {
        if ($(event.target).closest(".mobile-menu").length) return;
        $(this).removeClass('opened');
        event.stopPropagation();
    });
    $closeMobileMenu.on('click', function () {
        $mobileMenu.toggleClass('opened');
    });
    $mobileLangSelect.on('click', function () {
        $mobileMenu.toggleClass('opened');
        //
        //$mobileLangSelectList.toggleClass('opened');
        //$(this).toggleClass('opened');
    });
    $('.global-search-form-input').on('keyup', function () {
        if ($(this).val() != "") {
            $(this).parent().find($resetGlobalSearch).show();
        } else {
            $(this).parent().find($resetGlobalSearch).hide();
        }
    });
    $resetGlobalSearch.on('click', function () {
        $(this).parent().find('input').val('');
        $(this).hide();
    });
    $globalSearchBtn.on('click', function () {
        $globalSearchForm.toggleClass('opened');
    });
    $globalSearchBtnClose.on('click', function () {
        $globalSearchForm.toggleClass('opened');
    });
    
    
    //INPUTMASK
    $('input').inputmask();
    
    
    //JSCROLLPANE
    if ($customScroll.length) {
        var pane = $customScroll.jScrollPane({
            autoReinitialise: true
        });
        var api = pane.data('jsp');
        var throttleTimeout;
        $(window).on(
            'resize',
            function()
            {
                if (!throttleTimeout) {
                    throttleTimeout = setTimeout(
                        function()
                        {
                            api.reinitialise();
                            throttleTimeout = null;
                        },
                        50
                    );
                }
            }
        );
    }
    
    //CUSTOM SELECT
    $customSingleSelect.selectize({
        create: false
    });
    $customSingleSelectWithoutTexfield.selectize({
        create: false,
        readOnly: true,
        onInitialize: function() {
            var input = 'selectize-input input',
                wrapper = 'selectize-input';
            $('.' + input).attr('readonly', true);
            $('.' + input + ', .' + wrapper).css('cursor', 'pointer');

            var that = this;

            this.$control.on("click", function () {
                that.ignoreFocusOpen = true;
                setTimeout(function () {
                    that.ignoreFocusOpen = false;
                }, 50);
            });
        },
        openOnFocus: false,
        onFocus: function () {
            if (!this.ignoreFocusOpen) {
                this.open();
            }
        }
    });
    
    
    $backToTop.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
            $backToTop.addClass('showed');
        } else {
            $backToTop.removeClass('showed');
        }
    });
    
    $uploadFileBtn.on('click', function () {
        $(this).next(uploadFileInputClass).click();
        return false;
    });
    /*END GLOBAL JS*/

    /*
     * RECIPE MENU JS
     * */
    var ClassRecipeMenuItemLink = '.recipes-menu-list-item-link';
    var $RecipeMenuItemLink = $(ClassRecipeMenuItemLink);
    var $RecipeMenuItem = $RecipeMenuItemLink.parent();
    var ClassRecipeFilterItem = '.recipe-menu-filters-item';
    var $RecipeFilter = $(ClassRecipeFilterItem);
    var $RecipeFilterItem = $('.recipe-menu-filters-list li a');
    
    var removeFilterClass = '.recipe-menu-remove-filter';
    var caloriesSlider = $( ".filter-calories-slider" );
    var filterItemCheckClass = '.recipe-menu-filters-list a';
    var filterActiveClass = '.recipe-menu-active-filter-item';
    var filterTimeInput = '.filter-time-value';
    var filterTimeHour = '.filter-time-value-h';
    var filterTimeMinutes = '.filter-time-value-m';
    var filterTimeDecClass = 'filter-time-dec';
    var filterTimeIncClass = 'filter-time-inc';
    var filterTmeBlock = '.filter-time-block';
    var inputAutocomplete = '.filter-models-autocomplete';
    var inputAutocompleteBlock = '.recipe-menu-filter-device-search-block';
    var deviceCatalogBClass = '.recipe-menu-filter-device-catalog';
    var deviceFilterItemClass = '.recipe-menu-filter-device-catalog-item';
    
    
    //$('.recipes-menu-btn').on('click', function () {
    //    $('.recipes-menu').toggleClass('opened');
    //    return false;
    //});
    
    
    $(document).on('click',ClassRecipeMenuItemLink, function () {
        var itemMenu = $(this).parent(),
            filterId = itemMenu.data('filter');
        $(ClassRecipeFilterItem).slideUp();
        if (!itemMenu.hasClass('active')) {
            $('[data-filter-id="'+filterId+'"]').slideDown();
            $RecipeMenuItem.removeClass('active');
            itemMenu.addClass('active');
        } else {
            itemMenu.removeClass('active');
        }
        return false;
    });
    
    $RecipeFilterItem.on('click', function ()  {
        $(this).parent().toggleClass('active');
    
    });
    
    $('.recipe-menu-filter-device-categories li').on('click', function () {
        $('.recipe-menu-filter-device-categories a').removeClass('active');
        $(this).children().addClass('active');
        $('.recipe-menu-filter-device-tabs-content .recipe-menu-filter-device-tabs-content-item').hide();
        $('.recipe-menu-filter-device-tabs-content .recipe-menu-filter-device-tabs-content-item').eq($(this).index()).show();
        return false;
    });
    
    /*
    $RecipeFilter.each(function () {
        var filterId = $(this).data('filter-id');
        $(this).clone().appendTo('[data-filter="'+filterId+'"]');
    });*/


    var caloriesMin = $('.filter-calories-val-from').val();
    var caloriesMax = $('.filter-calories-val-to').val();
    caloriesSlider.slider({
        orientation: "horizontal",
        range: true,
        min: 0,
        max: 1000,
        values: [ caloriesMin, caloriesMax ],
        slide: function( event, ui ) {
            $('.filter-calories-val-from').val(ui.values[0]);
            $('.filter-calories-val-to').val(ui.values[1]);
            caloriesSlider.slider('values',0,ui.values[0]);
            caloriesSlider.slider('values',1,ui.values[1]);


        }, change : function() {
            setTimeout(setFilterValue($('.filter-calories-val-from')), 1000);

            setTimeout(setFilterValue($('.filter-calories-val-to')), 1000);
        }
    });

    $('.filter-calories-val-from').on('change', function() {
        var inputVal = parseInt($(this).val());
        if (inputVal < 0 || isNaN(inputVal)) {
            inputVal = 0;
        }
        if (inputVal >= $('.filter-calories-val-to').val()) {
            inputVal = $('.filter-calories-val-to').val() - 1;
        }
        caloriesSlider.slider('values',0,inputVal);
        $('.filter-calories-val-from').val(inputVal);
    });
    $('.filter-calories-val-to').on('change', function() {
        var inputVal = parseInt($(this).val());
        if (inputVal < 0 || isNaN(inputVal)) {
            inputVal = 0;
        }
        if (inputVal <= $('.filter-calories-val-from').val()) {
            inputVal = parseInt($('.filter-calories-val-from').val()) + 1;
        }
        caloriesSlider.slider('values',1,inputVal);
        $('.filter-calories-val-to').val(inputVal);
    });





    $(filterItemCheckClass).on('click', function () {
        var filterName = $(this).data('filter-name');
        var filterId = $(this).data('filter-id');
        if ($(this).parent().hasClass('active')) {
            var filterTitle = $(this).text();
            $('<li class="recipe-menu-active-filter-item" data-filter-id="'+ filterId+'" data-filter-name="'+ filterName+'" >' + filterTitle +'<span class="recipe-menu-remove-filter"><span class="icon svg-close-icon-dark svg-close-icon-dark-icon" data-filter-id="' + filterId + '" data-filter-name="' + filterName + '" onclick="return setFilterValue(this)"></span></span></li>').appendTo('.recipe-menu-active-filters-list');
            $('.recipe-menu-filters-list li a'+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"]').parent().addClass('active');
        } else {
            $('.recipe-menu-filters-list li a'+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"]').parent().removeClass('active');
            $(filterActiveClass+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"]').remove();
        }
        updateFilters();
        return false;
    });
    
    
    $(document).on('click', removeFilterClass, function () {
        var filterName = $(this).parent().data('filter-name');
        var filterId = $(this).parent().data('filter-id');
        $(filterItemCheckClass+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"]').parent().removeClass('active');

        $(deviceFilterItemClass+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"]').removeClass('checked');

        $(this).parent().remove();
        updateFilters();
    });
    
    $(document).on('change', filterTimeInput, function () {
        updateTimeFilter($(this));
        var filterId = 'time';
        var filterName = 3;
        var hours = $(this).parents(filterTmeBlock).find(filterTimeHour).val();
        var minutes = $(this).parents(filterTmeBlock).find(filterTimeMinutes).val();


        var filterTitle = 'Время: ' + hours + 'ч. ' + minutes + 'мин.';

        if ($(filterActiveClass+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"]').length) {
            $(filterActiveClass+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"] .recipe-menu-active-filter-val').text(filterTitle);
        } else {
            $('<li class="recipe-menu-active-filter-item recipe-menu-active-filter-item-time" data-filter-id="'+ filterId+'" data-filter-name="'+ filterName+'" ><span class="recipe-menu-active-filter-val">' + filterTitle +'</span><span class="recipe-menu-remove-filter"><span class="icon svg-close-icon-dark svg-close-icon-dark-icon"  data-filter-id="'+ filterId+'" data-filter-name="'+ filterName+'" onclick="return setFilterValue(this)"></span></span></li>').appendTo('.recipe-menu-active-filters-list');

        }
        updateFilters();

        console.log(hours);
        console.log(minutes);

        if (hours == 0 && minutes == 0) {
            setTimeout(function() {
                $('.recipe-menu-active-filter-item-time .svg-close-icon-dark').click()
            }, 800);
        }


    });
    
    $(document).on('click', '.'+filterTimeDecClass + ' , .' + filterTimeIncClass, function () {
        var hoursInput =  $(this).parents(filterTmeBlock).find(filterTimeHour);
        var minutesInput =  $(this).parents(filterTmeBlock).find(filterTimeMinutes);
        var hours = parseInt(hoursInput.val());
        var minutes = parseInt(minutesInput.val());
        if (isNaN(hours)) hours = 0;
        if (isNaN(minutes)) minutes = 0;
        if ($(this).hasClass(filterTimeDecClass) && !(hours == 0 && minutes == 0)) {
            minutes--;
        }
        if ($(this).hasClass(filterTimeIncClass)) {
            minutes++;
        }
        //hoursInput.val(hours).trigger('change');
        minutesInput.val(minutes).trigger('change');
        //$(this).parents(filterTmeBlock).find(filterTimeInput).change();
    });
    
    
    $(inputAutocomplete).autocomplete({
        serviceUrl: 'assets/json/search.json',
        maxHeight: 170,
        minChars: 1,
        lookupLimit: 6,
        autoSelectFirst: true,
        appendTo: inputAutocompleteBlock,
        onSelect: function (suggestion) {
            //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            var $fined = $('[data-filter-device="'+suggestion.data+'"]');
            if ($fined.length) {
                $('.recipe-menu-filter-device-catalog').find('.active').removeClass('active');
                $('.recipe-menu-filter-device-catalog').addClass('fined');
                $fined.addClass('active');
                $fined.parent().addClass('active');
            }
        }
    });
    
    $(inputAutocomplete).on('keyup', function () {
        if ($(this).val() == "") {
            $(deviceCatalogBClass).removeClass('fined');
            $(deviceCatalogBClass+' .active').removeClass('active');
        }
    });
    
    $(deviceFilterItemClass).on('click', function () {

        var filterName = $(this).data('filter-name');
        var filterId = $(this).data('filter-id');
        if (!$(this).hasClass('checked')) {
            $(filterActiveClass+'[data-filter-name="'+filterName+'"]').remove();
            var filterTitle = $(this).text();
            $('<li class="recipe-menu-active-filter-item" data-filter-id="'+ filterId+'" data-filter-name="'+ filterName+'" >' + filterTitle +'<span class="recipe-menu-remove-filter"><span class="icon svg-close-icon-dark svg-close-icon-dark-icon" data-filter-id="' + filterId + '" data-filter-name="' + filterName + '" onclick="return setFilterValue(this)"></span></span></li>').appendTo('.recipe-menu-active-filters-list');
            $('.recipe-menu-filters-list li a'+'[data-filter-id="'+filterId+'"][data-filter-name="'+filterName+'"]').parent().addClass('active');
        }

        $(deviceCatalogBClass+' .checked').removeClass('checked');
        $(this).addClass('checked');
        updateFilters();
    });
    
    
    
    
    function updateFilters () {
        if ($('.recipe-menu-active-filters-list li').length) {
            $('.clear-filter-link').addClass('showed');
        } else {
            $('.clear-filter-link').removeClass('showed');
        }
    }
    function updateTimeFilter (elem) {
        var hoursInput = elem.parents(filterTmeBlock).find(filterTimeHour);
        var minutesInput = elem.parents(filterTmeBlock).find(filterTimeMinutes);
        var hours = parseInt(hoursInput.val());
        var minutes = parseInt(minutesInput.val());
        if (isNaN(hours)) hours = 0;
        if (isNaN(minutes)) minutes = 0;
        if (hours > hoursInput.data('max')) {
            hours = hoursInput.data('max');
        }
        if (hours < 0) {
            hours = 0;
        }
        if (minutes > minutesInput.data('max')) {
            if (hours < hoursInput.data('max')) {
                hours++;
                minutes = 0;
            } else {
                minutes = minutesInput.data('max');
            }
    
    
        }
        if (minutes < 0) {
            hours--;
            minutes = minutesInput.data('max');
        }
        hoursInput.val(hours);
        minutesInput.val(minutes);
    
        //FOR DUPLICATE FILTER
        var dataIdHours = hoursInput.data('time-filed-id');
        var dataIdMinutes = minutesInput.data('time-filed-id');
        if (typeof dataIdHours != "undefined") {
            $('[data-time-filed-id="'+dataIdHours+'"]').val(hours);
        }
        if (typeof dataIdMinutes != "undefined") {
            $('[data-time-filed-id="'+dataIdMinutes+'"]').val(minutes);
        }
    
    }
    /* END RECIPE MENU JS*/

    /*
     * FORM JS
     * */
    var hideShowPassword = '.control-show-password';
    
    $(hideShowPassword).on('click', function () {
        if ($(this).hasClass('hidden')) {
            $(this).prev().attr('type','text');
            $(this).removeClass('hidden');
        } else {
            $(this).prev().attr('type','password');
            $(this).addClass('hidden');
        }
        return false;
    });
    /* END FORM JS*/

    /*
     * RECIPE LIST JS
     * */
    var addLike = $('.add-like');
    var addBookmark = $('.add-bookmark');
    var searchInputClass = '.recipe-search-input';
    var inputResetClass = '.recipe-search-form-reset-btn';
    
    
    
    
    /*addLike.on('click', function () {
        if (!$(this).hasClass('active')) {
            if (!$(this).find('.like-icon-animation').length) {
                $(this).append('<span class="like-icon-animation"></span>');
                $(this).append('<span class="like-icon-animation"></span>');
                $(this).append('<span class="like-icon-animation"></span>');
            }
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
        return false;
    });*/
    
    /*addBookmark.on('click', function () {
        $(this).toggleClass('active');
        return false;
    });*/
    
    
    $(searchInputClass).on('keyup', function () {
       if ($(this).val() != "") {
           $(this).parent().find(inputResetClass).show();
       } else {
           $(this).parent().find(inputResetClass).hide();
       }
    });
    $(inputResetClass).on('click', function () {
        $(this).parent().find(searchInputClass).val('');
        $(this).hide();
    });
    /*
     * END RECIPE LIST JS
     * */

    /*
     * RECIPE ITEM PAGE JS
     * */
    var swiperRecipes = new Swiper('.swiper-container-similar-recipes', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.next-control',
            prevEl: '.prev-control'
        },
        breakpoints: {
            1279: {
                slidesPerView: 3
            },
            960: {
                slidesPerView: 2
            },
            575: {
                slidesPerView: 1.2
            }
        }
    });
    /*
     * END RECIPE ITEM PAGE JS
     * */

    /*
     * CABINET JS
     * */
     var actionDropdownBtnClass = '.cabinet-recipe-item-action-btn';
     var actionDropdownClass = '.cabinet-recipe-item-action';
     
     var $searchDeviceModel = $('.search-device-model');
     var $searchSliderDeviceItem = $('.slider-devices-item');
     var deviceContainerClass = 'swiper-container-devices';
     
     
     var swiperAdvice = new Swiper('.swiper-container-advice, .swiper-container-favorites', {
         slidesPerView: 3,
         spaceBetween: 20,
         autoHeight: true,
         breakpoints: {
             767: {
                 slidesPerView: 2
             },
             575: {
                 slidesPerView: 1
             }
         }
     });
     
     
     var swiperDevices = new Swiper('.swiper-container-devices', {
         slidesPerView: 3,
         spaceBetween: 20,
         observer: true,
         observeParents: true,
         breakpoints: {
             767: {
                 slidesPerView: 3
             },
             575: {
                 slidesPerView: 3
             },
             400: {
                 slidesPerView: 2
             }
         }
     });
     if ($('.swiper-container-devices').length) {
         if(typeof svipe_devices_to === "undefined") {
             swiperDevices.slideTo(1);
         } else {
             swiperDevices.slideTo(svipe_devices_to);
         }
     }

     if(typeof(devices) !== 'undefined') {

         $searchDeviceModel.autocomplete({
             lookup: devices,
             maxHeight: 170,
             minChars: 1,
             lookupLimit: 6,
             autoSelectFirst: true,
             //appendTo: inputAutocompleteBlock,
             onSelect: function (suggestion) {
                 var finedDevice = $('[data-devices-model="' + suggestion.data.id + '"]');
                 var finedDeviceIndex = finedDevice.index();
                 $('.' + deviceContainerClass).addClass('fined');
                 $('.' + deviceContainerClass + ' .active').removeClass('active');
                 finedDevice.addClass('active');
                 if (finedDeviceIndex > 0) finedDeviceIndex--;
                 swiperDevices.slideTo(finedDeviceIndex);
             }
         });
         $searchDeviceModel.on('keyup', function () {
             if ($(this).val() == "") {
                 $('.' + deviceContainerClass).removeClass('fined');
                 $('.' + deviceContainerClass + ' .active').removeClass('active');
             }
         });

         $searchSliderDeviceItem.on('click', function () {
             $('.' + deviceContainerClass + ' .checked').removeClass('checked');
             $(this).addClass('checked');
             $(this).find('input').attr('checked', true);
             var deviceID = $(this).parents('.swiper-slide').attr('data-devices-model');
             $('#recipe_device_id').val(deviceID).trigger('change');
         });

     }
     $(document).on('click', actionDropdownBtnClass, function () {
         if (!$(this).parents(actionDropdownClass).hasClass('active')) {
             $(actionDropdownClass).removeClass('active');
         }
         $(this).parents(actionDropdownClass).toggleClass('active');
     });
     
     //$('.typing-tags').keypress(function (e) {
     //    if ((e.which == 13 || e.which == 0) && $(this).val().replace(/\s/g, '') != '') {
     //        $(this).parent().parent().find(".list-tags").append("<li>#" + $(this).val() +"<span class='remove-tag'></span></li>")
     //        $(this).val('');
     //        return false;
     //    }
     //});

    var typingTags = $('.typing-tags').selectize({
        delimiter: ',',
        openOnFocus: false,
        persist: false,
        create: function(input) {
            return {
                value: input,
                text: input
            }
        },
        onItemAdd: function (value, $item) {
            $('<span class="remove-tag"></span>').appendTo($item);
            $('#ADD_RECIPE input[name=personal_tag]').trigger('change');
        },
        onInitialize: function (data) {
            $('.typing-tags .item').each(function () {
                $('<span class="remove-tag"></span>').appendTo($(this)[0]);
            });
        }
    });

     
     //  Remove tags
     $('.typing-tags').on("click", '.remove-tag', function (){
         typingTags[0].selectize.removeItem($(this).parent().text());
         $(this).parent().remove();
         typingTags[0].selectize.focus();
     });
     
    //$(document).on('click', '.form-control-unit-block-current', function () {
    //    $(this).parent().toggleClass('active');
    //});
    // $('.form-control-unit-block-dropdown li').on('click', function () {
    //    $(this).parents('.form-control-unit-block').toggleClass('active').find('.form-control-unit-block-current').text($(this).text());
    // });
     
     
     $('.datepicker').datepicker({
         changeMonth: true,
         changeYear: true,
         yearRange: "c-100:c+0"
     });
     
     /*UPLOAD FILE*/
     $(document).on('click', '.upload-photo', function (event) {
         if ($(event.target).closest(".remove-photo").length) {
             $(this).next().val("").change();
         } else {
             $(this).next('.upload-file-hidden').click();
         }
     });

     function readURL(input) {
         if (input.files && input.files[0] && input.files[0].size <= 4000000) {
             var reader = new FileReader();
             var uploadPhotoBlock = $(input).prev('.upload-photo');
             reader.onload = function (e) {
                 if (uploadPhotoBlock.find('img').length) {
                     uploadPhotoBlock.find('img').attr('src', e.target.result);
                 } else {
                     $('<img src="' + e.target.result + '" alt=""/>').appendTo(uploadPhotoBlock);
                 }
                 uploadPhotoBlock.addClass('uploaded');
             };
             reader.readAsDataURL(input.files[0]);
             return true;
         } else {
             if(input.files[0].size > 4000000) {
                 alert('Maximum image size: 4mb');
             }
             return false;
         }
     }

     /*$(document).on('change','.upload-photo-file',function () {
         if ($(this).val() == "") {
             $(this).prev('.upload-photo').removeClass('uploaded');
             $(this).prev('.upload-photo').find('img').remove();
         } else {
             var result = checkFile(this, ()=>{});
             if(result){
                 if ($(this).parents('.photo-for-gallery-item').length && !$(this).prev('.upload-photo').hasClass('uploaded')) {
                     $('<div class="photo-for-gallery-item">' +
                     '<div class="upload-photo-block">' +
                     '<div class="upload-photo upload-photo-preview"><span class="remove-photo"></span></div>' +
                     '<input type="file" name="GALLERY[]" class="upload-photo-file" accept=".jpg, .jpeg, .png">' +
                     '</div>' +
                     '</div>').appendTo('.photo-for-gallery');
                 }
             }
         }
     });*/
    /* END CABINET JS */


    /* POPUP COUNTRY*/
    $(".search-country").autocomplete({
        lookup: countriesData,
        maxHeight: 170,
        minChars: 1,
        lookupLimit: 6,
        autoSelectFirst: false,
        appendTo: '.popup-county-search',
        onSelect: function (suggestion) {
            window.location.assign(suggestion.data)
        }
    });


    $('.eye').on('click', function () {
        if ($(this).hasClass('hidden')) {
            $(this).prev().attr('type','text');
            $(this).removeClass('hidden');
        } else {
            $(this).prev().attr('type','password');
            $(this).addClass('hidden');
        }
        return false;
    });


    $('.filter-ingredients-block-tabs-item').on('click', function () {
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $(this).parent().next('.filter-ingredients-block-tabs-content').find('.filter-ingredients-block-tabs-content-item.active').removeClass('active');
        $(this).parent().next('.filter-ingredients-block-tabs-content').find('.filter-ingredients-block-tabs-content-item').eq($(this).index()).addClass('active');
        return false;
    });
    $('.filter-ingredients-search').on('change', function () {
        if ($(this).val()=="") {
            $(this).addClass('empty-value');
        } else {
            $(this).removeClass('empty-value');
        }
    });
    $('.filter-ingredients-search').change();

    $('.mobile-menu-list-item-hassubmenu').on('click', function () {
        if (!$(this).hasClass('opened')) {
            $('.mobile-menu-list-item-hassubmenu.opened').removeClass('opened');
            $(this).addClass('opened');
        }
    })

 });



function processFile(input, success, errors) {
    if(typeof(errors) === 'undefined') {
        errors = {
            wrong_format: 'Wrong file format',
            wrong_size: 'Wrong file size',
            default: 'Upload image failed'
        }
    }
    if ($(input).val() != "") {
        if (input.files && input.files[0] && input.files[0].size <= 4000000 && /^image\/(jpeg|png)$/i.test(input.files[0].type)) {
            let reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = success;
            return {success:true};
        } else {
            if(!(/^image\/([a-z]{3,})/.test(input.files[0].type))) {
                return {error:errors.wrong_format};
            } else if(!(input.files[0].size <= 4000000)) {
                return {error:errors.wrong_size};
            }
            return {error:errors.default};
        }
    } else {
        success();
        return {success:true};
    }

}

let validateEmail = function(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};