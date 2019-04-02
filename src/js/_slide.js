(function (w, d, u) {
    var Victory = w.Victory,
        vclass = Victory.classList,
        selectorBtn = '.v-slide .v-slide-btn-';

    Victory.addEvent(d, 'click', slideButtons);

    Victory.addEvent(d, 'touchstart', slideTouchStart);
    Victory.addEvent(d, 'touchmove', slideTouchMove);
    Victory.addEvent(d, 'touchend', slideTouchEnd);

    function slideButtons(e)
    {
        if (e.button !== 0) return;

        var target = e.target || e.srcElement;

        if (!target) return;

        var direction;

        if (target.matches(selectorBtn + 'next,' + selectorBtn + 'next > *')) {
            direction = true;
        } else if (target.matches(selectorBtn + 'back,' + selectorBtn + 'back > *')) {
            direction = false;
        }

        if (direction === u) return;

        Victory.prevent(e);

        goToSlide(target, direction);
    }

    function goToSlide(target, next)
    {
        var slide = target.closest('.v-slide'),
            inner = slide.querySelector('.v-slide-inner');

        if (inner.vSlideActive) return;

        inner.vSlideActive = true;

        var items = inner.querySelectorAll('.v-slide-item');

        if (items.length < 2) return;

        vclass.remove(inner, 'v-no-transition');

        vclass.add(inner, next ? 'v-slide-next' : 'v-slide-back');

        resetSlide(next, inner, next ? items[0] : items[items.length - 1]);
    }

    function resetSlide(next, inner, move)
    {
        setTimeout(function () {
            vclass.add(inner, 'v-no-transition');
            vclass.remove(inner, next ? 'v-slide-next' : 'v-slide-back');

            inner.insertBefore(move, next ? inner.lastChild : inner.firstChild);

            inner.vSlideActive = false;
        }, 250);
    }

    //Touch events
    var xTouch, yTouch, targetTouch, xTouchDiff, yTouchDiff;

    function slideTouchStart(e)
    {
        var firstTouch = e.touches[0], target = e.target;

        if (!firstTouch || !target.matches('.v-slide-inner,.v-slide-inner *')) return;

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
        if (!targetTouch || xTouchDiff === u || yTouchDiff === u) return;

        if (Math.abs(xTouchDiff) > Math.abs(yTouchDiff)) {
            goToSlide(targetTouch, xTouchDiff > 0, e);
        }

        xTouchDiff = yTouchDiff = xTouch = yTouch = targetTouch = u;
    }
})(window, document);
