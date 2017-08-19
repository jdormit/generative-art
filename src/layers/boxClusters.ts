import * as gaussian from 'gaussian';
import { box, fillHsla } from '../drawing';
import { scaledGaussian, weightedChoice } from '../util';
import { Layer } from '.';

const TITLE = 'Scatter';
const NUM_CLUSTERS = gaussian(7, 4);
const NUM_RECTS = gaussian(50, 25);
const WIDTH = gaussian(35, 25);
const HEIGHT = gaussian(50, 72);
const SATURATION = gaussian(75, 100);
const LIGHTNESS = gaussian(50, 125);
const ALPHA = gaussian(0.5, 0.25);


export const boxClusters: Layer = {
    title: TITLE,
    render: function(rng: seedrandom.prng, ctx: CanvasRenderingContext2D) {
        if (ctx.canvas == null) {
            return;
        }
        const colorWeights: Array<[number, number[]]> = [
            [0.7, [360, 65, 45, 90]],
            [0.2, [180, 45, 65, 75]],
            [0.1, [220, 45, 65, 75]]
        ];
        const numClusters = NUM_CLUSTERS.ppf(rng());
        for (let i = 0; i < numClusters; i++) {
            const color = weightedChoice(colorWeights, rng);
            fillHsla(ctx, color[0], color[1], color[2], color[3], rng);
            const numRects = NUM_RECTS.ppf(rng());
            for (let j = 0; j < numRects; j++) {
                const x = scaledGaussian(ctx.canvas.width / numClusters * (i + 1), 150, rng);
                const y = scaledGaussian(ctx.canvas.height / 2, 200, rng);
                box(ctx, x, y, WIDTH, HEIGHT, rng);
            }
        }
    }
}
