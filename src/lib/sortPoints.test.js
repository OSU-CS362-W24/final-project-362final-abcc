const sortedPoints = require('./sortPoints');

test('Array test case 1', () => {
    const data = [
        {x: 3, y: 4},
        {x: 1, y: 2},
        {x: 2, y: 3}
    ];

    const expected = [
        {x: 1, y: 2},
        {x: 2, y: 3},
        {x: 3, y: 4}
    ];

    expect(sortedPoints(data)).toEqual(expected);
});

test('Array test case 2', () => {
    const data = [
        {x: 12, y: 3},
        {x: 9, y: 13},
        {x: 17, y: 7},
        {x: 3, y: 9}
    ];

    const expected = [
        {x: 3, y: 9},
        {x: 9, y: 13},
        {x: 12, y: 3},
        {x: 17, y: 7}
    ];

    expect(sortedPoints(data)).toEqual(expected);
});

test('Array test case 3', () => {
    const data = [
        {x: 10, y: 12},
        {x: 4, y: 8},
        {x: -3, y: 11},
        {x: 5, y: 6}
    ];

    const expected = [
        {x: -3, y: 11},
        {x: 4, y: 8},
        {x: 5, y: 6},
        {x: 10, y: 12}
    ];

    expect(sortedPoints(data)).toEqual(expected);
});