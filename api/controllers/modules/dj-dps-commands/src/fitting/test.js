let interpolateArray = require("2d-bicubic-interpolate").default;
const data = [
    {
        x: 0,
        y: 0,
        z: 0.3
    },
    {
        x: 1,
        y: 0.5,
        z: 1.2
    },
    {
        x: 0,
        y: 1,
        z: 1.4
    },
    {
        x: 1,
        y: 1,
        z: 2.2
    }
];

console.log(data)
console.log(interpolateArray(data, 1));