/*
 * victory.css 0.6.0
 * Copyright (c) 2021 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 * 
 * https://victory-css.github.io/
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

(function (w, d) {
    var tags = [
        //none
        'audio', 'dialog', 'datalist', 'template',

        //inline
        'abbr', 'bdi', 'data', 'mark', 'math', 'output', 'picture', 'source', 'time', 'track',

        //inline-block
        'canvas', 'meter', 'progress', 'video', 'svg',

        //block
        'article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'main', 'nav', 'section', 'summary'
    ];

    /* Fallback for HTML5 tags in IE8 */
    for (var i = tags.length - 1; i >= 0; i--) {
        d.createElement(tags[i]);
    }

    if (w.Element && w.Element.prototype) {
        var elproto = w.Element.prototype;

        /* Polyfill for Element.matches() in old browsers  */
        if (!elproto.matches) {
            elproto.matches =
            elproto.matchesSelector ||
            elproto.mozMatchesSelector ||
            elproto.msMatchesSelector ||
            elproto.oMatchesSelector ||
            elproto.webkitMatchesSelector ||
            function (s) {
                var el = this,
                    matches = (el.document || el.ownerDocument).querySelectorAll(s),
                    i = matches.length;

                while (--i >= 0 && matches.item(i) !== el) {}
                return i > -1; 
            };
        }

        /* Polyfill for Element.closest() in old browsers */
        if (!elproto.closest) {
            elproto.closest = function (s) {
                var el = this;

                if (!(el.document || el.ownerDocument).documentElement.contains(el)) return null;

                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);

                return null;
            };
        }
    }
})(window, document);

(function (w, d, u) {
    var Victory = w.Victory,
        vclass = Victory.classList;

    Victory.addEvent(d, 'click', toggle);

    function toggle(e)
    {
        if (e.button !== 0) return;

        var target = e.target || e.srcElement;

        if (target && target.matches('[data-v-toggle]')) {
            Victory.prevent(e);

            var vToggle = target.getAttribute('data-v-toggle');
            var targets = d.querySelectorAll(vToggle);
            var delay = target.getAttribute('data-v-toggle-delay');

            if (delay) delay = parseInt(delay);

            delay = delay || 500;

            for (var i = targets.length - 1; i >= 0; i--) {
                toggling(targets[i], delay);
            }
        }
    }

    /*
    .v-toggle-show:      hides the content
    .v-toggle-show:      shows the content
    .v-toggle-changing:  is added when the transition starts, and removed when it finishes
    */
    function toggling(target, delay)
    {
        if (!target.matches('.v-toggle')) {
            throw new Error('define v-toggle class in target element');
        }

        if (!target.matches('.v-toggle-changing')) {
            if (target.matches('.v-toggle-show')) {
                setTimeout(function () {
                    vclass.remove(target, 'v-toggle-changing');
                    vclass.remove(target, 'v-toggle-show');
                }, delay);
            } else {
                setTimeout(function () {
                    vclass.remove(target, 'v-toggle-changing');
                    vclass.add(target, 'v-toggle-show');
                }, delay);
            }
        }
    }
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
        selectorBtn = '.v-slide .v-slide-btn-',
        currentSlide;

    Victory.addEvent(d, 'click', slideButtons);
    Victory.addEvent(d, 'touchstart', slideTouchStart);
    Victory.addEvent(d, 'touchmove', slideTouchMove);
    Victory.addEvent(d, 'touchend', slideTouchEnd);
    Victory.addEvent(d, 'keydown', slideKeyboard);

    function slideKeyboard(e)
    {
        if (!currentSlide) return;

        var next;

        if (e.key !== u) {
            if (e.key === 'ArrowRight') {
                next = true;
            } else if (e.key === 'ArrowLeft') {
                next = false;
            }
        } else if (e.keyDown === 39) {
            next = true;
        } else if (e.keyDown === 37) {
            next = false;
        }

        if (next !== u) goToSlide(currentSlide.querySelector('.v-slide-inner'), next);
    }

    function slideButtons(e)
    {
        if (e.button !== 0) return;

        currentSlide = u;

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

        currentSlide = slide;

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

        currentSlide = u;

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
