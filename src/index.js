"use strict";
exports.__esModule = true;
var seedrandom = require("seedrandom");
var layers = require("./layers");
var drawing_1 = require("./drawing");
var canvas = document.getElementById('canvas');
if (!canvas.getContext) {
    throw new Error("This browser does not support the HTML5 Canvas API");
}
if (Object.keys(layers).length === 0) {
    throw new Error("No layers found");
}
var ctx = canvas.getContext('2d');
var layer = layers[Object.keys(layers)[0]];
var $title = document.getElementById('title');
$title.innerHTML = "";
$title.appendChild(document.createTextNode(layer.title));
var render = function (ctx, layer) {
    var layers = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        layers[_i - 2] = arguments[_i];
    }
    var title = $title.textContent ? $title.textContent.trim() : undefined;
    var rng = seedrandom(title);
    drawing_1.clear(ctx);
    layer.render(rng, ctx);
    layers.forEach(function (layer) { return layer.render(rng, ctx); });
};
render(ctx, layer);
$title.addEventListener('input', function () { return render(ctx, layer); });
