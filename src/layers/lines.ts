import { line } from '../drawing';
import { randomRange, scaledGaussian } from '../util';

import * as gaussian from 'gaussian';
import { Layer } from '.';

const TITLE = 'Lines'
const NUM_LINES = 150;
export const lines: Layer = {
    title: TITLE,
    render: function(rng: seedrandom.prng, ctx: CanvasRenderingContext2D) {
        if (ctx.canvas == null) {
            return;
        }
        for (let i = 0; i < NUM_LINES; i++) {
            // const x = randomRange(0, ctx.canvas.width, rng);
            const x = scaledGaussian(ctx.canvas.width / 2, ctx.canvas.width / 7, rng);
            line(ctx, x, ctx.canvas.height, x, 0);
        }
    }
}
