import * as seedrandom from 'seedrandom';
import Gaussian = gaussian.Gaussian;
import { isGaussian } from '../util';

export const fillRgba = function(ctx: CanvasRenderingContext2D,
                           red: number | Gaussian,
                           green: number | Gaussian,
                           blue: number | Gaussian,
                           alpha: number | Gaussian = 1,
                           rng: seedrandom.prng = seedrandom()) {
    if (isGaussian(red)) {
        red = red.ppf(rng());
    }
    if (isGaussian(green)) {
        green = green.ppf(rng());
    }
    if(isGaussian(blue)) {
        blue = blue.ppf(rng());
    }
    if(isGaussian(alpha)) {
        alpha = alpha.ppf(rng());
    }
    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
}
