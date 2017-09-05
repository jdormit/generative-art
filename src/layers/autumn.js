"use strict";
exports.__esModule = true;
var drawing_1 = require("../drawing");
var util_1 = require("../util");
var TITLE = 'Autumn';
var DARK_BROWN = [28, 17, 28];
var BROWN = [31, 35, 42];
var ORANGE = [30, 87, 61];
var YELLOW = [57, 96, 58];
var WHITE = [150, 100, 100];
exports.autumn = {
    title: TITLE,
    render: function (rng, ctx) {
        if (ctx.canvas == null) {
            return;
        }
        var numRects = util_1.scaledGaussian(500, 50, rng);
        for (var i = 0; i < numRects; i++) {
            var x = util_1.scaledGaussian(ctx.canvas.width * (2 / 3), 100, rng);
            var y = util_1.scaledGaussian(ctx.canvas.height * (1 / 3), 100, rng);
            var width = util_1.scaledGaussian(16, 2, rng);
            var height = util_1.scaledGaussian(24, 2, rng);
            var colors = [
                [0.4, BROWN.slice()],
                [0.3, ORANGE.slice()],
                [0.2, YELLOW.slice()],
                [0.1, WHITE.slice()]
            ];
            var color = util_1.weightedChoice(colors, rng);
            drawing_1.fillHsla(ctx, color[0], color[1], color[2], 0.9, rng);
            drawing_1.box(ctx, x, y, width, height, rng);
        }
    }
};
