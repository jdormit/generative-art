define("util/index", ["require", "exports", "seedrandom", "gaussian"], function (require, exports, seedrandom, gaussian) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isGaussian(arg) {
        return (arg.mean && typeof arg.mean === 'number' &&
            arg.variance && typeof arg.variance === 'number' &&
            arg.standardDeviation && typeof arg.standardDeviation === 'number' &&
            arg.pdf && typeof arg.pdf === 'function' &&
            arg.cdf && typeof arg.cdf === 'function' &&
            arg.ppf && typeof arg.ppf === 'function' &&
            arg.mul && typeof arg.mul === 'function' &&
            arg.div && typeof arg.div === 'function' &&
            arg.add && typeof arg.add === 'function' &&
            arg.sub && typeof arg.sub === 'function' &&
            arg.scale && typeof arg.scale === 'function');
    }
    exports.isGaussian = isGaussian;
    function randomRange(min, max, rng) {
        if (rng === void 0) { rng = seedrandom(); }
        return rng() * (max - min) + min;
    }
    exports.randomRange = randomRange;
    function scaledGaussian(mean, standardDeviation, rng) {
        if (rng === void 0) { rng = seedrandom(); }
        return gaussian(0, Math.pow(standardDeviation, 2)).ppf(rng()) + mean;
    }
    exports.scaledGaussian = scaledGaussian;
    function validateWeightedChoices(choices) {
        var invalidWeights = choices.reduce(function (acc, choice) { return choice[0] < 0 || choice[0] > 1; }, false);
        var weightSum = choices.reduce(function (sum, choice) { return sum + choice[0]; }, 0);
        if (Math.abs(weightSum - 1) > 0.00001) {
            throw new Error("Weights must sum to 1");
        }
        else if (invalidWeights) {
            throw new Error("Weights must be between 0 and 1");
        }
    }
    function weightedChoice(choices, rng) {
        if (rng === void 0) { rng = seedrandom(); }
        validateWeightedChoices(choices);
        var num = rng();
        for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
            var choice = choices_1[_i];
            if (num < choice[0]) {
                return choice[1];
            }
            else {
                num -= choice[0];
            }
        }
        throw new Error('Something went wrong choosing a weighted choice');
    }
    exports.weightedChoice = weightedChoice;
});
define("drawing/box", ["require", "exports", "seedrandom", "util/index"], function (require, exports, seedrandom, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("drawing/fillRgba", ["require", "exports", "seedrandom", "util/index"], function (require, exports, seedrandom, util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fillRgba = function (ctx, red, green, blue, alpha, rng) {
        if (alpha === void 0) { alpha = 1; }
        if (rng === void 0) { rng = seedrandom(); }
        if (util_2.isGaussian(red)) {
            red = red.ppf(rng());
        }
        if (util_2.isGaussian(green)) {
            green = green.ppf(rng());
        }
        if (util_2.isGaussian(blue)) {
            blue = blue.ppf(rng());
        }
        if (util_2.isGaussian(alpha)) {
            alpha = alpha.ppf(rng());
        }
        ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    };
});
define("drawing/fillHsla", ["require", "exports", "seedrandom", "util/index"], function (require, exports, seedrandom, util_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fillHsla = function (ctx, hue, saturation, lightness, alpha, rng) {
        if (alpha === void 0) { alpha = 1; }
        if (rng === void 0) { rng = seedrandom(); }
        if (util_3.isGaussian(hue)) {
            hue = hue.ppf(rng());
        }
        if (util_3.isGaussian(saturation)) {
            saturation = saturation.ppf(rng());
        }
        if (util_3.isGaussian(lightness)) {
            lightness = lightness.ppf(rng());
        }
        if (util_3.isGaussian(alpha)) {
            alpha = alpha.ppf(rng());
        }
        ctx.fillStyle = "hsla(" + hue + ", " + saturation + "%, " + lightness + "%, " + alpha + ")";
    };
});
define("drawing/clear", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clear = function (ctx) {
        if (ctx.canvas != null) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    };
});
define("drawing/line", ["require", "exports", "seedrandom", "util/index"], function (require, exports, seedrandom, util_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.line = function (ctx, startX, startY, endX, endY, rng) {
        if (rng === void 0) { rng = seedrandom(); }
        if (util_4.isGaussian(startX)) {
            startX = startX.ppf(rng());
        }
        if (util_4.isGaussian(startY)) {
            startY = startY.ppf(rng());
        }
        if (util_4.isGaussian(endX)) {
            endX = endX.ppf(rng());
        }
        if (util_4.isGaussian(endY)) {
            endY = endY.ppf(rng());
        }
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    };
});
define("drawing/index", ["require", "exports", "drawing/box", "drawing/fillRgba", "drawing/fillHsla", "drawing/clear", "drawing/line"], function (require, exports, box_1, fillRgba_1, fillHsla_1, clear_1, line_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(box_1);
    __export(fillRgba_1);
    __export(fillHsla_1);
    __export(clear_1);
    __export(line_1);
});
define("layers/autumn", ["require", "exports", "drawing/index", "util/index"], function (require, exports, drawing_1, util_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            var numRects = util_5.scaledGaussian(500, 50, rng);
            for (var i = 0; i < numRects; i++) {
                var x = util_5.scaledGaussian(ctx.canvas.width * (2 / 3), 100, rng);
                var y = util_5.scaledGaussian(ctx.canvas.height * (1 / 3), 100, rng);
                var width = util_5.scaledGaussian(16, 2, rng);
                var height = util_5.scaledGaussian(24, 2, rng);
                var colors = [
                    [0.4, BROWN.slice()],
                    [0.3, ORANGE.slice()],
                    [0.2, YELLOW.slice()],
                    [0.1, WHITE.slice()]
                ];
                var color = util_5.weightedChoice(colors, rng);
                drawing_1.fillHsla(ctx, color[0], color[1], color[2], 0.9, rng);
                drawing_1.box(ctx, x, y, width, height, rng);
            }
        }
    };
});
define("layers/lines", ["require", "exports", "drawing/index", "util/index"], function (require, exports, drawing_2, util_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                var x = util_6.scaledGaussian(ctx.canvas.width / 2, ctx.canvas.width / 7, rng);
                drawing_2.line(ctx, x, ctx.canvas.height, x, 0);
            }
        }
    };
});
define("layers/index", ["require", "exports", "layers/autumn", "layers/lines"], function (require, exports, autumn_1, lines_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(autumn_1);
    __export(lines_1);
});
define("index", ["require", "exports", "seedrandom", "layers/index", "drawing/index"], function (require, exports, seedrandom, layers, drawing_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        drawing_3.clear(ctx);
        layer.render(rng, ctx);
        layers.forEach(function (layer) { return layer.render(rng, ctx); });
    };
    render(ctx, layer);
    $title.addEventListener('input', function () { return render(ctx, layer); });
});
