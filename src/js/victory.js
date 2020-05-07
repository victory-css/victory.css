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
