(function (name, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') { // nodejs - commonjs canon
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) { // requirejs - amd canon
        define(factory);
    } else { // window - browser canon
        if (Object.prototype.toString.call(window.zhf).slice(8, -1).toLowerCase() !== 'object') {
            window.zhf = {};
        }
        window.zhf[name] = factory();
    }
})('scrollMoveTo', function () {
    function scrollMoveTo(targetX = 0, targetY = 0, cb, scale = 6) {
        let scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        let speedX = 0;
        let speedY = 0;
        let timer = null;
        const dirX = targetX - scrollL > 0;
        const dirY = targetY - scrollT > 0;
        const fn = function () {
            speedX = Math.ceil(Math.abs((targetX - scrollL) / scale));
            speedY = Math.ceil(Math.abs((targetY - scrollT) / scale));
            speedX = dirX ? speedX : -speedX;
            speedY = dirY ? speedY : -speedY;
            scrollL += speedX;
            scrollT += speedY;
            // console.log(scrollL, scrollT);
            window.scrollTo(scrollL, scrollT);
            cb && cb(scrollL, scrollT);
            timer = requestAnimationFrame(fn);
            if (scrollL === Number(targetX) && scrollT === Number(targetY)) {
                cancelAnimationFrame(timer);
            }
        };
        requestAnimationFrame(fn);
    }

    return scrollMoveTo;
});
