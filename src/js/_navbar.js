(function (d, w) {
    var selector = '.v-navbar-items.v-navbar-',
        wh = w.innerHeight,
        ww = w.innerWidth,
        Victory = w.Victory,
        cls = Victory.classList,
        evt = Victory.touch ? 'touchstart' : 'click';

    Victory.addEvent(d, evt, function (e) {
        var target = e.target || e.srcElement;

        if (!target) return;

        if (target.matches('.v-navbar .v-navbar-toggle,.v-navbar .v-navbar-toggle *')) {
            cls.toggle(target.closest('.v-navbar'), 'v-navbar-toggled');
        } else if (target.matches(selector + 'ltr,' + selector + 'rtl')) {
            cls.remove(target.closest('.v-navbar'), 'v-navbar-toggled');
        }
    });

    Victory.addEvent(w, 'resize', function (e) {
        if (ww !== w.innerWidth || wh !== w.innerHeight) {
            var navbars = d.querySelectorAll('.v-navbar');
            
            for (var i = navbars.length - 1; i >= 0; i--) cls.remove(navbars[i], 'v-navbar-toggled');

            fixRender();
        }

        ww = w.innerWidth;
        wh = w.innerHeight;
    });

    var fixtimeout;

    function fixRender()
    {
        if (!d.body) return;

        cls.add(d.body, 'v-fix-render');

        if (fixtimeout) clearTimeout(fixtimeout);

        fixtimeout = setTimeout(function () {
            cls.remove(d.body, 'v-fix-render');
        }, 500);
    }
})(document, window);
