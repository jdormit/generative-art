"use strict";
exports.__esModule = true;
var seedrandom = require("seedrandom");
var util_1 = require("../util");
exports.fillRgba = function (ctx, red, green, blue, alpha, rng) {
    if (alpha === void 0) { alpha = 1; }
    if (rng === void 0) { rng = seedrandom(); }
    if (util_1.isGaussian(red)) {
        red = red.ppf(rng());
    }
    if (util_1.isGaussian(green)) {
        green = green.ppf(rng());
    }
    if (util_1.isGaussian(blue)) {
        blue = blue.ppf(rng());
    }
    if (util_1.isGaussian(alpha)) {
        alpha = alpha.ppf(rng());
    }
    ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
};
