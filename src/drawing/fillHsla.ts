import * as seedrandom from 'seedrandom';
import Gaussian = gaussian.Gaussian;
import { isGaussian } from '../util';

export const fillHsla = function(ctx: CanvasRenderingContext2D,
                           hue: number | Gaussian,
                           saturation: number | Gaussian,
                           lightness: number | Gaussian,
                           alpha: number | Gaussian = 1,
                           rng: seedrandom.prng = seedrandom()) {
    if (isGaussian(hue)) {
        hue = hue.ppf(rng());
    }
    if (isGaussian(saturation)) {
        saturation = saturation.ppf(rng());
    }
    if(isGaussian(lightness)) {
        lightness = lightness.ppf(rng());
    }
    if(isGaussian(alpha)) {
        alpha = alpha.ppf(rng());
    }
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}
