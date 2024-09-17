document.addEventListener("DOMContentLoaded", () => {
    // Открытие мобильного меню
    $('#openMenu, .overlay').click((e) => {
        $('#openMenu').find('.btn-menu__burger').toggleClass('btn-menu__burger--open')

        $('#menu').toggleClass('header-resolution--open')
        $('.overlay').toggleClass('overlay--open')

        $('.header-resolution__wrapper').toggleClass('header-resolution__wrapper--open')
        
        $('html').toggleClass('no-scroll');
    }); 

    const nameInput = document.querySelectorAll('input[name="name"]');

    nameInput.forEach(el => {
        el.addEventListener("input", function() {
            if (!el.value.trim()) {
                el.classList.add('error');
                el.nextElementSibling.style.display = 'block';
            } else {
                el.classList.remove('error');
                el.nextElementSibling.style.display = 'none';
            }
        });
    })
    if($('.form__input--phone').length) {
        $('.form__input--phone').mask('+7 (999) 999-99-99');
    }

    // Фиксированная шапка при скролле
    $(window).on('load resize', () => {
        let windows = $(window);
        let nav = $('.header-container');
        if($(window).width() < 1481) {
            let headerHeight = $('.header-container').height()
            headerHeight += 40;
            let h = nav.offset().top;
            windows.scroll(function(){
                if (windows.scrollTop() > headerHeight){
                    nav.addClass('header-fixed');
                    $('main').css('margin-top', headerHeight + 'px');
                } else {
                    nav.removeClass('header-fixed');
                    $('main').css('margin-top', '0');
                }
            });
        } else {
            windows.scroll(function(){
                if (windows.scrollTop() > 140){
                    nav.addClass('header-fixed');
                    $('main').css('margin-top', '140px');
                } else {
                    nav.removeClass('header-fixed');
                    $('main').css('margin-top', '0');
                }
            });
            return 
        }
    })

    function tabs(wrapperMain, wrapperTab, wrapperContent, activeTab, activeContent) {
        $(wrapperTab).on('click', 'li:not('+activeTab+')', function () {
            $(this)
                .addClass(activeTab).siblings().removeClass(activeTab)
                .closest(wrapperMain).find(wrapperContent).removeClass(activeContent).eq($(this).index()).addClass(activeContent);
        });
    }
    tabs('.tabs', '.tabs__list', '.tabs__content', 'active-tab', 'active');

    $('.footer__title').click((e) => {
        $(e.target).parent().find('.footer__nav').toggleClass('open')
    })

    $('.course-tabs__btn-drop').click((e) => {
        $(e.target).toggleClass('active')
        $(e.target).parent().find('.course-tabs__wrapper-list').toggleClass('open')
    })

    $('.accordion-tab').click((e) => {
        $(e.target).find('.btn-more-details div').toggleClass('active')
        $(e.target).parent().find('.accordion-content').toggleClass('open')
    })

    // Модальное окно
    function showModal(btnOpen, modalBody) {
        btnOpen.click(function() {
            modalBody.show( );
            $('html').addClass('no-scroll');
            return false;
        });		
     
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                modalBody.hide();
                $('html').removeClass('no-scroll');
            }
        });
        
        modalBody.click(function(e) {
            if ($(e.target).closest('.modal__wrapper').length == 0) {
                $(this).hide();					
                $('html').removeClass('no-scroll');
            }
        });
    }
    showModal($('.open-modal--consult'), $('.modal-consult'));
    showModal($('.open-modal--calc'), $('.modal-calc'));
    showModal($('.open-modal--service'), $('.modal-service'));
    showModal($('.open-modal--auth'), $('.modal-auth'));
    showModal($('.open-modal--reg'), $('.modal-reg'));
    showModal($('.open-modal--students'), $('.modal-students'));

    showModal($('.open-modal--success'), $('.modal-success'));

    if($('.gallery-fancybox').length > 0) {
        Fancybox.bind('[data-fancybox="gallery"]', {});
    }

    // Показать еще курсы
    const studentContainers = document.querySelectorAll('.order-student');

    studentContainers.forEach(container => {
        const items = container.querySelectorAll('.order-student__item');
        const button = container.querySelector('.order-student__more');
        let expanded = false;

        function updateVisibility() {
            items.forEach((item, index) => {
                if (index < 3 || expanded) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        button.addEventListener('click', function() {
            expanded = !expanded;
            button.textContent = expanded ? 'Скрыть' : 'Показать ещё';
            updateVisibility();
        });

        updateVisibility();
    });

    // Табы на странице заказа
    const orderTabs = document.querySelectorAll('.order__content');
    const prevButton = document.querySelector('.btn-prev');
    const nextButton = document.querySelector('.btn-next');
    let currentIndex = 0;

    if(prevButton && nextButton) {

        function showTab() {
            orderTabs.forEach((tab, idx) => {
                tab.classList.toggle('active', idx === currentIndex);
            });
            prevButton.style.display = currentIndex === 0 ? 'none' : 'inline-block';
            nextButton.disabled = currentIndex === orderTabs.length - 1;
        }

        prevButton.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                showTab();
            }
        });
    
        nextButton.addEventListener('click', function () {
            if (currentIndex < orderTabs.length - 1) {
                currentIndex++;
                showTab();
            }
        });
        
        showTab();
    }
})