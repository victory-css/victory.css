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
