/*
 * victory.css 0.0.3
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 * 
 * https://github.com/brcontainer/Victory.css
 */

(function (w, d) {
    if (w.Victory) return;

    function checkClass(el, className)
    {
        if (!el) return false;

        var cls = className.replace(/([[\]\\.{}\-])/gi, '\\$1');

        return new RegExp('\\b' + cls + '\\b', 'g');
    }

    w.Victory = {
        'classList': {
            'toggle': function (el, className) {
                if (!el) return;

                var cre = checkClass(el, className);

                if (!cre) return;

                if (cre.test(el.className)) {
                    el.className = el.className.replace(cre, ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
                } else {
                    el.className += ' ' + className;
                }
            },
            'add': function (el, className) {
                var cre = checkClass(el, className);

                if (cre && cre.test(el.className) === false) {
                    el.className += ' ' + className;
                }
            },
            'remove': function (el, className) {
                var cre = checkClass(el, className);
 
                if (cre !== false) el.className = el.className.replace(cre, ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
            }
        }
    };
})(window, document);

(function (d, w, u) {
    var selector = '.v-navbar-items.v-navbar-';

    d.addEventListener('click', function (e) {
        var target = e.target;

        if (
            target.matches('.v-navbar .v-navbar-toggle') ||
            target.matches('.v-navbar .v-navbar-toggle *')
        ) {
            w.Victory.classList.toggle(target.closest(".v-navbar"), 'v-navbar-toggled');
        } else if (
            target.matches(selector + 'ltr') ||
            target.matches(selector + 'rtl')
        ) {
            w.Victory.classList.remove(target.closest(".v-navbar"), 'v-navbar-toggled');
        }
    });

    w.addEventListener('resize', function (e) {
        var navbars = d.querySelectorAll(".v-navbar");
        
        for (var i = navbars.length - 1; i >= 0; i--) {
            w.Victory.classList.remove(navbars[i], 'v-navbar-toggled');
        }
    });
})(document, window);

(function (w, d) {
    var tags = [
        'nav', 'main', 'section', 'article', 'aside', 'header', 'footer',
        'video', 'audio', 'figure', 'figcaption',
        'mark', 'bdi', 'source', 'canvas', 'svg', 'math', 'keygen', 'output', 'progress', 'meter'
    ];

    for (var tag in tags) {
        d.createElement(tag);
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

                if (!document.documentElement.contains(el)) return null;

                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);

                return null;
            };
        }
    }
})(window, document);
