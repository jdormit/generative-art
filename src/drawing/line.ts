import * as seedrandom from 'seedrandom';
import Gaussian = gaussian.Gaussian;
import { isGaussian } from '../util';

export const line = function(ctx: CanvasRenderingContext2D,
                             startX: number | Gaussian,
                             startY: number | Gaussian,
                             endX: number | Gaussian,
                             endY: number | Gaussian,
                             rng: seedrandom.prng = seedrandom()) {
    if (isGaussian(startX)) {
        startX = startX.ppf(rng());
    }
    if (isGaussian(startY)) {
        startY = startY.ppf(rng());
    }
    if (isGaussian(endX)) {
        endX = endX.ppf(rng());
    }
    if (isGaussian(endY)) {
        endY = endY.ppf(rng());
    }
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}
