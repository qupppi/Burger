
$(document).ready(function () {
    /* modal page menu handler */

    function toggleMenu(action = 'show', options = {
        cancelEvent: false,
    }) {
        let method = action === 'close' ? 'removeClass' : 'addClass';
        return function (event) {
            if (options.cancelEvent) {
                event.preventDefault();
            }
            $('#modal-menu')[method]("modal-menu--open");
            $("body")[method]("modal-opened");
        };
    }

    $("#menu-link").on('click', toggleMenu('show', { cancelEvent: true }));
    $("#modal-menu__close").on('click', toggleMenu('close', { cancelEvent: true }));

    /* modal page menu handler (END)*/




    $("#burger-slider").slider();

    

    $(".menu__list").accordeon({
        itemSelector: '.menu__item',
        activeClass: "menu__item--active",
        triggerSelector: '.menu__item-trigger'
    });

    $(".team__list").accordeon({
        itemSelector: '.team__member',
        activeClass: 'team__member--active',
        func: $item => {
            $item.next(".team__member-description").slideToggle();
        }
    });

    /* accordeon handers (END) */

    /* order form handler */

    $('.order form.order__form').on('submit', function (e) {
        e.preventDefault();
        $that = $(this);
        let data = {};
        for (let input of $that.find("input, textarea")) {
            data[input.name] = input.value;
        }

        fetch($that.attr('action'), {
            method: $that.attr('method'),
            body: JSON.stringify(data),
            headers: new Headers({ 'Content-Type': 'application/json' })
        }).then(response => response.json())
            .then(value => {
                let message = value.status === 1 || value.status === 0 ? value.message : null;
                if (message) {
                    $("#popup").popup('show', message);
                }
            })
            .catch(reason => {
                $("#popup").popup('show', reason.message);
            });
    });

    /* order form handler (END) */

    /* reviews handlers */

    let author = "Константин Спилберг";

    let bodyText = `Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... 
                    Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным. 
                    Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... 
                    Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.`;

    $(".reviews__review-link").on('click', function (e) {
        e.preventDefault();
        // modalReview.show({header: author, body: bodyText});
        $("#modal-review").modal('show', { header: author, body: bodyText });
    });

    /* reviews handlers (END)*/

    /* page slider handler */

    let inScroll = false;

    const mouseInertionIsFinished = 300;
    const transitionTime = 400;


    $(window).on('mousewheel', function (e) {
        e.preventDefault();
        if (!inScroll) {
            inScroll = true;
            let $active = $("section.active-section");
            let $nextSection = $active.next("section");
            let $prevSection = $active.prev("section");

            if (e.deltaY < 0 && $nextSection.length) {
                // scroll down
                $("html, body").animate({ scrollTop: $nextSection.offset().top }, transitionTime);
            } else if (e.deltaY > 0 && $prevSection.length) {
                // scroll up
                $("html, body").animate({ scrollTop: $prevSection.offset().top }, transitionTime);
            }

            setTimeout(() => {
                inScroll = false;
            }, transitionTime + mouseInertionIsFinished);
        }
    });

    $("section.section").viewport().on('inview', function(_, $element) {
        $("section.active-section").removeClass("active-section");
        $element.addClass("active-section");

        let id = $element.attr('id');
        $(".paginator__list-item").removeClass("active").filter(function() {
            return $(this).find('a').attr('href') === `#${id}`;
        }).addClass('active');
    }).scroll();

    /* page slider handler (END) */

    let responsivePercent = 1.08;
    let resposiveSize = 1.875;
    function calculateDropsWidth() {
        let width = Math.min(450, $(".greeting_img").width() * responsivePercent);
        let height = width / resposiveSize;
        $(".greeting__drops").width(width).height(height);
    }

    calculateDropsWidth();
    $(window).resize(function() {
        if ($(this).width() < 570) {
            //calculate
            calculateDropsWidth();
        }
    });

});
