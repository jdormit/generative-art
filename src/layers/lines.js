"use strict";
exports.__esModule = true;
var drawing_1 = require("../drawing");
var util_1 = require("../util");
var TITLE = 'Lines';
var NUM_LINES = 150;
exports.lines = {
    title: TITLE,
    render: function (rng, ctx) {
        if (ctx.canvas == null) {
            return;
        }
        for (var i = 0; i < NUM_LINES; i++) {
            // const x = randomRange(0, ctx.canvas.width, rng);
            var x = util_1.scaledGaussian(ctx.canvas.width / 2, ctx.canvas.width / 7, rng);
            drawing_1.line(ctx, x, ctx.canvas.height, x, 0);
        }
    }
};
