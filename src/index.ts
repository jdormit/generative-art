import * as seedrandom from 'seedrandom';
import * as gaussian from 'gaussian';

const SEED = "Nicole";
const rng = seedrandom(SEED);

const canvas = <HTMLCanvasElement> document.getElementById('canvas')!

if (!canvas.getContext) {
    throw new Error("This browser does not support the HTML5 Canvas API");
}

const boxes = function(canvas: HTMLCanvasElement,
                       meanNumBoxes: number,
                       meanWidth: number,
                       meanHeight: number,
                       meanRed: number,
                       meanGreen: number,
                       meanBlue: number) {
    clearCanvas(canvas);
    const ctx = canvas.getContext('2d')!;

    const numBoxesDist = gaussian(meanNumBoxes, meanNumBoxes * 2);
    const xDist = gaussian(canvas.width / 2, canvas.width * 50);
    const yDist = gaussian(canvas.height / 2, canvas.height * 50);
    const widthDist = gaussian(meanWidth, meanWidth * 10);
    const heightDist = gaussian(meanHeight, meanHeight * 10);
    const redDist = gaussian(meanRed, meanRed * 20);
    const greenDist = gaussian(meanGreen, meanGreen * 20);
    const blueDist = gaussian(meanBlue, meanBlue * 20);

    const numBoxes = numBoxesDist.ppf(rng());
    for (let i = 0; i < numBoxes; i++) {
        const red = redDist.ppf(rng());
        const green = greenDist.ppf(rng());
        const blue = blueDist.ppf(rng());
        const x = xDist.ppf(rng());
        const y = yDist.ppf(rng());
        const width = widthDist.ppf(rng());
        const height = heightDist.ppf(rng());
        console.log(`Drawing rectangle at ${x}, ${y} with width ${width} and height ${height}`);
        ctx.fillStyle = `rgba(${red},${green},${blue},.5)`;
        ctx.fillRect(x, y, width, height);
    }
}

const lines = function(canvas: HTMLCanvasElement, num: number) {
    clearCanvas(canvas);
    const ctx = canvas.getContext('2d')!;
    const xDist = gaussian(canvas.width / 2, canvas.width * 25);
    for (let i = 0; i < num; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect(xDist.ppf(rng()), 0, 1, canvas.height);
    }
}

const clearCanvas = function(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

boxes(canvas, 100, 50, 100, 150, 10, 10);
