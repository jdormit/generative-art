import * as gaussian from 'gaussian';
import { box, fillRgba } from '../drawing';
import { scaledGaussian } from '../util';
import { Layer } from '.';

const TITLE = 'Scatter';
const NUM_CLUSTERS = gaussian(7, 4);
const NUM_RECTS = gaussian(50, 25);
const WIDTH = gaussian(35, 25);
const HEIGHT = gaussian(50, 72);
const GREEN = gaussian(128, 256);
const BLUE = gaussian(128, 256);
const ALPHA = gaussian(0.5, 0.25);

export const boxClusters: Layer = {
    title: TITLE,
    render: function(rng: seedrandom.prng, ctx: CanvasRenderingContext2D) {
        if (ctx.canvas == null) {
            return;
        }
        const numClusters = NUM_CLUSTERS.ppf(rng());
        for (let i = 0; i < numClusters; i++) {
            fillRgba(ctx, scaledGaussian(64 * (i + 1), 8, rng), GREEN, BLUE, ALPHA, rng);
            const numRects = NUM_RECTS.ppf(rng());
            for (let j = 0; j < numRects; j++) {
                const x = scaledGaussian(ctx.canvas.width / numClusters * (i + 1), 150, rng);
                const y = scaledGaussian(ctx.canvas.height / 2, 200, rng);
                box(ctx, x, y, WIDTH, HEIGHT, rng);
            }
        }
    }
}
