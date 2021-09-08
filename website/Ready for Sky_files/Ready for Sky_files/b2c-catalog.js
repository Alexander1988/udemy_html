$(document).ready(function () {
    var catalogSlider5 = new Swiper('.catalog-list-slider-5', {
        slidesPerView: 5,
        spaceBetween: 0,
        navigation: {
            nextEl: '.catalog-list-slider-next',
            prevEl: '.catalog-list-slider-prev'
        },
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
    var catalogSlider4 = new Swiper('.catalog-list-slider-4', {
        slidesPerView: 4,
        spaceBetween: 0,
        navigation: {
            nextEl: '.catalog-list-slider-next',
            prevEl: '.catalog-list-slider-prev'
        },
        breakpoints: {
            1279: {
                slidesPerView: 3
            },
            960: {
                slidesPerView: 3
            },
            575: {
                slidesPerView: 1.5
            }
        }
    });

    $('.catalog-filters-group-name').on('click', function () {
        $(this).parent().toggleClass('opened');
    });

    $('.catalog-filter-mobile-btn').on('click', function () {
        $(this).parent().next('.catalog-filters').slideToggle();
    });

    $('#supp_submit_message').click(function(e){
        e.preventDefault();
        let el = this,
            $button = $(el),
            form,
            $title = $('.popup-contact-supplier .popup-title');
        if($button.data('type') === 'feedback') {
            url = '/local/tools/ajax_feedback.php';
            form  = $button.parent().parent().parent();
            $title = $('.factory-bottomform-title');
        } else {
            url = '/local/tools/ajax_contact_supplier.php';
            form  = $button.parent().parent();
        }

        let name = $('#supp_name', form),
            email = $('#supp_email', form),
            message = $('#supp_message', form),
            submit = true;

        if(name.val() == '') {
            name.css('border-color', '#e12d64');
            submit = false;
        } else {
            name.css('border-color', '#cacaca');
        }
        if(email.val() == '') {
            email.css('border-color', '#e12d64');
            submit = false;
        } else {
            email.css('border-color', '#cacaca');
        }
        if(message.val() == '') {
            message.css('border-color', '#e12d64');
            submit = false;
        } else {
            message.css('border-color', '#cacaca');
        }

        if(!validateEmail(email.val())) {
            email.css('border-color', '#e12d64');
            submit = false;
        } else {
            email.css('border-color', '#cacaca');
        }

        let mItemID = $button.data('item-id'),
            mItemCode = $button.data('item-code'),
            mItemName = $button.data('item-name'),
            mCompanyID = $button.data('company-id'),
            mCompanyCode = $button.data('company-code'),
            mCompanyName = $button.data('company-name');

        if(submit) {
            
            dataLayer.push({
                event:"UA gtm events",
                eventCategory:"Contact-Factory",
                eventAction:"SendForm"
            });

            $.ajax({
                url: url,
                type: 'post',
                data: {
                    name: name.val(),
                    email: email.val(),
                    message: message.val(),
                    itemId: mItemID,
                    itemCode: mItemCode,
                    itemName: mItemName,
                    companyId: mCompanyID,
                    companyCode: mCompanyCode,
                    companyName: mCompanyName
                },
                success : function (res){
                    answ = JSON.parse(res);
                    if(!answ.error) {
                        $('.form-line', form).each(function (i, el) {
                            if ($(el).hasClass('form')) {
                                $(el).toggleClass('d-none', true)
                            } else if ($(el).hasClass('success')) {
                                $(el).toggleClass('d-none', false)
                            }
                        });
                        $button.toggleClass('d-none', true);
                        $(form).toggleClass('d-none', true);
                        $title.html(OKText);
                        $button.unbind().click(function () {
                            $('.popup-bg').click();
                        })
                    } else {
                        switch(answ.error) {
                            case 'email' :
                                email.css('border-color', '#e12d64');
                                break;
                        }
                    }
                }
            });
        }
    });

});



let setAttr = function(el) {
    $ssp = $("#supp_submit_message");
    $ssp.attr('data-item-id',$(el).attr('data-item-id'));
    $ssp.attr('data-item-code',$(el).attr('data-item-code'));
    $ssp.attr('data-item-name',$(el).attr('data-item-name'));
    $ssp.attr('data-company-id',$(el).attr('data-company-id'));
    $ssp.attr('data-company-code',$(el).attr('data-company-code'));
    $ssp.attr('data-company-name',$(el).attr('data-company-name'));
};

let catalog_load_more = function(el){
    let $this = $(el),
        loadpage = $this.data('loadpage'),
        pagen = $this.data('pagen'),
        url = $this.data('baselink') + 'PAGEN_' + pagen + '=' + loadpage,
        maxpage = $this.data('maxpage'),
        nextloadpage = loadpage === maxpage ? false : parseInt(loadpage) + 1;

    $.ajax({
        url: url,
        data: {
            ajax: 'true'
        },
        success: function(answ){
            answ = JSON.parse(answ);
            $('.catalog.catalog-bg .b2c-catalog-row').append(answ.items);
            $('#navstring').html(answ.navstring);
        },
    })
};

let timeout_search;

let catalog_search_request = function (input)
{
    let $input = $(input);
    let q = $input.val();
    q = $.trim(q);
    $.ajax({
        url: '',
        data: {
            ajax: true,
            q: q,
            section_code: section_code,
            vendor: vendor
        },
        success: function(answ) {
            update_q_param_in_url(q);
            answ = JSON.parse(answ);
            if(answ.empty_search === true) {//если результат поиска пустой
                $('.data-content-vendor').html(answ.vendor);
                $('.catalog-categories-list').html('');
                $('.catalog-categories').toggleClass('d-none', true);
                $('.catalog.catalog-bg .b2c-catalog-row').html('');
                $('.catalog.catalog-bg').toggleClass('d-none', true);
                $('#navstring')
                    .html('')
                    .toggleClass('d-none', true);
                $('#empty_search')
                    .html(answ.items)
                    .toggleClass('d-none', false);
            } else {
                $('.data-content-vendor').html(answ.vendor);
                $('.catalog-categories-list').html(answ.sections);
                $('.catalog-categories').toggleClass('d-none', false);
                $('.catalog.catalog-bg .b2c-catalog-row').html(answ.items);
                $('.catalog.catalog-bg').toggleClass('d-none', false);
                $('#navstring')
                    .html(answ.navstring)
                    .toggleClass('d-none', false);
                $('#empty_search')
                    .html('')
                    .toggleClass('d-none', true);
            }
        }
    });
};

let catalog_search = function (input) {
    if(timeout_search !== null)
        clearTimeout(timeout_search);
    timeout_search = setTimeout(catalog_search_request, 500, input);
};

let q_index, params = [];
let update_q_param_in_url = function (q) {
    let path = window.location.pathname,
        url_filter = function (el) {
            return el !== "";
        };
    params = window.location.search.replace('?', '').split('&');
    params = params.filter(url_filter);//фильтруем от пустых значений
    params = array_values(params);//сбрасываем индексы
    let find_q = function (el, index) {
        if(el.indexOf('q=') >= 0) {
            q_index = index;
            return true;
        }
        return false;
    };
    if(params.length)
        params.forEach(find_q);//ищем индекс q параметра
    if(q.length) {
        if (typeof q_index === 'number' && q_index >= 0)
            params[q_index] = 'q=' + q;
        else
            params[params.length] = 'q=' + q;
    } else {
        delete params[q_index];
    }
    params = params.filter(url_filter);//почему-то надо снова фильтравать

    let p_str = params.length ? '?' + params.join('&') : '';
    window.history.replaceState('', '', window.location.pathname + p_str);
};

let array_values = function (input) {
    let tmpArr = [];
    for (let key in input) {
        tmpArr[tmpArr.length] = input[key];
    }
    return tmpArr;
};