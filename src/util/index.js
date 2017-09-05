"use strict";
exports.__esModule = true;
var seedrandom = require("seedrandom");
var gaussian = require("gaussian");
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
