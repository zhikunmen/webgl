function main() {
    var canvas = document.getElementById("example");
    if (!canvas) {
        canvas = document.createElement("canvas", { id: "example", width: 400, height: 400 });
        document.body.appendChild(canvas);
    }
    let ctx = canvas.getContext('2d')// as CanvasRenderingContext2D;
    ctx.fillStyle = 'rgba(255,255,0,1)';
    ctx.fillRect(0, 0, 400, 400);
}