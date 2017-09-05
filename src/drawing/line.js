"use strict";
exports.__esModule = true;
var seedrandom = require("seedrandom");
var util_1 = require("../util");
exports.line = function (ctx, startX, startY, endX, endY, rng) {
    if (rng === void 0) { rng = seedrandom(); }
    if (util_1.isGaussian(startX)) {
        startX = startX.ppf(rng());
    }
    if (util_1.isGaussian(startY)) {
        startY = startY.ppf(rng());
    }
    if (util_1.isGaussian(endX)) {
        endX = endX.ppf(rng());
    }
    if (util_1.isGaussian(endY)) {
        endY = endY.ppf(rng());
    }
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
};
