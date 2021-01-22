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
