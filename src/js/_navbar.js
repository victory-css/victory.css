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
