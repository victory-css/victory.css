/*
 * victory.css 0.1.0
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

(function (w, d) {
    var tags = [
        'nav', 'main', 'section', 'article', 'aside', 'header', 'footer',
        'video', 'audio', 'figure', 'figcaption', 'summary', 'details', 'hgroup',
        'mark', 'bdi', 'source', 'canvas', 'svg', 'math', 'keygen', 'output', 'progress', 'meter'
    ];

    for (var i = tags.length - 1; i >= 0; i--) {
        d.createElement(tags[i]);
    }

    if (w.Element && w.Element.prototype) {
        var elproto = w.Element.prototype;

        if (!elproto.matches) {
            elproto.matches =
            elproto.matchesSelector ||
            elproto.mozMatchesSelector ||
            elproto.msMatchesSelector ||
            elproto.oMatchesSelector ||
            elproto.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;

                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1; 
            };
        }

        if (!elproto.closest) {
            elproto.closest = function (s) {
                var el = this;

                if (!d.documentElement.contains(el)) return null;

                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);

                return null;
            };
        }
    }
})(window, document);

(function (d, w) {
    var selector = '.v-navbar-items.v-navbar-',
        wh = w.innerHeight,
        ww = w.innerWidth,
        Victory = w.Victory,
        touchSupport = false;

    function closeNavbar(target)
    {
        if (target && ( target.matches(selector + 'ltr') || target.matches(selector + 'rtl') )) {
            Victory.classList.remove(target.closest('.v-navbar'), 'v-navbar-toggled');
        }
    }

    Victory.addEvent(d, 'touchstart', function (e) {
        touchSupport = true;

        closeNavbar(e.target || e.srcElement);
    });

    Victory.addEvent(d, 'click', function (e) {
        var target = e.target || e.srcElement;

        if (!target) return;

        if (target.matches('.v-navbar .v-navbar-toggle') || target.matches('.v-navbar .v-navbar-toggle *')) {
            Victory.classList.toggle(target.closest('.v-navbar'), 'v-navbar-toggled');
        } else if (!touchSupport) {
            closeNavbar(target);
        }
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
