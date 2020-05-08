/*
 * victory.css 0.2.0
 * Copyright (c) 2020 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 * 
 * https://github.com/brcontainer/victory.css
 */

(function (w, d, u) {
    if (w.Victory) return;

    var attach = d.attachEvent,
        listener = d.addEventListener,
        docTouch = w.DocumentTouch,
        touchSupport = 'ontouchstart' in w || docTouch && (d instanceof docTouch);

    function checkClass(el, cls)
    {
        cls = cls.replace(/[[\]\\+\^*$&()<>!?:/.=]/g, '\\$&');

        return new RegExp('(^|\\s)' + cls + '($|\\s)', 'g');
    }

    function removeClass(el, cre)
    {
        el.className = el.className.replace(cre, ' ').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    }

    w.Victory = {
        'touch': touchSupport,
        'classList': {
            'has': function (el, cls) {
                return el && checkClass(el, cls).test(el.className);
            },
            'toggle': function (el, cls) {
                if (!el) return;

                var cre = checkClass(el, cls);

                if (cre.test(el.className)) {
                    removeClass(el, cre);
                } else {
                    el.className += ' ' + cls;
                }
            },
            'add': function (el, cls) {
                if (el && checkClass(el, cls).test(el.className) === false) {
                    el.className += ' ' + cls;
                }
            },
            'remove': function (el, cls) {
                if (el) removeClass(el, checkClass(el, cls));
            }
        },
        'addEvent': function (target, type, callback) {
            if (listener) {
                target.addEventListener(type, callback);
            } else if (attach) {
                target.attachEvent('on' + type, callback);
            }
        },
        'removeEvent': function (target, type, callback) {
            if (listener) {
                target.removeEventListener(type, callback);
            } else if (attach) {
                target.detachEvent('on' + type, callback);
            }
        },
        'prevent': function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        }
    };
})(window, document);

(function (d, w) {
    var selector = '.v-nav-items.v-nav-',
        wh = w.innerHeight,
        ww = w.innerWidth,
        Victory = w.Victory,
        cls = Victory.classList,
        evt = Victory.touch ? 'touchstart' : 'click';

    /* Add event click or touchstart for open menu in navbar */
    Victory.addEvent(d, evt, function (e) {
        var target = e.target || e.srcElement;

        if (!target) return;

        if (target.matches('.v-navbar .v-nav-toggle,.v-navbar .v-nav-toggle *')) {
            cls.toggle(target.closest('.v-navbar'), 'v-nav-toggled');
        } else if (target.matches(selector + 'ltr,' + selector + 'rtl')) {
            cls.remove(target.closest('.v-navbar'), 'v-nav-toggled');
        }
    });

    /* Hide all opened navbar menus */
    Victory.addEvent(w, 'resize', function (e) {
        if (ww !== w.innerWidth || wh !== w.innerHeight) {
            var navbars = d.querySelectorAll('.v-navbar');
            
            for (var i = navbars.length - 1; i >= 0; i--) cls.remove(navbars[i], 'v-nav-toggled');

            fixRender();
        }

        ww = w.innerWidth;
        wh = w.innerHeight;
    });

    var fixtimeout;

    /* Fix navbar width size when enter in mobile simulator on Chrome/Chromium browser */
    function fixRender()
    {
        cls.add(d.documentElement, 'v-fix-render');

        if (fixtimeout) clearTimeout(fixtimeout);

        fixtimeout = setTimeout(function () {
            cls.remove(d.documentElement, 'v-fix-render');
        }, 500);
    }
})(document, window);

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
