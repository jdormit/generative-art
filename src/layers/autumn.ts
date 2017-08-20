import * as gaussian from 'gaussian';
import { box, fillHsla } from '../drawing';
import { scaledGaussian, weightedChoice } from '../util';
import { Layer } from '.';

const TITLE = 'Autumn';

const DARK_BROWN = [28, 17, 28];
const BROWN = [31, 35, 42];
const ORANGE = [30, 87, 61];
const YELLOW = [57, 96, 58];
const WHITE = [150, 100, 100];

export const autumn: Layer = {
    title: TITLE,
    render: function(rng: seedrandom.prng, ctx: CanvasRenderingContext2D) {
        if (ctx.canvas == null) {
            return;
        }
        const numRects = scaledGaussian(500, 50, rng);
        for (let i = 0; i < numRects; i++) {
            const x = scaledGaussian(ctx.canvas.width * (2/3), 100, rng);
            const y = scaledGaussian(ctx.canvas.height * (1/3), 100, rng);
            const width = scaledGaussian(16, 2, rng);
            const height = scaledGaussian(24, 2, rng);
            const colors: Array<[number, number[]]> = [
                [0.4, [...BROWN]],
                [0.3, [...ORANGE]],
                [0.2, [...YELLOW]],
                [0.1, [...WHITE]]
            ];
            const color = weightedChoice(colors, rng);
            fillHsla(ctx, color[0], color[1], color[2], 0.9, rng);
            box(ctx, x, y, width, height, rng);
        }
    }
}
