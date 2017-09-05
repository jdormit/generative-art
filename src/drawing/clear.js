"use strict";
exports.__esModule = true;
exports.clear = function (ctx) {
    if (ctx.canvas != null) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
};
