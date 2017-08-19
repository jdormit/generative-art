import * as seedrandom from 'seedrandom';
import * as gaussian from 'gaussian';

export function isGaussian(arg: any): arg is gaussian.Gaussian {
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
            arg.scale && typeof arg.scale === 'function'
           );
}

export function randomRange(min: number,
                            max: number,
                            rng: seedrandom.prng = seedrandom()): number {
    return rng() * (max - min) + min;
}

export function scaledGaussian(mean: number,
                               standardDeviation: number,
                               rng: seedrandom.prng = seedrandom()): number {
    return gaussian(0, standardDeviation**2).ppf(rng()) + mean;
}

export type WeightedChoices<T> = Array<[number, T]>;

function validateWeightedChoices<T>(choices: WeightedChoices<T>) {
    const invalidWeights = choices.reduce((acc, choice) => choice[0] < 0 || choice[0] > 1, false);
    const weightSum = choices.reduce((sum, choice) => sum + choice[0], 0);
    if (Math.abs(weightSum - 1) > 0.00001) {
        throw new Error("Weights must sum to 1");
    } else if (invalidWeights) {
        throw new Error("Weights must be between 0 and 1");
    }
}

export function weightedChoice<T>(choices: WeightedChoices<T>, rng: seedrandom.prng = seedrandom()): T {
    validateWeightedChoices(choices);
    let num = rng();
    let weightDiff = 1;
    let res = choices[0][1];
    for (const choice of choices) {
        if (Math.abs(choice[0] - num) < weightDiff) {
            weightDiff = Math.abs(choice[0] - num);
            res = choice[1];
        }
    }
    return res;
}
