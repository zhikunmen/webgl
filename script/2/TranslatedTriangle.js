///<reference path="../../libs/cuon-utils.js">
///<reference path="../../libs/cuon-matrix.js">
///<reference path="../../libs/webgl-utils.js">
///<reference path="../../libs/webgl-debug.js">
var VSHADER_SOURCE =
    `attribute vec4 a_Position;\n` +
    `uniform vec4 u_Translation; \n` +
    `void main(){\n` +
    `gl_Position = a_Position + u_Translation;\n` +
    `}\n`;

var FSHADER_SOURCE =
    `precision mediump float;\n` +
    `uniform vec4 u_Color;\n` +
    `void main(){\n` +
    `gl_FragColor = u_Color;\n` +
    `}`;

var gl;
var a_Position;
function main() {
    let canvas = $("canvas").get(0);
    gl = getWebGLContext(canvas);
    if (!gl) {
        alert('no gl');
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        alert('initshader fail');
        return;
    }

    a_Position = gl.getAttribLocation(gl.program, `a_Position`);
    var u_Color = gl.getUniformLocation(gl.program, `u_Color`);
    gl.uniform4f(u_Color, 0.0, 0.0, 1.0, 1.0);
    var u_Translation = gl.getUniformLocation(gl.program, `u_Translation`);
    gl.uniform4f(u_Translation, 0.5, 0.5, 0.0, 1.0);
    var n = init();
    if (!n) {
        alert("! n")
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function init() {
    var vex = new Float32Array([
        0.0, 0.5, -0.5, 0.0, 0.5, 0.0
    ])
    var n = 3;
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vex, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}