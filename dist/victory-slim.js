/*
 * victory.css 0.1.1
 * Copyright (c) 2019 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 * 
 * https://github.com/brcontainer/victory.css
 */

(function (w, d) {
    if (w.Victory) return;

    function checkClass(el, cls)
    {
        if (!el) return false;

        cls = cls.replace(/([[\]\\.{}\-])/gi, '\\$1');

        return new RegExp('\\b' + cls + '\\b', 'g');
    }

    w.Victory = {
        'classList': {
            'has': function (el, cls) {
                var cre = checkClass(el, cls);

                return cre && cre.test(el.className);
            },
            'toggle': function (el, cls) {
                var cre = checkClass(el, cls);

                if (!cre) return;

                if (cre.test(el.className)) {
                    el.className = el.className.replace(cre, ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
                } else {
                    el.className += ' ' + cls;
                }
            },
            'add': function (el, cls) {
                var cre = checkClass(el, cls);

                if (cre && cre.test(el.className) === false) {
                    el.className += ' ' + cls;
                }
            },
            'remove': function (el, cls) {
                var cre = checkClass(el, cls);
 
                if (cre) el.className = el.className.replace(cre, ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
            }
        },
        'addEvent': function (target, type, callback) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } else if (target.attachEvent) {
                target.attachEvent('on' + type, callback);
            }
        },
        'removeEvent': function (target, type, callback) {
            if (target.removeEventListener) {
                target.addEventListener(type, callback);
            } else if (target.detachEvent) {
                target.detachEvent('on' + type, callback);
            }
        }
    };
})(window, document);

(function (d, w) {
    var selector = '.v-navbar-items.v-navbar-',
        wh = w.innerHeight,
        ww = w.innerWidth,
        Victory = w.Victory;

    Victory.addEvent(d, 'click', function (e) {
        var target = e.target || e.srcElement;

        if (!target) return;

        if (target.matches('.v-navbar .v-navbar-toggle,.v-navbar .v-navbar-toggle *')) {
            Victory.classList.toggle(target.closest('.v-navbar'), 'v-navbar-toggled');
        } else if (target.matches(selector + 'ltr,' + selector + 'rtl')) {
            Victory.classList.remove(target.closest('.v-navbar'), 'v-navbar-toggled');
        }

        e.preventDefault();
    });

    Victory.addEvent(w, 'resize', function (e) {
        if (ww !== w.innerWidth && wh !== w.innerHeight) {
            var navbars = d.querySelectorAll('.v-navbar');
            
            for (var i = navbars.length - 1; i >= 0; i--) {
                Victory.classList.remove(navbars[i], 'v-navbar-toggled');
            }
        }

        ww = w.innerWidth;
        wh = w.innerHeight;
    });
})(document, window);

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
