///<reference path="../../libs/cuon-utils.js">
///<reference path="../../libs/cuon-matrix.js">
///<reference path="../../libs/webgl-utils.js">
///<reference path="../../libs/webgl-debug.js">
var VSHADER_SOURCE =
    `attribute vec4 a_Position;\n` +
    `void main(){\n` +
    `gl_Position = a_Position;\n` +//设置坐标
    `gl_PointSize = 10.0;\n` +//设置尺寸
    `}\n`;
/**片元着色器 */
var FSHADER_SOURCE =
    `precision mediump float; \n` +
    `uniform vec4 u_Color;\n` +
    `void main(){ \n` +
    `gl_FragColor = u_Color;\n` +
    `}\n`;
var a_Position;
var u_Color;
function main() {
    let btn = document.getElementById("");
    var canvas = $("canvas")[0];
    var gl = getWebGLContext(canvas);
    if (!gl) {
        alert("no gl")
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        return;
    }
    a_Position = gl.getAttribLocation(gl.program, `a_Position`);
    if (a_Position < 0) {
        console.error("failed to get storage location of a_Position");
        return;
    }
    u_Color = gl.getUniformLocation(gl.program, `u_Color`);
    if (u_Color < 0) {
        console.error("failed to get storage location of u_Color");
    }
    canvas.onmousedown = (ev) => {
        click(ev, gl, canvas, a_Position)
    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}

var g_Points = [];
var g_colors = [];
function click(ev, gl, canvas, position) {
    var x = ev.clientX;//鼠标点击X
    var y = ev.clientY;//鼠标点击Y
    var rect = ev.target.getBoundingClientRect();//canvas的距离
    // x = ((x- rect.left) - canvas.height / 2) / (canvas.height / 2)
    // y = ((canvas.width / 2) - (y - rect.top)) / (canvas.width / 2);
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = ((canvas.height / 2) - (y - rect.top)) / (canvas.height / 2);
    g_Points.push({ x, y });
    g_colors.push([Math.random(), Math.random(), Math.random(), Math.random()])
    gl.clear(gl.COLOR_BUFFER_BIT);
    let len = g_Points.length
    for (let i = 0; i < len; i++) {
        //将点传递到变量中
        gl.vertexAttrib3f(a_Position, g_Points[i].x, g_Points[i].y, 0.0);
        let item = g_colors[i]
        gl.uniform4f(u_Color, item[0], item[1], item[2], item[3])
        /**绘制点 */
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}