'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (name, factory) {
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
        // nodejs - commonjs canon
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // requirejs - amd canon
        define(factory);
    } else {
        // window - browser canon
        if (Object.prototype.toString.call(window.zhf).slice(8, -1).toLowerCase() !== 'object') {
            window.zhf = {};
        }
        window.zhf[name] = factory();
    }
})('scrollMoveTo', function () {
    function scrollMoveTo() {
        var targetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var targetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var cb = arguments[2];
        var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 6;

        var scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var speedX = 0;
        var speedY = 0;
        var timer = null;
        var dirX = targetX - scrollL > 0;
        var dirY = targetY - scrollT > 0;
        var fn = function fn() {
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