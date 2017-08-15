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