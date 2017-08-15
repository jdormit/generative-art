import * as seedrandom from 'seedrandom';
import * as gaussian from 'gaussian';

type Layer = (rng: seedrandom.prng, canvas: HTMLCanvasElement) => void;

const INITIAL_TITLE = "Generative 1";

const $title = document.getElementById('title')!;
$title.innerHTML = "";
$title.appendChild(document.createTextNode(INITIAL_TITLE));

const canvas = <HTMLCanvasElement> document.getElementById('canvas')!

if (!canvas.getContext) {
    throw new Error("This browser does not support the HTML5 Canvas API");
}

interface boxesConfig {
    canvas: HTMLCanvasElement;
    rng: seedrandom.prng;
    numDist: gaussian.Gaussian,
    xDist: gaussian.Gaussian;
    yDist: gaussian.Gaussian;
    widthDist: gaussian.Gaussian;
    heightDist: gaussian.Gaussian;
    redDist: gaussian.Gaussian;
    greenDist: gaussian.Gaussian;
    blueDist: gaussian.Gaussian;
}

const boxes = function(config: boxesConfig) {
    const {
        canvas,
        rng,
        numDist,
        xDist,
        yDist,
        widthDist,
        heightDist,
        redDist,
        greenDist,
        blueDist
    } = config;

    const ctx = canvas.getContext('2d')!;

    const numBoxes = numDist.ppf(rng());

    for (let i = 0; i < numBoxes; i++) {
        const red = redDist.ppf(rng());
        const green = greenDist.ppf(rng());
        const blue = blueDist.ppf(rng());
        const x = xDist.ppf(rng());
        const y = yDist.ppf(rng());
        const width = widthDist.ppf(rng());
        const height = heightDist.ppf(rng());
        ctx.fillStyle = `rgba(${red},${green},${blue},.5)`;
        ctx.fillRect(x, y, width, height);
    }
}

const lines = function(canvas: HTMLCanvasElement, rng: seedrandom.prng, num: number) {
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

const box_clusters: Layer = (rng: seedrandom.prng, canvas: HTMLCanvasElement) => {
    const numClusters = gaussian(3, 4).ppf(rng());
    for (let i = 0; i < numClusters; i++) {
        const boxesConfig: boxesConfig = {
            canvas: canvas,
            rng: rng,
            numDist: gaussian(16, 64),
            xDist: gaussian(canvas.width / numClusters * i, numClusters * numClusters * 200),
            yDist: gaussian(canvas.height / i, canvas.height * 32),
            widthDist: gaussian(64, 128),
            heightDist: gaussian(128, 256),
            redDist: gaussian(128, 128 * i + 1),
            greenDist: gaussian(128, 128),
            blueDist: gaussian(128, 128)
        };
        boxes(boxesConfig);
    }
};

const render = function(canvas: HTMLCanvasElement) {
    clearCanvas(canvas);
    const title = $title.textContent ? $title.textContent.trim() : undefined;
    const rng = seedrandom(title);
    box_clusters(rng, canvas);
}

render(canvas);

$title.addEventListener('input', () => render(canvas));
