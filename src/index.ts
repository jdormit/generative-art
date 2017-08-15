import * as seedrandom from 'seedrandom';
import * as gaussian from 'gaussian';
import * as layers from './layers';
import { Layer } from './layers';
import { clear } from './drawing';

const canvas = <HTMLCanvasElement> document.getElementById('canvas')!

if (!canvas.getContext) {
    throw new Error("This browser does not support the HTML5 Canvas API");
}

if (Object.keys(layers).length === 0) {
    throw new Error("No layers found");
}

const ctx = canvas.getContext('2d')!;
let layer = layers[Object.keys(layers)[0]];

const $title = document.getElementById('title')!;
$title.innerHTML = "";
$title.appendChild(document.createTextNode(layer.title));

const render = function(ctx: CanvasRenderingContext2D, layer: Layer, ...layers: Layer[]) {
    const title = $title.textContent ? $title.textContent.trim() : undefined;
    const rng = seedrandom(title);
    clear(ctx);
    layer.render(rng, ctx);
    layers.forEach(layer => layer.render(rng, ctx))
}

render(ctx, layer);

$title.addEventListener('input', () => render(ctx, layer));
