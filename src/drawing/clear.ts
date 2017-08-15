export const clear = function(ctx: CanvasRenderingContext2D) {
    if (ctx.canvas != null) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}
