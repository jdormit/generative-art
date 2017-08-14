import * as seedrandom from 'seedrandom';
import * as gaussian from 'gaussian';

const canvas = <HTMLCanvasElement> document.getElementById('canvas')!
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

ctx.fillStyle = 'rgb(200,0,0)';
ctx.fillRect(10, 10, 50, 50);
