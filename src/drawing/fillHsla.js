"use strict";
exports.__esModule = true;
var seedrandom = require("seedrandom");
var util_1 = require("../util");
exports.fillHsla = function (ctx, hue, saturation, lightness, alpha, rng) {
    if (alpha === void 0) { alpha = 1; }
    if (rng === void 0) { rng = seedrandom(); }
    if (util_1.isGaussian(hue)) {
        hue = hue.ppf(rng());
    }
    if (util_1.isGaussian(saturation)) {
        saturation = saturation.ppf(rng());
    }
    if (util_1.isGaussian(lightness)) {
        lightness = lightness.ppf(rng());
    }
    if (util_1.isGaussian(alpha)) {
        alpha = alpha.ppf(rng());
    }
    ctx.fillStyle = "hsla(" + hue + ", " + saturation + "%, " + lightness + "%, " + alpha + ")";
};
