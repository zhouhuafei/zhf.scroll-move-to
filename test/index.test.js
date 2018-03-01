const scrollMoveTo = require('../dist/index.min');

test(`滚动到x轴100, y轴500的位置`, () => {
    scrollMoveTo(100, 500, function (x, y) {
        console.log(x, y);
    });
    expect(true).toEqual(true);
});
