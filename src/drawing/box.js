"use strict";
exports.__esModule = true;
var seedrandom = require("seedrandom");
var util_1 = require("../util");
exports.box = function (ctx, x, y, width, height, rng) {
    if (rng === void 0) { rng = seedrandom(); }
    if (util_1.isGaussian(x)) {
        x = x.ppf(rng());
    }
    if (util_1.isGaussian(y)) {
        y = y.ppf(rng());
    }
    if (util_1.isGaussian(width)) {
        width = width.ppf(rng());
    }
    if (util_1.isGaussian(height)) {
        height = height.ppf(rng());
    }
    ctx.fillRect(x, y, width, height);
};
