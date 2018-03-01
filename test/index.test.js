const scrollMoveTo = require('../dist/index.min');

test(`jest`, () => {
    scrollMoveTo(100, 500, function (x, y) {
        console.log(x, y);
    });
    expect(true).toEqual(true);
});
