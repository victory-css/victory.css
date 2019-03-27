(function (w, d, u) {
    var vclass = Victory.classList,
        selectorBtn = '.v-slide .v-slide-btn-';

    d.addEventListener('click', slideButtons);

    d.addEventListener('touchstart', slideTouchStart, false);
    d.addEventListener('touchmove', slideTouchMove, false);
    d.addEventListener('touchend', slideTouchEnd, false);

    function slideButtons(e)
    {
        if (e.button !== 0) return;

        var target = e.target;

        if (target.matches(selectorBtn + 'next,' + selectorBtn + 'next > *')) {
            goToSlide(target, true, e);
        } else if (target.matches(selectorBtn + 'back,' + selectorBtn + 'back > *')) {
            goToSlide(target, false, e);
        }
    }

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

        vclass.add(inner, next ? 'v-slide-next' : 'v-slide-back');

        setTimeout(resetSlide, 250, next, inner, next ? items[0] : items[items.length - 1]);
    }

    function resetSlide(next, inner, move)
    {
        vclass.add(inner, 'v-no-transition');
        vclass.remove(inner, next ? 'v-slide-next' : 'v-slide-back');

        inner.insertBefore(move, next ? inner.lastChild : inner.firstChild);

        inner.vSlideActive = false;
    }

    //Touch events
    var xTouch, yTouch, targetTouch, xTouchDiff, yTouchDiff;

    function slideTouchStart(e)
    {
        var firstTouch = e.touches[0], target = e.target;

        if (!firstTouch || !target.matches('.v-slide-inner, .v-slide-inner *')) return;

        xTouch = firstTouch.clientX;
        yTouch = firstTouch.clientY;

        targetTouch = target;
    }

    function slideTouchMove(e)
    {
        var touch = e.touches[0];

        if (!touch || xTouch === u || yTouch === u) return;

        xTouchDiff = xTouch - touch.clientX;
        yTouchDiff = yTouch - touch.clientY;
    }

    function slideTouchEnd(e)
    {
        if (!targetTouch) return;

        var type;

        if (Math.abs(xTouchDiff) > Math.abs(yTouchDiff)) {
            goToSlide(targetTouch, xTouchDiff > 0, e);
        }

        targetTouch = u;
    }
})(window, document);
