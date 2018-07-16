(function (d, w, u) {
    return;
    var selectorBtn = '.v-slide .v-slide-btn-';

    function goToSlide(slide, e, target) {
        e.preventDefault();

        if (!target) return;

        target = target.closest(".v-slide");

        var items = target.querySelectorAll('.v-slide-inner > .v-slide-item'),
            active = target.querySelector('.v-slide-inner > .v-active'),
            inner = target.querySelector('.v-slide-inner'),
            toNext = true;

        var index = Array.prototype.indexOf.call(items, active);

        if (items.length < 2) return;

        if (typeof slide === 'number') {
            slide--;
        } else if (slide) {
            if (index + 1 >= items.length) {
                slide = 0;
            } else {
                slide = index + 1;
            }
        } else {
            toNext = false;

            if (index - 1 < 0) {
                slide = 0;
            } else {
                slide = index - 1;
            }
        }

        var ncurrent = items[slide];

        w.Victory.classList.add(target, toNext ? 'v-slide-tn' : 'v-slide-tb');
        w.Victory.classList.add(ncurrent, toNext ? 'v-slide-next' : 'v-slide-back');
    }

    d.addEventListener('click', function (e) {
        var target = e.target;

        if (target.matches(selectorBtn + 'next') || target.matches(selectorBtn + 'next > *')) {
            goToSlide(false, e, target);
        } else if (target.matches(selectorBtn + 'back') || target.matches(selectorBtn + 'back > *')) {
            goToSlide(false, e, target);
        }
    });
})(document, window);
