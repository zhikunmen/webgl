///<reference path="../../libs/cuon-utils.js">
///<reference path="../../libs/cuon-matrix.js">
///<reference path="../../libs/webgl-utils.js">
///<reference path="../../libs/webgl-debug.js">
function main() {
    let canvas = $("canvas").get(0);
    // let canvas = document.getElementById("webgl");
    if (!canvas) {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
    }
    //获取webgl绘图上下文
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("")
        return;
    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}