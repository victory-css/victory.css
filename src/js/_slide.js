(function (w, d) {
    var vclass = Victory.classList,
        selectorBtn = '.v-slide .v-slide-btn-';

    d.addEventListener('click', function (e) {
        if (e.button !== 0) return;

        var target = e.target;

        if (target.matches(selectorBtn + 'next') || target.matches(selectorBtn + 'next > *')) {
            goToSlide(target, true, e);
        } else if (target.matches(selectorBtn + 'back') || target.matches(selectorBtn + 'back > *')) {
            goToSlide(target, false, e);
        }
    });

    function goToSlide(target, next, e)
    {
        e.preventDefault();

        var slide = target.closest(".v-slide"),
            inner = slide.querySelector(".v-slide-inner");

        if (inner.vSlideActive) return;

        inner.vSlideActive = true;

        var items = inner.getElementsByClassName('v-slide-item');

        if (items.length < 2) return;

        vclass.remove(inner, 'v-no-transition');

        if (next) {
            vclass.add(inner, 'v-slide-next');
        } else {
            vclass.add(inner, 'v-slide-back');
        }

        setTimeout(resetSlide, 250, next, inner, next ? items[0] : items[items.length - 1]);
    }

    function resetSlide(next, inner, move)
    {
        vclass.add(inner, 'v-no-transition');
        vclass.remove(inner, next ? 'v-slide-next' : 'v-slide-back');

        inner.insertBefore(move, next ? inner.lastChild : inner.firstChild);

        inner.vSlideActive = false;
    }
})(window, document);
