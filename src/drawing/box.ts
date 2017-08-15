import * as seedrandom from 'seedrandom';
import Gaussian = gaussian.Gaussian;
import { isGaussian } from '../util';

export const box = function(ctx: CanvasRenderingContext2D,
                     x: number | Gaussian,
                     y: number | Gaussian,
                     width: number | Gaussian,
                     height: number | Gaussian,
                     rng: seedrandom.prng = seedrandom()) {
    if (isGaussian(x)) {
        x = x.ppf(rng());
    }
    if (isGaussian(y)) {
        y = y.ppf(rng());
    }
    if (isGaussian(width)) {
        width = width.ppf(rng());
    }
    if (isGaussian(height)) {
        height = height.ppf(rng());
    }
    ctx.fillRect(x, y, width, height);
}
